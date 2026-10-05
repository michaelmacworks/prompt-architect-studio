import test from 'node:test';
import assert from 'node:assert/strict';
import { copyTakeaway } from '../src/clipboard.js';
test('copy reports success only after writing the complete takeaway', async () => {
 let copied;
 const text = 'Chosen route: B\nStrengths and limits\nReusable question';
 assert.equal(await copyTakeaway({writeText: async value => copied = value}, text), true);
 assert.equal(copied, text);
});
test('denied clipboard access requests manual-copy fallback', async () => {
 assert.equal(await copyTakeaway({writeText: async () => {throw new Error('denied');}}, 'takeaway'), false);
});
test('missing clipboard requests manual-copy fallback', async () => {
 assert.equal(await copyTakeaway(undefined, 'takeaway'), false);
});
