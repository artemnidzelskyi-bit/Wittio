// screens-mobile.jsx — Mobile variants using iOS frame

function MobileToday() {
  return (
    <IOSDevice dark={true} title={undefined}>
      <div style={{ background: W.bg, minHeight: "100%", paddingTop: 56, paddingBottom: 40 }}>
        <div style={{ padding: "16px 20px 12px" }}>
          <WittioLogo size={14}/>
        </div>
        <div style={{ padding: "0 20px 20px" }}>
          <div className="w-mono" style={{ fontSize: 10, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em" }}>tue · apr 21</div>
          <h1 className="w-serif" style={{ fontSize: 34, lineHeight: 1.05, margin: "6px 0 6px", fontWeight: 400 }}>
            Good morning,<br/><span style={{ color:"var(--accent)", fontStyle:"italic" }}>Alex</span>.
          </h1>
          <p style={{ color: W.muted, fontSize: 13, lineHeight: 1.5 }}>Today's session · 14 min · 4 blocks</p>
        </div>

        <div style={{ padding: "0 20px", display:"flex", flexDirection:"column", gap: 10 }}>
          {[
            { l:"Warm-up",     g:"Reaction time", d:"2m", done: true },
            { l:"Focus drill", g:"Memory grid",   d:"5m", done: true },
            { l:"Language",    g:"Word chains",   d:"4m", active: true },
            { l:"Cooldown",    g:"Pattern flow",  d:"3m" },
          ].map((b,i) => (
            <div key={i} style={{
              padding: 14,
              border: `1px solid ${b.active ? "var(--accent)" : W.line}`,
              background: b.active ? "var(--accent-bg)" : W.bgRaised,
              display:"flex", alignItems:"center", gap: 12,
              boxShadow: b.active ? "0 0 0 1px var(--accent)" : "none",
            }}>
              <div style={{
                width: 30, height: 30, border: `1px solid ${b.done ? "var(--accent)" : W.line}`,
                background: b.done ? "var(--accent-bg)" : "transparent",
                display:"flex", alignItems:"center", justifyContent:"center",
                color: b.done ? "var(--accent)" : W.muted,
                fontFamily: W.mono, fontSize: 11,
              }}>{b.done ? <Icons.check/> : String(i+1).padStart(2,"0")}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: b.done ? W.muted : W.text }}>{b.l}</div>
                <div className="w-mono" style={{ fontSize: 10.5, color: W.mutedDim, letterSpacing:"0.08em", textTransform:"uppercase", marginTop: 2 }}>{b.g} · {b.d}</div>
              </div>
              {b.active && <Icons.play style={{ color: "var(--accent)" }}/>}
            </div>
          ))}
        </div>

        <div style={{ padding: "20px" }}>
          <button className="w-btn w-btn-primary" style={{ width: "100%" }}>
            <Icons.play/> continue session
          </button>
        </div>

        <div style={{ padding: "0 20px" }}>
          <div style={{ border: `1px solid ${W.line}`, padding: 14, background: W.bgRaised }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 10 }}>
              <span className="w-mono" style={{ fontSize: 10, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em" }}>this week</span>
              <span className="w-mono" style={{ fontSize: 10, color:"var(--accent)" }}>5 / 7</span>
            </div>
            <div style={{ display:"flex", gap: 4 }}>
              {["M","T","W","T","F","S","S"].map((d,i) => {
                const done = i < 5;
                return (
                  <div key={i} style={{
                    flex: 1, height: 28, display:"flex", alignItems:"center", justifyContent:"center",
                    border: `1px solid ${done ? "var(--accent)" : W.line}`,
                    background: done ? "var(--accent)" : W.bgSunken,
                    color: done ? "#0A0F0B" : W.mutedDim,
                    fontFamily: W.mono, fontSize: 10,
                  }}>{d}</div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </IOSDevice>
  );
}

function MobileIQ() {
  return (
    <IOSDevice dark={true} title={undefined}>
      <div style={{ background: W.bg, minHeight: "100%", paddingTop: 50 }}>
        <div style={{ padding: "12px 20px", display:"flex", alignItems:"center", gap: 10, borderBottom: `1px solid ${W.line}` }}>
          <span className="w-mono" style={{ fontSize: 11, color: W.mutedDim }}>← back</span>
          <span style={{ flex: 1 }}/>
          <BlockProgress value={8} total={20} width={80}/>
          <span className="w-mono" style={{ fontSize: 11, color: "var(--accent)" }}>08/20</span>
        </div>

        <div style={{ padding: "20px" }}>
          <span className="w-chip" style={{ fontSize: 9 }}>section 01 · pattern</span>
          <h2 className="w-serif" style={{ fontSize: 24, lineHeight: 1.2, margin: "10px 0 16px", fontWeight: 400 }}>
            Which shape completes the pattern?
          </h2>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap: 4, background: W.line, padding: 1 }}>
            {Array.from({length:9}).map((_,i) => (
              <div key={i} style={{
                aspectRatio: "1", background: W.bgRaised,
                border: i === 8 ? `1px dashed var(--accent)` : "none",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                {i < 3 && <svg width="28" height="28" viewBox="0 0 40 40"><rect x="8" y="8" width="24" height="24" fill={W.text} transform={`rotate(${i*45} 20 20)`}/></svg>}
                {i >= 3 && i < 6 && <svg width="28" height="28" viewBox="0 0 40 40"><polygon points="20,6 6,32 34,32" fill={W.text} transform={`rotate(${(i-3)*45} 20 20)`}/></svg>}
                {i >= 6 && i < 8 && <svg width="28" height="28" viewBox="0 0 40 40"><circle cx="20" cy="20" r="12" fill={W.text}/></svg>}
                {i === 8 && <span className="w-mono" style={{ fontSize: 28, color: "var(--accent)" }}>?</span>}
              </div>
            ))}
          </div>

          <div className="w-mono" style={{ fontSize: 10, color: W.mutedDim, marginTop: 14, textTransform:"uppercase", letterSpacing:"0.12em" }}>choose one</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap: 8, marginTop: 8 }}>
            {["A","B","C","D"].map((l,i) => (
              <div key={l} style={{
                padding: 18, border: `1px solid ${i===1 ? "var(--accent)" : W.line}`,
                background: i===1 ? "var(--accent-bg)" : W.bgRaised,
                display:"flex", flexDirection:"column", alignItems:"center", gap: 6,
                position:"relative",
              }}>
                <span className="w-mono" style={{ position:"absolute", top: 6, left: 8, fontSize: 10, color: i===1 ? "var(--accent)" : W.mutedDim }}>{l}</span>
                <svg width="38" height="38" viewBox="0 0 40 40">
                  {i===0 && <circle cx="20" cy="20" r="12" fill={W.text}/>}
                  {i===1 && <circle cx="20" cy="20" r="12" fill="var(--accent)"/>}
                  {i===2 && <polygon points="20,6 6,32 34,32" fill={W.text}/>}
                  {i===3 && <rect x="8" y="8" width="24" height="24" fill={W.text}/>}
                </svg>
              </div>
            ))}
          </div>

          <button className="w-btn w-btn-primary" style={{ width: "100%", marginTop: 18 }}>
            next question <Icons.arrow/>
          </button>
        </div>
      </div>
    </IOSDevice>
  );
}

function MobileResults() {
  return (
    <IOSDevice dark={true} title={undefined}>
      <div style={{ background: W.bg, minHeight: "100%", paddingTop: 50, paddingBottom: 40 }}>
        <div style={{ padding: "16px 20px 12px", borderBottom: `1px solid ${W.line}` }}>
          <span className="w-mono" style={{ fontSize: 10, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em" }}>your iq · apr 21</span>
        </div>

        <div style={{
          padding: 24, margin: "20px", border: `1px solid var(--accent)`,
          background: W.bgRaised, position:"relative", overflow:"hidden",
          boxShadow: "0 0 60px -20px var(--accent-glow)",
        }}>
          <div className="w-scanline"/>
          <div className="w-mono" style={{ fontSize: 10, color: W.mutedDim, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom: 6 }}>
            score
          </div>
          <div style={{ display:"flex", alignItems:"baseline", gap: 10 }}>
            <span className="w-mono" style={{ fontSize: 84, color:"var(--accent)", lineHeight: 0.9, fontWeight: 500, letterSpacing:"-0.04em" }}>128</span>
            <span className="w-mono" style={{ fontSize: 14, color: W.muted }}>p97</span>
          </div>
          <div className="w-serif" style={{ fontSize: 22, lineHeight: 1.15, marginTop: 14 }}>
            You're in the <span style={{ fontStyle:"italic", color:"var(--accent)" }}>top 3%</span> of adults.
          </div>
        </div>

        <div style={{ padding: "0 20px" }}>
          <div className="w-mono" style={{ fontSize: 10, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em", marginBottom: 10 }}>
            breakdown
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap: 10 }}>
            {[
              { l:"pattern", v:132 },
              { l:"logic", v:128 },
              { l:"verbal", v:119 },
              { l:"spatial", v:134 },
            ].map(s => (
              <div key={s.l}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 13, textTransform:"capitalize" }}>{s.l}</span>
                  <span className="w-mono" style={{ fontSize: 12, color:"var(--accent)" }}>{s.v}</span>
                </div>
                <div style={{ height: 4, background: W.bgSunken, border: `1px solid ${W.line}` }}>
                  <div style={{ width: `${(s.v-70)/70*100}%`, height:"100%", background:"var(--accent)"}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: 20 }}>
          <button className="w-btn w-btn-primary" style={{ width:"100%" }}>
            build training plan <Icons.arrow/>
          </button>
        </div>
      </div>
    </IOSDevice>
  );
}

Object.assign(window, { MobileToday, MobileIQ, MobileResults });
