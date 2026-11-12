import styles from "./cyberpunk-intro.module.css";

export default function CyberpunkCity() {
  return (
    <div className={styles.scene} aria-hidden="true">
      <svg className={styles.city} viewBox="0 0 1200 675" preserveAspectRatio="xMaxYMid slice" focusable="false">
        <defs>
          <clipPath id="city-viaduct">
            <path d="M0 378H881V403H0Z" />
          </clipPath>
          <linearGradient id="city-train-body" x2="0" y2="1">
            <stop stopColor="#677a99" />
            <stop offset=".4" stopColor="#273448" />
            <stop offset="1" stopColor="#111c30" />
          </linearGradient>
          <radialGradient id="city-cool-fog">
            <stop stopColor="#bef3ff" stopOpacity=".94" />
            <stop offset=".47" stopColor="#86b8db" stopOpacity=".53" />
            <stop offset="1" stopColor="#86b8db" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="city-warm-fog">
            <stop stopColor="#fbd0ed" stopOpacity=".94" />
            <stop offset=".47" stopColor="#ba8ecf" stopOpacity=".53" />
            <stop offset="1" stopColor="#ba8ecf" stopOpacity="0" />
          </radialGradient>
          <filter id="city-fog-shape" x="-40%" y="-60%" width="180%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency=".021 .038" numOctaves="3" seed="11" result="texture" />
            <feDisplacementMap in="SourceGraphic" in2="texture" scale="59" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="4.5" />
          </filter>
          <radialGradient id="city-magenta-spill">
            <stop offset="0" stopColor="#ff45be" stopOpacity=".7" />
            <stop offset=".42" stopColor="#ff45be" stopOpacity=".32" />
            <stop offset="1" stopColor="#ff45be" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="city-beacon-spill">
            <stop offset="0" stopColor="#ff78cf" stopOpacity=".7" />
            <stop offset=".42" stopColor="#ff78cf" stopOpacity=".32" />
            <stop offset="1" stopColor="#ff78cf" stopOpacity="0" />
          </radialGradient>
        </defs>
        <image href="/hero/cyberpunk-city.webp" width="1200" height="675" />
        <g clipPath="url(#city-viaduct)">
          <g className={styles.train}>
            <path d="M0 397Q1 391 7 390H37V399H0ZM39 390H75V399H39ZM77 390H108Q116 390 122 397L123 399H77Z" fill="url(#city-train-body)" stroke="#96a9bc" strokeWidth=".6" />
            <path d="M9 393H32M44 393H71M82 393H108" stroke="#82e3ed" strokeWidth="2" strokeDasharray="4 2" />
            <path d="M5 398H117" stroke="#438997" strokeWidth=".7" />
            <path d="M119 397H123" stroke="#e3faff" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="2" cy="397" r="1" fill="#ff9abc" />
          </g>
        </g>
        <g className={styles.coolMist}>
          <ellipse cx="804" cy="272" rx="102" ry="35" transform="rotate(-18 804 272)" fill="url(#city-cool-fog)" filter="url(#city-fog-shape)" />
          <ellipse cx="850" cy="250" rx="68" ry="25" transform="rotate(-15 850 250)" fill="url(#city-cool-fog)" filter="url(#city-fog-shape)" />
        </g>
        <g className={styles.warmMist}>
          <ellipse cx="851" cy="383" rx="97" ry="32" transform="rotate(-15 851 383)" fill="url(#city-warm-fog)" filter="url(#city-fog-shape)" />
          <ellipse cx="1000" cy="181" rx="64" ry="29" transform="rotate(-25 1000 181)" fill="url(#city-warm-fog)" filter="url(#city-fog-shape)" />
        </g>
        <g className={styles.rooftopLight}>
          <ellipse cx="1122" cy="336" rx="79" ry="49" transform="rotate(-16 1122 336)" fill="url(#city-magenta-spill)" />
          <path d="M1098 329L1144 316" stroke="#ffb7ed" strokeWidth="3.5" strokeLinecap="round" />
        </g>
        <g className={styles.towerLight}>
          <ellipse cx="1168" cy="174" rx="25" ry="23" transform="rotate(0 1168 174)" fill="url(#city-beacon-spill)" />
          <ellipse cx="917" cy="197" rx="62" ry="102" transform="rotate(-5 917 197)" fill="url(#city-magenta-spill)" />
          <circle cx="1168" cy="174" r="2.5" fill="#ff9ed6" />
          <path d="M917 160L916 239" stroke="#f787d4" strokeWidth="1.8" strokeOpacity=".6" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
