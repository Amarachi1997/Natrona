const express = require("express");
const http = require("https");
const bodyParser = require("body-parser");

const app = express() 

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

	res.sendFile(__dirname + "/index.html")

	
})

app.post("/", function(req, res){

const query = req.body.country
	const options = {
		"method": "GET",
		"hostname": "covid-19-coronavirus-statistics.p.rapidapi.com",
		"port": null,
		"path": "/v1/total?country=" + query,
		"headers": {
			"x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
			"x-rapidapi-key": "eaaf02c0abmsh2f033bdc373b667p11cf77jsnfa440d079cc5",
			"useQueryString": true
		}
	};//the api's url as a constant called options
	
	var req = http.request(options, function (response) {
		var chunks = [];//making a get request to the url using the constant called options
	
		response.on("data", function (chunk) {
			chunks.push(chunk);//pushing the data gotten from the url into the chunks array
		});
	
		response.on("end", function () {
			const body = Buffer.concat(chunks);
			const coronaData = JSON.parse(body);//converting the date from the url to buffer mode and then to string
			
			console.log(response)

			const country = coronaData.data.location;
			const cases = coronaData.data.confirmed;
			const recovered = coronaData.data.recovered;
			const death = coronaData.data.deaths;

			res.write("<h1>" + country + " has " + cases + " confirmed cases </h1>")
			res.write("<h2>" + recovered + " persons are recovered in " + country + "</h2>")
			res.write("<h3> Sadly, " + death + " persons have died from this deadly virus </h3>")
			res.send();
			

		});

		
		
	});
	
	req.end();


	
})












app.listen("3000", function(){
    console.log("server is running on port 3000");
    
})