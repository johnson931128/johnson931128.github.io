import Link from "next/link";
import Image from "next/image";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const metadata = {
  title: "作業系統樂觀同步機制 Demo",
  description:
    "以 Fine-grained Mutex 與 Validate/Retry 處理多執行緒 Race Condition 的 Optimistic Synchronization 實作。",
};

const demoDirectory = join(
  process.cwd(),
  "public",
  "demos",
  "optimistic-synchronization",
);

const sourceCode = readFileSync(join(demoDirectory, "main.c"), "utf8");
const testInput = readFileSync(join(demoDirectory, "test.txt"), "utf8").trim();

const verifiedOutput = `[T1] Inserted 10.
[T3] Inserted 8.
[T2] Validation failed. Retrying...
[T2] Inserted 5.
List: -INF -> 5 -> 8 -> 10 -> +INF`;

const technologies = [
  "C",
  "POSIX Threads (pthread)",
  "Mutex",
  "Optimistic Synchronization",
] as const;

const mechanismSteps = [
  {
    title: "Search（無鎖搜尋）",
    description:
      "執行緒在尋找插入點時不加任何鎖，直接走訪串列，直到找到目標節點的前節點（pred）與後節點（curr）。",
  },
  {
    title: "Lock（加鎖）",
    description: "找到後，將 pred 與 curr 上鎖。",
  },
  {
    title: "Validate（驗證）",
    description:
      "因為搜尋時沒有加鎖，串列結構可能已經被其他執行緒改變。請從 head 重新走訪，確認 pred 仍然在串列中，且 pred->next 仍然指向 curr。",
  },
  {
    title: "Commit / Retry",
    description:
      "若驗證成功，則進行插入並解鎖；若驗證失敗，則解鎖並重新從步驟 1 開始嘗試（Retry）。",
  },
] as const;

const assumptions = [
  "資料結構：使用單向鏈結串列（Singly Linked List），每個節點包含一個整數 val（嚴格遞增 Strictly Ascending）、一個指向下一個節點的指標 next，以及一個互斥鎖 lock。",
  "排序屬性：鏈結串列中的資料必須隨時保持由小到大排序。",
  "環境：假設有多個執行緒同時對串列進行 add（插入）操作。",
  "串列已預設包含兩個 Sentinel Nodes（上界和下界）：head 的值為 INT_MIN，tail（最後一個節點）的值為 INT_MAX。這保證任何插入操作都有介於中間的 pred 和 curr 可以加鎖。",
  "不會有重複的數值被插入（或自行定義重複時的行為）。",
] as const;

const implementationRules = [
  "強制延遲：執行緒在完成 Search 階段（找到 pred 與 curr）後，但在呼叫 pthread_mutex_lock 獲取 Mutex 鎖之前，必須根據輸入的 Delay_ms 執行 usleep。此舉旨在人為擴大衝突機率，測試程式對 Validate 失敗的處理能力。",
  "成功輸出：插入成功並解鎖後，必須印出：[Thread_ID] Inserted [Value].",
  "重試輸出：若執行 Validate 函式失敗（表示目標區域已遭其他執行緒修改），必須立即釋放鎖，並印出：[Thread_ID] Validation failed. Retrying...，隨後重新從頭執行搜尋與插入邏輯。",
  "一致性要求：每次呼叫 printf 後，務必緊接 fflush(stdout);，確保輸出資訊不因緩衝區問題而交錯或遺失。",
  "串列初始化：鏈結串列須預設包含兩個 Sentinel Nodes：Head 值為 INT_MIN，Tail 值為 INT_MAX。所有插入操作皆發生於這兩個節點之間，以確保 pred 與 curr 永遠存在。",
  "輸出有同步跟沒同步的結果差異。",
] as const;

function CodeListing({ code }: { code: string }) {
  return (
    <pre className="max-h-[48rem] overflow-auto bg-[#11151a] py-5 text-[0.72rem] leading-6 text-white/78 sm:text-[0.8rem]">
      <code>
        {code.split("\n").map((line, index) => (
          <span key={`${index}-${line}`} className="grid grid-cols-[3.5rem_minmax(max-content,1fr)] px-4 sm:px-6">
            <span className="select-none pr-4 text-right text-white/28" aria-hidden>
              {String(index + 1).padStart(3, "0")}
            </span>
            <span>{line || " "}</span>
          </span>
        ))}
      </code>
    </pre>
  );
}

