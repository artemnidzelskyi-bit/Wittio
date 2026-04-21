// primitives.jsx — shared Wittio UI atoms

// ── Logo ───────────────────────────────────────────────────
// A monogram: "w" constructed from 3 bars, like a signal/neural pulse.
function WittioMark({ size = 22, accent }) {
  const a = accent || "var(--accent)";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Wittio">
      <rect x="1.5" y="4" width="2.5" height="16" fill={a}/>
      <rect x="6.5" y="8" width="2.5" height="12" fill={a} opacity="0.75"/>
      <rect x="11.5" y="4" width="2.5" height="16" fill={a}/>
      <rect x="16.5" y="8" width="2.5" height="12" fill={a} opacity="0.75"/>
      <rect x="21"  y="11" width="2" height="9" fill={a} opacity="0.5"/>
    </svg>
  );
}

function WittioLogo({ size = 20, accent, text = "wittio" }) {
  const clicksRef = React.useRef({ count: 0, time: 0 });
  const onClick = () => {
    const now = Date.now();
    if (now - clicksRef.current.time > 1200) clicksRef.current.count = 0;
    clicksRef.current.count += 1;
    clicksRef.current.time = now;
    if (clicksRef.current.count >= 5) {
      clicksRef.current.count = 0;
      window.nav && window.nav("/games/sheesh");
    } else {
      window.nav && window.nav("/");
    }
  };
  return (
    <div onClick={onClick}
      style={{ display:"flex", alignItems:"center", gap: 10, cursor:"pointer" }}>
      <WittioMark size={size + 2} accent={accent}/>
      <span className="w-mono" style={{
        fontSize: size, fontWeight: 600, color: W.text, letterSpacing: "-0.01em",
        display:"flex", alignItems:"baseline", gap:2,
      }}>
        {text}
        <span style={{ color: accent || "var(--accent)", fontSize: size * 0.6, marginLeft: 2 }}>▌</span>
      </span>
    </div>
  );
}

// ── Terminal frame ─────────────────────────────────────────
function TerminalCard({ title = "session", status = "live", children, style = {}, accent }) {
  return (
    <div style={{
      background: W.bgRaised, border: `1px solid ${W.line}`, borderRadius: 3,
      overflow: "hidden", position: "relative", ...style,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
        borderBottom: `1px solid ${W.line}`, background: W.bgSunken,
        fontFamily: W.mono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: W.mutedDim,
      }}>
        <span style={{ display:"flex", gap:4 }}>
          <i style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF6B6B" }}/>
          <i style={{ width: 8, height: 8, borderRadius: "50%", background: W.amber }}/>
          <i style={{ width: 8, height: 8, borderRadius: "50%", background: accent || "var(--accent)" }}/>
        </span>
        <span style={{ marginLeft: 6 }}>~/{title}</span>
        <span style={{ flex:1 }}/>
        {status && (
          <span style={{ display:"inline-flex", alignItems:"center", gap:6, color: accent || "var(--accent)" }}>
            <span className="w-pulse" style={{ width:6, height:6, borderRadius:"50%", background:"currentColor"}}/>
            {status}
          </span>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

// ── Stat / metric ─────────────────────────────────────────
function Metric({ label, value, delta, unit, color }) {
  const up = delta && delta.toString().startsWith("+");
  return (
    <div style={{ borderLeft: `1px solid ${W.line}`, padding: "0 18px" }}>
      <div className="w-mono" style={{ fontSize: 10.5, letterSpacing:"0.14em", textTransform:"uppercase", color: W.mutedDim }}>{label}</div>
      <div style={{ display:"flex", alignItems:"baseline", gap: 6, marginTop: 6 }}>
        <span className="w-mono" style={{ fontSize: 34, fontWeight: 500, color: color || W.text, letterSpacing:"-0.02em" }}>{value}</span>
        {unit && <span className="w-mono" style={{ fontSize: 13, color: W.muted }}>{unit}</span>}
      </div>
      {delta !== undefined && (
        <div className="w-mono" style={{ fontSize: 11, color: up ? "var(--accent)" : W.coral, marginTop: 2 }}>
          {up ? "▲" : "▼"} {delta}
        </div>
      )}
    </div>
  );
}

// ── Progress bar (blocky terminal style) ─────────────────
function BlockProgress({ value, total = 20, width = 200, height = 8 }) {
  const pct = Math.max(0, Math.min(1, value / total));
  return (
    <div style={{ width, height, background: W.bgSunken, border: `1px solid ${W.line}`, position: "relative", borderRadius: 1 }}>
      <div style={{ position:"absolute", inset: 0, width: `${pct*100}%`, background: "var(--accent)", transition:"width .3s" }}/>
    </div>
  );
}

// ── Small icon set ───────────────────────────────────────
const Icons = {
  arrow: (p={}) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  check: (p={}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M2 7.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  play: (p={}) => <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" {...p}><path d="M2 1.5v9l8-4.5z"/></svg>,
  brain: (p={}) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M5 2.5a1.8 1.8 0 011.8-1.8 1.8 1.8 0 011.8 1.8v11a1.8 1.8 0 01-1.8 1.8 1.8 1.8 0 01-1.8-1.8M5 3.5A2.5 2.5 0 002.5 6a2 2 0 00-1 3.5A2 2 0 003 13a2 2 0 002 1.5M11 2.5a1.8 1.8 0 00-1.8-1.8 1.8 1.8 0 00-1.8 1.8v11a1.8 1.8 0 001.8 1.8 1.8 1.8 0 001.8-1.8M11 3.5A2.5 2.5 0 0113.5 6a2 2 0 011 3.5A2 2 0 0113 13a2 2 0 01-2 1.5" stroke="currentColor" strokeWidth="1.2"/></svg>,
  flame: (p={}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" {...p}><path d="M7 0.5c1 2 3 3 3 5.5a3 3 0 01-6 0c0-1 .5-1.5 1-2-.2 1.5.5 2 1 2-.5-2 1-3 1-5.5zM7 7c.7.7 2 1.3 2 3a2 2 0 01-4 0c0-.7.3-1.3.7-1.7.1.8.8 1.2 1.3 1.2-.3-1 0-2 0-2.5z"/></svg>,
  lock: (p={}) => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...p}><rect x="2" y="5" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/><path d="M4 5V3.5a2 2 0 014 0V5" stroke="currentColor" strokeWidth="1.2"/></svg>,
  clock: (p={}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M7 3.5V7l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  target: (p={}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="7" r="0.8" fill="currentColor"/></svg>,
  dot: (p={}) => <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" {...p}><circle cx="4" cy="4" r="3"/></svg>,
  trend: (p={}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M1 10l4-4 3 3 5-5m0 0v3m0-3h-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

// ── ASCII brain (logo-scale decorative art) ───────────────
function AsciiBrain({ color }) {
  const art =
`     .-""""""-.
   .'  .-~~-.  '.
  /  .' // \\ '.  \\
 |  /  //o  o\\\\  \\  |
 | |  | \\\\__// |  | |
 |  \\  '.~~~~.'  /  |
   '.  '-..-'  .'
     '-.....-'`;
  return (
    <pre className="w-mono" style={{
      color: color || W.mutedDim, fontSize: 11, lineHeight: 1.1, margin: 0, userSelect:"none",
    }}>{art}</pre>
  );
}

Object.assign(window, { WittioMark, WittioLogo, TerminalCard, Metric, BlockProgress, Icons, AsciiBrain });
