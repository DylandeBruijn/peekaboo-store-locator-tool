let map;
let markers = [];

// Map of facility slugs to their icons
const facilityIcons = new Map([
  [
    "guide-dogs-allowed",
    `<svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.1115 0.168571L11.7785 6.07471C12.0535 6.31669 12.0744 6.73094 11.8285 7.00164C11.5827 7.27234 11.1618 7.29285 10.8868 7.05086L4.21979 1.14472C3.94477 0.902736 3.92394 0.488487 4.16979 0.217789C4.41563 -0.0529091 4.83649 -0.0734165 5.1115 0.168571ZM5.99905 7.87526H10.666V15.7214C10.4451 15.7419 10.2243 15.7501 9.99926 15.7501C8.7992 15.7501 7.6658 15.4671 6.66575 14.9626V19.6875C6.66575 20.4135 6.06989 21 5.33235 21H3.99894C3.26141 21 2.66554 20.4135 2.66554 19.6875V10.2459C1.46548 9.79885 0.523763 8.79809 0.198747 7.51843L0.0404049 6.8827C-0.138771 6.18134 0.294585 5.46769 1.01129 5.29132C1.72799 5.11496 2.44886 5.54151 2.62804 6.24697L2.79055 6.8827C2.93639 7.46511 3.46975 7.87526 4.08228 7.87526H5.99905ZM13.3328 14.9626C12.9119 15.1759 12.4661 15.3482 11.9994 15.4794V8.53559L17.333 10.7463V19.6875C17.333 20.4135 16.7371 21 15.9996 21H14.6662C13.9286 21 13.3328 20.4135 13.3328 19.6875V14.9626ZM17.7788 7.87526L17.5205 9.40101L12.7452 7.41999L13.862 0.816605C13.9411 0.344935 14.3537 0 14.837 0C15.1495 0 15.4412 0.143552 15.6287 0.389641L16.3329 1.31247H18.5039C19.0331 1.31247 19.5414 1.52165 19.9164 1.89078L20.6665 2.62495H22.9999C23.5541 2.62495 24 3.06381 24 3.6093V4.59366C24 6.40652 22.5082 7.87485 20.6665 7.87485H17.7788V7.87526ZM18.6664 3.93783C19.0347 3.93783 19.3331 3.64417 19.3331 3.2816C19.3331 2.91903 19.0347 2.62536 18.6664 2.62536C18.298 2.62536 17.9997 2.91903 17.9997 3.2816C17.9997 3.64417 18.298 3.93783 18.6664 3.93783Z" fill="black" /></svg>`,
  ],
  [
    "parking",
    `<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.87562 3.9375C8.96302 3.9375 9.84452 3.05607 9.84452 1.96875C9.84452 0.881426 8.96302 0 7.87562 0C6.78821 0 5.90671 0.881426 5.90671 1.96875C5.90671 3.05607 6.78821 3.9375 7.87562 3.9375ZM4.94277 10.1391C5.4514 9.94629 5.70982 9.38027 5.51703 8.87168C5.32424 8.36309 4.75818 8.10469 4.24955 8.29746C1.76791 9.23262 0 11.6279 0 14.4375C0 18.0633 2.93695 21 6.56301 21C9.07337 21 11.2515 19.5932 12.3549 17.526C12.6092 17.0461 12.4287 16.4514 11.9488 16.193C11.4689 15.9346 10.8741 16.1191 10.6157 16.599C9.84452 18.0469 8.31862 19.0312 6.56301 19.0312C4.02395 19.0312 1.9689 16.9764 1.9689 14.4375C1.9689 12.4729 3.20357 10.7953 4.94277 10.1391ZM10.6567 7.21875L10.5788 6.8209C10.3942 5.90625 9.5943 5.25 8.65907 5.25C7.42441 5.25 6.49738 6.37793 6.73939 7.58789L7.68693 12.3252C7.93304 13.5516 9.00773 14.4334 10.2629 14.4334H14.3853C14.6601 14.4334 14.9021 14.6016 15.0006 14.86L16.4896 18.8344C16.7357 19.4947 17.4658 19.8434 18.1344 19.6178L20.1033 18.9615C20.7924 18.7318 21.1616 17.9895 20.9319 17.3004C20.7022 16.6113 19.9598 16.2422 19.2706 16.4719L18.5036 16.7262L17.4576 13.9371C16.9777 12.6574 15.7512 11.8084 14.3853 11.8084H11.5755L11.1817 9.83965H13.7823C14.5084 9.83965 15.0949 9.25313 15.0949 8.52715C15.0949 7.80117 14.5084 7.21465 13.7823 7.21465H10.6567V7.21875Z" fill="black" /></svg>`,
  ],
  [
    "wheelchair-access",
    `<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 0C1.34531 0 0 1.34531 0 3V18C0 19.6547 1.34531 21 3 21H18C19.6547 21 21 19.6547 21 18V3C21 1.34531 19.6547 0 18 0H3ZM9 10.5H11.25C12.0797 10.5 12.75 9.82969 12.75 9C12.75 8.17031 12.0797 7.5 11.25 7.5H9V10.5ZM11.25 13.5H9V15C9 15.8297 8.32969 16.5 7.5 16.5C6.67031 16.5 6 15.8297 6 15V6.375C6 5.33906 6.83906 4.5 7.875 4.5H11.25C13.7344 4.5 15.75 6.51562 15.75 9C15.75 11.4844 13.7344 13.5 11.25 13.5Z" fill="black" /></svg>`,
  ],
]);

