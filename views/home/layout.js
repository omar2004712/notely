module.exports = ({ title, content }) => {
    return `
    <!DOCKTYPE html>
    <html>
      <head>
        <title>${title || 'Notely'}</title>
        <link rel="icon" href="images/webIcon.png" />
        <link rel="stylesheet" href="home.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Edu+NSW+ACT+Foundation:wght@400;500;600&family=Edu+QLD+Beginner:wght@400;500;600&family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
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
};
