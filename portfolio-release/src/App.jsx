import React, { useEffect, useId, useRef, useState } from 'react';
import { aliases, brief, buildTakeaway, feedback, routeNames, routes, structure } from './content.js';
import { copyTakeaway } from './clipboard.js';
import './styles.css';
import Builder from './Builder.jsx';

const transfer = 'What does your campaign invite customers to expect, and when will they find out whether the business can deliver it?';
const path = typeof window === 'undefined' ? '/' : window.location.pathname.replace(/\/$/, '') || '/';
const route = aliases[path] || path;

function CopyControl({ text, label, compact = false, disabled = false }) {
  const [state, setState] = useState('idle');
  const textarea = useRef(null);
  const id = useId();
  useEffect(() => { if (state === 'fallback') { textarea.current?.focus(); textarea.current?.select(); } }, [state]);
  useEffect(() => {setState('idle');}, [text]);
  async function copy() {
    setState('pending');
    setState(await copyTakeaway(navigator.clipboard, text) ? 'success' : 'fallback');
  }
  return <div className={'copy-control' + (compact ? ' compact-copy' : '')}>
    <button type="button" className={compact ? 'text-button' : 'primary'} disabled={disabled || state === 'pending'} onClick={copy}>{label} <span aria-hidden="true">↗</span></button>
    <p className="copy-status" role="status" aria-live="polite">{state === 'success' ? 'Copied. Ready to paste into your own work.' : state === 'fallback' ? 'Automatic copy unavailable. Use the text below.' : ''}</p>
    {state === 'fallback' && <div className="copy-fallback"><label className="input-label" htmlFor={id}>Select and copy this text manually.</label><textarea id={id} ref={textarea} value={text} rows="7" readOnly /></div>}
  </div>;
}

function Header({currentRoute = route}) {
  return <><a className="skip-link" href="#main">Skip to content</a><header className="site-header">
    <a className="brand" href="/" aria-label="Prompt Architect Studio home"><span className="brand-mark" aria-hidden="true">PA</span><span>Prompt Architect Studio</span></a>
    <nav className="site-nav" aria-label="Main navigation">{[['Build a brief','/build'],['Example','/example'],['Method','/method'],['About','/about']].map(([label, href]) => <a key={href} href={href} aria-current={currentRoute === href ? 'page' : undefined}>{label}</a>)}</nav>
  </header></>;
}

function Footer() {
  return <footer className="demo-footer"><div><a href="https://michaeljmcateer.com/">Michael J McAteer</a><p>A marketing &amp; communications perspective.</p></div><nav aria-label="Footer navigation"><a href="/">Home</a><a href="/build">Build a brief</a><a href="/example">Worked example</a><a href="/method">Method</a><a href="/about">About</a><a href="/privacy">Data handling</a></nav><p className="footer-disclosure">Briefs organized from your inputs. The Loop example is fictional. No live AI generation.</p></footer>;
}

function Hero({ eyebrow, title, description, example = false }) {
  return <div className="intro"><div><p className="eyebrow">{eyebrow}</p><h1 id="page-heading" tabIndex="-1">{title}</h1></div><div className="intro-copy"><p className="intro-note">{description}</p>{example && <p className="authorship">Fictional Loop case · Authored example<br />No live AI run or performance claim.</p>}</div></div>;
}

function BriefPair() {
  return <div className="brief-pair"><article className="rough-card"><p className="eyebrow">01 / THE ROUGH REQUEST</p><h2>A direction.<br />Still missing decisions.</h2><blockquote>“Create a weekday campaign for our bike shops. We have room for more service work and want to reach local commuters.”</blockquote><p className="card-note">The request gives a direction, but leaves the capacity, audience, and service promise untested.</p></article><article className="improved-card"><p className="eyebrow">02 / THE CLEARER BRIEF · EXCERPT</p><h2>Make the assumptions<br />visible.</h2><ul><li><strong>Goal:</strong> profitable Tuesday–Thursday work. Management estimates spare mechanic capacity; verify it.</li><li><strong>Audience:</strong> local commuters are a hypothesis, not a proven fit.</li><li><strong>Promise:</strong> booking reserves drop-off. Same-day collection and service eligibility are not confirmed by booking.</li><li><strong>Before launch:</strong> establish when each shop can confirm eligibility, then test customer understanding.</li></ul></article></div>;
}

