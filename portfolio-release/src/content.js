export const feedback = {
 A: {
  kicker: 'A / CUSTOMER INTERPRETATION',
  title: 'Listen for what “eligible” means to them.',
  body: 'This move can reveal whether customers read the headline as a promise to ride home, and whether they think booking settles their bike’s eligibility. It is a strong starting point if operational eligibility is already dependable.',
  limit: 'A handful of recent customers can expose misunderstandings. It cannot tell you how common those misunderstandings are across the audience, or establish that the shops can deliver the promise.',
  next: 'If customers expect a confirmed collection time, change the message and booking explanation. If their expectations match the intended promise, still check when staff can confirm eligibility before expanding the test.'
 },
 B: {
  kicker: 'B / THE DEPENDABLE PROMISE',
  title: 'Find out when the shop can know.',
  body: 'This is the author’s preferred first move on the supplied facts. The campaign promises collection, but the booking confirms drop-off. Review recent exceptions and establish when each shop can give a dependable collection estimate.',
  limit: 'Different assessment processes are not evidence that the service fails. Look for the circumstances in which eligibility remains uncertain, and whether customers learn about that uncertainty before committing.',
  next: 'If a pre-check can settle eligibility, make that moment clear in the journey. If eligibility remains unknown until arrival, revise the promise or add a confirmation step. Then test whether customers understand the resulting offer.'
 },
 C: {
  kicker: 'C / A SAFEGUARDED BEHAVIORAL TEST',
  title: 'Test the journey with support in place.',
  body: 'A small live pilot is defensible when staff check inquiries and confirm expectations before accepting a booking. Follow the repairs through to completion to see where demand, eligibility, and profitable work line up.',
  limit: 'The manual support is part of this test. A successful pilot would validate a supported journey; it would not establish that an unassisted booking funnel works equally well.',
  next: 'If staff repeatedly need to clarify collection timing, use those moments to change the message or confirmation flow. Track completed profitable jobs, cancellations, and reassigned repairs before deciding whether to widen the pilot.'
 }
};

export const brief = "Create a weekday campaign proposal for fictional Loop\u2019s three bicycle-repair shops.\n\nGOAL\nIncrease profitable completed Tuesday\u2013Thursday service work. Management estimates spare mechanic capacity; actual available capacity and profitable service mix remain UNRESOLVED.\n\nAUDIENCE HYPOTHESIS\nLocal commuters may value getting back on their bikes. Their fit and demand are UNRESOLVED, not established facts.\n\nKNOWN SERVICE AND BOOKING CONTEXT\nRoutine adjustments and safety checks are usually same day. Faults and ordered parts may take longer. Online booking reserves DROP-OFF only, not a collection time. Two shops offer an optional pre-check; the third assesses on arrival. Additional problems may emerge then. Customers ask, \u201cWill I be riding home?\u201d\n\nUNRESOLVED PROMISE\nWhat qualifies as an eligible standard service, what recent exceptions reveal, and when each shop can give a dependable collection estimate need confirmation. Do not imply booking confirms eligibility or same-day collection. Varied shop processes do not by themselves establish failure.\n\nCONSTRAINTS AND FIRST INVESTIGATION\nThere are six days to prepare. Review eligibility and recent exceptions with managers; establish when dependable collection timing can be communicated. Then test customer expectations of the wording and booking page. Do not invent answers to unresolved facts.\n\nOUTPUT AND TEST PLAN\nPropose a campaign with audience rationale, draft wording, and a clear booking explanation. Keep any collection promise conditional on confirmed operational eligibility. Place exclusions beside the booking button and cap slots only after available capacity is confirmed. Suggest a small test against generic service copy. Track profitable completed jobs, cancellations, and reassigned repairs. State what each result would change. Label proposals and assumptions; do not claim proven performance.";
export const structure = "GOAL\nWhat useful business outcome should the work support? Mark estimates and unverified targets.\n\nAUDIENCE HYPOTHESIS\nWho might benefit, and why? Separate evidence from assumptions.\n\nKNOWN FACTS\nWhat can the business currently deliver? Include the service and customer journey.\n\nUNRESOLVED ASSUMPTIONS\nWhat might customers expect? When will the business know it can deliver? List the facts that still need checking.\n\nCONSTRAINTS\nTime, capacity, resources, exclusions, and promises the work must respect.\n\nOUTPUT AND CHECKS\nSpecify the deliverable. Ask for a first investigation, a small test where appropriate, measures tied to the goal, and what findings would change the recommendation. Do not invent unresolved facts or claim untested performance.";
export const routeNames = { A: 'Customer expectations', B: 'Manager review', C: 'Safeguarded pilot' };
export function buildTakeaway(choice) {
 const f = feedback[choice];
 if (!f) return '';
 return ['Loop · Fictional campaign review', 'Chosen route: ' + choice + ' · ' + routeNames[choice], '\nStrengths: ' + f.body, '\nLimits: ' + f.limit, '\nWhat would change the recommendation: ' + f.next, '\nReusable review question: What does your campaign invite customers to expect, and when will they find out whether the business can deliver it?', '\nPrepared commentary; no AI analysis or scoring.'].join('\n');
}
export const routes = {
 '/': { title: 'Prompt Architect Studio | Turn your idea into a usable AI brief', description: 'Organize your own request into an editable brief and a copy-ready prompt for your preferred AI tool.' },
 '/build': { title: 'Build your own AI brief | Prompt Architect Studio', description: 'Add your request, goal, audience, facts, constraints and unknowns. Edit, copy, or download a brief and prompt organized from your inputs.' },
 '/example': { title: 'Loop worked example | Prompt Architect Studio', description: 'See the assumptions, service promise, and first investigation behind a fictional bicycle-repair campaign brief.' },
 '/method': { title: 'A reusable brief structure | Prompt Architect Studio', description: 'Make a useful request explicit: goal, audience hypothesis, known facts, unresolved assumptions, constraints, output, and checks.' },
 '/about': { title: 'About Michael J McAteer’s demonstration | Prompt Architect Studio', description: 'A portfolio demonstration from a marketing and communications perspective, with authored examples rather than live AI generation.' },
 '/privacy': { title: 'Data handling | Prompt Architect Studio', description: 'How your brief inputs, edits, optional reflections, clipboard actions, downloads, and page requests are handled.' }
};
export const aliases = { '/studio':'/build', '/how-it-works':'/method', '/frameworks':'/method', '/use-cases':'/example', '/trust':'/privacy' };