// Fetch all the locations (using the Wordpress REST API) that are set in the Wordpress Dashboard
async function fetchAllLocations() {
  try {
    const response = await fetch(
      "/wp-json/wp/v2/location?per_page=100&_fields=id,title,acf,facility"
    );
    const locations = await response.json();
    return locations;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
}

// Fetch all the facilities (using the Wordpress REST API) that are set in the Wordpress Dashboard
async function fetchAllFacilities() {
  try {
    const response = await fetch(
      "/wp-json/wp/v2/facility?per_page=100&_fields=slug,title"
    );
    const facilities = await response.json();
    return facilities;
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return [];
  }
}

// Add the filters to the filters list
function addFiltersToFiltersList(facilities) {
  const filtersListElement = document.getElementById(
    "wp-block-acf-store-locator-filters-list"
  );

  filtersListElement.innerHTML = "";

  facilities.forEach((facility) => {
    const filterElement = createFilterElement(facility);
    filtersListElement.appendChild(filterElement);
  });
}

// Create a filter element
function createFilterElement(facility) {
  const filterElement = document.createElement("div");
  filterElement.className = "wp-block-acf-store-locator-filter";

  const filterCheckboxElement = document.createElement("input");
  filterCheckboxElement.type = "checkbox";
  filterCheckboxElement.id = `wp-block-acf-store-locator-filter-${facility.slug}`;
  filterCheckboxElement.className =
    "wp-block-acf-store-locator-filter-checkbox";

  const filterLabelElement = document.createElement("label");
  filterLabelElement.htmlFor = `wp-block-acf-store-locator-filter-${facility.slug}`;
  filterLabelElement.className = "wp-block-acf-store-locator-filter-item-label";
  filterLabelElement.textContent = facility.slug
    .replace(/-/g, " ")
    .replace(/^[a-z]/, (char) => char.toUpperCase());

  filterElement.appendChild(filterCheckboxElement);
  filterElement.appendChild(filterLabelElement);

  return filterElement;
}

// Create a location element
function createLocationElement(location) {
  const {
    acf: { coordinates, name, website, postcode },
    facility: facilities,
  } = location;

  const locationElement = document.createElement("div");
  locationElement.className = "wp-block-acf-store-locator-location";
  locationElement.dataset.lat = coordinates.lat;
  locationElement.dataset.lng = coordinates.lng;
  locationElement.dataset.title = name;

  if (name || postcode) {
    const locationContentElement = document.createElement("div");

    if (name) {
      const locationTitleElement = document.createElement("h3");
      locationTitleElement.className =
        "wp-block-acf-store-locator-location-title";
      locationTitleElement.textContent = name;
      locationContentElement.appendChild(locationTitleElement);
    }

    if (postcode) {
      const locationPostcodeElement = document.createElement("p");
      locationPostcodeElement.className =
        "wp-block-acf-store-locator-location-postcode";
      locationPostcodeElement.textContent = postcode;
      locationContentElement.appendChild(locationPostcodeElement);
    }

    locationElement.appendChild(locationContentElement);
  }

  if (facilities && Array.isArray(facilities) && facilities.length > 0) {
    const locationFacilitiesElement = document.createElement("ul");
    locationFacilitiesElement.className =
      "wp-block-acf-store-locator-location-facilities";

    facilities.forEach((facility) => {
      const facilityIcon = facilityIcons.get(facility);
      if (facilityIcon) {
        const locationFacilityElement = document.createElement("li");
        locationFacilityElement.innerHTML = facilityIcon;
        locationFacilitiesElement.appendChild(locationFacilityElement);
      }
    });

    locationElement.appendChild(locationFacilitiesElement);
  }

  if (website) {
    const locationLinkElement = document.createElement("a");
    locationLinkElement.href = website.url;
    locationLinkElement.className = "wp-block-acf-store-locator-location-link";
    locationLinkElement.textContent = "More details";
    locationLinkElement.target = "_blank";
    locationLinkElement.rel = "noopener noreferrer";
    locationElement.appendChild(locationLinkElement);
  }

  locationElement.addEventListener("click", () => {
    const lat = parseFloat(locationElement.dataset.lat);
    const lng = parseFloat(locationElement.dataset.lng);
    const position = { lat, lng };

    map.panTo(position);

    setActiveLocationElement(locationElement);
  });

  return locationElement;
}

// Add the locations to the locations list
function addLocationsToLocationsList(locations) {
  const locationsListElement = document.getElementById(
    "wp-block-acf-store-locator-locations-list"
  );

  locationsListElement.innerHTML = "";

  locations.forEach((location) => {
    const locationElement = createLocationElement(location);
    locationsListElement.appendChild(locationElement);
  });
}

// Set the active location element
function setActiveLocationElement(clickedLocationElement) {
  const locationsListElement = document.getElementById(
    "wp-block-acf-store-locator-locations-list"
  );

  const locationElements = locationsListElement.querySelectorAll(
    ".wp-block-acf-store-locator-location"
  );

  locationElements.forEach((locationElement) =>
    locationElement.classList.remove("active")
  );

  clickedLocationElement.classList.add("active");
}

// Create a marker
async function createMarker(location, map) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const {
    acf: {
      coordinates: { lat, lng },
      name,
    },
  } = location;

  const position = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  const domParser = new DOMParser();

  const pinSvgString = `<svg width="40" height="53" viewBox="0 0 40 53" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40.0007 19.8403C40.0007 30.804 20.0053 53 20.0053 53C20.0053 53 0.00976562 30.804 0.00976562 19.8403C0.00976562 8.87663 8.95583 0 19.9962 0C31.0366 0 39.9917 8.88558 39.9917 19.8403H40.0007Z" fill="#2F8F95" /><path d="M30.5024 18.7565C32.3801 17.1173 32.8947 14.3406 31.5948 12.1102C30.2948 9.87985 27.6137 8.93934 25.2486 9.72758C24.7521 7.29121 22.5945 5.46393 19.9947 5.46393C17.3948 5.46393 15.2373 7.30016 14.7408 9.72758C12.3756 8.93038 9.68547 9.87985 8.39457 12.1102C7.10366 14.3406 7.60919 17.1173 9.48687 18.7565C7.60919 20.3957 7.09464 23.1724 8.39457 25.4027C9.6945 27.6331 12.3756 28.5736 14.7408 27.7854C15.2373 30.2217 17.3948 32.049 19.9947 32.049C22.5945 32.049 24.7521 30.2128 25.2486 27.7854C27.6137 28.5826 30.3038 27.6331 31.5948 25.4027C32.8947 23.1724 32.3801 20.3957 30.5024 18.7565Z" fill="white" /></svg>`;

  const pinSvgElement = domParser.parseFromString(
    pinSvgString,
    "image/svg+xml"
  ).documentElement;

  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: name,
    content: pinSvgElement,
  });

  marker.addListener("gmp-click", () => {
    const locationsListElement = document.getElementById(
      "wp-block-acf-store-locator-locations-list"
    );

    const locationElements = locationsListElement.querySelectorAll(
      ".wp-block-acf-store-locator-location"
    );

    const matchingLocationElement = Array.from(locationElements).find(
      (locationElement) => {
        const locationLat = parseFloat(locationElement.dataset.lat);
        const locationLng = parseFloat(locationElement.dataset.lng);
        return locationLat === position.lat && locationLng === position.lng;
      }
    );

    if (matchingLocationElement) {
      setActiveLocationElement(matchingLocationElement);
      locationsListElement.scrollTo({
        top: matchingLocationElement.offsetTop - locationsListElement.offsetTop,
        behavior: "smooth",
      });
    }

    map.panTo(marker.position);
  });

  markers.push(marker);

  return marker;
}

