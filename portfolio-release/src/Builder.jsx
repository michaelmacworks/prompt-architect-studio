import React,{useEffect,useRef,useState} from 'react';
import {assembleBrief,builderFields,emptyInputs,optionalSample,promptFromBrief} from './builder.js';

export default function Builder({CopyControl}) {
 const [inputs,setInputs]=useState({...emptyInputs});
 const [step,setStep]=useState(1);
 const [error,setError]=useState('');
 const [result,setResult]=useState(null);
 const [brief,setBrief]=useState('');
 const [prompt,setPrompt]=useState('');
 const [promptBase,setPromptBase]=useState('');
 const [promptEdited,setPromptEdited]=useState(false);
 const [confirm,setConfirm]=useState('');
 const [leaveTo,setLeaveTo]=useState('');
 const leaveAllowed=useRef(false);
 const confirmation=useRef(null);
 const heading=useRef(null);
 const request=useRef(null);
 const shell=useRef(null);
 const changedOutput=!!result && (brief!==result.brief || prompt!==promptFromBrief(result.brief));
 const stalePrompt=promptBase!==brief;
 const staleInputs=!!result && JSON.stringify(inputs)!==JSON.stringify(result.inputs);
 const hasDraft=Object.values(inputs).some(value=>value.trim()) || !!brief || !!prompt;
 useEffect(()=>{
  heading.current?.focus({preventScroll:true});
  shell.current?.scrollIntoView({block:'start',behavior:'instant'});
 },[step]);
 useEffect(()=>{
  function warn(event){if(leaveAllowed.current)return;event.preventDefault();event.returnValue='';}
  function intercept(event){const link=event.target.closest?.('a[href]');if(!link || link.hasAttribute('download') || link.target==='_blank' || link.getAttribute('href').startsWith('#') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)return;event.preventDefault();setLeaveTo(link.href);setConfirm('leave');}
  if(hasDraft){window.addEventListener('beforeunload',warn);document.addEventListener('click',intercept);}
  return ()=>{window.removeEventListener('beforeunload',warn);document.removeEventListener('click',intercept);};
 },[hasDraft]);
 useEffect(()=>{if(confirm){confirmation.current?.focus({preventScroll:true});confirmation.current?.scrollIntoView({block:'center',behavior:'instant'});}},[confirm]);
 function update(key,value){setInputs(prev=>({...prev,[key]:value}));setError('');setConfirm('');}
 function next(event){event.preventDefault();if(!inputs.request.trim()){setError('Enter the request you want to work on.');request.current?.focus();return;}setStep(2);}
 function assemble(){
  const built=assembleBrief(inputs);
  setResult({...built,inputs:{...inputs}});setBrief(built.brief);setPrompt(promptFromBrief(built.brief));setPromptBase(built.brief);setPromptEdited(false);setConfirm('');setStep(3);
 }
 function build(event){event.preventDefault();if(changedOutput){setConfirm('rebuild');return;}assemble();}
 function editBrief(value){setBrief(value);if(!promptEdited){setPrompt(promptFromBrief(value));setPromptBase(value);}}
 function syncPrompt(){setPrompt(promptFromBrief(brief));setPromptBase(brief);setPromptEdited(false);setConfirm('');}
 function reset(){setInputs({...emptyInputs});setResult(null);setBrief('');setPrompt('');setPromptBase('');setPromptEdited(false);setConfirm('');setError('');setStep(1);}
 function download(text,name){
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download=name;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 return <section className="builder-panel" ref={shell} aria-label="Build your own brief">
  <ol className="builder-steps" aria-label="Builder steps">{['Your request','Useful details','Your brief & prompt'].map((label,i)=><li key={label} aria-current={step===i+1?'step':undefined}><span>{i+1}</span>{label}</li>)}</ol>
  <div className="builder-body">
   {step===1 && <form onSubmit={next} noValidate><p className="eyebrow">01 / START WITH YOUR REQUEST</p><h2 ref={heading} tabIndex="-1">What do you want to make?</h2><p className="builder-lede">A message, plan, summary, research brief, or something else. Start with what you have.</p><label className="input-label" htmlFor="rough-request">Your rough request <span>(required)</span></label><textarea id="rough-request" ref={request} rows="4" value={inputs.request} onChange={e=>update('request',e.target.value)} placeholder="Tell me what you want help with…" aria-describedby="request-hint request-error" aria-invalid={!!error}/><p id="request-hint" className="field-hint">Paste or type your own words. Only this field is required.</p><p id="request-error" role="alert" className="form-error">{error}</p><label className="input-label" htmlFor="desired-output">What should the AI produce? <span>(optional)</span></label><textarea id="desired-output" rows="2" value={inputs.output} onChange={e=>update('output',e.target.value)} placeholder="For example: an email, a comparison table, or a three-step plan."/><div className="builder-actions"><button className="primary" type="submit">Add useful details <span aria-hidden="true">→</span></button><button className="text-button" type="button" onClick={()=>{if(hasDraft)setConfirm('sample');else {setInputs({...optionalSample});setError('');}}}>Try a sample instead</button></div><p className="draft-notice">Your draft stays in this page’s memory. Nothing is sent to AI or saved by this app. Copy or download before leaving.</p></form>}
   {step===2 && <form onSubmit={build}><p className="eyebrow">02 / ADD WHAT YOU KNOW</p><h2 ref={heading} tabIndex="-1">A few details make the difference.</h2><p className="builder-lede">All fields below are optional. Leave a gap and it will be marked as not provided; your request is kept intact.</p><details className="request-review"><summary>Review your request</summary><p>{inputs.request}</p>{inputs.output && <p><strong>Desired output:</strong> {inputs.output}</p>}</details><div className="builder-fields">{builderFields.map(([key,label,hint])=><div key={key}><label className="input-label" htmlFor={'detail-'+key}>{label} <span>(optional)</span></label><textarea id={'detail-'+key} rows="3" value={inputs[key]} onChange={e=>update(key,e.target.value)} aria-describedby={'hint-'+key}/><p id={'hint-'+key} className="field-hint">{hint}</p></div>)}</div><div className="builder-actions"><button className="primary" type="submit">Create my brief &amp; prompt <span aria-hidden="true">→</span></button><button className="text-button" type="button" onClick={()=>{setConfirm('');setStep(1);}}>← Edit request</button>{result && <button className="text-button" type="button" onClick={()=>{setConfirm('');setStep(3);}}>Return to current output</button>}</div></form>}
   {step===3 && <><p className="eyebrow">03 / READY FOR YOUR AI TOOL</p><h2 ref={heading} tabIndex="-1">Your brief. Your next move.</h2><p className="builder-lede">Organized from your inputs, with a fixed structure. No AI has analyzed your request or carried out the task.</p>{staleInputs && <p className="builder-warning" role="status">Your inputs have changed. This is your previous output. Choose Edit inputs, then Create my brief &amp; prompt to rebuild it.</p>}<div className="missing-note"><strong>{result.missing.length?'Fields left blank when assembled':'Every section was filled when assembled.'}</strong><p>{result.missing.length?result.missing.join(' · ')+'. These may appear in your request; this tool does not extract or confirm them.':'Your supplied information remains unverified. Review facts and uncertainties before using it.'}</p></div><div className="output-grid"><article className="output-card"><p className="eyebrow">YOUR WORKING BRIEF</p><label className="input-label" htmlFor="editable-brief">Edit your brief</label><textarea id="editable-brief" rows="17" value={brief} onChange={e=>editBrief(e.target.value)}/><p className="field-hint">Changes update the prompt until you edit the prompt separately.</p><div className="output-actions"><CopyControl text={brief} label="Copy my brief"/><button className="text-button" onClick={()=>download(brief,'my-ai-brief.txt')}>Download brief .txt</button></div></article><article className="output-card prompt-card"><p className="eyebrow">COPY INTO YOUR PREFERRED AI</p><label className="input-label" htmlFor="editable-prompt">Edit your prompt</label><textarea id="editable-prompt" rows="17" value={prompt} onChange={e=>{setPrompt(e.target.value);setPromptEdited(true);}}/><p className="field-hint">Paste this into your AI tool to request the actual work. Review its answer against your facts and constraints.</p>{stalePrompt && <div className="builder-warning" role="status"><p>The brief changed after you edited this prompt. Choose which version to keep.</p><button className="text-button" onClick={()=>setConfirm('sync')}>Update prompt from brief</button><button className="text-button" onClick={()=>setPromptBase(brief)}>Keep my edited prompt</button></div>}<div className="output-actions"><CopyControl text={prompt} label="Copy my prompt" disabled={stalePrompt}/><button className="text-button" disabled={stalePrompt} onClick={()=>download(prompt,'my-ai-prompt.txt')}>Download prompt .txt</button></div></article></div><div className="builder-actions"><button className="text-button" onClick={()=>{setConfirm('');setStep(2);}}>← Edit inputs</button><button className="text-button" onClick={()=>setConfirm('reset')}>Start a new brief</button></div><p className="draft-notice">No autosave. Copy or download the version you want to keep before leaving this page. Your AI tool handles anything you paste into it under its own settings.</p></>}
   {confirm && <div className="replace-confirm" role="alert" ref={confirmation} tabIndex="-1"><p>{confirm==='leave'?'Leave this page? Your unsaved inputs and edits will be lost. Copy or download them first if you want to keep them.':confirm==='rebuild'?'Rebuilding replaces your edited brief and prompt. Your input fields will be kept.':confirm==='sync'?'Updating replaces your separate prompt edits with a prompt made from the current brief.':confirm==='sample'?'The sample replaces your current inputs. Use it only if you want to set your draft aside.':'Start a new brief? This clears the inputs and output on this page.'}</p><div className="builder-actions"><button className="primary" onClick={()=>{if(confirm==='leave'){leaveAllowed.current=true;window.location.assign(leaveTo);}else if(confirm==='rebuild')assemble();else if(confirm==='sync')syncPrompt();else if(confirm==='sample'){setInputs({...optionalSample});setResult(null);setBrief('');setPrompt('');setError('');setConfirm('');}else reset();}}>{confirm==='leave'?'Leave without saving':confirm==='rebuild'?'Rebuild and replace edits':confirm==='sync'?'Replace prompt edits':confirm==='sample'?'Replace with sample':'Clear and start again'}</button><button className="text-button" onClick={()=>setConfirm('')}>Keep my work</button></div></div>}
  </div>
 </section>;
}
