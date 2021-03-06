// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: 33.733673, lng:-118.003555};
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
    map.setZoom(17);
    map.panTo(marker.position);
  }