// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

console.log("HELLO!");
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://io.adafruit.com/api/v2/Peaceful_Ferret/feeds/light-values/', true);

request.onload = function () {
	 var data = JSON.parse(this.response);
	 console.log("Last value: " + data.last_value);
	 console.log("Updated at: " + data.updated_at);
}

// Send request
request.send();