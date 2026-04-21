// screens-training-profile.jsx — Training plan, daily session, Profile/progress, Games

// ══════════════════════════════════════════════════════════
// APP CHROME — Sidebar + Header for logged-in areas
// ══════════════════════════════════════════════════════════
function AppShell({ active = "today", children }) {
  const isMobile = useIsMobile();
  const nav = [
    { id:"today",    label:"Today",      icon: "◎", route: "/today" },
    { id:"train",    label:"Training",   icon: "◇", route: "/training" },
    { id:"tests",    label:"Tests",      icon: "∑", route: "/iq" },
    { id:"games",    label:"Games",      icon: "▶", route: "/games/memory" },
    { id:"library",  label:"Library",    icon: "≡", route: "/library" },
    { id:"profile",  label:"Profile",    icon: "◉", route: "/profile" },
  ];

  if (isMobile) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", background: W.bg }}>
        <header style={{
          display:"flex", alignItems:"center", gap: 8, padding: "12px 16px",
          borderBottom: `1px solid ${W.line}`, background: W.bgSunken,
          position: "sticky", top: 0, zIndex: 20,
        }}>
          <WittioLogo size={14}/>
        </header>
        <nav style={{
          display:"flex", gap: 4, padding: "8px 12px", overflowX: "auto",
          borderBottom: `1px solid ${W.line}`, background: W.bgSunken,
        }}>
          {nav.map(n => {
            const on = n.id === active;
            return (
              <div key={n.id} onClick={() => window.nav && window.nav(n.route)} style={{
                display:"flex", alignItems:"center", gap: 6, padding: "6px 10px",
                borderBottom: `2px solid ${on ? "var(--accent)" : "transparent"}`,
                color: on ? W.text : W.muted, fontSize: 13, cursor:"pointer",
                flexShrink: 0, fontFamily: W.sans,
              }}>
                <span className="w-mono" style={{ fontSize: 12, color: on ? "var(--accent)" : W.mutedDim }}>{n.icon}</span>
                <span>{n.label}</span>
              </div>
            );
          })}
        </nav>
        <main style={{ flex: 1, overflow:"auto" }}>{children}</main>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"220px 1fr", background: W.bg }}>
      <aside style={{
        borderRight: `1px solid ${W.line}`, background: W.bgSunken, padding: "20px 14px",
        display:"flex", flexDirection:"column", gap: 4,
      }}>
        <div style={{ padding: "8px 10px 20px" }}>
          <WittioLogo size={16}/>
        </div>
        <div className="w-mono" style={{ fontSize: 10, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em", padding: "10px 12px 6px" }}>workspace</div>
        {nav.map(n => {
          const on = n.id === active;
          return (
            <div key={n.id} onClick={() => window.nav && window.nav(n.route)} style={{
              display:"flex", alignItems:"center", gap: 10, padding: "9px 12px",
              borderLeft: `2px solid ${on ? "var(--accent)" : "transparent"}`,
              background: on ? W.bgRaised : "transparent",
              color: on ? W.text : W.muted, fontSize: 14, cursor:"pointer", transition:"all .12s",
            }}>
              <span className="w-mono" style={{ fontSize: 13, color: on ? "var(--accent)" : W.mutedDim, width: 16 }}>{n.icon}</span>
              <span>{n.label}</span>
              {n.id === "tests" && <span className="w-chip" style={{ marginLeft:"auto", fontSize: 9, padding: "2px 5px" }}>3 new</span>}
            </div>
          );
        })}
        <div style={{ flex: 1 }}/>
        <div style={{ padding: 12, border: `1px solid ${W.line}`, borderRadius: 2, background: W.bgRaised, marginTop: 14 }}>
          <div style={{ display:"flex", alignItems:"center", gap: 8, marginBottom: 6 }}>
            <Icons.flame style={{ color: W.amber }}/>
            <span className="w-mono" style={{ fontSize: 11, color: W.amber, textTransform:"uppercase", letterSpacing:"0.1em" }}>streak</span>
          </div>
          <div className="w-mono" style={{ fontSize: 28, color: W.text }}>14<span style={{ fontSize: 14, color: W.muted, marginLeft: 4 }}>days</span></div>
          <div style={{ fontSize: 11, color: W.muted, marginTop: 4 }}>Next session unlocks at 00:00</div>
        </div>
      </aside>
      <main style={{ overflow:"auto" }}>{children}</main>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// TODAY — Daily training session launcher
// ══════════════════════════════════════════════════════════
function Today() {
  const isMobile = useIsMobile();
  const blocks = [
    { id:"warm",  label:"Warm-up",        game:"Reaction time",  duration:"2m", difficulty:"easy",     done: true },
    { id:"core1", label:"Focus drill",    game:"Memory grid",    duration:"5m", difficulty:"adaptive", done: true },
    { id:"core2", label:"Language",       game:"Word chains",    duration:"4m", difficulty:"adaptive", done: false, active: true },
    { id:"cool",  label:"Cooldown",       game:"Pattern flow",   duration:"3m", difficulty:"easy",     done: false },
  ];
  return (
    <div style={{ padding: isMobile ? "20px 16px 40px" : "32px 48px 48px", maxWidth: 1200, width: "100%" }}>
      <header style={{ display:"flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 20 : 0, justifyContent:"space-between", alignItems: isMobile ? "flex-start" : "flex-start", marginBottom: isMobile ? 24 : 32 }}>
        <div>
          <span className="w-mono" style={{ fontSize: 11, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em" }}>tue · apr 21</span>
          <h1 className="w-serif" style={{ fontSize: isMobile ? 34 : 52, lineHeight: 1.0, fontWeight: 400, margin: "4px 0 6px", letterSpacing:"-0.02em" }}>
            Good morning, <span style={{ color:"var(--accent)", fontStyle:"italic" }}>Alex</span>.
          </h1>
          <p style={{ color: W.muted, fontSize: 15.5, maxWidth: 540 }}>
            Today's session is tuned to yesterday's results. Estimated 14 minutes. You've got this.
          </p>
        </div>
        <div style={{ display:"flex", gap: isMobile ? 8 : 24, alignItems:"flex-start", flexWrap: "wrap" }}>
          <Metric label="streak"  value="14" unit="d" delta="+1" color={W.amber}/>
          <Metric label="avg iq"  value="128"            delta="+3"/>
          <Metric label="focus"   value="82" unit="%"    delta="+5"/>
        </div>
      </header>

      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr", gap: 24 }}>
        {/* Main session */}
        <TerminalCard title="session/today.plan" accent="var(--accent)">
          <div style={{ padding: 28 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 18 }}>
              <span className="w-mono" style={{ color: W.muted, fontSize: 12, textTransform:"uppercase", letterSpacing:"0.12em" }}>
                session · 4 blocks · adaptive
              </span>
              <span className="w-mono" style={{ color: "var(--accent)", fontSize: 12 }}>2/4 complete</span>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap: 10 }}>
              {blocks.map((b, i) => {
                const active = b.active;
                return (
                  <div key={b.id} style={{
                    display:"grid", gridTemplateColumns:"48px 1fr auto auto", gap: 16, alignItems:"center",
                    padding: "14px 16px",
                    border: `1px solid ${active ? "var(--accent)" : W.line}`,
                    background: active ? "var(--accent-bg)" : (b.done ? W.bgSunken : W.bgRaised),
                    position:"relative",
                    boxShadow: active ? "0 0 0 1px var(--accent), 0 0 32px -8px var(--accent-glow)" : "none",
                  }}>
                    <div style={{
                      width: 36, height: 36, border: `1px solid ${b.done ? "var(--accent)" : W.line}`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color: b.done ? "var(--accent)" : (active ? "var(--accent)" : W.muted),
                      background: b.done ? "var(--accent-bg)" : "transparent",
                      fontFamily: W.mono, fontSize: 13,
                    }}>
                      {b.done ? <Icons.check/> : String(i+1).padStart(2,"0")}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: b.done ? W.muted : W.text, textDecoration: b.done ? "line-through" : "none" }}>
                        {b.label} — <span style={{ color: W.muted, fontWeight: 400 }}>{b.game}</span>
                      </div>
                      <div className="w-mono" style={{ fontSize: 11, color: W.mutedDim, marginTop: 3, textTransform:"uppercase", letterSpacing:"0.08em" }}>
                        {b.duration} · {b.difficulty}
                      </div>
                    </div>
                    <div>
                      <BlockProgress value={b.done ? 20 : (active ? 8 : 0)} total={20} width={90}/>
                    </div>
                    {active ? (
                      <button className="w-btn w-btn-primary" onClick={() => window.nav && window.nav("/games/words")} style={{ height: 36, padding: "0 14px" }}>
                        <Icons.play/> resume
                      </button>
                    ) : b.done ? (
                      <span className="w-mono" style={{ fontSize: 11, color:"var(--accent)", letterSpacing:"0.08em" }}>+24 xp</span>
                    ) : (
                      <span className="w-mono" style={{ fontSize: 11, color: W.mutedDim }}>queued</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="w-divider" style={{ margin: "24px 0 18px" }}/>
            <div style={{ display:"flex", gap: 12, alignItems:"center" }}>
              <button className="w-btn w-btn-primary" onClick={() => window.nav && window.nav("/games/words")} style={{ flex: 1 }}>
                <Icons.play/> continue session
              </button>
              <button className="w-btn w-btn-ghost">shuffle plan</button>
            </div>
          </div>
        </TerminalCard>

        {/* Side column */}
        <div style={{ display:"flex", flexDirection:"column", gap: 20 }}>
          <div style={{ border: `1px solid ${W.line}`, background: W.bgRaised, padding: 20 }}>
            <div className="w-mono" style={{ fontSize: 11, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em", marginBottom: 10 }}>
              today's focus
            </div>
            <div style={{ fontSize: 22, fontFamily: W.serif, lineHeight: 1.2, marginBottom: 8 }}>
              Working memory, with a language assist.
            </div>
            <p style={{ color: W.muted, fontSize: 13, lineHeight: 1.5 }}>
              Your verbal subscore has the most headroom. Today's mid-block swaps a math drill for Word Chains.
            </p>
          </div>

          <div style={{ border: `1px solid ${W.line}`, background: W.bgSunken, padding: 20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 14 }}>
              <span className="w-mono" style={{ fontSize: 11, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em" }}>this week</span>
              <span className="w-mono" style={{ fontSize: 11, color:"var(--accent)" }}>5 / 7 days</span>
            </div>
            <div style={{ display:"flex", gap: 6 }}>
              {["M","T","W","T","F","S","S"].map((d,i) => {
                const done = i < 5;
                const today = i === 1;
                return (
                  <div key={i} style={{ flex: 1, textAlign:"center" }}>
                    <div className="w-mono" style={{ fontSize: 10, color: W.mutedDim, marginBottom: 6 }}>{d}</div>
                    <div style={{
                      height: 36, border: `1px solid ${today ? "var(--accent)" : W.line}`,
                      background: done ? "var(--accent)" : (today ? "var(--accent-bg)" : W.bgRaised),
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color: done ? "#0A0F0B" : "var(--accent)",
                    }}>
                      {done && <Icons.check/>}
                      {today && !done && <Icons.dot/>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ border: `1px solid ${W.line}`, padding: 20, background: W.bgRaised }}>
            <div className="w-mono" style={{ fontSize: 11, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em", marginBottom: 12 }}>
              read next · 3 min
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.35, marginBottom: 6, fontWeight: 500 }}>
              The 12-minute rule of neuroplasticity
            </div>
            <p style={{ color: W.muted, fontSize: 13, lineHeight: 1.5, marginBottom: 14 }}>
              Why short, focused bursts outperform marathon sessions.
            </p>
            <span className="w-link" style={{ fontSize: 13 }}>read article →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// PROFILE — progress / stats
// ══════════════════════════════════════════════════════════
function Profile() {
  const isMobile = useIsMobile();
  const skills = [
    { label:"Memory",     value: 86, delta:"+12", color:"var(--accent)" },
    { label:"Focus",      value: 74, delta:"+8",  color: W.cyan },
    { label:"Logic",      value: 91, delta:"+4",  color: W.amber },
    { label:"Language",   value: 62, delta:"+18", color: W.coral },
    { label:"Reaction",   value: 79, delta:"+6",  color: "var(--accent)" },
    { label:"Spatial",    value: 94, delta:"+2",  color: W.cyan },
  ];

  // trajectory data (14 days of scores)
  const traj = [102,105,108,107,112,115,114,118,120,119,124,126,125,128];
  const maxT = 135, minT = 95;
  const tW = 640, tH = 180;
  const tx = (i) => (i/(traj.length-1)) * tW;
  const ty = (v) => tH - ((v - minT)/(maxT - minT)) * (tH - 20);

  return (
    <div style={{ padding: isMobile ? "20px 16px 40px" : "32px 48px 48px", maxWidth: 1200, width: "100%" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap: isMobile ? 14 : 24, marginBottom: isMobile ? 20 : 32, flexWrap: "wrap" }}>
        <div style={{
          width: 96, height: 96, border: `1px solid var(--accent)`, background: W.bgRaised,
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow: "0 0 0 1px var(--accent), 0 0 40px -10px var(--accent-glow)",
          position:"relative",
        }}>
          <span className="w-serif" style={{ fontSize: 48, color:"var(--accent)" }}>A</span>
          <span className="w-mono" style={{ position:"absolute", bottom: -8, right: -8, fontSize: 10, background: W.bg, padding: "2px 6px", border: `1px solid ${W.line}`, color: W.amber }}>
            lv.07
          </span>
        </div>
        <div style={{ flex: 1 }}>
          <h1 className="w-serif" style={{ fontSize: 42, margin: 0, fontWeight: 400 }}>Alex Morgan</h1>
          <div className="w-mono" style={{ fontSize: 12, color: W.muted, marginTop: 4, letterSpacing:"0.06em" }}>
            @alex · joined feb 2026 · <span style={{color:"var(--accent)"}}>pro member</span>
          </div>
          <div style={{ display:"flex", gap: 8, marginTop: 12 }}>
            <span className="w-chip w-chip-accent"><Icons.brain/> top 3%</span>
            <span className="w-chip"><Icons.flame style={{color:W.amber}}/> 14-day streak</span>
            <span className="w-chip"><Icons.target/> pattern-type</span>
          </div>
        </div>
        <button className="w-btn w-btn-ghost">share profile</button>
      </div>

      {/* Stat strip */}
      <div style={{
        display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 1,
        background: W.line, border: `1px solid ${W.line}`, marginBottom: 32,
      }}>
        {[
          { k:"iq score",       v:"128", d:"+12 vs. baseline", color: "var(--accent)" },
          { k:"sessions",       v:"86",  d:"23.4 hours total" },
          { k:"games played",   v:"412", d:"avg 4.8 / session" },
          { k:"xp",             v:"9,240", d:"next level: 760 xp" },
        ].map((x,i) => (
          <div key={x.k} style={{ background: W.bgRaised, padding: "18px 22px" }}>
            <div className="w-mono" style={{ fontSize: 10.5, color: W.mutedDim, letterSpacing:"0.14em", textTransform:"uppercase" }}>{x.k}</div>
            <div className="w-mono" style={{ fontSize: 36, color: x.color || W.text, marginTop: 4, letterSpacing:"-0.02em" }}>{x.v}</div>
            <div style={{ fontSize: 11.5, color: W.muted, marginTop: 4 }}>{x.d}</div>
          </div>
        ))}
      </div>

      {/* Trajectory */}
      <TerminalCard title="trajectory.14d" accent="var(--accent)" style={{ marginBottom: 32 }}>
        <div style={{ padding: "24px 32px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 12 }}>
            <span className="w-mono" style={{ fontSize: 13 }}>iq trajectory · last 14 days</span>
            <span className="w-mono" style={{ fontSize: 12, color:"var(--accent)" }}>
              <Icons.trend/> +26 pts
            </span>
          </div>
          <svg viewBox={`0 -10 ${tW} ${tH + 30}`} style={{ width: "100%", height: "auto" }}>
            {/* grid */}
            {[100,110,120,130].map(v => (
              <g key={v}>
                <line x1="0" x2={tW} y1={ty(v)} y2={ty(v)} stroke={W.line} strokeDasharray="2 4"/>
                <text x="0" y={ty(v)-4} fontFamily={W.mono} fontSize="10" fill={W.mutedDim}>{v}</text>
              </g>
            ))}
            {/* fill */}
            <path d={`M 0,${tH} ${traj.map((v,i) => `L ${tx(i)},${ty(v)}`).join(" ")} L ${tW},${tH} Z`} fill="var(--accent-bg)"/>
            {/* line */}
            <path d={`M ${traj.map((v,i) => `${tx(i)},${ty(v)}`).join(" L ")}`} fill="none" stroke="var(--accent)" strokeWidth="2"/>
            {/* points */}
            {traj.map((v,i) => (
              <circle key={i} cx={tx(i)} cy={ty(v)} r="3" fill={i === traj.length-1 ? "var(--accent)" : W.bg} stroke="var(--accent)" strokeWidth="1.5"/>
            ))}
            {/* latest label */}
            <g transform={`translate(${tx(traj.length-1) - 40}, ${ty(traj[traj.length-1]) - 24})`}>
              <rect width="52" height="18" fill={W.bgRaised} stroke="var(--accent)"/>
              <text x="26" y="12" fontFamily={W.mono} fontSize="11" fill="var(--accent)" textAnchor="middle">today 128</text>
            </g>
          </svg>
        </div>
      </TerminalCard>

      {/* Skills radar + achievements */}
      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr", gap: 24 }}>
        <div style={{ border: `1px solid ${W.line}`, background: W.bgRaised, padding: 24 }}>
          <div className="w-mono" style={{ fontSize: 11, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em", marginBottom: 18 }}>
            cognitive skills
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap: 16 }}>
            {skills.map(s => (
              <div key={s.label}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13.5 }}>{s.label}</span>
                  <span className="w-mono" style={{ fontSize: 12, color: s.color }}>
                    {s.value} <span style={{ color: W.mutedDim }}>{s.delta}</span>
                  </span>
                </div>
                <div style={{ height: 5, background: W.bgSunken, border: `1px solid ${W.line}` }}>
                  <div style={{ width: `${s.value}%`, height: "100%", background: s.color }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ border: `1px solid ${W.line}`, background: W.bgRaised, padding: 24 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 16 }}>
            <span className="w-mono" style={{ fontSize: 11, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em" }}>
              badges
            </span>
            <span className="w-mono" style={{ fontSize: 11, color: W.muted }}>12 / 34</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 10 }}>
            {[
              { e:"◆", n:"First 100", got: true },
              { e:"◎", n:"Streak 7",  got: true },
              { e:"✦", n:"Top 10%",   got: true },
              { e:"⚡", n:"Speed run", got: true },
              { e:"∞", n:"Streak 30", got: false },
              { e:"◉", n:"Polyglot",  got: false },
              { e:"▲", n:"IQ 140",    got: false },
              { e:"♦", n:"All-round", got: false },
            ].map((b,i) => (
              <div key={i} style={{
                aspectRatio: "1", border: `1px solid ${b.got ? "var(--accent)" : W.line}`,
                background: b.got ? W.bgSunken : W.bg,
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap: 4,
                opacity: b.got ? 1 : 0.4, position:"relative",
              }}>
                <span className="w-mono" style={{ fontSize: 22, color: b.got ? "var(--accent)" : W.mutedDim }}>{b.e}</span>
                <span className="w-mono" style={{ fontSize: 9, color: W.muted, textTransform:"uppercase", letterSpacing:"0.06em" }}>{b.n}</span>
                {!b.got && <span style={{ position:"absolute", top: 4, right: 4, color: W.mutedDim }}><Icons.lock/></span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// GAMES — three playable mocks
// ══════════════════════════════════════════════════════════

// --- Memory grid (Simon-style) — playable ---
function GameMemoryGrid() {
  const GRID = 16;
  const cellSize = 76;
  const [round, setRound] = React.useState(1);
  const [score, setScore] = React.useState(0);
  const [sequence, setSequence] = React.useState([]);
  const [userStep, setUserStep] = React.useState(0);
  const [phase, setPhase] = React.useState("idle"); // idle | showing | input | correct | over
  const [flash, setFlash] = React.useState(-1); // index currently lit
  const [message, setMessage] = React.useState("press start to begin");

  const buildRound = React.useCallback((r) => {
    const len = r + 2;
    const seq = [];
    for (let i = 0; i < len; i++) seq.push(Math.floor(Math.random() * GRID));
    return seq;
  }, []);

  const playSequence = React.useCallback(async (seq) => {
    setPhase("showing");
    setMessage(`watch carefully · ${seq.length} tiles`);
    await new Promise(r => setTimeout(r, 600));
    for (let i = 0; i < seq.length; i++) {
      setFlash(seq[i]);
      await new Promise(r => setTimeout(r, 420));
      setFlash(-1);
      await new Promise(r => setTimeout(r, 180));
    }
    setPhase("input");
    setUserStep(0);
    setMessage("now repeat the sequence");
  }, []);

  const start = () => {
    const seq = buildRound(1);
    setRound(1); setScore(0); setSequence(seq);
    playSequence(seq);
  };
  const nextRound = () => {
    const r = round + 1;
    const seq = buildRound(r);
    setRound(r); setSequence(seq);
    playSequence(seq);
  };

  const clickCell = (i) => {
    if (phase !== "input") return;
    if (sequence[userStep] === i) {
      setFlash(i); setTimeout(() => setFlash(-1), 160);
      if (userStep + 1 >= sequence.length) {
        const roundScore = sequence.length * 20;
        setScore(s => s + roundScore);
        setPhase("correct");
        setMessage(`+${roundScore} — round ${round} cleared`);
        setTimeout(nextRound, 900);
      } else {
        setUserStep(s => s + 1);
      }
    } else {
      setPhase("over");
      setMessage(`wrong tile · final score ${score}`);
      setFlash(sequence[userStep]);
      setTimeout(() => setFlash(-1), 600);
    }
  };

  const canClick = phase === "input";

  return (
    <GameShell title="memory grid" round={`${String(round).padStart(2,"0")} / ∞`} score={score} streak={round - 1}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap: 24 }}>
        <div style={{
          display:"grid", gridTemplateColumns:`repeat(4, ${cellSize}px)`, gridTemplateRows:`repeat(4, ${cellSize}px)`,
          gap: 6, padding: 10, background: W.bgSunken, border: `1px solid ${W.line}`,
        }}>
          {Array.from({length: GRID}, (_,i) => {
            const on = flash === i;
            return (
              <div key={i} onClick={() => clickCell(i)} style={{
                background: on ? "var(--accent)" : W.bgRaised,
                border: `1px solid ${on ? "var(--accent)" : W.line}`,
                boxShadow: on ? "0 0 24px -4px var(--accent-glow), inset 0 0 0 1px rgba(255,255,255,0.2)" : "none",
                transition: "all .12s",
                cursor: canClick ? "pointer" : "default",
                opacity: phase === "over" ? 0.5 : 1,
              }}/>
            );
          })}
        </div>
        <div className="w-mono" style={{ fontSize: 14, color: W.muted, letterSpacing:"0.06em", minHeight: 22 }}>
          <span style={{color:"var(--accent)"}}>●</span> {message}
        </div>
        <BlockProgress value={userStep} total={sequence.length || 1} width={300}/>
        <div style={{ display:"flex", gap: 10 }}>
          {phase === "idle" && <button className="w-btn w-btn-primary" onClick={start}><Icons.play/> start</button>}
          {phase === "over" && <button className="w-btn w-btn-primary" onClick={start}><Icons.play/> play again</button>}
          {phase === "over" && <button className="w-btn w-btn-ghost" onClick={() => window.nav && window.nav("/today")}>exit to today</button>}
        </div>
      </div>
    </GameShell>
  );
}

// --- Reaction time — playable ---
function GameReactionTime() {
  const TRIALS = 5;
  const [phase, setPhase] = React.useState("idle");   // idle | waiting | go | tooearly | done
  const [trials, setTrials] = React.useState([]);      // ms per trial
  const [last, setLast] = React.useState(null);
  const startTimeRef = React.useRef(0);
  const timerRef = React.useRef(null);

  const begin = () => {
    setTrials([]); setLast(null); nextTrial();
  };
  const nextTrial = () => {
    setPhase("waiting");
    const delay = 1000 + Math.random() * 2500;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      startTimeRef.current = performance.now();
      setPhase("go");
    }, delay);
  };
  const onPadClick = () => {
    if (phase === "idle" || phase === "done") { begin(); return; }
    if (phase === "waiting") {
      clearTimeout(timerRef.current);
      setPhase("tooearly");
      return;
    }
    if (phase === "tooearly") {
      nextTrial(); return;
    }
    if (phase === "go") {
      const ms = Math.round(performance.now() - startTimeRef.current);
      const newTrials = [...trials, ms];
      setTrials(newTrials); setLast(ms);
      if (newTrials.length >= TRIALS) {
        setPhase("done");
      } else {
        setPhase("result");
        setTimeout(nextTrial, 800);
      }
    }
  };
  React.useEffect(() => () => clearTimeout(timerRef.current), []);

  const best = trials.length ? Math.min(...trials) : null;
  const avg  = trials.length ? Math.round(trials.reduce((a,b)=>a+b,0)/trials.length) : null;

  // Pad look by phase
  const padStyle = {
    position:"relative", width: "100%", maxWidth: 560, aspectRatio: "16/10",
    display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap: 16,
    cursor: "pointer", userSelect: "none", transition: "background .1s",
    border: `1px solid ${W.line}`,
  };
  let padBg = W.bgRaised, padBorder = W.line, padText = W.text, headline = "", sub = "";
  if (phase === "idle")     { headline = "TAP TO START"; sub = `${trials.length}/${TRIALS} trials complete`; }
  if (phase === "waiting")  { padBg = W.bgSunken; padBorder = W.coral; padText = W.coral; headline = "WAIT…"; sub = "tap the moment it turns green"; }
  if (phase === "go")       { padBg = "var(--accent)"; padBorder = "var(--accent)"; padText = "#0A0F0B"; headline = "TAP!"; sub = "now"; }
  if (phase === "result")   { padBg = W.bgSunken; padBorder = "var(--accent)"; padText = "var(--accent)"; headline = `${last}ms`; sub = `trial ${trials.length}/${TRIALS} — next starting…`; }
  if (phase === "tooearly") { padBg = W.bgRaised; padBorder = W.coral; padText = W.coral; headline = "TOO EARLY"; sub = "tap to retry"; }
  if (phase === "done")     { padBg = W.bgSunken; padBorder = "var(--accent)"; padText = "var(--accent)"; headline = `AVG ${avg}ms`; sub = "tap to play again"; }

  return (
    <GameShell title="reaction time" round={`${trials.length} / ${TRIALS}`} score={last ?? 0} streak={trials.length}>
      <div onClick={onPadClick} style={{ ...padStyle, background: padBg, borderColor: padBorder,
           boxShadow: phase === "go" ? "0 0 60px -10px var(--accent-glow)" : "none" }}>
        <div className="w-mono" style={{ fontSize: 72, color: padText, fontWeight: 500, letterSpacing:"-0.04em" }}>
          {headline}
        </div>
        <div className="w-mono" style={{ fontSize: 13, color: phase === "go" ? "rgba(10,15,11,0.7)" : W.muted, textTransform:"uppercase", letterSpacing:"0.16em" }}>
          {sub}
        </div>
      </div>
      <div style={{ display:"flex", gap: 24, marginTop: 28 }}>
        {[
          { l:"last",  v: last ?? "—" },
          { l:"best",  v: best ?? "—" },
          { l:"avg",   v: avg  ?? "—" },
        ].map(x => (
          <div key={x.l} style={{ textAlign:"center" }}>
            <div className="w-mono" style={{ fontSize: 10, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.12em" }}>{x.l}</div>
            <div className="w-mono" style={{ fontSize: 24, color: W.text, marginTop: 2 }}>
              {x.v}{typeof x.v === "number" && <span style={{ fontSize: 12, color: W.muted, marginLeft: 3 }}>ms</span>}
            </div>
          </div>
        ))}
      </div>
      {phase === "done" && (
        <div style={{ marginTop: 20, display:"flex", gap: 10 }}>
          <button className="w-btn w-btn-ghost" onClick={() => window.nav && window.nav("/today")}>exit to today</button>
        </div>
      )}
    </GameShell>
  );
}

// --- Word chains — playable ---
function GameWordChains() {
  // Chain: COLD → CORD → CARD → CART → WART → WARM (each changes one letter)
  const CHAIN = ["COLD", "CORD", "CARD", "CART", "WART", "WARM"];
  const STEP_OPTIONS = [
    ["CORD", "GOLD", "COLT", "BOLD"],
    ["CARD", "CORE", "FORD", "WORD"],
    ["CART", "CARE", "HARD", "CORD"],
    ["WART", "PART", "DART", "CARE"],
    ["WARM", "WARN", "WARD", "WARS"],
  ];
  const [progress, setProgress] = React.useState(1);  // how many words in CHAIN are "done" (1 = just COLD)
  const [wrong, setWrong] = React.useState(null);
  const [score, setScore] = React.useState(0);

  const done = progress >= CHAIN.length;
  const stepIdx = progress - 1; // which options set to show
  const options = done ? [] : STEP_OPTIONS[stepIdx];
  const correct = done ? null : CHAIN[progress];

  const pick = (word) => {
    if (done) return;
    if (word === correct) {
      setScore(s => s + 100);
      setProgress(p => p + 1);
      setWrong(null);
    } else {
      setScore(s => Math.max(0, s - 20));
      setWrong(word);
      setTimeout(() => setWrong(w => (w === word ? null : w)), 900);
    }
  };

  const restart = () => { setProgress(1); setWrong(null); setScore(0); };

  return (
    <GameShell title="word chains" round={`${Math.min(progress, CHAIN.length)} / ${CHAIN.length}`} score={score} streak={progress - 1}>
      <div style={{ width: "100%", maxWidth: 720, display:"flex", flexDirection:"column", gap: 20, alignItems:"center" }}>
        <div className="w-mono" style={{ fontSize: 12, color: W.muted, textTransform:"uppercase", letterSpacing:"0.12em", textAlign:"center" }}>
          change one letter at a time · reach WARM
        </div>

        <div style={{ display:"flex", alignItems:"center", gap: 10, flexWrap:"wrap", justifyContent:"center" }}>
          {CHAIN.map((w, i) => {
            const isDone = i < progress;
            const isActive = i === progress && !done;
            const isTarget = i === CHAIN.length - 1 && !isDone;
            return (
              <React.Fragment key={i}>
                {i > 0 && <span className="w-mono" style={{ color: W.mutedDim, fontSize: 18 }}>→</span>}
                <div style={{
                  width: 86, height: 64,
                  border: `1px solid ${isDone ? "var(--accent)" : (isActive ? "var(--accent)" : isTarget ? W.amber : W.line)}`,
                  background: isActive ? "var(--accent-bg)" : (isTarget ? "rgba(255,196,107,0.08)" : W.bgRaised),
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontFamily: W.mono, fontSize: 22, letterSpacing: "0.12em",
                  color: isDone ? "var(--accent)" : (isTarget ? W.amber : (isActive ? W.mutedDim : W.muted)),
                  boxShadow: isActive ? "0 0 0 1px var(--accent), 0 0 20px -5px var(--accent-glow)" : "none",
                  position:"relative",
                }}>
                  {isDone ? w : isActive ? "?" : isTarget ? w : "?"}
                  {isTarget && <span className="w-mono" style={{ position:"absolute", top: -16, right: -4, fontSize: 9, color: W.amber, textTransform:"uppercase", letterSpacing:"0.1em" }}>target</span>}
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {!done ? (
          <div style={{ width:"100%", background: W.bgSunken, border: `1px solid ${W.line}`, padding: 16, marginTop: 8 }}>
            <div className="w-mono" style={{ fontSize: 11, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom: 10 }}>
              pick the next word — one letter change from <span style={{color:"var(--accent)"}}>{CHAIN[progress-1]}</span>
            </div>
            <div style={{ display:"flex", gap: 10, flexWrap:"wrap" }}>
              {options.map(w => {
                const isWrong = wrong === w;
                return (
                  <button key={w} onClick={() => pick(w)}
                    className="w-btn"
                    style={{
                      height: 40, padding: "0 18px", fontSize: 13, letterSpacing:"0.12em",
                      background: isWrong ? "rgba(255,107,107,0.15)" : W.bgRaised,
                      color: isWrong ? W.coral : W.text,
                      border: `1px solid ${isWrong ? W.coral : W.line}`,
                    }}>
                    {w}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ width:"100%", padding: 20, border: `1px solid var(--accent)`, background: "var(--accent-bg)", textAlign:"center" }}>
            <div className="w-mono" style={{ fontSize: 11, color: "var(--accent)", textTransform:"uppercase", letterSpacing:"0.14em", marginBottom: 6 }}>
              chain complete
            </div>
            <div className="w-serif" style={{ fontSize: 28, color: W.text }}>
              COLD → WARM in {CHAIN.length - 1} steps · +{score} xp
            </div>
          </div>
        )}

        <div className="w-mono" style={{ fontSize: 12, color: W.muted }}>
          {wrong ? <span style={{color: W.coral}}>— not a valid step from {CHAIN[progress-1]}</span> : <>&nbsp;</>}
        </div>

        {done && (
          <div style={{ display:"flex", gap: 10 }}>
            <button className="w-btn w-btn-primary" onClick={restart}><Icons.play/> play again</button>
            <button className="w-btn w-btn-ghost" onClick={() => window.nav && window.nav("/today")}>exit to today</button>
          </div>
        )}
      </div>
    </GameShell>
  );
}

// --- SHEEESH Rush (easter egg game) ---
function GameSheeesh() {
  const [phase, setPhase] = React.useState("idle");  // idle | playing | over
  const [timeLeft, setTimeLeft] = React.useState(30);
  const [score, setScore] = React.useState(0);
  const [combo, setCombo] = React.useState(0);
  const [bestCombo, setBestCombo] = React.useState(0);
  const [words, setWords] = React.useState([]);       // {id, text, isTarget, x, fall, born}
  const [pops, setPops] = React.useState([]);         // ephemeral +100 / -50 toasters
  const wordIdRef = React.useRef(0);
  const popIdRef  = React.useRef(0);

  const DECOYS = ["WOW","OMG","YEET","BRUH","DANG","NICE","WHOA","DAMN","LOL","HUH","OOF","SHESH","SHEEEEESH"];
  // Note: "SHEEEEESH" is 5 E's; we accept 3–4 E's as targets only.
  const isSheeesh = (t) => /^SHE{3,4}SH$/.test(t);
  const TARGETS = ["SHEEESH","SHEEESH","SHEEEESH"];

  const spawn = () => {
    const isTarget = Math.random() < 0.35;
    const text = isTarget
      ? TARGETS[Math.floor(Math.random() * TARGETS.length)]
      : DECOYS[Math.floor(Math.random() * DECOYS.length)];
    // Decoy "SHEEEEESH" (5 E's) is deliberately off-target to trap misclicks.
    const x = 10 + Math.random() * 80;
    const fall = 3.2 + Math.random() * 1.3; // seconds to fall
    setWords(ws => [...ws, { id: ++wordIdRef.current, text, isTarget, x, fall }]);
  };

  // spawn loop
  React.useEffect(() => {
    if (phase !== "playing") return;
    const id = setInterval(spawn, 650);
    return () => clearInterval(id);
  }, [phase]);

  // 1s countdown
  React.useEffect(() => {
    if (phase !== "playing") return;
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { setPhase("over"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  const removeWord = (id) => setWords(ws => ws.filter(w => w.id !== id));

  const addPop = (x, text, color) => {
    const id = ++popIdRef.current;
    setPops(ps => [...ps, { id, x, text, color }]);
    setTimeout(() => setPops(ps => ps.filter(p => p.id !== id)), 700);
  };

  const clickWord = (w, e) => {
    e && e.stopPropagation && e.stopPropagation();
    removeWord(w.id);
    if (isSheeesh(w.text)) {
      const gained = 100 + combo * 20;
      setScore(s => s + gained);
      setCombo(c => {
        const n = c + 1;
        setBestCombo(b => Math.max(b, n));
        return n;
      });
      addPop(w.x, `+${gained}`, "var(--accent)");
    } else {
      setScore(s => Math.max(0, s - 50));
      setCombo(0);
      addPop(w.x, "−50", W.coral);
    }
  };

  const onWordFell = (w) => {
    if (isSheeesh(w.text)) {
      setScore(s => Math.max(0, s - 20));
      setCombo(0);
      addPop(w.x, "missed", W.coral);
    }
    removeWord(w.id);
  };

  const start = () => {
    setScore(0); setTimeLeft(30); setWords([]); setCombo(0); setBestCombo(0); setPops([]);
    setPhase("playing");
  };

  const rating = score >= 2500 ? "MAX SHEEESH"
               : score >= 1500 ? "PRETTY SHEEESH"
               : score >= 800  ? "MILD SHEEESH"
               :                 "NO SHEEESH";
  const fires = score >= 2500 ? "🔥🔥🔥" : score >= 1500 ? "🔥🔥" : score >= 800 ? "🔥" : "💤";

  return (
    <GameShell title="sheeesh rush · hidden" round={phase === "playing" ? `${30 - timeLeft}s / 30s` : "—"} score={score} streak={combo}>
      {phase === "idle" && (
        <div style={{ textAlign:"center", maxWidth: 520, padding: 20 }}>
          <div className="w-serif" style={{ fontSize: 72, lineHeight: 1, fontStyle: "italic", color:"var(--accent)", letterSpacing: "-0.02em", textShadow:"0 0 40px var(--accent-glow)" }}>
            SHEEESH
          </div>
          <div className="w-mono" style={{ fontSize: 10, color: W.mutedDim, letterSpacing:"0.2em", textTransform:"uppercase", marginTop: 6 }}>
            hidden · easter egg · cognitive discrimination drill
          </div>
          <p style={{ color: W.muted, marginTop: 20, marginBottom: 24, fontSize: 15, lineHeight: 1.55 }}>
            Words drop from above. Tap only <span style={{color:"var(--accent)", fontFamily: W.mono}}>SHEEESH</span>.
            Ignore the decoys (and watch out for <span className="w-mono" style={{color: W.muted}}>SHEEEEESH</span>
            — that's five E's, not the real thing). 30 seconds. Combo to score harder.
          </p>
          <button className="w-btn w-btn-primary" onClick={start}><Icons.play/> start</button>
        </div>
      )}

      {phase === "playing" && (
        <div style={{
          position:"relative", width: "100%", maxWidth: 720, height: 520,
          background: W.bgSunken, border: `1px solid ${W.line}`, overflow:"hidden",
        }}>
          <div style={{ position:"absolute", top: 10, left: 12, fontFamily: W.mono, fontSize: 12, color: W.muted, zIndex: 3 }}>
            <span style={{ color:"var(--accent)" }}>{timeLeft}s</span> · combo ×{combo}
          </div>
          <div style={{ position:"absolute", top: 10, right: 12, fontFamily: W.mono, fontSize: 12, color: W.muted, zIndex: 3 }}>
            score <span style={{ color:"var(--accent)", fontSize: 14 }}>{score}</span>
          </div>
          {words.map(w => (
            <div key={w.id}
              onClick={(e) => clickWord(w, e)}
              onAnimationEnd={() => onWordFell(w)}
              style={{
                position:"absolute", left: `${w.x}%`, top: 0,
                animation: `w-fall ${w.fall}s linear forwards`,
                fontFamily: W.mono, fontSize: 24, fontWeight: 600,
                color: isSheeesh(w.text) ? "var(--accent)" : W.muted,
                cursor:"pointer", padding: "6px 12px", userSelect:"none", whiteSpace:"nowrap",
                textShadow: isSheeesh(w.text) ? "0 0 20px var(--accent-glow)" : "none",
              }}>
              {w.text}
            </div>
          ))}
          {pops.map(p => (
            <div key={p.id} style={{
              position:"absolute", left: `${p.x}%`, top: "60%",
              fontFamily: W.mono, fontSize: 20, fontWeight: 600, color: p.color,
              animation: "w-pop 0.7s ease-out forwards",
              pointerEvents:"none", whiteSpace:"nowrap",
            }}>
              {p.text}
            </div>
          ))}
        </div>
      )}

      {phase === "over" && (
        <div style={{ textAlign:"center", padding: 32, border: `1px solid var(--accent)`, background:"var(--accent-bg)", maxWidth: 520, width: "100%" }}>
          <div style={{ fontSize: 48 }}>{fires}</div>
          <div className="w-serif" style={{ fontSize: 40, color:"var(--accent)", marginTop: 6, letterSpacing:"-0.02em" }}>
            {rating}
          </div>
          <div className="w-mono" style={{ fontSize: 14, color: W.muted, marginTop: 8 }}>
            {score} pts · best combo ×{bestCombo}
          </div>
          <div style={{ display:"flex", gap: 10, justifyContent:"center", marginTop: 24, flexWrap:"wrap" }}>
            <button className="w-btn w-btn-primary" onClick={start}><Icons.play/> run it back</button>
            <button className="w-btn w-btn-ghost" onClick={() => window.nav && window.nav("/today")}>exit</button>
          </div>
        </div>
      )}
    </GameShell>
  );
}

const GAME_ROTATION = [
  { path: "/games/memory",   label: "memory grid"   },
  { path: "/games/reaction", label: "reaction time" },
  { path: "/games/words",    label: "word chains"   },
  { path: "/games/sheesh",   label: "sheeesh rush"  },
];

function GameShell({ title, round, score, streak, children }) {
  const isMobile = useIsMobile();
  const here = (typeof window !== "undefined" ? window.location.hash.slice(1) : "") || "/";
  const idx  = GAME_ROTATION.findIndex(g => g.path === here);
  const next = GAME_ROTATION[((idx < 0 ? 0 : idx) + 1) % GAME_ROTATION.length];

  return (
    <div className="w-grid-bg" style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <div style={{
        display:"flex", alignItems:"center", gap: isMobile ? 8 : 12,
        padding: isMobile ? "10px 14px" : "14px 28px",
        borderBottom: `1px solid ${W.line}`, background: W.bgSunken,
        fontFamily: W.mono, fontSize: 12, flexWrap: "wrap",
      }}>
        <button className="w-btn w-btn-ghost" onClick={() => window.nav && window.nav("/today")} style={{ height: 30, padding: "0 10px", fontSize: 11 }}>← exit</button>
        {!isMobile && (
          <span style={{ color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em" }}>
            game: <span style={{color:"var(--accent)"}}>{title}</span> · round {round}
          </span>
        )}
        <span style={{ flex: 1 }}/>
        <span style={{ color: W.muted }}>score <span style={{ color:"var(--accent)", fontSize: 14 }}>{score}</span></span>
        <span style={{ color: W.muted }}>
          <Icons.flame style={{color: W.amber, verticalAlign:"middle"}}/> <span style={{ color: W.amber, fontSize: 14 }}>{streak}</span>
        </span>
        <button className="w-btn w-btn-ghost"
          onClick={() => window.nav && window.nav(next.path)}
          title={`next game · ${next.label}`}
          style={{ height: 30, padding: "0 12px", fontSize: 11 }}>
          {isMobile ? "next →" : `next: ${next.label} →`}
        </button>
      </div>
      <div style={{ flex: 1, display:"flex", alignItems:"center", justifyContent:"center", padding: isMobile ? 20 : 32, flexDirection:"column" }}>
        {children}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// TRAINING — 8-week program (MVP)
// ══════════════════════════════════════════════════════════
function Training() {
  const isMobile = useIsMobile();
  const currentWeek = 3;
  const weeks = [
    { n: 1, title: "Baseline & pattern fundamentals", desc: "Raven matrices, shape rotations, visual logic warm-ups.", days: 7 },
    { n: 2, title: "Working memory",                  desc: "Simon-style grids, n-back, chunking drills.",            days: 7 },
    { n: 3, title: "Reaction & focus",                desc: "Timing drills, attention switches, distraction filtering.", days: 7 },
    { n: 4, title: "Verbal fluency",                  desc: "Word chains, anagrams, semantic categories.",            days: 7 },
    { n: 5, title: "Logical reasoning",               desc: "Number sequences, syllogisms, conditional chains.",      days: 7 },
    { n: 6, title: "Spatial & mental rotation",       desc: "3D rotation, folding, mental mapping.",                  days: 7 },
    { n: 7, title: "Speed under pressure",            desc: "Mixed drills with time limits, error cost.",             days: 7 },
    { n: 8, title: "Integration & re-test",           desc: "Full sections end-to-end. Re-take the IQ assessment.",   days: 7 },
  ];
  return (
    <div style={{ padding: isMobile ? "20px 16px 40px" : "32px 48px 48px", maxWidth: 1100, width: "100%" }}>
      <header style={{ marginBottom: 28 }}>
        <span className="w-mono" style={{ fontSize: 11, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em" }}>
          training program · 8 weeks · personalized
        </span>
        <h1 className="w-serif" style={{ fontSize: isMobile ? 34 : 48, lineHeight: 1.05, fontWeight: 400, margin: "6px 0 10px", letterSpacing:"-0.02em" }}>
          Your 8-week plan — you're on <span style={{ color:"var(--accent)", fontStyle:"italic" }}>week {currentWeek}</span>.
        </h1>
        <p style={{ color: W.muted, fontSize: 15, maxWidth: 620 }}>
          Each week targets a different cognitive domain. Short daily sessions &mdash; 10 to 15 minutes. Re-assessment at the end.
        </p>
      </header>

      <div style={{ marginBottom: 28 }}>
        <div className="w-mono" style={{ fontSize: 11, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em", marginBottom: 8 }}>
          overall progress · {Math.round((currentWeek - 1) / weeks.length * 100)}%
        </div>
        <BlockProgress value={currentWeek - 1} total={weeks.length} width={isMobile ? 280 : 520}/>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap: 10 }}>
        {weeks.map(w => {
          const done = w.n < currentWeek;
          const active = w.n === currentWeek;
          return (
            <div key={w.n} style={{
              display:"grid",
              gridTemplateColumns: isMobile ? "44px 1fr" : "56px 1fr auto",
              gap: 16, alignItems:"center",
              padding: isMobile ? "14px 14px" : "16px 20px",
              border: `1px solid ${active ? "var(--accent)" : W.line}`,
              background: active ? "var(--accent-bg)" : (done ? W.bgSunken : W.bgRaised),
              boxShadow: active ? "0 0 0 1px var(--accent), 0 0 30px -8px var(--accent-glow)" : "none",
            }}>
              <div style={{
                width: isMobile ? 36 : 44, height: isMobile ? 36 : 44,
                border: `1px solid ${done ? "var(--accent)" : (active ? "var(--accent)" : W.line)}`,
                background: done ? "var(--accent-bg)" : "transparent",
                display:"flex", alignItems:"center", justifyContent:"center",
                color: done || active ? "var(--accent)" : W.muted,
                fontFamily: W.mono, fontSize: 13,
              }}>
                {done ? <Icons.check/> : String(w.n).padStart(2,"0")}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, color: done ? W.muted : W.text }}>
                  Week {w.n} — <span style={{ color: W.muted, fontWeight: 400 }}>{w.title}</span>
                </div>
                <div style={{ fontSize: 12.5, color: W.mutedDim, marginTop: 3 }}>{w.desc}</div>
              </div>
              {!isMobile && (
                <div>
                  {active && (
                    <button className="w-btn w-btn-primary" onClick={() => window.nav && window.nav("/today")} style={{ height: 36, padding: "0 14px" }}>
                      <Icons.play/> continue
                    </button>
                  )}
                  {done && <span className="w-mono" style={{ fontSize: 11, color:"var(--accent)" }}>complete</span>}
                  {!active && !done && <span className="w-mono" style={{ fontSize: 11, color: W.mutedDim }}>locked</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isMobile && (
        <button className="w-btn w-btn-primary" onClick={() => window.nav && window.nav("/today")}
          style={{ marginTop: 20, width: "100%" }}>
          <Icons.play/> continue today's session
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// LIBRARY — index of articles (MVP: 1 article)
// ══════════════════════════════════════════════════════════
const ARTICLES = [
  {
    slug: "neuroplasticity",
    title: "Neuroplasticity: How to rewire your brain at any age",
    readingTime: "3 min read",
    category: "Neuroscience",
    excerpt: "Your brain isn't a static organ. It's a muscle designed to adapt, strengthen, and reshape itself throughout your entire life.",
  },
];

function Library() {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: isMobile ? "20px 16px 40px" : "32px 48px 48px", maxWidth: 1100, width: "100%" }}>
      <header style={{ marginBottom: 28 }}>
        <span className="w-mono" style={{ fontSize: 11, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em" }}>
          library · articles · science of the brain
        </span>
        <h1 className="w-serif" style={{ fontSize: isMobile ? 34 : 48, lineHeight: 1.05, fontWeight: 400, margin: "6px 0 10px", letterSpacing:"-0.02em" }}>
          Read between reps.
        </h1>
        <p style={{ color: W.muted, fontSize: 15, maxWidth: 560 }}>
          Short, research-backed pieces on how the brain actually learns, adapts, and improves with training.
        </p>
      </header>

      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
        {ARTICLES.map(a => (
          <div key={a.slug} onClick={() => window.nav && window.nav(`/library/${a.slug}`)}
            style={{
              padding: 24, border: `1px solid ${W.line}`, background: W.bgRaised, cursor: "pointer",
              transition: "all .15s", position: "relative",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = W.line}>
            <div className="w-mono" style={{ fontSize: 10.5, letterSpacing:"0.14em", textTransform:"uppercase", color: W.mutedDim, marginBottom: 12 }}>
              {a.category} · {a.readingTime}
            </div>
            <div className="w-serif" style={{ fontSize: 26, lineHeight: 1.15, color: W.text, marginBottom: 10 }}>
              {a.title}
            </div>
            <p style={{ color: W.muted, fontSize: 14, lineHeight: 1.5, margin: 0 }}>
              {a.excerpt}
            </p>
            <div className="w-mono" style={{ fontSize: 11, color:"var(--accent)", marginTop: 18, letterSpacing:"0.08em" }}>
              read article →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// ARTICLE — single article page (Neuroplasticity)
// ══════════════════════════════════════════════════════════
function ArticleNeuroplasticity() {
  const isMobile = useIsMobile();
  const H2 = ({ children }) => (
    <h2 className="w-serif" style={{ fontSize: isMobile ? 26 : 32, fontWeight: 400, margin: "36px 0 14px", letterSpacing:"-0.01em" }}>{children}</h2>
  );
  const H3 = ({ children }) => (
    <h3 className="w-mono" style={{ fontSize: 14, color: "var(--accent)", textTransform:"uppercase", letterSpacing:"0.14em", margin: "28px 0 10px" }}>{children}</h3>
  );
  const P = ({ children }) => (
    <p style={{ color: W.text, fontSize: 16.5, lineHeight: 1.65, margin: "0 0 14px", maxWidth: 720 }}>{children}</p>
  );
  const Note = ({ label, children }) => (
    <div style={{ borderLeft: `2px solid var(--accent)`, padding: "10px 16px", background: W.bgRaised, margin: "14px 0 20px", maxWidth: 720 }}>
      <div className="w-mono" style={{ fontSize: 10.5, color:"var(--accent)", textTransform:"uppercase", letterSpacing:"0.14em", marginBottom: 4 }}>{label}</div>
      <div style={{ color: W.text, fontSize: 15, lineHeight: 1.55 }}>{children}</div>
    </div>
  );

  return (
    <div style={{ padding: isMobile ? "20px 16px 48px" : "40px 56px 56px", maxWidth: 820, width: "100%", margin: "0 auto" }}>
      <div onClick={() => window.nav && window.nav("/library")} className="w-mono"
        style={{ fontSize: 12, color: W.muted, cursor:"pointer", marginBottom: 24, display:"inline-flex", gap: 6 }}>
        ← back to library
      </div>

      <span className="w-chip w-chip-accent" style={{ marginBottom: 14 }}>
        <Icons.brain/> neuroscience · 3 min read
      </span>
      <h1 className="w-serif" style={{ fontSize: isMobile ? 36 : 52, lineHeight: 1.05, fontWeight: 400, margin: "10px 0 18px", letterSpacing:"-0.02em" }}>
        Neuroplasticity: How to rewire your <span style={{ color:"var(--accent)", fontStyle:"italic" }}>brain</span> at any age.
      </h1>

      <P>
        For a long time, the prevailing wisdom was that the brain only develops during childhood, leaving adults to simply manage a slow decline in cognitive function. Fortunately, modern science has flipped the script. The truth is, your brain isn't a static organ. Think of it more like a muscle that is designed to adapt, strengthen, and reshape itself throughout your entire life.
      </P>
      <P>
        <strong style={{ color: W.text }}>Neuroplasticity</strong> is the brain's ability to form new neural connections in response to new experiences, learning, and environment. It's the reason you can pick up a new language at 60, bounce back from burnout, or finally sharpen your focus.
      </P>

      <H2>The mental gym: How it works</H2>
      <P>
        The brain is all about efficiency. If you perform the same tasks every day, it switches to autopilot to save calories. Your neural pathways become predictable shortcuts. They save you time, but they also make your thinking a bit rigid. To stay sharp, your mind requires three specific triggers: <strong style={{ color: W.text }}>novelty, challenge, and consistency.</strong>
      </P>

      <H3>01 / Cognitive games: Targeted training</H3>
      <P>
        Games designed for memory, attention, and logic are more than just digital distractions. They are high-intensity interval training (HIIT) for your prefrontal cortex.
      </P>
      <Note label="The science">
        When you tackle a puzzle that isn't instantly intuitive, your brain is forced to fire and wire new signals across synapses.
      </Note>
      <Note label="Pro tip">
        If a game feels easy, your brain has already adapted. The real benefit happens in the "stretch zone" — that slightly uncomfortable space where you have to truly concentrate.
      </Note>

      <H3>02 / Psychological insight & self-testing</H3>
      <P>
        Cognitive ability doesn't exist in a vacuum; it is deeply tied to your emotional state. High levels of cortisol (the stress hormone) can physically shrink the hippocampus — the area of the brain responsible for memory and learning.
      </P>
      <Note label="Assessment as a tool">
        Taking psychological tests isn't about labeling yourself. It's about data. By identifying your stress triggers or cognitive biases, you can choose the right micro-courses to build emotional resilience.
      </Note>

      <H3>03 / Microlearning: Small bites, big gains</H3>
      <P>
        Why are 10-minute learning intervals more effective than a three-hour seminar? It comes down to the <strong style={{ color: W.text }}>Spacing Effect</strong>. The brain can only absorb a limited amount of information before it needs to consolidate it into long-term memory.
      </P>
      <P>
        Microlearning works with your biology, not against it. By engaging in short, frequent lessons, you prevent cognitive fatigue and ensure that new neural pathways have time to stabilize.
      </P>

      <H2>3 ways to upgrade your brainpower today</H2>
      <ol style={{ color: W.text, fontSize: 16.5, lineHeight: 1.65, paddingLeft: 22, maxWidth: 720 }}>
        <li style={{ marginBottom: 10 }}>
          <strong style={{ color: W.text }}>Break the routine.</strong> Even something as simple as using your non-dominant hand to brush your teeth forces your brain to pay attention and build new motor pathways.
        </li>
        <li style={{ marginBottom: 10 }}>
          <strong style={{ color: W.text }}>Challenge your blind spots.</strong> Log in and play a game in a category you usually avoid. If you love logic, try a visual-spatial task. Real progress starts when you step out of your comfort zone.
        </li>
        <li style={{ marginBottom: 10 }}>
          <strong style={{ color: W.text }}>Know your starting point.</strong> Take a quick focus or personality test to find out where you stand. You can't improve what you don't measure.
        </li>
      </ol>

      <P>The brain is the only tool that becomes sharper the more you use it. Don't let it rust.</P>

      <div style={{ marginTop: 40, padding: 24, border: `1px solid var(--accent)`, background: "var(--accent-bg)" }}>
        <div className="w-mono" style={{ fontSize: 11, color:"var(--accent)", textTransform:"uppercase", letterSpacing:"0.14em", marginBottom: 10 }}>
          ready to dive deeper?
        </div>
        <p style={{ fontSize: 15.5, color: W.text, lineHeight: 1.55, margin: "0 0 16px" }}>
          Start with a 2-minute IQ assessment to see where you stand.
        </p>
        <button className="w-btn w-btn-primary" onClick={() => window.nav && window.nav("/iq")}>
          take the iq test <Icons.arrow/>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { AppShell, Today, Profile, Training, Library, ArticleNeuroplasticity, GameMemoryGrid, GameReactionTime, GameWordChains, GameSheeesh });
