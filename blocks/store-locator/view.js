// Initialize and add the map
let map;
let markers = [];
let infoWindows = [];

async function fetchLocations() {
  try {
    const response = await fetch(
      "/wp-json/wp/v2/location?per_page=100&_fields=id,title,meta,acf,facility"
    );
    const locations = await response.json();
    return locations;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
}

async function createMarker(location, map) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
//   const { InfoWindow } = await google.maps.importLibrary("maps");

  const {
    acf: {
      coordinates: { lat, lng },
      name,
      postcode,
      description,
      facility,
    },
  } = location;

  const position = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  const parser = new DOMParser();

  const pinSvgString = `<svg width="40" height="53" viewBox="0 0 40 53" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40.0007 19.8403C40.0007 30.804 20.0053 53 20.0053 53C20.0053 53 0.00976562 30.804 0.00976562 19.8403C0.00976562 8.87663 8.95583 0 19.9962 0C31.0366 0 39.9917 8.88558 39.9917 19.8403H40.0007Z" fill="#2F8F95" /><path d="M30.5024 18.7565C32.3801 17.1173 32.8947 14.3406 31.5948 12.1102C30.2948 9.87985 27.6137 8.93934 25.2486 9.72758C24.7521 7.29121 22.5945 5.46393 19.9947 5.46393C17.3948 5.46393 15.2373 7.30016 14.7408 9.72758C12.3756 8.93038 9.68547 9.87985 8.39457 12.1102C7.10366 14.3406 7.60919 17.1173 9.48687 18.7565C7.60919 20.3957 7.09464 23.1724 8.39457 25.4027C9.6945 27.6331 12.3756 28.5736 14.7408 27.7854C15.2373 30.2217 17.3948 32.049 19.9947 32.049C22.5945 32.049 24.7521 30.2128 25.2486 27.7854C27.6137 28.5826 30.3038 27.6331 31.5948 25.4027C32.8947 23.1724 32.3801 20.3957 30.5024 18.7565Z" fill="white" /></svg>`;

  const pinSvg = parser.parseFromString(
    pinSvgString,
    "image/svg+xml"
  ).documentElement;

  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: name,
    content: pinSvg,
  });

  //   const infoWindow = new google.maps.InfoWindow({
  //     headerContent: name,
  //     content: `
  //         <style>
  //             .wp-block-acf-store-locator-map .gm-style .gm-style-iw-ch span {
  //                 font-size: 1rem;
  //                 font-weight: 600;
  //             }
  //         </style>
  //         <div class="wp-block-acf-store-locator-map-info-window">
  //             <p class="wp-block-acf-store-locator-map-info-window-postcode">${postcode}</p>
  //             <p class="wp-block-acf-store-locator-map-info-window-description">${description}</p>
  //         </div>
  //     `,
  //     ariaLabel: name,
  //     maxWidth: 300,
  //   });

  marker.addListener("click", () => {
    infoWindows.forEach((window) => window.close());
    // infoWindow.open(map, marker);
    map.panTo(marker.getPosition());
  });

  markers.push(marker);
  //   infoWindows.push(infoWindow);

  return marker;
}

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("wp-block-acf-store-locator-map"), {
    zoom: 6,
    center: {
      lat: 55.00526,
      lng: -4.451461,
    },
    zoomControl: true,
    cameraControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    mapId: "wp-block-acf-store-locator-map",
  });

  // Fetch and create markers for all locations
  const locations = await fetchLocations();
  for (const location of locations) {
    await createMarker(location, map);
  }
}

initMap();
//     const mapContainer = document.getElementById('wp-block-acf-store-locator-map');
//     if (!mapContainer) return;

//     // Initialize map
//     const map = new google.maps.Map(mapContainer, {
//         zoom: 1,
//         center: { lat: 53.710120, lng: -1.772914 }, // Center of UK
//         styles: [
//             {
//                 "featureType": "poi",
//                 "elementType": "labels",
//                 "stylers": [{ "visibility": "off" }]
//             }
//         ]
//     });

//     // // Set UK bounds
//     // const ukBounds = new google.maps.LatLngBounds(
//     //     new google.maps.LatLng(49.87, -8.65), // Southwest
//     //     new google.maps.LatLng(60.85, 1.77)   // Northeast
//     // );
//     // map.fitBounds(ukBounds);

//     const markers = [];
//     const infoWindows = [];
//     const locationItems = document.querySelectorAll('.wp-block-acf-store-locator-locations-list-item');
//     const searchInput = document.getElementById('wp-block-acf-store-locator-search-input');

//     // Create markers and info windows for each location
//     locationItems.forEach((item, index) => {
//         const lat = parseFloat(item.dataset.lat);
//         const lng = parseFloat(item.dataset.lng);
//         const title = item.dataset.title;

//         const marker = new google.maps.Marker({
//             position: { lat, lng },
//             map: map,
//             title: title,
//             animation: google.maps.Animation.DROP
//         });

//         const infoWindow = new google.maps.InfoWindow({
//             content: `
//                 <div class="map-info-window">
//                     <h3>${title}</h3>
//                     <p>${item.querySelector('.wp-block-acf-store-locator-locations-list-item-postcode').textContent}</p>
//                 </div>
//             `
//         });

//         markers.push(marker);
//         infoWindows.push(infoWindow);

//         // Add click event to marker
//         marker.addListener('click', () => {
//             infoWindows.forEach(window => window.close());
//             infoWindow.open(map, marker);
//             map.panTo(marker.getPosition());
//         });

//         // Add click event to list item
//         item.addEventListener('click', () => {
//             infoWindows.forEach(window => window.close());
//             infoWindow.open(map, marker);
//             map.panTo(marker.getPosition());
//             marker.setAnimation(google.maps.Animation.BOUNCE);
//             setTimeout(() => marker.setAnimation(null), 750);
//         });
//     });

//     // Search functionality
//     searchInput.addEventListener('input', (e) => {
//         const searchTerm = e.target.value.toLowerCase();

//         locationItems.forEach((item, index) => {
//             const title = item.dataset.title.toLowerCase();
//             const postcode = item.querySelector('.wp-block-acf-store-locator-locations-list-item-postcode').textContent.toLowerCase();
//             const description = item.querySelector('.wp-block-acf-store-locator-locations-list-item-description').textContent.toLowerCase();

//             const isVisible = title.includes(searchTerm) ||
//                             postcode.includes(searchTerm) ||
//                             description.includes(searchTerm);

//             item.style.display = isVisible ? 'block' : 'none';
//             markers[index].setVisible(isVisible);
//         });
//     });

//     // Fit map to show all markers
//     // if (markers.length > 0) {
//     //     const bounds = new google.maps.LatLngBounds();
//     //     markers.forEach(marker => bounds.extend(marker.getPosition()));
//     //     map.fitBounds(bounds);
//     // }
// });
