class StoreLocator {
    constructor() {
        this.map = null;
        this.markers = [];
        this.infoWindow = null;
        this.currentLocation = null;
        this.initializeMap();
        this.bindEvents();
    }

    initializeMap() {
        if (!window.psltData?.googleApiKey) {
            console.error('Google Maps API key is not configured');
            return;
        }

        // Load Google Maps API
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${window.psltData.googleApiKey}&callback=initMap`;
        script.async = true;
        script.defer = true;
        window.initMap = this.initMap.bind(this);
        document.head.appendChild(script);
    }

    initMap() {
        const mapElement = document.getElementById('pslt-map');
        if (!mapElement) return;

        this.map = new google.maps.Map(mapElement, {
            center: { lat: 54.5, lng: -4 }, // Center of UK
            zoom: 6,
            styles: [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                }
            ]
        });

        this.infoWindow = new google.maps.InfoWindow();
    }

    bindEvents() {
        document.querySelectorAll('#pslt-search-form').forEach(form => {
            form.addEventListener('submit', this.handleSearch.bind(this));
        });
    }

    async handleSearch(e) {
        e.preventDefault();
        const form = e.target;
        const postcode = form.querySelector('#pslt-postcode').value;
        const radius = form.querySelector('#pslt-radius').value;

        try {
            const response = await fetch(window.psltData.ajaxurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'pslt_search_locations',
                    nonce: window.psltData.nonce,
                    postcode: postcode,
                    radius: radius
                })
            });

            const data = await response.json();

            if (data.success) {
                this.displayResults(data.data);
            } else {
                this.showError('No locations found');
            }
        } catch (error) {
            console.error('Error searching locations:', error);
            this.showError('Error searching locations');
        }
    }

    displayResults(locations) {
        // Clear existing markers
        this.clearMarkers();

        // Clear results list
        const resultsList = document.querySelector('.pslt-results-list');
        if (resultsList) {
            resultsList.innerHTML = '';
        }

        if (!locations.length) {
            this.showError('No locations found');
            return;
        }

        // Create bounds for auto-zoom
        const bounds = new google.maps.LatLngBounds();

        locations.forEach(location => {
            // Add marker
            const marker = new google.maps.Marker({
                position: {
                    lat: parseFloat(location.coordinates.lat),
                    lng: parseFloat(location.coordinates.lng)
                },
                map: this.map,
                title: location.name
            });

            // Add click listener
            marker.addListener('click', () => {
                this.showInfoWindow(marker, location);
            });

            this.markers.push(marker);
            bounds.extend(marker.getPosition());

            // Add to results list
            this.addLocationToList(location);
        });

        // Fit map to markers
        this.map.fitBounds(bounds);
    }

    showInfoWindow(marker, location) {
        const content = `
            <div class="pslt-info-window">
                <h3>${location.name}</h3>
                <p>${location.postcode}</p>
                ${location.description ? `<p>${location.description}</p>` : ''}
            </div>
        `;

        this.infoWindow.setContent(content);
        this.infoWindow.open(this.map, marker);
    }

    addLocationToList(location) {
        const resultsList = document.querySelector('.pslt-results-list');
        if (!resultsList) return;

        const locationElement = document.createElement('div');
        locationElement.className = 'pslt-location-item';
        locationElement.innerHTML = `
            <h3>${location.name}</h3>
            <p>${location.postcode}</p>
            ${location.description ? `<p>${location.description}</p>` : ''}
        `;

        resultsList.appendChild(locationElement);
    }

    clearMarkers() {
        this.markers.forEach(marker => marker.setMap(null));
        this.markers = [];
        this.infoWindow.close();
    }

    showError(message) {
        const resultsList = document.querySelector('.pslt-results-list');
        if (resultsList) {
            resultsList.innerHTML = `<div class="pslt-error">${message}</div>`;
        }
    }
}

// Initialize store locator when document is ready
document.addEventListener('DOMContentLoaded', () => {
    new StoreLocator();
}); 