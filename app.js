const express = require("express");
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

const api_url = "https://geo.ipify.org/api/v2/country,city?apiKey=";
const api_key = "at_lIXUhB91chUFlaH8IaQfS3nuQyPGb";
const details = {
  ip: '',
  location: '',
  timezone: '',
  isp: '',
  lat: '',
  long: ''
};

let url = api_url + api_key;

function pushIPData(data) {
  const ipData = JSON.parse(data);
  details.ip = ipData.ip;
  details.location = ipData.location.city + ", " + ipData.location.region + ", " + ipData.location.country;
  details.timezone = "UTC " + ipData.location.timezone;
  details.isp = ipData.isp;
  details.lat = Number(ipData.location.lat);
  details.long = Number(ipData.location.lng);
}

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  https.get(url, function(response) {
    response.on("data", function(data) {
      pushIPData(data);
      res.render("index", {ip: details.ip, location: details.location, timezone: details.timezone, isp: details.isp, lat: details.lat, long: details.long});
    });
  });
});

app.post("/ip", function(req, res) {
  const ip = req.body.ip;
  url += "&ipAddress=" + ip;
  res.redirect("/");
});

app.listen(3000, function(req, res) {
  console.log("Server listening on 3000");
});