function AuthoredReview() {
  return <div className="authored-review"><div className="review-heading"><p className="eyebrow">THE DECISIONS BEHIND THE BRIEF</p><h2>A useful idea.<br />A promise to resolve.</h2></div><div className="review-points"><article><span className="fact-label">WHAT WORKS</span><p>Weekday service could connect estimated spare capacity to commuters’ wish to ride again. The audience fit still needs testing.</p></article><article><span className="fact-label">THE CRITICAL ASSUMPTION</span><p>The shop knows what “eligible” means. A customer may think booking has already confirmed collection.</p></article><article><span className="fact-label">THE NEXT MOVE</span><p>Clarify when the shop can make the promise dependable. Then test what customers understand from the campaign and booking page.</p></article></div></div>;
}

function BriefUtility() {
  return <div className="utility"><div className="utility-heading"><div><p className="eyebrow">PUT THE CLEARER BRIEF TO WORK</p><h2>Keep what is known.<br />Mark what is unresolved.</h2><p className="lede">The complete instruction keeps the six-day constraint and service details. Unknowns stay visible.</p></div><CopyControl text={brief} label="Copy the brief" /></div><details className="full-brief"><summary>Read the complete revised instruction</summary><pre>{brief}</pre></details><div className="structure-row"><div><span className="fact-label">USE THE SAME SHAPE ON YOUR OWN REQUEST</span><p>Goal → audience hypothesis → known facts → unresolved assumptions → constraints → output and checks.</p></div><CopyControl compact text={structure} label="Copy reusable structure" /></div><details><summary>Read the reusable structure</summary><pre>{structure}</pre></details></div>;
}

