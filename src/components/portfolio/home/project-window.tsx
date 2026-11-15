import styles from "./project-gallery.module.css";

export default function ProjectWindow() {
  return (
    <svg
      className={styles.windowMotion}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      data-window-motion=""
    >
      <defs>
        <clipPath id="project-window-glass">
          <rect x="211" y="155" width="1178" height="530" />
        </clipPath>
        <radialGradient id="project-window-haze">
          <stop stopColor="#bf9cff" stopOpacity=".42" />
          <stop offset=".55" stopColor="#8a8ad9" stopOpacity=".22" />
          <stop offset="1" stopColor="#8a8ad9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g clipPath="url(#project-window-glass)">
        <g className={styles.skyHaze}>
          <ellipse cx="430" cy="463" rx="275" ry="41" fill="url(#project-window-haze)" />
          <ellipse cx="230" cy="496" rx="134" ry="30" fill="url(#project-window-haze)" />
        </g>
        <g className={styles.bridgeTraffic}>
          <path d="M-25 0H-4" stroke="#71e5ff" strokeWidth="2" opacity=".48" />
          <circle r="2.5" fill="#eaffff" />
        </g>
        <g className={styles.bridgeTraffic}>
          <path d="M-21 0H-4" stroke="#ff7abe" strokeWidth="2" opacity=".48" />
          <circle r="2.3" fill="#ffdbed" />
        </g>
        <g className={styles.towerBeacon}>
          <circle cx="1121" cy="242" r="11" fill="#ff5ab9" opacity=".24" />
          <circle cx="1121" cy="242" r="3" fill="#ffe0f5" />
        </g>
        <g className={styles.towerBeacon}>
          <circle cx="379" cy="468" r="9" fill="#68edff" opacity=".25" />
          <circle cx="379" cy="468" r="2.5" fill="#d9fbff" />
        </g>
      </g>
    </svg>
  );
}
