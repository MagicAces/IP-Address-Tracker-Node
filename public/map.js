let long = Number($(".long").text());
let lat = Number($(".lat").text());

let valid = $(".search-box p").text();
if(valid === "false") {
	$(".search-box input").css("border", "2px solid red");
	$(".search-box input").click(function() {
		$(".search-box input").css("border", "none");
	});
}

console.log(long);
console.log(lat);

const map = L.map('map', {zoomAnimation: true}).setView([lat, long], 18);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 22,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

const icon = L.icon({
  iconUrl: "images/icon-location.svg",
});

const marker = L.marker([lat, long], {icon: icon}).addTo(map);


function onMapClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent(`You clicked the map at ${e.latlng.toString()}`)
		.openOn(map);
}

map.on('click', onMapClick);