function Explore() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(1);
  const [note, setNote] = useState('');
  const [choice, setChoice] = useState('');
  const [error, setError] = useState(false);
  const [revision, setRevision] = useState(0);
  const headings = useRef({});
  const workbench = useRef(null);
  const noteId = useId();
  const radioName = useId();
  useEffect(() => {
    if (active) {
      headings.current[step]?.focus({preventScroll:true});
      const top = workbench.current?.getBoundingClientRect().top + window.scrollY - 18;
      window.scrollTo({top: Math.max(0, top || 0), behavior:'instant'});
    }
  }, [active, step]);
  useEffect(() => {
    if (active && step === 3) {
      headings.current[3]?.focus({preventScroll:true});
      const top = workbench.current?.getBoundingClientRect().top + window.scrollY - 18;
      window.scrollTo({top:Math.max(0,top || 0),behavior:'instant'});
    }
  }, [choice]);
  function close() {
    setActive(false);
    document.getElementById('page-heading')?.focus({preventScroll:true});
    window.scrollTo({top:0, behavior:'instant'});
  }
  function reset() { setNote(''); setChoice(''); setError(false); setRevision(r => r + 1); setStep(1); }
  function examine() {
    if (!choice) { setError(true); document.querySelector('input[name="' + radioName + '"]')?.focus(); return; }
    setStep(3);
  }
  const selected = feedback[choice];
  const choiceDescriptions = {
    A: ['Ask recent customers what they expect.', 'Show a handful the campaign and booking page. Ask what “eligible” and the booking mean to them.'],
    B: ['Review the promise with shop managers.', 'Look at eligibility and recent exceptions. Establish when a dependable collection estimate is possible.'],
    C: ['Run a small, safeguarded live pilot.', 'Staff check inquiries and confirm expectations before accepting bookings. Follow jobs to completion.']
  };
  return <>
    <div className="optional-invite"><div><p className="eyebrow">OPTIONAL / ANOTHER WAY TO LOOK AT IT</p><h2>Explore another approach.</h2><p>See the strengths and limits of three first investigations. Prepared commentary; your reflection is not analyzed.</p></div><button className="primary" onClick={() => setActive(true)}>Explore another approach <span aria-hidden="true">→</span></button></div>
    <section className="optional-exercise" aria-label="Optional practice exercise" hidden={!active}>
      <div className="exercise-top"><p className="eyebrow">OPTIONAL PRACTICE · SAME FICTIONAL CASE</p><button className="text-button" onClick={close}>← Back to worked example</button></div>
      <div className="workbench" ref={workbench}><aside className="case-rail"><p className="eyebrow">FICTIONAL PRACTICE CASE</p><div className="loop-mark" aria-hidden="true">Loop<span>↗</span></div><p>Three bicycle-repair shops.<br />One weekday opportunity.</p><div className="rail-rule" /><ol className="steps" aria-label="Exercise steps">{['Review campaign','Choose next move','Read commentary'].map((label,index) => <li key={label} aria-current={step === index+1 ? 'step' : undefined}><span>0{index+1}</span>{label}</li>)}</ol><p className="simulation-note">Authored AI simulation.<br />Fictional business.<br />No model is called.</p></aside><div className="exercise">
        <section hidden={step !== 1} aria-labelledby="exercise-brief-heading"><div className="section-top"><p className="eyebrow">01 / THE BRIEF</p><span className="chip">6 days to prepare</span></div><h2 id="exercise-brief-heading" ref={el => headings.current[1] = el} tabIndex="-1">Fill the quiet weekdays.</h2><p className="lede">Loop wants more <strong>profitable Tuesday–Thursday repair work.</strong> Management estimates that mechanic capacity is available.</p><div className="facts"><div><span className="fact-label">THE SERVICE</span><p>Routine adjustments and safety checks are usually same day. Faults or ordered parts may take longer.</p></div><div><span className="fact-label">THE BOOKING</span><p>Customers reserve a <strong>drop-off</strong>, not a collection time. They ask: <em>“Will I be riding home?”</em></p></div></div><details key={'facts'+revision}><summary>A detail about the three shops</summary><p>Two shops offer an optional pre-check. The third assesses the bike on arrival. Problems beyond the standard service can emerge at that point. Different processes do not, by themselves, mean the promise will fail.</p></details><div className="campaign"><div className="campaign-top"><p className="eyebrow">SIMULATED AI RECOMMENDATION</p><span>↗ LOCAL COMMUTERS</span></div><h3>Ready for<br />tomorrow’s ride.</h3><p>Same-day collection for eligible standard services.<br />Book Tuesday–Thursday.</p><div className="campaign-footer"><span className="mock-cta">Book a drop-off <span aria-hidden="true">↗</span></span><small>Exclusions beside the booking button</small></div></div><details key={'measures'+revision}><summary>The suggested test and measures</summary><p>Cap the slots. Run a small test against generic service copy. Track profitable completed jobs, cancellations, and repairs reassigned after booking. This is a suggested campaign, not an executed test.</p></details><div className="actions"><span className="action-hint">What would you investigate first?</span><button className="primary" onClick={() => setStep(2)}>Review the campaign <span aria-hidden="true">→</span></button></div></section>
        <section hidden={step !== 2} aria-labelledby="exercise-choice-heading"><div className="section-top"><p className="eyebrow">02 / YOUR JUDGMENT</p><span className="chip">No single scored answer</span></div><h2 id="exercise-choice-heading" ref={el => headings.current[2] = el} tabIndex="-1">Choose your next move.</h2><p className="lede">What assumption would you check before approving the campaign? Reflect if you like, then choose your first investigation.</p><label className="input-label" htmlFor={noteId}>Your private reflection (optional)</label><textarea id={noteId} value={note} onChange={e => setNote(e.target.value)} rows="3" maxLength="600" placeholder="I’m assuming that…" aria-describedby={noteId+'-hint'} /><div className="input-meta"><p id={noteId+'-hint'}>Not sent or saved. Stays in this tab until refresh or reset.</p><span>{note.length} / 600</span></div><fieldset><legend>Choose your first move</legend>{Object.entries(choiceDescriptions).map(([key,[title,description]]) => <label className="choice" key={key}><input type="radio" name={radioName} value={key} checked={choice === key} onChange={() => {setChoice(key); setError(false);}} /><span className="choice-letter">{key}</span><span><strong>{title}</strong><span>{description}</span></span></label>)}</fieldset>{error && <p className="form-error" role="alert">Choose a first move to continue. Your reflection is optional.</p>}<div className="actions"><button className="text-button" onClick={() => setStep(1)}>← Back to brief</button><button className="primary" onClick={examine}>Read commentary <span aria-hidden="true">→</span></button></div></section>
        <section hidden={step !== 3} aria-labelledby="exercise-commentary-heading"><div className="section-top"><p className="eyebrow">03 / COMMENTARY</p><span className="chip">A reasoned view, not a score</span></div><h2 id="exercise-commentary-heading" ref={el => headings.current[3] = el} tabIndex="-1">Read the prepared commentary.</h2><p className="lede">Prepared commentary for your selected move. Your reflection is not analyzed or scored.</p>{note.trim() && <div className="your-note"><span className="fact-label">YOUR REFLECTION</span><p>{note.trim()}</p></div>}{selected && <><div className="feedback"><p className="eyebrow">{selected.kicker}</p><h3>{selected.title}</h3><p className="chosen-route">Your chosen route: {choice} · {routeNames[choice]}</p><span className="fact-label">STRENGTHS OF THIS APPROACH</span><p>{selected.body}</p><div className="watch"><span className="fact-label">LIMITS TO KEEP IN VIEW</span><p>{selected.limit}</p></div><div className="next-move"><span className="fact-label">WHAT WOULD CHANGE THE RECOMMENDATION</span><p>{selected.next}</p></div></div><details className="editorial" key={choice+revision}><summary>The author’s preferred starting point</summary><p>On these facts, the author would start with <strong>B: review the promise with managers.</strong> The campaign promises collection while booking confirms drop-off. Find out when that gap matters and when the shops can make the promise dependable; then test customers’ interpretation.</p><p>A or C can be defensible when your reasoning identifies the uncertainty addressed and explains how a finding would change the action.</p></details><div className="transfer"><p className="eyebrow">TAKE IT INTO YOUR WORK</p><h3>{transfer}</h3><CopyControl key={choice+'copy'+revision} text={buildTakeaway(choice)} label="Copy takeaway" /></div></>}<div className="explore"><p className="fact-label">EXPLORE ANOTHER FIRST MOVE</p><div className="explore-buttons">{Object.keys(feedback).map(key => <button key={key} aria-pressed={choice === key} onClick={() => setChoice(key)}>{key} · {key === 'A' ? 'Customers' : key === 'B' ? 'Managers' : 'Safeguarded pilot'}</button>)}</div></div><div className="actions"><button className="text-button" onClick={() => setStep(2)}>← Edit your first move</button><button className="text-button" onClick={reset}>Restart exercise ↺</button></div></section>
      </div></div>
    </section>
  </>;
}

