document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.getElementById('wp-block-acf-store-locator-map');
    if (!mapContainer) return;

    // Initialize map
    const map = new google.maps.Map(mapContainer, {
        zoom: 12,
        center: { lat: 51.5074, lng: -0.1278 }, // Default to London
        styles: [
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{ "visibility": "off" }]
            }
        ]
    });

    const markers = [];
    const infoWindows = [];
    const locationItems = document.querySelectorAll('.wp-block-acf-store-locator-locations-list-item');
    const searchInput = document.getElementById('wp-block-acf-store-locator-search-input');

    // Create markers and info windows for each location
    locationItems.forEach((item, index) => {
        const lat = parseFloat(item.dataset.lat);
        const lng = parseFloat(item.dataset.lng);
        const title = item.dataset.title;

        const marker = new google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: title,
            animation: google.maps.Animation.DROP
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="map-info-window">
                    <h3>${title}</h3>
                    <p>${item.querySelector('.wp-block-acf-store-locator-locations-list-item-postcode').textContent}</p>
                </div>
            `
        });

        markers.push(marker);
        infoWindows.push(infoWindow);

        // Add click event to marker
        marker.addListener('click', () => {
            infoWindows.forEach(window => window.close());
            infoWindow.open(map, marker);
            map.panTo(marker.getPosition());
        });

        // Add click event to list item
        item.addEventListener('click', () => {
            infoWindows.forEach(window => window.close());
            infoWindow.open(map, marker);
            map.panTo(marker.getPosition());
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => marker.setAnimation(null), 750);
        });
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        locationItems.forEach((item, index) => {
            const title = item.dataset.title.toLowerCase();
            const postcode = item.querySelector('.wp-block-acf-store-locator-locations-list-item-postcode').textContent.toLowerCase();
            const description = item.querySelector('.wp-block-acf-store-locator-locations-list-item-description').textContent.toLowerCase();
            
            const isVisible = title.includes(searchTerm) || 
                            postcode.includes(searchTerm) || 
                            description.includes(searchTerm);
            
            item.style.display = isVisible ? 'block' : 'none';
            markers[index].setVisible(isVisible);
        });
    });

    // Fit map to show all markers
    if (markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(marker => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
    }
});
