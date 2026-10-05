import test from 'node:test';
import assert from 'node:assert/strict';
import {assembleBrief,emptyInputs,promptFromBrief} from '../src/builder.js';
const cases=[
 {request:'Draft a donor email for our community garden.',output:'An email under 150 words.',goal:'Invite donations for raised beds.',audience:'Existing supporters.',facts:'We need £1,200; donations close 20 October.',constraints:'No tax-deductibility claim.',unknowns:'Volunteer availability is unconfirmed.'},
 {request:'Compare two CRM migration approaches.',output:'A table with risks and an action plan.',goal:'Avoid losing customer history.',audience:'A three-person operations team.',facts:'Current export has 8,420 records. Some emails are duplicated.',constraints:'Budget $900. No external uploads.',unknowns:'The target schema and API limits are unknown.'},
 {request:'Explain photosynthesis to my study group.\nUse the phrase “light → chemical energy”.',output:'A one-page revision guide.',goal:'Understand what plants need and what they produce.',audience:'Adult learners.',facts:'We have covered chloroplasts.',constraints:'Plain English; no exam answers.',unknowns:'Prior knowledge varies.'}
];
for(const [i,input] of cases.entries())test('arbitrary input '+(i+1)+' preserves each supplied detail exactly once in brief and prompt',()=>{
 const {brief,missing}=assembleBrief(input);assert.deepEqual(missing,[]);
 for(const value of Object.values(input)){assert.ok(brief.includes(value));assert.equal(brief.split(value).length-1,1);}
 const prompt=promptFromBrief(brief);assert.ok(prompt.includes(brief));assert.ok(prompt.includes('Do not invent missing facts'));assert.ok(!prompt.includes('Loop'));
});

test('incomplete inputs are identified without inferring or fabricating details',()=>{
 const {brief,missing}=assembleBrief({...emptyInputs,request:'Write an email to Ada.'});
 assert.equal(missing.length,6);assert.ok(brief.startsWith('REQUEST\nWrite an email to Ada.'));assert.ok(brief.includes('NOT PROVIDED'));assert.ok(!brief.includes('Dear Ada'));assert.ok(!brief.includes('customers'));
});
test('newlines, punctuation, literal markup and long input survive without truncation',()=>{
 const text='Literal <script>alert("x")</script>\n£ € $ ` ${x} — café\n'+ 'very-long-word'.repeat(1500);
 const result=assembleBrief({...emptyInputs,request:text,constraints:'Keep line breaks.'});assert.ok(result.brief.includes(text));assert.ok(promptFromBrief(result.brief).includes(text));
});
test('prompt uses current edited brief without carrying old content',()=>{
 const first=assembleBrief(cases[0]).brief;const edited=first.replace('£1,200','£1,400');const prompt=promptFromBrief(edited);assert.ok(prompt.includes('£1,400'));assert.ok(!prompt.includes('£1,200'));
});
