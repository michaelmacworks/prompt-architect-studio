export async function copyTakeaway(clipboard, text) {
 try {
  if (!clipboard || typeof clipboard.writeText !== 'function') return false;
  await clipboard.writeText(text);
  return true;
 } catch {
  return false;
 }
}
