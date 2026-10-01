#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <limits.h>
#include <unistd.h>  // for usleep()

/**
 * -----------------------------------------------------------------------------------------
 * @struct Node
 * @brief Structure representing a node in a singly linked list.
 *
 * In the Optimistic Synchronization mechanism, to avoid a coarse-grained global lock,
 * each node is equipped with its own dedicated mutex lock for fine-grained concurrency control.
 * -----------------------------------------------------------------------------------------
 */
typedef struct Node {
    int val;                 /* The integer value stored in the node */
    struct Node* next;       /* Pointer to the next node in the list */
    pthread_mutex_t lock;    /* Dedicated mutex lock for this specific node */
} Node;


/**
 * -----------------------------------------------------------------------------------------
 * @def Global pointers for the list boundaries
 * @brief default NULL
 * -----------------------------------------------------------------------------------------
*/
Node * head = NULL;
Node * tail = NULL;


/**
 * -----------------------------------------------------------------------------------------
 * @brief Allocates memory and initializes a new list node.
 *
 * @param value The integer value to be stored in the new node.
 * @return Pointer to the newly created node.
 *
 * @note pthread_mutex_init(&mutex, attr) explanation:
 *       - &mutex : Pointer to the mutex lock to be initialized (here, &(new_node->lock)).
 *       - attr   : Mutex attributes. Passing NULL applies default attributes (unlocked state).
 * -----------------------------------------------------------------------------------------
 */
Node* create_node(int value) {
    Node* new_node = (Node*)malloc(sizeof(Node));
    if (!new_node) {
        perror("Memory allocation failed");
        exit(EXIT_FAILURE);
    }

    new_node->val = value;
    new_node->next = NULL;

    // Initialize the dedicated mutex lock for the newly created node
    pthread_mutex_init(&(new_node->lock), NULL);

    return new_node;
}


/**
 * -----------------------------------------------------------------------------------------
 * @brief Initializes the linked list with two Sentinel Nodes.
 *
 * The list is bounded by a head node with INT_MIN and a tail node with INT_MAX.
 * This guarantees that any inserted value will always fall between two existing nodes,
 * simplifying boundary condition checks during concurrent operations.
 * -----------------------------------------------------------------------------------------
 */
void init_list() {
    // Create the lower bound (-INF) and upper bound (+INF)
    head = create_node(INT_MIN);
    tail = create_node(INT_MAX);

    // Link the head to the tail: [-INF] -> [+INF]
    head->next = tail;
}


/**
 * -----------------------------------------------------------------------------------------
 * @brief Validates the structural integrity of the target nodes.
 *
 * Traverses from the head to ensure that the predecessor node (pred)
 * is still in the list and its next pointer still points to the current node (curr).
 *
 * @param pred Pointer to the predecessor node.
 * @param curr Pointer to the current node.
 * @return 1 if the structure is valid, 0 otherwise.
 * -----------------------------------------------------------------------------------------
 */
int validate(Node* pred, Node* curr) {
    Node* temp = head;

    /* Traverse the list from the head */
    while (temp != NULL && temp->val <= pred->val) {
        if (temp == pred) {
            /* Predecessor found, verify the link to current node */
            return (pred->next == curr) ? 1 : 0;
        }
        temp = temp->next;
    }

    /* Predecessor not found in the list (possibly deleted or replaced) */
    return 0;
}

/**
 * -----------------------------------------------------------------------------------------
 * @struct ThreadArgs
 * @brief Arguments passed to the thread function.
 * -----------------------------------------------------------------------------------------
 */
typedef struct {
    char thread_id[16];  /* Thread identifier (e.g., T1, T2) */
    int value;           /* Value to be inserted */
    int delay_ms;        /* Artificial delay in milliseconds */
} ThreadArgs;


/**
 * -----------------------------------------------------------------------------------------
 * @brief Core function for Optimistic Synchronization insertion.
 *
 * @param arg Pointer to ThreadArgs structure containing thread details.
 * @return NULL upon completion.
 * @note System Function Explanations:
 *      - fflush(stdout)      : Forces a flush of the user-space output buffer to the OS.
 *                              Crucial in multi-threading to prevent interleaved or lost console outputs.
 *                              (強制清空輸出緩衝區，避免多執行緒下訊息交錯)
 *
 *      - free(args)          : Deallocates the memory block previously allocated via malloc(),
 *                              for the thread arguments, preventing memory leaks.
 *                              (釋放先前動態配置的記憶體，防止記憶體流失)
 *
 *      - usleep(microseconds): Suspends execution of the calling thread for (at least) the specified number of microseconds.
 *                              (暫停當前執行緒的執行，單位為微秒)
 * -----------------------------------------------------------------------------------------
 */