function WorkedExample() { return <section className="worked-example" aria-label="Rough request and improved brief"><BriefPair /><AuthoredReview /><BriefUtility /><Explore /></section>; }

function Method() {
  const parts = [
    ['01','Goal','Name the useful outcome. Separate confirmed facts from estimates and targets.'],
    ['02','Audience hypothesis','Say who might benefit and why. Mark what you still need to learn.'],
    ['03','Known facts','Include what the business can deliver and what the customer journey actually confirms.'],
    ['04','Unresolved assumptions','Make the gaps visible. Say what needs checking before a promise or action is dependable.'],
    ['05','Constraints','Keep time, capacity, resources, exclusions, and boundaries in the request.'],
    ['06','Output and checks','Specify the deliverable, first investigation, measures, and findings that would change the recommendation.']
  ];
  return <><Hero eyebrow="METHOD / A REUSABLE STRUCTURE" title={<>Make the decisions<br />part of the request.</>} description="A clearer brief makes goals, facts, assumptions, and checks explicit. It does not guarantee a good answer." /><div className="method-grid">{parts.map(([number,title,body]) => <article className="method-card" key={number}><span className="eyebrow">{number}</span><h2>{title}</h2><p>{body}</p></article>)}</div><div className="utility"><div className="utility-heading"><div><p className="eyebrow">START WITH THE STRUCTURE</p><h2>Use it on your own work.</h2><p className="lede">Replace the prompts with your context. Leave unknowns unresolved until you have evidence.</p></div><CopyControl text={structure} label="Copy reusable structure" /></div><details className="full-brief"><summary>Read the reusable structure</summary><pre>{structure}</pre></details></div><p className="page-next"><a href="/example">See the structure in the Loop worked example →</a></p></>;
}

