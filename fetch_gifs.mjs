async function fetchMedia() {
  const tenorUrl = 'https://tenor.com/view/dudu-dudu-bubu-dudu-bubu-love-bubu-dudu-love-bubu-love-dudu-gif-10014143842461151933';
  const sigstickUrl = 'https://www.sigstick.com/pack/l3XP16i4jNpGBntzrSqF-bubu-and-dudu';

  console.log('--- Fetching Tenor ---');
  try {
    const res = await fetch(tenorUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const text = await res.text();
    const matches = text.match(/https:\/\/[^"'\s\\]+\.(?:gif|mp4|webp)/gi) || [];
    console.log('Tenor links:', [...new Set(matches)]);
  } catch (e) {
    console.error('Tenor err:', e);
  }

  console.log('--- Fetching Sigstick ---');
  try {
    const res2 = await fetch(sigstickUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const text2 = await res2.text();
    const matches2 = text2.match(/https:\/\/[^"'\s\\]+\.(?:gif|png|webp|jpg)/gi) || [];
    console.log('Sigstick links:', [...new Set(matches2)].slice(0, 30));
  } catch (e) {
    console.error('Sigstick err:', e);
  }
}

fetchMedia();