export default function OptimisticSynchronizationDemoPage() {
  return (
    <main className="full-bleed min-h-svh bg-[#eee9dd] text-foreground">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <header className="grid gap-8 border-b border-foreground/20 pb-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="flex items-start gap-5 sm:gap-7">
            <Image
              src="/brands/optimistic-synchronization.png"
              alt="Optimistic Synchronization linked-list logo"
              width={192}
              height={108}
              priority
              className="h-16 w-28 shrink-0 object-contain sm:h-20 sm:w-36"
            />
            <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
              Operating systems / concurrency demo
            </p>
            <h1 className="font-display mt-4 max-w-5xl text-5xl leading-[0.92] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              作業系統樂觀同步機制
            </h1>
            </div>
          </div>
          <Link
            href="/#experience"
            className="w-fit border-b border-foreground/30 pb-1 text-sm text-foreground/65 transition-colors hover:border-primary hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Back to experience
          </Link>
        </header>

        <section aria-labelledby="overview-heading" className="grid gap-8 border-b border-foreground/20 py-10 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-10 lg:py-14">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-primary">01</p>
            <h2 id="overview-heading" className="font-display mt-3 text-3xl tracking-[-0.025em] sm:text-4xl">
              Overview
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              實作 Optimistic Synchronization，以 Fine-grained Mutex 與 Validate/Retry 處理多執行緒 Race Condition。
            </p>
            <div className="mt-7 flex flex-wrap gap-x-0 gap-y-2 font-mono text-xs uppercase tracking-[0.1em] text-foreground/55">
              {technologies.map((technology) => (
                <span key={technology} className="after:mx-3 after:text-foreground/20 after:content-['/'] last:after:hidden">
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="problem-heading" className="grid gap-8 border-b border-foreground/20 py-10 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-10 lg:py-14">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-primary">02</p>
            <h2 id="problem-heading" className="font-display mt-3 text-3xl tracking-[-0.025em] sm:text-4xl">
              Problem
            </h2>
          </div>
          <div className="max-w-4xl space-y-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.13em] text-primary">5. 樂觀同步問題</p>
              <h3 className="font-display mt-3 text-3xl leading-tight tracking-[-0.025em]">
                實作樂觀同步（Optimistic Synchronization）之並行鏈結串列
              </h3>
              <p className="mt-5 leading-8 text-muted-foreground">
                在多執行緒環境中，為了提升鏈結串列（Linked List）的搜尋與插入效率，我們不想使用單一的大鎖（Coarse-grained lock）鎖住整個串列。本題請實作「樂觀同步」策略。
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl tracking-[-0.02em]">樂觀同步機制說明</h3>
              <p className="mt-4 leading-8 text-muted-foreground">
                傳統的細粒度鎖（Fine-grained Locking）採用「交替鎖（Hand-over-hand locking）」機制，雖然安全，但在走訪過程（Traversal）中頻繁的 lock 與 unlock 會造成極大的效能開銷。
              </p>
              <ol className="mt-5 grid gap-4">
                {mechanismSteps.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 leading-7 text-muted-foreground">
                    <span className="font-mono text-sm text-primary">{index + 1}.</span>
                    <span><strong className="font-medium text-foreground">{step.title}：</strong>{step.description}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="font-display text-2xl tracking-[-0.02em]">已知假設與條件</h3>
              <ul className="mt-5 grid gap-3">
                {assumptions.map((assumption) => (
                  <li key={assumption} className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-3 leading-7 text-muted-foreground">
                    <span className="mt-[0.65rem] size-1.5 rounded-full bg-primary" aria-hidden />
                    <span>{assumption}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-2xl tracking-[-0.02em]">輸入格式</h3>
              <p className="mt-4 leading-8 text-muted-foreground">程式須讀取多行指令，每行代表一個執行緒的動作。</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="border border-foreground/15 p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-foreground/50">指令格式</p>
                  <code className="mt-3 block overflow-x-auto text-sm text-foreground">[Thread_ID] ADD [Value] [Delay_ms]</code>
                </div>
                <div className="border border-foreground/15 p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-foreground/50">控制指令</p>
                  <code className="mt-3 block text-sm text-foreground">WAIT</code>
                </div>
              </div>
              <ul className="mt-5 grid gap-3 leading-7 text-muted-foreground">
                <li><strong className="font-medium text-foreground">Thread_ID：</strong>字串，標識該執行緒名稱（例如 T1、T2）。</li>
                <li><strong className="font-medium text-foreground">Value：</strong>整數，欲插入串列的數值。</li>
                <li><strong className="font-medium text-foreground">Delay_ms：</strong>整數，用來模擬搜尋後與鎖定前的人為延遲（單位為毫秒）。</li>
                <li><strong className="font-medium text-foreground">WAIT：</strong>主執行緒等待前面所有 Thread 執行完畢，最後印出完整串列。</li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-2xl tracking-[-0.02em]">實作與輸出規範</h3>
              <ul className="mt-5 grid gap-3">
                {implementationRules.map((rule) => (
                  <li key={rule} className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-3 leading-7 text-muted-foreground">
                    <span className="mt-[0.65rem] size-1.5 rounded-full bg-primary" aria-hidden />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-2xl tracking-[-0.02em]">測資範例</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">預設串列已包含 Strictly Ascending 的 -INF 與 +INF。</p>
              <div className="mt-5 grid gap-6 lg:grid-cols-2">
                <div>
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.13em] text-foreground/50">Input</p>
                  <pre className="overflow-x-auto bg-[#11151a] p-5 font-mono text-sm leading-7 text-white/82"><code>{testInput}</code></pre>
                </div>
                <div>
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.13em] text-foreground/50">Output</p>
                  <pre className="overflow-x-auto bg-[#11151a] p-5 font-mono text-sm leading-7 text-white/82"><code>{verifiedOutput}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="usage-heading" className="grid gap-8 border-b border-foreground/20 py-10 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-10 lg:py-14">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-primary">03</p>
            <h2 id="usage-heading" className="font-display mt-3 text-3xl tracking-[-0.025em] sm:text-4xl">
              Usage
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.13em] text-foreground/50">Build and run in WSL / Linux</p>
              <pre className="overflow-x-auto bg-[#11151a] p-5 font-mono text-sm leading-7 text-white/82"><code>{`gcc main.c -o main -pthread
./main < test.txt`}</code></pre>
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.13em] text-foreground/50">test.txt</p>
              <pre className="overflow-x-auto bg-[#11151a] p-5 font-mono text-sm leading-7 text-white/82"><code>{testInput}</code></pre>
            </div>
          </div>
        </section>

        <section aria-labelledby="code-heading" className="grid gap-8 border-b border-foreground/20 py-10 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-10 lg:py-14">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-primary">04</p>
            <h2 id="code-heading" className="font-display mt-3 text-3xl tracking-[-0.025em] sm:text-4xl">
              Code
            </h2>
          </div>
          <div className="min-w-0 border border-foreground/20 bg-[#11151a]">
            <div className="flex items-center justify-between border-b border-white/12 px-4 py-3 sm:px-6">
              <p className="font-mono text-xs tracking-[0.12em] text-white/55">main.c</p>
              <Link
                href="/demos/optimistic-synchronization/main.c"
                className="font-mono text-xs text-[#7e9aff] underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Open source file
              </Link>
            </div>
            <CodeListing code={sourceCode} />
          </div>
        </section>

        <section aria-labelledby="terminal-heading" className="grid gap-8 py-10 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-10 lg:py-14">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-primary">05</p>
            <h2 id="terminal-heading" className="font-display mt-3 text-3xl tracking-[-0.025em] sm:text-4xl">
              Terminal
            </h2>
          </div>
          <div className="overflow-hidden border border-foreground/20 bg-[#0b0e12] shadow-[0_24px_70px_rgb(15_18_22/0.18)]" role="region" aria-label="Verified terminal output">
            <div className="flex items-center gap-2 border-b border-white/12 px-5 py-3" aria-hidden>
              <span className="size-2.5 rounded-full bg-[#ff7548]" />
              <span className="size-2.5 rounded-full bg-[#e2b93b]" />
              <span className="size-2.5 rounded-full bg-[#48b982]" />
              <span className="ml-3 font-mono text-[0.67rem] uppercase tracking-[0.12em] text-white/38">verified run / WSL / GCC</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-sm leading-7 text-white/78 sm:p-7"><code><span className="text-[#7e9aff]">$</span>{` gcc main.c -o main -pthread
`}<span className="text-[#7e9aff]">$</span>{` ./main < test.txt
${verifiedOutput}`}</code></pre>
          </div>
        </section>
      </div>
    </main>
  );
}
