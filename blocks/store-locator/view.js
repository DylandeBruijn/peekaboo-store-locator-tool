document.addEventListener("DOMContentLoaded", () => {
  let map;
  let markers = [];
  let activeFilters = [];

  const mapElement = document.getElementById("wp-block-acf-store-locator-map");

  const searchInputElement = document.getElementById("wp-block-acf-store-locator-search-input");

  const searchIconElement = document.getElementById("wp-block-acf-store-locator-search-icon");

  const searchErrorElement = document.getElementById("wp-block-acf-store-locator-search-error");

  const locationsListElement = document.querySelector(
    ".wp-block-acf-store-locator-locations-list"
  );

  const locationElements = document.querySelectorAll(
    ".wp-block-acf-store-locator-location"
  );

  const filterCheckboxElements = document.querySelectorAll(
    ".wp-block-acf-store-locator-filter-checkbox"
  );

  function setActiveMapMarker(position) {
    map.panTo(position);
    setActiveLocation(position);
  }

  function addLocationEventListeners() {
    locationElements.forEach((location) => {
      location.addEventListener("click", () => setActiveMapMarker({
        lat: parseFloat(location.dataset.lat),
        lng: parseFloat(location.dataset.lng),
      }));
    });
  }

  function setActiveLocation(position) {
    const locations = Array.from(locationElements);
    const activeLocation = locations.find((location) => parseFloat(location.dataset.lat) === parseFloat(position.lat) && parseFloat(location.dataset.lng) === parseFloat(position.lng));

    locations.forEach((location) => {
      location.classList.remove("active");
    });

    activeLocation.classList.add("active");

    map.panTo(position);

    locationsListElement.scrollTo({
        top: activeLocation.offsetTop - locationsListElement.offsetTop,
        behavior: "smooth",
      });
  }

  async function createMarker(locationElement, map) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const position = {
      lat: parseFloat(locationElement.dataset.lat),
      lng: parseFloat(locationElement.dataset.lng),
    };
    const title = locationElement.dataset.name;
    const pinIcon = document.createElement('img');
    pinIcon.src = new URL('./icon.png', import.meta.url).href;
    pinIcon.width = 32;
    pinIcon.height = 32;
    const marker = new AdvancedMarkerElement({
      map: map,
      position: position,
      title: title,
      content: pinIcon,
      gmpClickable: true,
    });

    marker.addEventListener("gmp-click", () => setActiveLocation({
      lat: parseFloat(locationElement.dataset.lat),
      lng: parseFloat(locationElement.dataset.lng),
    }));

    marker.facilities = locationElement.dataset.facilities;
    
    markers.push(marker);
  }

  async function createMapMarkers() {
    const markerPromises = Array.from(locationElements).map((locationElement) =>
      createMarker(locationElement, map)
    );

    await Promise.all(markerPromises);
  }

  function createMapBoundaries() {
    const bounds = new google.maps.LatLngBounds();
    
    markers.forEach((marker) => {
        bounds.extend(marker.position);
    });

    map.fitBounds(bounds);
  }

  function applyFilters() {
    if (activeFilters.length === 0) {
      locationElements.forEach(location => {
        location.style.display = "flex";
      });
      
      markers.forEach(marker => {
        marker.map = map;
      });
    } else {
      locationElements.forEach(location => {
        const locationFacilities = location.dataset.facilities ? location.dataset.facilities.split(',') : [];
        const shouldShow = activeFilters.every(filter => locationFacilities.includes(filter));
        location.style.display = shouldShow ? "flex" : "none";
      });
      
      markers.forEach(marker => {
        const markerFacilities = marker.facilities ? marker.facilities.split(',') : [];
        const shouldShow = activeFilters.every(filter => markerFacilities.includes(filter));
        marker.map = shouldShow ? map : null;
      });
    }
  }

  function addFilterEventListeners() {
    filterCheckboxElements.forEach(filter => {
      filter.addEventListener("change", () => {
        if (filter.checked) {
          activeFilters.push(filter.value);
        } else {
          const index = activeFilters.indexOf(filter.value);
          if (index > -1) {
            activeFilters.splice(index, 1);
          }
        }
        applyFilters();
      });
    });
  }

  async function searchLocation(query) {
    const { Geocoder } = await google.maps.importLibrary("geocoding");
    const geocoder = new Geocoder();

    geocoder.geocode({ address: query }, (result, status) => {
      const isValidResult = status === "OK" && result;

      if (isValidResult) {
        const searchLocation = result[0].geometry.location;
        map.setCenter(searchLocation);
        map.setZoom(15);
        searchErrorElement.classList.add('wp-block-acf-store-locator-search-error-hidden');
      } else {
        searchErrorElement.classList.remove('wp-block-acf-store-locator-search-error-hidden');
      }
    });
  }

  function handleSearch() {
    const query = searchInputElement.value.trim();
    if (query) {
      searchLocation(query);
    }
  }

  function addSearchEventListeners() {
    searchIconElement.addEventListener("click", handleSearch);
    searchInputElement.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    });
  }

  async function initMap() {
    const { Map, RenderingType } = await google.maps.importLibrary("maps");

    map = new Map(mapElement, {
      zoomControl: true,
      cameraControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      scrollwheel: false,
      mapId: "PSLT_MAP",
      renderingType: RenderingType.VECTOR,
    });

    await createMapMarkers();

    addLocationEventListeners();
    addSearchEventListeners();
    addFilterEventListeners();

    createMapBoundaries();
  }

  initMap();
});
