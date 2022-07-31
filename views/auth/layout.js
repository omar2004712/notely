module.exports = ({ content, title }) => {
    return `
  <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Edu+NSW+ACT+Foundation:wght@400;500;600&family=Edu+QLD+Beginner:wght@400;500;600&family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="main.css" />
            <link rel="icon" href="images/webIcon.png"/>
            <title>${title}</title>
        </head>
        <body>
            ${content}
            <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
            <script src="register.js"></script>
        </body>
    </html>`;
};
