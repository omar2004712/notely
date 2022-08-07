module.exports = ({ title, content }) => `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${title || 'Notely'}</title>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="images/webIcon.png" />
        <link rel="stylesheet" href="new.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://kit.fontawesome.com/7ecb8aa263.js"
          crossorigin="anonymous"
        ></script>
      </head>
      <body>
        ${content}
      </body>
    </html>
    
    `;
