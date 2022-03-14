// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

console.log("HELLO!");
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://io.adafruit.com/api/v2/Peaceful_Ferret/feeds/light-values/', true);

request.onload = function () {
	 var data = JSON.parse(this.response);
	 console.log("Updated at: " + data.updated_at);
	 var lightordark;
	 var imageurl;
	 if(data.last_value < 100){
		 lightordark = "My lights are off and saving money! Hurray!";
		 imageurl = "images/lightoff.png";
	 }
	 else{
		 lightordark = "My lights are on! Oh no!";
		 imageurl = "images/lighton.png";
	 }
	 document.getElementById("updatetext").textContent= lightordark;
	 document.getElementById("bulb").src= imageurl;

}


// Send request
request.send();

$( "#greenled" ).click(function() {
	var key = $('#txt_name').val();
	console.log( "Handler for green called." );
	var greenrequest = new XMLHttpRequest();
    greenrequest.open('POST', 'https://io.adafruit.com/api/v2/Peaceful_Ferret/feeds/digital-out/data?x-aio-key='+key, true);
	greenrequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	greenrequest.onload = function () {
		console.log(this.responseText);
	};
	greenrequest.send(JSON.stringify({ "value": "0" }));
});
$( "#yellowled" ).click(function() {
	var key = $('#txt_name').val();
	console.log( "Handler for yellow called." );
	var yellowrequest = new XMLHttpRequest();
	yellowrequest.open('POST', 'https://io.adafruit.com/api/v2/Peaceful_Ferret/feeds/digital-out/data?x-aio-key='+key, true);
	yellowrequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	yellowrequest.onload = function () {
		console.log(this.responseText);
	};
	yellowrequest.send(JSON.stringify({ "value": "1" }));
});
