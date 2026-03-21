const fs = require('fs');
const path = require('path');

const sizes = [192, 512];
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

const svg = fs.readFileSync(path.join(__dirname, '..', 'public', 'favicon.svg'), 'utf8');

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  for (const size of sizes) {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;background:transparent"><div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center">${svg}</div></body></html>`;
    await page.setContent(html);
    await page.screenshot({ path: path.join(iconsDir, `icon-${size}.png`), omitBackground: true });

    const maskHtml = `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#4f46e5"><div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;padding:${Math.round(size*0.1)}px;box-sizing:border-box">${svg}</div></body></html>`;
    await page.setContent(maskHtml);
    await page.screenshot({ path: path.join(iconsDir, `icon-maskable-${size}.png`) });
    await page.close();
  }
  await browser.close();
  console.log('Icons generated:', fs.readdirSync(iconsDir));
})();
