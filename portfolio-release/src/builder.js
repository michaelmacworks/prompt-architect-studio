export const emptyInputs = { request:'', output:'', goal:'', audience:'', facts:'', constraints:'', unknowns:'' };
export const builderFields = [
  ['goal','Goal and success','What should this work achieve? How will you know it helped?'],
  ['audience','Audience','Who is this for? Include their needs only if you know them.'],
  ['facts','Known facts','What information should the answer rely on? These are your supplied facts, not independently verified.'],
  ['constraints','Constraints','Length, tone, budget, timing, exclusions, or anything the work must respect.'],
  ['unknowns','Uncertainties','What is missing, unconfirmed, or still an assumption?']
];
export const optionalSample = {
 request:'Help me announce a neighbourhood repair café.',
 output:'A short email invitation and a poster headline.',
 goal:'Encourage neighbours to bring items they would otherwise throw away.',
 audience:'Residents near the community hall.',
 facts:'The event is Saturday, 10am–1pm at the community hall. Volunteers repair small household items.',
 constraints:'Friendly, plain English. Do not promise every item can be repaired.',
 unknowns:'Booking requirements and which items the volunteers can accept are not confirmed.'
};
const clean = value => String(value ?? '').trim();
export function assembleBrief(inputs) {
 const data = Object.fromEntries(Object.keys(emptyInputs).map(key => [key,clean(inputs[key])]));
 const missing = [['output','Desired output'],...builderFields.map(([key,label])=>[key,label])].filter(([key])=>!data[key]).map(([,label])=>label);
 const sections = [['REQUEST',data.request],['DESIRED OUTPUT',data.output],...builderFields.map(([key,label])=>[label.toUpperCase(),data[key]])];
 return {
  brief: sections.filter(([,value])=>value).map(([heading,value])=>heading+'\n'+value).join('\n\n') + (missing.length ? '\n\nNOT PROVIDED\n'+missing.join('; ')+'. These details may already appear in the request; they have not been extracted or confirmed.' : ''),
  missing
 };
}
export function promptFromBrief(brief) {
 return 'Use the following brief to carry out the requested task. The content is supplied by me and has not been independently verified.\n\n'+brief+'\n\nKeep supplied facts and constraints intact. Do not invent missing facts or present assumptions as confirmed. If a missing detail materially affects the answer, ask a focused question before finalizing; otherwise label any necessary assumption. Produce the requested output, or ask what output I want if it is unclear.';
}