function About() {
  return <><Hero eyebrow="ABOUT / THE PERSPECTIVE" title={<>Clearer requests.<br />Visible judgment.</>} description="A portfolio demonstration by Michael J McAteer, from a marketing and communications perspective." /><article className="prose-panel"><p className="eyebrow">MICHAEL J MCATEER</p><h2>The decisions behind the words.</h2><p>Prompt Architect Studio demonstrates how a rough request can become a more useful AI brief: by connecting the goal to the audience, examining the promise, and making uncertainty visible.</p><p>The builder organizes your own words into an editable brief and a copy-ready prompt. It uses a fixed structure, without inferring facts or calling an AI model. You take the prompt to your preferred AI tool for the actual work.</p><p>The Loop example and its commentary are authored for this demonstration. Loop is fictional; no campaign was run, no performance was measured, and no model generates an answer here.</p><p>The optional exercise lets you explore the strengths and limits of different first investigations. It offers prepared perspectives, without analyzing or scoring your reflection.</p><div className="prose-links"><a className="primary-link" href="/build">Build your own brief →</a><a href="/example">See the worked example →</a><a href="https://michaeljmcateer.com/">Michael’s portfolio ↗</a></div></article></>;
}

function DataHandling() {
  return <><Hero eyebrow="DATA HANDLING / THIS DEMONSTRATION" title={<>Your words stay here.<br />You choose what to copy.</>} description="What this version does with your input and clipboard actions." /><article className="prose-panel"><h2>Your brief and prompt</h2><p>The builder keeps your inputs and edits in this page’s memory. It does not submit them to a server, send them to an AI provider, or save them in cookies, local storage, or a database. Reloading or leaving the page can lose your draft; site links ask before discarding a draft, and browsers that support it warn on reload or tab close. Start a new brief clears it after your confirmation. Copy or download anything you want to keep.</p><h2>Your optional reflection</h2><p>The app keeps your reflection in page memory while you explore the same example. It is not submitted to a server, sent to an AI provider, or saved in cookies, local storage, or a database by this app. Refreshing the page or restarting the exercise clears it. Reflections are not shared between pages.</p><h2>Copy actions</h2><p>A copy button writes the selected brief, prompt, structure, or prepared takeaway to your browser’s clipboard. If copying is unavailable, the app shows selectable text. The prepared takeaway does not include your optional reflection. Downloads create plain text files on your device. Your browser and operating system manage downloaded files, clipboard history, and permissions. Anything you paste into another AI tool is handled by that tool under its own settings.</p><h2>Page requests</h2><p>This version loads its scripts, styles, and images from the site itself. It includes no application analytics, tracking cookies, or live AI calls. The local preview sends page and asset requests to the local server. If published, hosting logs and the hosting provider’s handling of those requests may apply.</p><h2>Keep sensitive material out</h2><p>Keep passwords, API keys, and confidential information out of inputs unless you have considered how your browser, downloads, clipboard, and eventual AI destination handle them. The optional exercise is a fictional practice case. These statements describe this implementation; they are not a claim of legal or regulatory compliance.</p><p><a href="/about">About this demonstration →</a></p></article></>;
}

