(function() {
  // Hi fellow developer :)
  //
  // We commented this code for us—and for you,
  // in case you want to copy something for your own map,
  // for whatever niche you're interested in.
  // Let us know if you've questions. Let's help each other.
  //
  // This map is built with LeafletJS. See their docs for more info.
  // https://leafletjs.com/

  // Create a map.
  // The geo coordinates center the map on a place.
  // The number at the end is the initial zoom level.
  var map = L.map('map');

  if (!mapData) {
    return
  }

  // Choose a random project and center the map there.
    var random = mapData[Math.floor((Math.random() * mapData.length))];
    map.setView([random.lat, random.lng], 8);

  // Add tiles to the map.
  // Also adds the attribution in the bottom right of the map. (It's okay for now.)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Our markers!
  var ngoIcon = L.icon({
    iconUrl: './img/marker_ngo.png',
    shadowUrl: './img/marker_ngo_shadow.png',

    iconSize:     [31, 50], // size of the icon
    shadowSize:   [29, 43], // size of the shadow
    iconAnchor:   [15, 50], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 50],  // the same for the shadow
    popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor
  });
  var projectIcon = L.icon({
    iconUrl: './img/marker_normal.png',
    shadowUrl: './img/marker_normal_shadow.png',

    iconSize:     [31, 50], // size of the icon
    shadowSize:   [29, 43], // size of the shadow
    iconAnchor:   [15, 50], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 50],  // the same for the shadow
    popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor
  });

  // Store select projects to make links to them clickable
  var byID = {
  };

  // for each project in the map data, ...
  (mapData || []).forEach(function(it) {
    // ... create the content of the popup
    var content = `<h2>${it.name}</h2>`

    content += `<p><strong>${it.what}</strong></p>`

    content += `<p>Announcement: <a href="${it.annLink}" target="_blank">${it.annName}</a></p>`

    if (!!it.prjHome) {
      content += `<p><a href="${it.prjHome}" target="_blank">Project Homepage</a></p>`
    }

    content += `<p>How do we know them?`
    content += (!!it.know) ? ` ${it.know}.` : `Haven't kept a record of that.`
    content += ` See <a href="./about.html">the About page</a> for more info.</p>`

    // ... create a popup
    var popup = L.popup({className: 'projectpopup'}).setContent(content)

    // choose an icon
    var icon = projectIcon;
    if (it.what === 'NGO') {
      icon = ngoIcon
    }

    // and add a marker to the map.
    // “Binding” means: If you click on the marker, the popup opens.
    var marker = L.marker([it.lat, it.lng], {icon: icon}).addTo(map).bindPopup(popup);

    // One of the clickable markers? Store the popup and the project.
    if (!!byID[it.name]) {
      // replace the "true"
      byID[it.name] = {
        project: it,
        marker: marker,
        popup: popup
      }
    }
  })

  var popup = L.popup({className: 'projectpopup'})
  .setContent(
    `<h2 style="white-space: nowrap;">🎉  🎉</h2>
     <p><a href="what" target="_blank">what?</a></p>
`
  )

    // and add a marker to the map.
    // “Binding” means: If you click on the marker, the popup opens.
    // COMMENT OUT THE LINE BELOW IF YOU WANT TO REMOVE THE MARKER
    // L.marker([-34.652687, -58.558836], {icon: bdayIcon}).addTo(map).bindPopup(popup);

  // Focuses the map on a particular project.
  function focusMapOn(projectID) {
    var hit = byID[projectID];
    if (!!hit) {
      map.setView([hit.project.lat, hit.project.lng], 9);
      hit.marker.openPopup()
    }
  }

  window.odettereliefmap = {
    focusMapOn: focusMapOn
  };
})();
