// screens-onboarding-iq.jsx — Onboarding and IQ Test screens (desktop)

// ── Shared shell ───────────────────────────────────────────
function DesktopShell({ children, accent }) {
  return (
    <div className="w-root w-noise" style={{
      width: "100%", height: "100%", background: W.bg,
      "--accent": accent, "--accent-line": `rgba(${accentPresets[accent]?.rgb || "168,255,96"}, 0.35)`,
      "--accent-bg": `rgba(${accentPresets[accent]?.rgb || "168,255,96"}, 0.06)`,
      "--accent-glow": `rgba(${accentPresets[accent]?.rgb || "168,255,96"}, 0.45)`,
      overflow: "hidden", position: "relative",
    }}>
      {children}
    </div>
  );
}

function StatusStrip({ step, steps, right }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16, padding: "14px 32px",
      borderBottom: `1px solid ${W.line}`, background: W.bgSunken,
      fontFamily: W.mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: W.mutedDim,
    }}>
      <WittioLogo size={14}/>
      <span style={{ color: W.line }}>│</span>
      <span>session_id:&nbsp;<span style={{color: W.muted}}>WTT-{Math.floor(Math.random()*9000+1000)}</span></span>
      <span style={{ flex: 1 }}/>
      {step !== undefined && (
        <span>[step {String(step).padStart(2,"0")}/{String(steps).padStart(2,"0")}]</span>
      )}
      {right}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// ONBOARDING — "meet your brain" quiz, 3-step
