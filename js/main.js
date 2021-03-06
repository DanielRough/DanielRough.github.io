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
	 $('#txt_name').val(getCookie("key"));
}


// Send request
request.send();

$( "#greenled" ).click(function() {
	var key = $('#txt_name').val();
	document.cookie = "key=" + key + "; expires=Thu, 15 Dec 2022 12:00:00 UTC";
	console.log( "Handler for green called." );
	var greenrequest = new XMLHttpRequest();
    greenrequest.open('POST', 'https://io.adafruit.com/api/v2/Peaceful_Ferret/feeds/led-changer/data?x-aio-key='+key, true);
	greenrequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	greenrequest.onload = function () {
		console.log(this.responseText);
	};
	greenrequest.send(JSON.stringify({ "value": "1" }));
});
$( "#yellowled" ).click(function() {
	var key = $('#txt_name').val();
	document.cookie = "key=" + key + "; expires=Thu, 15 Dec 2022 12:00:00 UTC";
	console.log( "Handler for yellow called." );
	var yellowrequest = new XMLHttpRequest();
	yellowrequest.open('POST', 'https://io.adafruit.com/api/v2/Peaceful_Ferret/feeds/led-changer/data?x-aio-key='+key, true);
	yellowrequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	yellowrequest.onload = function () {
		console.log(this.responseText);
	};
	yellowrequest.send(JSON.stringify({ "value": "0" }));
});

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}