void* add(void* arg) {
    ThreadArgs* args = (ThreadArgs*)arg;
    char* t_id = args->thread_id;
    int val = args->value;
    int delay = args->delay_ms;

    /* The retry loop */
    while (1) {
        /* 1. Lock-free Search */
        Node* pred = head;
        Node* curr = head->next;

        /* Traverse until the correct insertion point is found */
        while (curr != NULL && curr->val < val) {
            pred = curr;
            curr = curr->next;
        }

        /* 2. Artificial Delay (usleep takes microseconds)
         * Executed AFTER search but BEFORE acquiring locks to increase collision probability.
         */
        if (delay > 0) {
            usleep(delay * 1000);
        }

        /* 3. Lock */
        pthread_mutex_lock(&(pred->lock));
        pthread_mutex_lock(&(curr->lock));

        /* 4. Validate and Commit/Retry */
        if (validate(pred, curr)) {
            /* Validation successful (Commit) */
            Node* new_node = create_node(val);
            new_node->next = curr;
            pred->next = new_node;

            printf("[%s] Inserted %d.\n", t_id, val);
            fflush(stdout);

            /* Unlock and break out of the retry loop */
            pthread_mutex_unlock(&(pred->lock));
            pthread_mutex_unlock(&(curr->lock));
            break;
        } else {
            /* Validation failed (Retry) */
            printf("[%s] Validation failed. Retrying...\n", t_id);
            fflush(stdout);

            /* Unlock and continue to the next iteration to search again */
            pthread_mutex_unlock(&(pred->lock));
            pthread_mutex_unlock(&(curr->lock));
        }
    }

    /* Free dynamically allocated memory for thread arguments */
    free(args);
    return NULL;
}

/**
 * -----------------------------------------------------------------------------------------
 * @brief Prints the final state of the linked list.
 *
 * Traverses the list from head to tail. Translates INT_MIN to "-INF"
 * and INT_MAX to "+INF" for formatted output.
 * -----------------------------------------------------------------------------------------
 */
void print_list() {
    printf("List: ");
    Node* curr = head;

    while (curr != NULL) {
        if (curr->val == INT_MIN) {
            printf("-INF -> ");
        } else if (curr->val == INT_MAX) {
            printf("+INF\n");
        } else {
            printf("%d -> ", curr->val);
        }
        curr = curr->next;
    }
}

/**
 * -----------------------------------------------------------------------------------------
 * @brief Frees all dynamically allocated memory and destroys mutexes.
 *
 * Traverses the linked list to destroy the pthread_mutex associated with each node
 * and frees the memory allocated for the node itself. Prevents memory leaks.
 * -----------------------------------------------------------------------------------------
 */
void free_list() {
    Node* curr = head;
    while (curr != NULL) {
        Node* next_node = curr->next;

        /* Destroy the mutex lock before freeing the memory */
        pthread_mutex_destroy(&(curr->lock));

        /* Free the node memory */
        free(curr);

        curr = next_node;
    }
}

/**
 * -----------------------------------------------------------------------------------------
 * @brief Main execution entry point.
 *
 * Handles standard input parsing, dynamic thread creation, and synchronization
 * upon receiving the WAIT command.
 * -----------------------------------------------------------------------------------------
 */
int main() {
    /* 1. Initialize the list with sentinel nodes */
    init_list();

    char line[256];
    pthread_t threads[100];  /* Array to hold thread identifiers */
    int thread_count = 0;

    /* 2. Read standard input line by line */
    while (fgets(line, sizeof(line), stdin)) {
        /* Remove newline character at the end of the string */
        line[strcspn(line, "\n")] = 0;

        /* Stop reading and wait for threads if WAIT command is received */
        if (strcmp(line, "WAIT") == 0) {
            break;
        }

        char t_id[16], cmd[16];
        int val = 0, delay_ms = 0;

        /* 3. Parse the input string: [Thread_ID] [COMMAND] [Value] [Delay_ms] */
        int parsed = sscanf(line, "%s %s %d %d", t_id, cmd, &val, &delay_ms);

        /* Proceed only if parsing is successful and command matches */
        if (parsed >= 3 && strcmp(cmd, "ADD") == 0) {
            /* Dynamically allocate memory for thread arguments */
            ThreadArgs* args = (ThreadArgs*)malloc(sizeof(ThreadArgs));
            strcpy(args->thread_id, t_id);
            args->value = val;
            args->delay_ms = delay_ms;

            /* 4. Create an independent thread to execute the 'add' function */
            pthread_create(&threads[thread_count], NULL, add, (void*)args);
            thread_count++;
        }
    }

    /* 5. Synchronization barrier: wait for all created threads to finish */
    for (int i = 0; i < thread_count; i++) {
        pthread_join(threads[i], NULL);
    }

    /* 6. Print the final results */
    print_list();

    /* 7. Clean up dynamically allocated resources */
    free_list();

    return 0;
}
