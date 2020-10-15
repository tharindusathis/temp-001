import { launch } from 'puppeteer-core';  
import chrome from 'chrome-aws-lambda';

let _page;

async function getPage() {
    const options = {
        product: 'chrome',
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    };
    const browser = await launch(options);
    _page = await browser.newPage();
    return _page;
}

async function getScreenshot(html) {
    const page = await getPage();
    await page.setViewport({ width: 2048, height: 1170 });
    await page.setContent(html);
    const file = await page.screenshot({ type });
    return file;
}

export default (req, res) => {
  const { yourName } = req.query;

  res.setHeader("Content-Type", "image/png");

  const svg = `
    <svg fill="none" viewBox="0 0 600 400" width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <style>
            .title {
              font-size: 10vh;
              font-weight: regular;
              background-color: #ffddff;
            }
          </style>

          <p class="title">Hello, ${yourName}</p> 

        </div>
      </foreignObject>
    </svg>
  `;

  try {
    const file = getScreenshot(svg);
    // res.end(file);
    res.send(file)
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
    console.error(e);
  }

  // res.send(svg);

};
