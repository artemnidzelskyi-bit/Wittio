// theme.jsx — global tokens + fonts
const WITTIO_TWEAKS = /*EDITMODE-BEGIN*/{
  "accent": "#A8FF60",
  "gamification": 50
}/*EDITMODE-END*/;

const accentPresets = {
  "#A8FF60": { name: "Phosphor", rgb: "168,255,96" },
  "#FFC46B": { name: "Amber",    rgb: "255,196,107" },
  "#7FE3FF": { name: "Cyan",     rgb: "127,227,255" },
  "#FF7AB6": { name: "Coral",    rgb: "255,122,182" },
  "#C3B0FF": { name: "Lilac",    rgb: "195,176,255" },
};

const W = {
  bg:        "#0D120F",
  bgRaised:  "#141A16",
  bgSunken:  "#090D0B",
  hair:      "rgba(168,255,96,0.12)",
  hairSoft:  "rgba(255,255,255,0.07)",
  line:      "rgba(255,255,255,0.10)",
  text:      "#E6F0E6",
  muted:     "#8FA698",
  mutedDim:  "#5E7066",
  amber:     "#FFC46B",
  cyan:      "#7FE3FF",
  coral:     "#FF7AB6",
  danger:    "#FF6B6B",
  mono:      `"JetBrains Mono", "Berkeley Mono", ui-monospace, Menlo, monospace`,
  serif:     `"Instrument Serif", "Cormorant Garamond", "Times New Roman", serif`,
  sans:      `"Inter", "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
};

// Inject fonts + base CSS once
(() => {
  if (document.getElementById("wittio-fonts")) return;
  const l = document.createElement("link");
  l.id = "wittio-fonts";
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap";
  document.head.appendChild(l);

  const s = document.createElement("style");
  s.id = "wittio-base";
  s.textContent = `
    .w-root { font-family: ${W.sans}; color: ${W.text}; background: ${W.bg}; -webkit-font-smoothing: antialiased; }
    .w-mono { font-family: ${W.mono}; font-feature-settings: "tnum", "zero"; letter-spacing: 0; }
    .w-serif { font-family: ${W.serif}; letter-spacing: -0.01em; }
    .w-grid-bg {
      background-image:
        linear-gradient(${W.hairSoft} 1px, transparent 1px),
        linear-gradient(90deg, ${W.hairSoft} 1px, transparent 1px);
      background-size: 48px 48px;
    }
    .w-noise { position: relative; }
    .w-noise::after {
      content:""; position:absolute; inset:0; pointer-events:none; opacity:.04; mix-blend-mode:overlay;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }
    .w-glow { box-shadow: 0 0 0 1px var(--accent-line,rgba(168,255,96,0.35)), 0 0 24px -4px var(--accent-glow,rgba(168,255,96,0.35)); }
    .w-focus-ring:focus-visible { outline: 2px solid var(--accent, ${W.amber}); outline-offset: 2px; }
    .w-btn { font-family: ${W.mono}; font-weight: 500; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase;
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      height: 44px; padding: 0 22px; border-radius: 2px; border: 1px solid transparent; cursor: pointer; transition: all .12s ease; user-select:none; }
    .w-btn-primary { background: var(--accent); color: #0A0F0B; border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent), 0 8px 28px -10px var(--accent-glow, rgba(168,255,96,0.5)); }
    .w-btn-primary:hover { transform: translateY(-1px); filter: brightness(1.06); }
    .w-btn-ghost { background: transparent; color: ${W.text}; border-color: ${W.line}; }
    .w-btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
    .w-btn-dark { background: ${W.bgRaised}; color: ${W.text}; border-color: ${W.line}; }
    .w-chip { font-family: ${W.mono}; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
      color: ${W.muted}; padding: 4px 8px; border: 1px solid ${W.line}; border-radius: 2px; display: inline-flex; align-items:center; gap:6px; }
    .w-chip-accent { color: var(--accent); border-color: var(--accent-line, ${W.hair}); background: var(--accent-bg, rgba(168,255,96,0.06)); }
    .w-ascii { font-family: ${W.mono}; color: ${W.mutedDim}; white-space: pre; user-select:none; }
    @keyframes w-blink { 0%, 49% { opacity:1 } 50%, 100% { opacity: 0 } }
    .w-caret::after { content:"▌"; margin-left: 2px; color: var(--accent); animation: w-blink 1s steps(1) infinite; }
    @keyframes w-scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
    .w-scanline { position: absolute; inset: 0; pointer-events:none; overflow:hidden; }
    .w-scanline::before { content:""; position:absolute; left:0; right:0; height: 40%;
      background: linear-gradient(180deg, transparent, var(--accent-bg,rgba(168,255,96,0.05)), transparent);
      animation: w-scan 6s linear infinite; }
    .w-divider { height: 1px; background: repeating-linear-gradient(90deg, ${W.line} 0 4px, transparent 4px 8px); }
    .w-ring { position: relative; }
    .w-ring::before { content:""; position:absolute; inset:-6px; border:1px dashed var(--accent-line, ${W.hair}); border-radius: inherit; pointer-events:none; }
    input.w-input, textarea.w-input { background: ${W.bgSunken}; border: 1px solid ${W.line}; color: ${W.text};
      font-family: ${W.sans}; font-size: 15px; padding: 12px 14px; border-radius: 2px; width: 100%; outline: none; transition: border-color .12s; }
    input.w-input:focus, textarea.w-input:focus { border-color: var(--accent); }
    ::selection { background: var(--accent); color: #0A0F0B; }
    .w-link { color: var(--accent); text-decoration: none; border-bottom: 1px dashed var(--accent-line, ${W.hair}); }
    .w-pulse { animation: w-pulse 1.6s ease-in-out infinite; }
    @keyframes w-pulse { 0%,100%{opacity:.4} 50%{opacity:1} }
    @keyframes w-fall { from { transform: translate(-50%, 0); } to { transform: translate(-50%, 520px); } }
    @keyframes w-pop  { 0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                       100% { transform: translate(-50%, -50%) scale(2.4); opacity: 0; } }
  `;
  document.head.appendChild(s);
})();

// ── useIsMobile hook (shared) ─────────────────────────────
function useIsMobile(bp = 768) {
  const [m, setM] = React.useState(typeof window !== "undefined" && window.innerWidth < bp);
  React.useEffect(() => {
    const onResize = () => setM(window.innerWidth < bp);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [bp]);
  return m;
}

Object.assign(window, { W, WITTIO_TWEAKS, accentPresets, useIsMobile });
