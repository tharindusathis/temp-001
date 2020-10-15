import { launch } from 'puppeteer-core';  
import chrome from 'chrome-aws-lambda';
const exePath = process.platform === 'win32'
? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
: process.platform === 'linux'
? '/usr/bin/google-chrome'
: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

let _page;

async function getPage() {
    const options = {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    };
    const browser = await launch(options);
    _page = await browser.newPage();
    return _page;
}

export async function getScreenshot(html) {
    // const page = await getPage();
    // await page.setViewport({ width: 2048, height: 1170 });
    // await page.setContent(html);
    // const file = await page.screenshot({ type });
    // return file;
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://example.com');
        const file =  await page.screenshot({path: 'example.png'});
      
        await browser.close();
        return file;
    })();
}