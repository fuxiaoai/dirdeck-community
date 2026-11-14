async page => {
 // Run after opening the repository's /tree/<ref> URL; other starting URLs audit main.
 const path = await page.evaluate(() => location.pathname);
 const ref = path.includes('/tree/') ? path.split('/tree/')[1] : 'main';
 const results=[];
 for (const lang of ['zh','en']) {
  const url=lang==='zh'?`https://github.com/fuxiaoai/dirdeck-community/tree/${ref}`:`https://github.com/fuxiaoai/dirdeck-community/blob/${ref}/README.en.md`;
  await page.goto(url);
  await page.locator('article.markdown-body').waitFor();
  for (const theme of ['light','dark']) {
   await page.emulateMedia({colorScheme:theme});
   // Apply GitHub's own native theme selector for a signed-out render audit.
   await page.evaluate(t=>document.documentElement.setAttribute('data-color-mode',t),theme);
   for (const width of [1440,390,320]) {
    await page.setViewportSize({width,height:1000});
    const article=page.locator('article.markdown-body');
    await article.evaluate(el=>el.querySelectorAll('details').forEach(d=>d.open=true));
    const expectedTitle = `hero-${lang}-${theme}${width<=600?'-mobile':''}.webp`;
    await page.waitForFunction(expected=>{
     const images=[...document.querySelectorAll('article img')];
     return images.length===11 && images.every(i=>i.complete&&i.naturalWidth>0) && images[0].currentSrc.endsWith(expected);
    }, expectedTitle);
    const facts=await article.evaluate(el=>({
     overflow:el.scrollWidth>el.clientWidth+1,
     pageOverflow:document.documentElement.scrollWidth>innerWidth,
     images:[...el.querySelectorAll('img')].map(i=>({alt:!!i.alt,loaded:i.complete&&i.naturalWidth>0,source:i.currentSrc})),
     brokenAnchors:[...el.querySelectorAll('a[href^="#"]')].filter(a=>![decodeURIComponent(a.hash.slice(1)), 'user-content-'+decodeURIComponent(a.hash.slice(1))].some(id=>document.getElementById(id)||document.getElementsByName(id).length)).map(a=>a.hash),
     heading:el.querySelector('h1 img')?.alt,
     background:getComputedStyle(document.body).backgroundColor
    }));
    if(facts.overflow||facts.pageOverflow||facts.images.some(i=>!i.loaded||!i.alt)||facts.brokenAnchors.length)throw Error(JSON.stringify({lang,theme,width,...facts}));
    if(!facts.images[0].source.endsWith(`hero-${lang}-${theme}${width<=600?'-mobile':''}.webp`))throw Error('Wrong themed title');
    await article.evaluate(el=>el.querySelectorAll('details').forEach(d=>d.open=false));
    await article.scrollIntoViewIfNeeded();
    await article.screenshot({path:`/tmp/dirdeck-community-${lang}-${theme}-${width}.png`});
    results.push({lang,theme,width,images:facts.images.length,overflow:false,brokenAnchors:0,background:facts.background});
   }
  }
 }
 return results;
}
