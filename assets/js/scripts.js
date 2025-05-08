(function($) {
    'use strict';

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
            if (!psltData.googleApiKey) {
                console.error('Google Maps API key is not configured');
                return;
            }

            // Load Google Maps API
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${psltData.googleApiKey}&callback=initMap`;
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
            $('#pslt-search-form').on('submit', this.handleSearch.bind(this));
        }

        async handleSearch(e) {
            e.preventDefault();
            const postcode = $('#pslt-postcode').val();
            const radius = $('#pslt-radius').val();

            try {
                const response = await $.ajax({
                    url: psltData.ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'pslt_search_locations',
                        nonce: psltData.nonce,
                        postcode: postcode,
                        radius: radius
                    }
                });

                if (response.success) {
                    this.displayResults(response.data);
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
            $('.pslt-results-list').empty();

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
            const locationElement = `
                <div class="pslt-location-item">
                    <h3>${location.name}</h3>
                    <p>${location.postcode}</p>
                    ${location.description ? `<p>${location.description}</p>` : ''}
                </div>
            `;

            $('.pslt-results-list').append(locationElement);
        }

        clearMarkers() {
            this.markers.forEach(marker => marker.setMap(null));
            this.markers = [];
            this.infoWindow.close();
        }

        showError(message) {
            $('.pslt-results-list').html(`<div class="pslt-error">${message}</div>`);
        }
    }

    // Initialize store locator when document is ready
    $(document).ready(() => {
        new StoreLocator();
    });

})(jQuery); 