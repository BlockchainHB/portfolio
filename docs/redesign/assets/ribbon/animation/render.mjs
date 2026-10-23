import { chromium } from 'playwright';
import { mkdirSync, rmSync } from 'fs';
const [scene, theme] = process.argv.slice(2);
const dir = `/Users/neat/dev/portfolio/docs/redesign/assets/ribbon/animation/frames-${scene}-${theme}`;
rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 608, height: 500 }, deviceScaleFactor: 2 });
await p.goto(`file:///Users/neat/dev/portfolio/docs/redesign/assets/ribbon/animation/scene.html?scene=${scene}&theme=${theme}`);
await p.waitForLoadState('networkidle'); await p.evaluate(() => document.fonts.ready);
const dur = await p.evaluate(() => window.DURATION);
const fps = 30, n = Math.round(dur * fps);
for (let i = 0; i < n; i++) {
  await p.evaluate(t => window.render(t), i / fps);
  await p.screenshot({ path: `${dir}/${String(i).padStart(4, '0')}.png` });
}
await b.close();
console.log(scene, theme, n);
