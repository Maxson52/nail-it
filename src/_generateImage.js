const nodeHtmlToImage = require("node-html-to-image");
const gradient = require("random-gradient");

async function generateImage(
  { width, height, text },
  { random, color = "white", background }
) {
  const bg = background
    ? background
    : gradient(random ? randString(255) : text);

  return await nodeHtmlToImage({
    html: `<html>
                <style>
                @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;700&display=swap');

                html {
                  width: 100%;
                  height: 100%;
                  margin: 0;
                  padding: 0;
                }

                body {
                    width: {{width}}px;
                    height: {{height}}px;
                    font-family: 'Josefin Sans', sans-serif;
                    font-size: 10vmin;
                    color: {{color}};
                    background: {{bg}};
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                    word-break: break-all;
                    word-wrap: break-word;
                }

                div {
                    width: 100%;
                    height: 100%;
                    display: grid;
                    place-content: center;
                    text-align: center;
                }
                </style>
                <body>
                    <div>
                        {{text}}
                    </div>
                </body>
            </html>`,
    content: { width, height, text, color, bg },
  });
}

module.exports = generateImage;

function randString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