// ══════════════════════════════════════════════════════════
function Onboarding({ step = 2, onContinue, onSkip }) {
  const isMobile = useIsMobile();
  const goals = [
    { id:"focus",    label:"Sharpen focus",        desc:"Cut the noise. Hold attention longer.", icon:"◎" },
    { id:"memory",   label:"Boost memory",         desc:"Remember names, numbers, ideas.",        icon:"◆" },
    { id:"speed",    label:"Think faster",         desc:"Quicker reactions, faster reasoning.",   icon:"➤" },
    { id:"words",    label:"Sharpen language",     desc:"Vocabulary, verbal fluency.",            icon:"✎" },
    { id:"iq",       label:"Understand my IQ",     desc:"Benchmark where you are today.",         icon:"∑" },
    { id:"maintain", label:"Maintain cognition",   desc:"Keep the edge, long-term.",              icon:"∞" },
  ];
  const [picked, setPicked] = React.useState(new Set(["focus","memory"]));
  const toggle = (id) => setPicked(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="w-grid-bg" style={{ minHeight: "100vh", display:"flex", flexDirection:"column" }}>
      <StatusStrip step={step} steps={3} right={<span className="w-link" onClick={onSkip} style={{color: W.muted, border:"none", cursor:"pointer"}}>skip →</span>}/>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr", gap: 0 }}>
        {/* left: prompt */}
        <div style={{ padding: isMobile ? "28px 20px 20px" : "64px 64px 40px", display:"flex", flexDirection:"column", justifyContent:"space-between", gap: isMobile ? 24 : 0 }}>
          <div>
            <span className="w-chip w-chip-accent" style={{ marginBottom: 20 }}>
              <Icons.dot/> 02 — goals
            </span>
            <h1 className="w-serif" style={{ fontSize: isMobile ? 40 : 72, lineHeight: 1.0, margin: "20px 0 18px", fontWeight: 400, letterSpacing:"-0.02em" }}>
              What do you want<br/>
              <span style={{ color: "var(--accent)", fontStyle:"italic" }}>your mind</span> to do better?
            </h1>
            <p style={{ color: W.muted, fontSize: 17, lineHeight: 1.55, maxWidth: 440 }}>
              Pick any that apply. We'll build a training plan that targets exactly these.
              You can change them later — no commitment.
            </p>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap: 16 }}>
            <button className="w-btn w-btn-primary" onClick={onContinue}>
              continue <Icons.arrow/>
            </button>
            <span className="w-mono" style={{ color: W.mutedDim, fontSize: 12 }}>
              or press <kbd style={{ background: W.bgRaised, border: `1px solid ${W.line}`, padding: "2px 6px", borderRadius: 2 }}>↵</kbd>
            </span>
          </div>
        </div>

        {/* right: goal cards */}
        <div style={{ padding: isMobile ? "24px 20px 40px" : "64px 64px 40px", background: W.bgSunken, borderLeft: isMobile ? "none" : `1px solid ${W.line}`, borderTop: isMobile ? `1px solid ${W.line}` : "none", position:"relative" }}>
          <div className="w-ascii" style={{ fontSize: 10, position:"absolute", top: 20, right: 24 }}>
{`┌─ goals.txt ──────────┐
│  pick 1–6 options     │
└───────────────────────┘`}
          </div>
          <div style={{ display:"grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 40 }}>
            {goals.map(g => {
              const on = picked.has(g.id);
              return (
                <button key={g.id} onClick={() => toggle(g.id)}
                  style={{
                    textAlign:"left", padding: 18, border: `1px solid ${on ? "var(--accent)" : W.line}`,
                    background: on ? "var(--accent-bg)" : W.bgRaised, borderRadius: 2, cursor:"pointer",
                    color: W.text, fontFamily: W.sans, transition: "all .12s",
                    position:"relative", boxShadow: on ? "0 0 0 1px var(--accent), 0 0 20px -5px var(--accent-glow)" : "none",
                  }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 10 }}>
                    <span className="w-mono" style={{ fontSize: 20, color: on ? "var(--accent)" : W.muted }}>{g.icon}</span>
                    <span style={{
                      width: 18, height: 18, border: `1px solid ${on ? "var(--accent)" : W.line}`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      background: on ? "var(--accent)" : "transparent", color: "#0A0F0B",
                    }}>
                      {on && <Icons.check/>}
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{g.label}</div>
                  <div style={{ fontSize: 12.5, color: W.muted, lineHeight: 1.45 }}>{g.desc}</div>
                </button>
              );
            })}
          </div>

          <div className="w-divider" style={{ margin: "32px 0 20px" }}/>
          <div style={{ display:"flex", alignItems:"center", gap: 20, fontFamily: W.mono, fontSize: 11, color: W.mutedDim, letterSpacing:"0.08em", textTransform:"uppercase" }}>
            <span>selected: <span style={{color:"var(--accent)"}}>{picked.size}</span></span>
            <span>│</span>
            <span>est. session: ~12 min/day</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// IQ TEST — Intro
// ══════════════════════════════════════════════════════════
function IQIntro({ onStart }) {
  const isMobile = useIsMobile();
  return (
    <div className="w-grid-bg" style={{ minHeight: "100vh", display:"flex", flexDirection:"column" }}>
      <StatusStrip right={<span className="w-mono">iq_assessment.v2</span>}/>
      <div style={{ flex: 1, display:"flex", alignItems:"center", justifyContent:"center", padding: isMobile ? 20 : 48 }}>
        <div style={{ maxWidth: 960, width: "100%", display:"grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 24 : 48, alignItems:"center" }}>

          <div>
            <span className="w-chip w-chip-accent">
              <Icons.brain/> IQ assessment · 3 questions · ~2 min
            </span>
            <h1 className="w-serif" style={{ fontSize: isMobile ? 40 : 68, lineHeight: 1.02, margin: "22px 0 18px", fontWeight: 400, letterSpacing:"-0.02em" }}>
              Ready to meet <br/>
              <span style={{ fontStyle:"italic", color: "var(--accent)" }}>your</span> intelligence?
            </h1>
            <p style={{ color: W.muted, fontSize: 17, lineHeight: 1.55, maxWidth: 460, marginBottom: 32 }}>
              One question from each cognitive domain — pattern, logic, verbal.
              No timer — just take each at your pace. Results are private.
            </p>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap: 1, background: W.line, border: `1px solid ${W.line}`, marginBottom: 32, maxWidth: 460 }}>
              {[
                { k:"questions", v:"3" },
                { k:"duration",  v:"~2m" },
                { k:"sections",  v:"03" },
              ].map(x => (
                <div key={x.k} style={{ background: W.bgRaised, padding: "14px 16px" }}>
                  <div className="w-mono" style={{ fontSize: 10, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.12em" }}>{x.k}</div>
                  <div className="w-mono" style={{ fontSize: 22, color: W.text, marginTop: 4 }}>{x.v}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", gap: 12, alignItems:"center" }}>
              <button className="w-btn w-btn-primary" onClick={onStart}>start assessment <Icons.arrow/></button>
            </div>

            <div style={{ marginTop: 28, display:"flex", gap: 20, color: W.mutedDim, fontSize: 12.5, flexWrap:"wrap" }}>
              <span style={{display:"flex", gap:6, alignItems:"center"}}><Icons.check/> no timer</span>
              <span style={{display:"flex", gap:6, alignItems:"center"}}><Icons.check/> results in seconds</span>
              <span style={{display:"flex", gap:6, alignItems:"center"}}><Icons.lock/> fully private</span>
            </div>
          </div>

          {/* right: visual preview of the 3 section types */}
          <div style={{ border: `1px solid ${W.line}`, background: W.bgRaised, padding: 24, position:"relative" }}>
            <div className="w-mono" style={{ fontSize: 10.5, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em", marginBottom: 18 }}>
              what you'll see
            </div>

            {/* Section 01 · Pattern */}
            <div style={{ display:"flex", alignItems:"center", gap: 16, padding: "12px 0", borderTop: `1px solid ${W.line}` }}>
              <div style={{ width: 64, height: 64, border: `1px solid ${W.line}`, background: W.bgSunken, display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gridTemplateRows:"repeat(3, 1fr)", gap: 2, padding: 6 }}>
                {["△","○","□","□","△","○","○","□","?"].map((c, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"center",
                    fontFamily: W.mono, fontSize: 12, color: c === "?" ? "var(--accent)" : W.muted,
                    border: c === "?" ? `1px dashed var(--accent)` : "none" }}>{c}</div>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                <div className="w-mono" style={{ fontSize: 10.5, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.12em" }}>
                  01 · pattern
                </div>
                <div style={{ fontSize: 14.5, color: W.text, marginTop: 4 }}>Complete the visual matrix</div>
              </div>
            </div>

            {/* Section 02 · Logic */}
            <div style={{ display:"flex", alignItems:"center", gap: 16, padding: "12px 0", borderTop: `1px solid ${W.line}` }}>
              <div style={{ width: 64, height: 64, border: `1px solid ${W.line}`, background: W.bgSunken, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span className="w-mono" style={{ fontSize: 14, color: W.muted }}>2,6,<span style={{color:"var(--accent)"}}>?</span></span>
              </div>
              <div style={{ flex: 1 }}>
                <div className="w-mono" style={{ fontSize: 10.5, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.12em" }}>
                  02 · logic
                </div>
                <div style={{ fontSize: 14.5, color: W.text, marginTop: 4 }}>Find the next number in a sequence</div>
              </div>
            </div>

            {/* Section 03 · Verbal */}
            <div style={{ display:"flex", alignItems:"center", gap: 16, padding: "12px 0", borderTop: `1px solid ${W.line}` }}>
              <div style={{ width: 64, height: 64, border: `1px solid ${W.line}`, background: W.bgSunken, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap: 2 }}>
                <span className="w-mono" style={{ fontSize: 10, color: W.muted, letterSpacing:"0.08em" }}>A : B</span>
                <span className="w-mono" style={{ fontSize: 10, color:"var(--accent)", letterSpacing:"0.08em" }}>C : ?</span>
              </div>
              <div style={{ flex: 1 }}>
                <div className="w-mono" style={{ fontSize: 10.5, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.12em" }}>
                  03 · verbal
                </div>
                <div style={{ fontSize: 14.5, color: W.text, marginTop: 4 }}>Complete the word analogy</div>
              </div>
            </div>

            <div style={{ marginTop: 20, padding: 16, border: `1px dashed ${W.line}`, display:"flex", alignItems:"center", gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius:"50%", background: W.bgSunken, border: `1px solid ${W.line}`, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--accent)" }}>
                <Icons.lock/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>Your score stays private</div>
                <div style={{ fontSize: 12, color: W.muted, marginTop: 2 }}>Never shown on a leaderboard. Never sold.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// IQ TEST — Question screen (data-driven: matrix / series / analogy)
// ══════════════════════════════════════════════════════════

// Renders a shape used in the matrix puzzle.
function MatrixShape({ shape, size = 40, color = W.text }) {
  if (shape === "?") {
    return <span className="w-mono" style={{ fontSize: size*0.9, color: "var(--accent)" }}>?</span>;
  }
  const s = size * 0.55;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      {shape === "square"   && <rect x={20-s/2} y={20-s/2} width={s} height={s} fill={color}/>}
      {shape === "triangle" && <polygon points={`20,${20-s/1.5} ${20-s/1.7},${20+s/2.5} ${20+s/1.7},${20+s/2.5}`} fill={color}/>}
      {shape === "circle"   && <circle cx="20" cy="20" r={s/2} fill={color}/>}
      {shape === "diamond"  && <polygon points={`20,${20-s/1.4} ${20+s/1.4},20 20,${20+s/1.4} ${20-s/1.4},20`} fill={color}/>}
    </svg>
  );
}

// Stimulus renderers by type
function MatrixStimulus({ cells }) {
  return (
    <div style={{
      flex: 1, display:"flex", alignItems:"center", justifyContent:"center",
      background: W.bgSunken, border: `1px solid ${W.line}`, padding: 32, position:"relative",
    }}>
      <div className="w-ascii" style={{ position:"absolute", top: 12, left: 16, fontSize: 10 }}>matrix.3×3</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 90px)", gridTemplateRows:"repeat(3, 90px)", gap: 6, background: W.line, border:`1px solid ${W.line}`, padding: 1 }}>
        {cells.map((c, i) => (
          <div key={i} style={{
            background: W.bgRaised, display:"flex", alignItems:"center", justifyContent:"center",
            border: c === "?" ? `1px dashed var(--accent)` : "none",
          }}>
            <MatrixShape shape={c}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function SeriesStimulus({ series }) {
  return (
    <div style={{
      flex: 1, display:"flex", alignItems:"center", justifyContent:"center",
      background: W.bgSunken, border: `1px solid ${W.line}`, padding: 32, position:"relative",
    }}>
      <div className="w-ascii" style={{ position:"absolute", top: 12, left: 16, fontSize: 10 }}>series.nth</div>
      <div style={{ display:"flex", gap: 10, alignItems:"center", flexWrap:"wrap", justifyContent:"center" }}>
        {series.map((n, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="w-mono" style={{ color: W.mutedDim, fontSize: 20 }}>,</span>}
            <div style={{
              minWidth: 70, height: 70, padding: "0 14px",
              border: `1px solid ${W.line}`, background: W.bgRaised,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily: W.mono, fontSize: 30, color: W.text,
            }}>{n}</div>
          </React.Fragment>
        ))}
        <span className="w-mono" style={{ color: W.mutedDim, fontSize: 20 }}>,</span>
        <div style={{
          minWidth: 70, height: 70,
          border: `1px dashed var(--accent)`, background: W.bgSunken,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontFamily: W.mono, fontSize: 30, color:"var(--accent)",
        }}>?</div>
      </div>
    </div>
  );
}

function AnalogyStimulus({ left, middle, right }) {
  const Cell = ({ text, ghost }) => (
    <div style={{
      minWidth: 120, height: 84, padding: "0 20px",
      border: `1px ${ghost ? "dashed var(--accent)" : `solid ${W.line}`}`,
      background: ghost ? W.bgSunken : W.bgRaised,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontFamily: W.mono, fontSize: 22, letterSpacing: "0.1em",
      color: ghost ? "var(--accent)" : W.text,
    }}>{text}</div>
  );
  const Op = ({ text }) => (
    <span className="w-mono" style={{ color: W.mutedDim, fontSize: 24 }}>{text}</span>
  );
  return (
    <div style={{
      flex: 1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      background: W.bgSunken, border: `1px solid ${W.line}`, padding: 32, gap: 24, position:"relative",
    }}>
      <div className="w-ascii" style={{ position:"absolute", top: 12, left: 16, fontSize: 10 }}>analogy.pair</div>
      <div style={{ display:"flex", alignItems:"center", gap: 12, flexWrap:"wrap", justifyContent:"center" }}>
        <Cell text={left}/>
        <Op text=":"/>
        <Cell text={middle}/>
      </div>
      <div className="w-mono" style={{ color: W.muted, fontSize: 12, letterSpacing:"0.2em" }}>AS</div>
      <div style={{ display:"flex", alignItems:"center", gap: 12, flexWrap:"wrap", justifyContent:"center" }}>
        <Cell text={right}/>
        <Op text=":"/>
        <Cell text="?" ghost/>
      </div>
    </div>
  );
}

// Option renderers by type
function MatrixOption({ option, selected }) {
  return <MatrixShape shape={option.shape} size={64} color={selected ? "var(--accent)" : W.text}/>;
}
function SeriesOption({ option, selected }) {
  return (
    <span className="w-mono" style={{ fontSize: 36, color: selected ? "var(--accent)" : W.text, letterSpacing:"-0.02em" }}>
      {option.value}
    </span>
  );
}
function AnalogyOption({ option, selected }) {
  return (
    <span className="w-mono" style={{ fontSize: 22, color: selected ? "var(--accent)" : W.text, letterSpacing: "0.1em" }}>
      {option.word}
    </span>
  );
}

function IQQuestion({ question, qNum = 1, total = 3, selected, onSelect, onNext, onPrev, onSkip }) {
  const isMobile = useIsMobile();
  const [confidence, setConfidence] = React.useState(70);
  const sectionLabel = `section ${String(qNum).padStart(2,"0")} · ${question.section}`;

  let Stimulus, OptionRender;
  if (question.type === "matrix")  { Stimulus = <MatrixStimulus  cells={question.cells}/>;  OptionRender = MatrixOption;  }
  if (question.type === "series")  { Stimulus = <SeriesStimulus  series={question.series}/>; OptionRender = SeriesOption;  }
  if (question.type === "analogy") { Stimulus = <AnalogyStimulus left={question.left} middle={question.middle} right={question.right}/>; OptionRender = AnalogyOption; }

  return (
    <div style={{ minHeight: "100vh", display:"flex", flexDirection:"column" }}>
      <StatusStrip step={qNum} steps={total} right={
        <span style={{ display:"flex", alignItems:"center", gap: 12 }}>
          <BlockProgress value={qNum} total={total} width={120}/>
          <span>{Math.round(qNum/total*100)}%</span>
        </span>
      }/>

      <div style={{ flex: 1, display:"grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.15fr 1fr", gap: 0, minHeight: isMobile ? 0 : 640 }}>
        {/* left: stimulus */}
        <div style={{ padding: isMobile ? "24px 20px" : "48px 48px 32px",
            borderRight: isMobile ? "none" : `1px solid ${W.line}`,
            borderBottom: isMobile ? `1px solid ${W.line}` : "none",
            display:"flex", flexDirection:"column", position:"relative" }}>
          <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom: 8 }}>
            <span className="w-chip">{sectionLabel}</span>
            <span className="w-mono" style={{ fontSize: 11, color: W.mutedDim }}>q.{String(qNum).padStart(2,"0")} / {String(total).padStart(2,"0")}</span>
          </div>

          <h2 className="w-serif" style={{ fontSize: isMobile ? 26 : 40, lineHeight: 1.15, margin: "12px 0 24px", fontWeight: 400, letterSpacing:"-0.01em" }}>
            {question.prompt}
          </h2>

          {Stimulus}

          <div style={{ display:"flex", alignItems:"center", gap: 12, marginTop: 20, color: W.mutedDim, fontSize: 12.5 }}>
            <Icons.clock/> no timer · take your time
            <span style={{ flex:1 }}/>
            <button className="w-btn w-btn-ghost" onClick={onSkip || onNext} style={{ height: 36, padding: "0 14px", fontSize: 11 }}>skip question →</button>
          </div>
        </div>

        {/* right: options + controls */}
        <div style={{ padding: isMobile ? "24px 20px 32px" : "48px 48px 32px", background: W.bgSunken, display:"flex", flexDirection:"column" }}>
          <span className="w-mono" style={{ fontSize: 11, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.12em" }}>choose one</span>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap: 12, marginTop: 14 }}>
            {question.options.map((o, i) => {
              const on = selected === o.id;
              return (
                <button key={o.id} onClick={() => onSelect && onSelect(o.id)}
                  style={{
                    padding: 24, minHeight: 110, border: `1px solid ${on ? "var(--accent)" : W.line}`,
                    background: on ? "var(--accent-bg)" : W.bgRaised, cursor:"pointer",
                    display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap: 12,
                    position: "relative", transition:"all .12s",
                    boxShadow: on ? "0 0 0 1px var(--accent), 0 0 30px -8px var(--accent-glow)" : "none",
                  }}>
                  <span className="w-mono" style={{ position:"absolute", top: 10, left: 12, fontSize: 11, color: on ? "var(--accent)" : W.mutedDim }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <OptionRender option={o} selected={on}/>
                </button>
              );
            })}
          </div>

          <div className="w-divider" style={{ margin: "28px 0 20px" }}/>

          <div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 10 }}>
              <span className="w-mono" style={{ fontSize: 11, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.1em" }}>how sure are you?</span>
              <span className="w-mono" style={{ fontSize: 12, color:"var(--accent)" }}>{confidence}%</span>
            </div>
            <input type="range" min="0" max="100" value={confidence}
              onChange={(e) => setConfidence(+e.target.value)}
              style={{ width: "100%", accentColor: "var(--accent)" }}/>
            <div className="w-mono" style={{ display:"flex", justifyContent:"space-between", fontSize: 10, color: W.mutedDim, marginTop: 4 }}>
              <span>guessing</span><span>confident</span>
            </div>
          </div>

          <div style={{ flex: 1, minHeight: 24 }}/>

          <div style={{ display:"flex", gap: 10, marginTop: 24 }}>
            <button className="w-btn w-btn-ghost" onClick={onPrev} disabled={qNum <= 1} style={{ flex: 1 }}>← previous</button>
            <button className="w-btn w-btn-primary" style={{ flex: 2 }} disabled={!selected}
              onClick={() => selected && onNext && onNext()}>
              {qNum >= total ? "finish →" : <>next question <Icons.arrow/></>}
            </button>
          </div>

          <div style={{ marginTop: 14, textAlign:"center", color: W.mutedDim, fontSize: 12 }}>
            Autosaved · <span className="w-link">pause & resume later</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// IQ TEST — Results
// ══════════════════════════════════════════════════════════
function IQResults({ score = 100, correct = 1, total = 3, breakdown, onContinue, onRetake }) {
  const isMobile = useIsMobile();
  // Derive tier + percentile from score (standard IQ, μ=100, σ=15)
  const tierIndex = score >= 125 ? 0 : score >= 110 ? 1 : score >= 95 ? 2 : score >= 80 ? 3 : 4; // 0=gifted..4=low-avg
  const tiers = ["gifted","superior","high-avg","avg","low-avg"];
  const headline = score >= 125 ? "top 2% of adults"
                 : score >= 110 ? "top 16% — above average"
                 : score >= 95  ? "solidly in the average range"
                 :                "plenty of room to grow";
  const narrative = correct === total
    ? "Three out of three — clean sweep. Logic, patterns, language all clicked. Let's push harder."
    : correct === 2
      ? "Strong signal across sections. Training will lift the weaker one fastest."
      : correct === 1
        ? "One solid hit. The other two are exactly what daily training is for."
        : "Baseline captured. Good news: this is where the steepest gains come from.";
  const percentile = score >= 130 ? 98 : score >= 115 ? 84 : score >= 100 ? 50 : score >= 85 ? 16 : 5;

  const subscores = (breakdown && breakdown.length)
    ? breakdown.map(b => ({
        label: b.section,
        correct: b.correct,
        value: b.correct ? 115 : 90,
      }))
    : [
        { label: "pattern", correct: correct >= 1, value: correct >= 1 ? 115 : 90 },
        { label: "logic",   correct: correct >= 2, value: correct >= 2 ? 115 : 90 },
        { label: "verbal",  correct: correct >= 3, value: correct >= 3 ? 115 : 90 },
      ];

  // Bell curve points
  const bellPoints = React.useMemo(() => {
    const pts = [];
    for (let x = 55; x <= 145; x++) {
      const y = Math.exp(-Math.pow((x - 100)/15, 2) / 2);
      pts.push([x, y]);
    }
    return pts;
  }, []);

  const bellWidth = 640, bellHeight = 180;
  const xMap = (x) => ((x - 55) / 90) * bellWidth;
  const yMap = (y) => bellHeight - y * (bellHeight - 10);
  const pathD = "M " + bellPoints.map(([x,y]) => `${xMap(x)},${yMap(y)}`).join(" L ");
  const fillD = pathD + ` L ${bellWidth},${bellHeight} L 0,${bellHeight} Z`;

  return (
    <div style={{ minHeight: "100vh", display:"flex", flexDirection:"column" }}>
      <StatusStrip right={<span className="w-mono" style={{color:"var(--accent)"}}>● completed · {correct}/{total} correct</span>}/>

      <div style={{ padding: isMobile ? "28px 20px" : "48px 56px", maxWidth: 1280, margin: "0 auto", width: "100%" }}>
        {/* Hero */}
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr", gap: isMobile ? 24 : 48, alignItems:"center", marginBottom: 40 }}>
          <div>
            <span className="w-chip w-chip-accent"><Icons.check/> your iq assessment · apr 21, 2026</span>
            <h1 className="w-serif" style={{ fontSize: isMobile ? 34 : 54, lineHeight: 1.05, margin: "18px 0 8px", fontWeight: 400 }}>
              You scored <span style={{ fontStyle:"italic", color:"var(--accent)" }}>{score}</span> —<br/>
              {headline}.
            </h1>
            <p style={{ color: W.muted, fontSize: 16, lineHeight: 1.5, maxWidth: 460, marginBottom: 24 }}>
              {narrative}
            </p>
            <div style={{ display:"flex", gap: 12 }}>
              <button className="w-btn w-btn-primary" onClick={onContinue}>unlock full report <Icons.arrow/></button>
              <button className="w-btn w-btn-ghost" onClick={onRetake}>retake test</button>
            </div>
          </div>

          {/* Big score */}
          <div style={{
            border: `1px solid var(--accent)`, padding: 36, position:"relative",
            background: W.bgRaised, boxShadow: "0 0 80px -30px var(--accent-glow)",
          }}>
            <div className="w-scanline"/>
            <div className="w-mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform:"uppercase", color: W.mutedDim, marginBottom: 12 }}>
              IQ score · {correct}/{total} correct
            </div>
            <div style={{ display:"flex", alignItems:"baseline", gap: 12 }}>
              <span className="w-mono" style={{ fontSize: isMobile ? 80 : 120, fontWeight: 500, color:"var(--accent)", letterSpacing:"-0.04em", lineHeight: 0.9 }}>
                {score}
              </span>
              <div style={{ display:"flex", flexDirection:"column", gap: 2 }}>
                <span className="w-mono" style={{ fontSize: 13, color: W.muted }}>percentile</span>
                <span className="w-mono" style={{ fontSize: 26, color: W.text }}>{percentile}</span>
              </div>
            </div>
            <div style={{ display:"flex", gap: 1, marginTop: 20, background: W.line }}>
              {tiers.map((t,i) => (
                <div key={t} style={{ flex: 1, padding: "8px 10px", background: i===tierIndex ? "var(--accent-bg)" : W.bgSunken,
                  borderTop: i===tierIndex ? `2px solid var(--accent)` : `2px solid transparent`,
                  textAlign:"center" }}>
                  <div className="w-mono" style={{ fontSize: 10, color: i===tierIndex ? "var(--accent)" : W.mutedDim, textTransform:"uppercase", letterSpacing:"0.1em" }}>{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bell curve */}
        <TerminalCard title="distribution.svg" accent="var(--accent)" style={{ marginBottom: 32 }}>
          <div style={{ padding: "28px 36px 20px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 12 }}>
              <span className="w-mono" style={{ fontSize: 13, color: W.text }}>where you sit · normal distribution</span>
              <span className="w-mono" style={{ fontSize: 12, color: W.muted }}>n = 2.4M adults · σ = 15</span>
            </div>
            <svg viewBox={`0 0 ${bellWidth} ${bellHeight + 40}`} style={{ width: "100%", height: "auto" }}>
              {/* grid */}
              {[70, 85, 100, 115, 130].map(x => (
                <g key={x}>
                  <line x1={xMap(x)} x2={xMap(x)} y1={0} y2={bellHeight} stroke={W.line} strokeDasharray="2 4"/>
                  <text x={xMap(x)} y={bellHeight + 18} fontFamily={W.mono} fontSize="10" fill={W.mutedDim} textAnchor="middle">{x}</text>
                </g>
              ))}
              {/* fill */}
              <path d={fillD} fill="var(--accent-bg)"/>
              <path d={pathD} fill="none" stroke="var(--accent)" strokeWidth="1.5"/>
              {/* user marker */}
              <line x1={xMap(score)} x2={xMap(score)} y1={yMap(Math.exp(-Math.pow((score-100)/15,2)/2))} y2={bellHeight} stroke="var(--accent)" strokeWidth="2"/>
              <circle cx={xMap(score)} cy={yMap(Math.exp(-Math.pow((score-100)/15,2)/2))} r="6" fill="var(--accent)" stroke={W.bg} strokeWidth="2"/>
              <g transform={`translate(${xMap(score)}, ${yMap(Math.exp(-Math.pow((score-100)/15,2)/2)) - 14})`}>
                <rect x="-24" y="-18" width="48" height="18" fill={W.bgRaised} stroke="var(--accent)"/>
                <text x="0" y="-5" fontFamily={W.mono} fontSize="11" fill="var(--accent)" textAnchor="middle">you {score}</text>
              </g>
            </svg>
          </div>
        </TerminalCard>

        {/* Subscores + narrative */}
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr", gap: 24 }}>
          <div>
            <h3 className="w-mono" style={{ fontSize: 12, color: W.mutedDim, textTransform:"uppercase", letterSpacing:"0.14em", marginBottom: 16 }}>breakdown by section</h3>
            <div style={{ display:"flex", flexDirection:"column", gap: 14 }}>
              {subscores.map(s => (
                <div key={s.label}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 14, textTransform:"capitalize" }}>{s.label}</span>
                    <span className="w-mono" style={{ fontSize: 13, color: s.correct ? "var(--accent)" : W.mutedDim }}>
                      {s.correct ? <>✓ correct</> : <>✗ missed</>}
                    </span>
                  </div>
                  <div style={{ height: 6, background: W.bgSunken, border: `1px solid ${W.line}` }}>
                    <div style={{ width: s.correct ? "100%" : "30%", height: "100%", background: s.correct ? "var(--accent)" : W.line }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <TerminalCard title="insights.md" status="" accent="var(--accent)">
            <div style={{ padding: 24, fontSize: 14, lineHeight: 1.55 }}>
              <div className="w-mono" style={{ fontSize: 11, color:"var(--accent)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom: 12 }}>what this means</div>
              <ul style={{ margin: 0, padding: 0, listStyle:"none", color: W.text }}>
                {(correct === total ? [
                  "Three-for-three across pattern, logic, and verbal.",
                  "You reason quickly across modalities — a rare profile.",
                  "Training should push difficulty up, not volume.",
                ] : correct === 2 ? [
                  `Strong in ${subscores.filter(s=>s.correct).map(s=>s.label).join(" and ")}.`,
                  `The ${subscores.find(s=>!s.correct)?.label || "weakest"} section is your fastest lift.`,
                  "Short daily sessions in that domain move the score quickest.",
                ] : correct === 1 ? [
                  `${subscores.find(s=>s.correct)?.label || "One"} section locked in — that's your anchor.`,
                  "The other two are where training delivers the biggest gains.",
                  "Aim for 10 minutes a day, not heroic sessions.",
                ] : [
                  "Baseline captured — a starting line, not a ceiling.",
                  "Short daily reps reliably move IQ scores within weeks.",
                  "Pattern games are the best warm-up from here.",
                ]).map((t,i) => (
                  <li key={i} style={{ display:"flex", gap: 10, padding: "6px 0", borderTop: i ? `1px dashed ${W.line}` : "none" }}>
                    <span style={{ color:"var(--accent)", fontFamily: W.mono }}>›</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TerminalCard>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DesktopShell, StatusStrip, Onboarding, IQIntro, IQQuestion, IQResults });
