module.exports = (req, res) => {
  const { yourName } = req.query;

  res.setHeader("Content-Type", "image/svg+xml");

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
    const file = await getScreenshot(svg);
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
    console.error(e);
  }

  // res.send(svg);

};
