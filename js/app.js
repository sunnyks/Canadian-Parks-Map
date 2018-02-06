
// @51.941496,-122.1828913,6z -- Canadian national parks and preserves


var map;

// list of places
var parks = [
  {name: 'Waterton Lakes National Park', location: {lat: 49.0833333, lng: -113.9166667}},
  {name: 'Pacific Rim National Park Reserve', location: {lat: 48.79193129999999, lng: -125.156359}},
  {name: 'Yoho National Park', location: {lat: 51.4666667, lng: -116.5833333}},
  {name: 'Banff National Park', location: {lat: 51.4968464, lng: -115.9280562}},
  {name: 'Glacier National Park of Canada', location: {lat: 51.335289, lng: -117.5297595}},
  {name: 'Grasslands National Park', location: {lat: 49.12859760000001, lng: -107.4256163}},
  {name: 'Writing-on-Stone Provincial Park', location: {lat: 49.0858903, lng: -111.6195612}},
  {name: 'Bugaboo Provincial Park', location: {lat: 50.8175258, lng: -116.8522904}}
];



// callback func
function initMap() {

  var self = this;
  this.filter = ko.observable("");
  this.list = ko.observableArray([]);

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: {lat: 51.941496, lng: -122.1828913},
    mapTypeId: 'satellite'
  });

  // make infoWindows, markers, and eventlisteners w. animation
  var markers = [];
  var largeInfowindow = new google.maps.InfoWindow();
  var defaultIcon = makeMarkerIcon('purple');
  var highlightedIcon = makeMarkerIcon('pink');

  for (var i = 0; i < parks.length; i++) {
    var position = parks[i].location;
    var name = parks[i].name;
    var marker = new google.maps.Marker({
      position: position,
      title: name,
      animation: google.maps.Animation.BOUNCE???,
      icon: defaultIcon
    });

    markers.push(marker);
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
  }



// add filter functionality
// apply bindings
}

function populateInfoWindow(marker, infowindow) {
// add wikipedia links (w. jsonp iirc)

};

function makeMarkerIcon(markerColor) {

};