export function App({pageRoute = route}) {
  const route=pageRoute;
  useEffect(() => {
    const metadata = routes[route] || {title:'Page not found | Prompt Architect Studio',description:'Return to the worked example or reusable method.'};
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', 'https://promptarchitectstudio.com'+(routes[route] ? route : '/'));
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://promptarchitectstudio.com'+(routes[route] ? route : '/'));
  }, []);
  let page;
  if (route === '/') page = <><Hero eyebrow="PROMPT ARCHITECT STUDIO / FROM IDEA TO ACTION" title={<>Turn your rough idea<br />into a usable AI brief.</>} description="Bring your request. Add what matters. Leave with an editable brief and a prompt you can use in your preferred AI tool." /><div className="home-actions"><a className="primary-link" href="/build">Build my brief <span aria-hidden="true">→</span></a><a href="/example">See an example →</a><p>Free to use here. No account or AI connection needed.</p></div><div className="home-path">{[['01','Start with your words','Paste a rough request and say what you want the AI to produce.'],['02','Add what you know','Clarify the goal, audience, facts, constraints, and unknowns. Every detail is optional.'],['03','Take something useful away','Edit your brief, then copy or download a prompt for your AI tool.']].map(([number,title,text])=><article key={number}><p className="eyebrow">{number}</p><h2>{title}</h2><p>{text}</p></article>)}</div><div className="home-example"><div><p className="eyebrow">SEE THE METHOD AT WORK</p><h2>A clearer request makes uncertainty visible.</h2><p>In the fictional Loop example, booking a drop-off does not confirm same-day collection. See how that distinction becomes part of the brief.</p><a href="/example">Read the worked example →</a></div><blockquote>“Do not imply booking confirms eligibility or same-day collection.”<cite>From the Loop revised brief</cite></blockquote></div><div className="maker-note"><p>By <a href="/about">Michael J McAteer</a> · A marketing &amp; communications perspective.</p><a href="/method">See the reusable method →</a></div></>;
  else if (route === '/build') page = <><Hero eyebrow="BUILD YOUR BRIEF / YOUR WORDS, ORGANIZED" title={<>A useful brief starts<br />with what you know.</>} description="Prepare the request here. Use the prompt in your AI tool to do the work. This builder organizes your inputs with a fixed structure." /><Builder CopyControl={CopyControl} /></>;
  else if (route === '/example') page = <><Hero eyebrow="WORKED EXAMPLE / LOOP" title={<>A weekday campaign.<br />A clearer starting point.</>} description="A fictional example showing how the goal, customer expectation, and operational uncertainty become part of a useful brief." example /><WorkedExample /><p className="page-next"><a href="/build">Ready to work on your own request? Build a brief →</a></p></>;
  else if (route === '/method') page = <Method />;
  else if (route === '/about') page = <About />;
  else if (route === '/privacy') page = <DataHandling />;
  else page = <><Hero eyebrow="PAGE NOT FOUND" title="Return to a useful starting point." description="That page is not part of this demonstration." /><div className="prose-panel"><a href="/">Go to the homepage →</a></div></>;
  return <div className="page-shell"><Header currentRoute={route} /><main id="main" tabIndex="-1">{page}</main><Footer /></div>;
}

