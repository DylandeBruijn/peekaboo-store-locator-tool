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
    const domParser = new DOMParser();
    const pinSvgString = `<svg width="40" height="53" viewBox="0 0 40 53" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40.0007 19.8403C40.0007 30.804 20.0053 53 20.0053 53C20.0053 53 0.00976562 30.804 0.00976562 19.8403C0.00976562 8.87663 8.95583 0 19.9962 0C31.0366 0 39.9917 8.88558 39.9917 19.8403H40.0007Z" fill="#2F8F95" /><path d="M30.5024 18.7565C32.3801 17.1173 32.8947 14.3406 31.5948 12.1102C30.2948 9.87985 27.6137 8.93934 25.2486 9.72758C24.7521 7.29121 22.5945 5.46393 19.9947 5.46393C17.3948 5.46393 15.2373 7.30016 14.7408 9.72758C12.3756 8.93038 9.68547 9.87985 8.39457 12.1102C7.10366 14.3406 7.60919 17.1173 9.48687 18.7565C7.60919 20.3957 7.09464 23.1724 8.39457 25.4027C9.6945 27.6331 12.3756 28.5736 14.7408 27.7854C15.2373 30.2217 17.3948 32.049 19.9947 32.049C22.5945 32.049 24.7521 30.2128 25.2486 27.7854C27.6137 28.5826 30.3038 27.6331 31.5948 25.4027C32.8947 23.1724 32.3801 20.3957 30.5024 18.7565Z" fill="white" /></svg>`;
    const pinSvgElement = domParser.parseFromString(pinSvgString, "image/svg+xml").documentElement;
    const marker = new AdvancedMarkerElement({
      map: map,
      position: position,
      title: title,
      content: pinSvgElement,
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