// Get all checked facility filters
function getCheckedFilters() {
  const filterCheckboxesElements = document.querySelectorAll(
    ".wp-block-acf-store-locator-filter-checkbox"
  );
  
  return Array.from(filterCheckboxesElements)
    .filter((filterCheckboxElement) => filterCheckboxElement.checked)
    .map((filterCheckboxElement) =>
      filterCheckboxElement.id.replace(
        "wp-block-acf-store-locator-filter-",
        ""
      )
    );
}

// Filter locations based on checked filters
function filterLocations(locations, checkedFilters) {
  if (checkedFilters.length === 0) {
    return locations;
  }

  return locations.filter((location) => {
    const locationFacilities = location.facility || [];
    return checkedFilters.every((filter) => locationFacilities.includes(filter));
  });
}

// Update visible locations and markers based on filters
function updateVisibleLocations(locations) {
  const checkedFilters = getCheckedFilters();
  const filteredLocations = filterLocations(locations, checkedFilters);

  const locationsListElement = document.getElementById(
    "wp-block-acf-store-locator-locations-list"
  );
  const locationElements = locationsListElement.querySelectorAll(
    ".wp-block-acf-store-locator-location"
  );

  locationElements.forEach((element) => {
    const locationLat = parseFloat(element.dataset.lat);
    const locationLng = parseFloat(element.dataset.lng);
    const isVisible = filteredLocations.some(
      (location) =>
        parseFloat(location.acf.coordinates.lat) === locationLat &&
        parseFloat(location.acf.coordinates.lng) === locationLng
    );
    element.style.display = isVisible ? "flex" : "none";
  });

  // Update markers
  markers.forEach((marker) => {
    const markerPosition = marker.position;
    const isVisible = filteredLocations.some(
      (location) =>
        parseFloat(location.acf.coordinates.lat) === markerPosition.lat &&
        parseFloat(location.acf.coordinates.lng) === markerPosition.lng
    );
    marker.map = isVisible ? map : null;
  });

  // Update map bounds if there are visible markers
  const visibleMarkers = markers.filter((marker) => marker.map !== null);
  if (visibleMarkers.length > 0) {
    const bounds = new google.maps.LatLngBounds();
    visibleMarkers.forEach((marker) => bounds.extend(marker.position));
    map.fitBounds(bounds);
  }
}

// Add event listeners to filter checkboxes
function addFilterEventListeners(locations) {
  const filterCheckboxes = document.querySelectorAll(
    ".wp-block-acf-store-locator-filter-checkbox"
  );

  filterCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateVisibleLocations(locations);
    });
  });
}

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("wp-block-acf-store-locator-map"), {
    zoomControl: true,
    cameraControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    scrollwheel: false,
    mapId: "wp-block-acf-store-locator-map",
  });

  const locations = await fetchAllLocations();

  addLocationsToLocationsList(locations);

  const facilities = await fetchAllFacilities();

  addFiltersToFiltersList(facilities);
  addFilterEventListeners(locations);

  for (const location of locations) {
    await createMarker(location, map);
  }

  if (markers.length > 0) {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach((marker) => bounds.extend(marker.position));
    map.fitBounds(bounds);
  }
}

initMap();
