
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

  // create map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: 51.941496, lng: -122.1828913},
    mapTypeId: 'satellite'
  });

  // make infoWindows, markers, and eventlisteners w. animation
  var markers = [];
  var largeInfowindow = new google.maps.InfoWindow();
  var defaultIcon = makeMarkerIcon('7f0fe0');
  var highlightedIcon = makeMarkerIcon('ff00fa');

  for (var i = 0; i < parks.length; i++) {
    var position = parks[i].location;
    var name = parks[i].name;
    var marker = new google.maps.Marker({
      position: position,
      title: name,
      map: map,
      animation: google.maps.Animation.DROP,
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

if (infowindow.marker != marker) {
  infowindow.setContent('');
  infowindow.marker = marker;
  infowindow.addListener('closeclick', function() {
    infowindow.marker = null;
  });

  // add wikipedia links (w. ajax)


  //panorama
  var streetViewService = new google.maps.StreetViewService();
  var radius = 70;

  function getStreetView(data, status) {
    if (status == google.maps.StreetViewStatus.OK) {
      var nearStreetViewLocation = data.location.latLng;
      var heading = google.maps.geometry.spherical.computeHeading(
        nearStreetViewLocation, marker.position);
        infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
        var panoramaOptions = {
          position: nearStreetViewLocation,
          pov: {
            heading: heading,
            pitch: 31
          }
        };
        var panorama = new google.maps.StreetViewPanorama(
          document.getElementById('pano'), panoramaOptions);
        } else {
          infowindow.setContent('<div>' + marker.title + '</div>' + '<div>No Street View Found</div>');
        }
    }
    streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
    infowindow.open(map, marker);
  }
}


function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
};
