import test from 'node:test';
import assert from 'node:assert/strict';
import { brief, structure, feedback, buildTakeaway } from '../src/content.js';
test('reusable brief retains unresolved operational facts and distinguishes booking from collection', () => {
 for (const phrase of ['Management estimates','UNRESOLVED','DROP-OFF only','not a collection time','six days','Do not invent']) assert.ok(brief.includes(phrase),phrase);
 assert.ok(structure.includes('UNRESOLVED ASSUMPTIONS'));
});
test('each prepared takeaway keeps its chosen route and limits without accepting reflection text', () => {
 for (const key of ['A','B','C']) {
  const text = buildTakeaway(key);
  assert.ok(text.includes('Chosen route: '+key));
  assert.ok(text.includes(feedback[key].limit));
  assert.ok(text.includes('no AI analysis or scoring'));
 }
 assert.equal(buildTakeaway('invalid'), '');
});
