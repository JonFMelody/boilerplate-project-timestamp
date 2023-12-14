// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date", function (req, res) {
  const urlDate = req.params.date;
  if (!urlDate) {
    const date = new Date();
    const unixTimestamp = date.getTime();
    res.json({ unix: unixTimestamp, utc: date.toUTCString() });
    console.log("1");
  } else if (!Number.isNaN(urlDate)) {
    res.json({ error: "Invalid Date" });
    console.log("2");
  } else if (urlDate.length > 10) {
    const date = new Date(urlDate * 1000);
    res.json({ unix: Number(urlDate), utc: date.toUTCString() });
    console.log("3");
  } else {
    const date = new Date(urlDate);
    const unixTimestamp = date.getTime();
    res.json({ unix: unixTimestamp, utc: date.toUTCString() });
    console.log("4");
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
