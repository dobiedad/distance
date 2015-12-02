var center = new google.maps.LatLng(51.5407362, -0.14399490000005244);
var marker;
var map;
var circle;


function initialize() {
  var random = Math.floor(Math.random()*16777215).toString(16);
  var mapOptions = {
    zoom: 16,
    navigationControl: false,
    mapTypeControl: false,
    center: center,
    styles:[
    { stylers:[
      { "visibility": "on" },
      { "invert_lightness": true },
      { "hue": '#'+random },
      { "saturation": 62 },
      { "lightness": 13 },
      { "gamma": 0.66 }
      ] }
    ]
  };

    map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

}

function drawCircle(radius){
  if (!circle) {
    circle = new google.maps.Circle({
     map: map,
     radius: radius,
     fillColor: '#AA0000'
    });
  }
  else{
    circle.setRadius(radius);
  }
 circle.bindTo('center', marker, 'position');
 map.fitBounds(circle.getBounds());
 toggleBounce();
}

function toggleBounce() {

  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function doEverything(){
  var postcode= $('#postcode').val();
  var distance =$('#distance').val() * 1609.344

  if (postcode == undefined || postcode.length == 0 || distance == undefined || distance.length == 0) {
    alert("Oops... Please enter your postcode and distance");
    return false;
  }
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': postcode}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var location=results[0].geometry.location;
      if(!marker){
        marker = new google.maps.Marker({
          map: map,
          position: location,
        });
      }
      else{
        marker.setPosition(location);
      }
      google.maps.event.addListener(marker, 'click', toggleBounce);
      drawCircle(distance);
    } else {
      alert("We could not find your postcode, please try again ");
    }
  });
}
$( document ).ready( function () {
  $('#question').click(function(){
    toggleMenu();
  });
});
function toggleMenu(){
  $('#map-canvas').toggleClass('toggle');
  $('.menu').toggleClass('toggle-menu');
}

google.maps.event.addDomListener(window, 'load', initialize);
