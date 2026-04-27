const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const OUTDIR = path.join(process.cwd(), 'vis-screenshots');
if (!fs.existsSync(OUTDIR)) fs.mkdirSync(OUTDIR, { recursive: true });

const HOST = process.env.VIS_HOST || 'http://localhost:3000';

const pages = [
  '/',
  '/community',
  '/knowledgeBase',
  '/news',
  '/profile',
  '/admin',
  '/chat',
  '/gpa',
  '/timetable'
];

const viewports = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 }
];

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  try {
    for (const mode of ['light', 'dark']) {
      for (const vp of viewports) {
        const page = await browser.newPage();
        await page.setViewport({ width: vp.width, height: vp.height });
        // Ensure localStorage is set before any page scripts run
        await page.evaluateOnNewDocument((m) => {
          try { localStorage.setItem('susl_theme', m); } catch (e) {}
          // also set html class fallback for very early CSS
          try { if (m === 'dark') document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark'); } catch (e) {}
        }, mode);

        for (const p of pages) {
          const url = new URL(p, HOST).toString();
          const slug = (p === '/') ? 'home' : p.replace(/\//g, '-').replace(/^-/, '');
          const name = `${slug || 'home'}_${mode}_${vp.name}.png`;
          const out = path.join(OUTDIR, name);
          console.log(`Capturing ${url} @ ${vp.name} (${mode}) -> ${name}`);
          try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
            // wait a little for any transitions
            await page.waitForTimeout(800);
            await page.screenshot({ path: out, fullPage: true });
          } catch (err) {
            console.error('Failed to capture', url, err.message || err);
            // write an error file
            fs.writeFileSync(out.replace(/\.png$/, '.error.txt'), String(err));
          }
        }
        await page.close();
      }
    }
    console.log('Screenshots saved to', OUTDIR);
  } finally {
    await browser.close();
  }
}

capture().catch((e) => {
  console.error(e);
  process.exit(1);
});
