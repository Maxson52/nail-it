const app = require("express")();

const generateImage = require("./_generateImage.js");

app.get("/api/v1/:width/:height/:text", async (req, res) => {
  const image = await generateImage(req.params, req.query);

  if (
    req.params.height < 100 ||
    req.params.width < 100 ||
    req.params.height > 5000 ||
    req.params.width > 5000
  ) {
    return res.status(400).send({
      error: "Image height must be between 100 and 5000",
    });
  }

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(image, "binary");
});

app.get("/api/*", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.status(404).send({
    error: `Whoops, it looks like this route doesn't exist!`,
  });
});

module.exports = app;
