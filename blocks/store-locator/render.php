<?php

/**
 * Store Locator block template.
 *
 * @param array $block The block settings and attributes.
 * @param string $content Inner blocks content if jsx is enabled
 * @param boolean $is_preview True during preview render
 * @param array $context any context variables from parent blocks if applicable
 */

// Get all locations
$locations = get_posts(array(
    'post_type' => 'location',
    'posts_per_page' => -1,
    'post_status' => 'publish',
));

$facilities = get_terms(array(
    'taxonomy' => 'facility',
    'hide_empty' => false,
));

$wrapper_attributes = get_block_wrapper_attributes(
    array(
        'id' => $block['anchor'] ?? '',
    )
);
?>

<?php if (! $is_preview) : ?>
    <div <?php echo $wrapper_attributes; ?>>
    <?php endif; ?>

    <div class="wp-block-acf-store-locator-grid">
        <div class="wp-block-acf-store-locator-sidebar">
            <div class="wp-block-acf-store-locator-card">
                <h3 class="wp-block-acf-store-locator-card-title">
                    Find a garden
                </h3>
                <div class="wp-block-acf-store-locator-search">
                    <input type="text" id="wp-block-acf-store-locator-search-input" class="wp-block-acf-store-locator-search-input" placeholder="Search locations...">
                    <svg class="wp-block-acf-store-locator-search-input-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C12.4125 0 12.75 0.3375 12.75 0.75V3.03281C17.1234 3.39375 20.6062 6.88125 20.9672 11.25H23.25C23.6625 11.25 24 11.5875 24 12C24 12.4125 23.6625 12.75 23.25 12.75H20.9672C20.6062 17.1234 17.1187 20.6062 12.75 20.9672V23.25C12.75 23.6625 12.4125 24 12 24C11.5875 24 11.25 23.6625 11.25 23.25V20.9672C6.87656 20.6062 3.39375 17.1234 3.03281 12.75H0.75C0.3375 12.75 0 12.4125 0 12C0 11.5875 0.3375 11.25 0.75 11.25H3.03281C3.39375 6.87656 6.87656 3.39375 11.25 3.03281V0.75C11.25 0.3375 11.5875 0 12 0ZM4.5 12C4.5 16.1423 7.85766 19.5 12 19.5C16.1423 19.5 19.5 16.1423 19.5 12C19.5 7.85766 16.1423 4.5 12 4.5C7.85766 4.5 4.5 7.85766 4.5 12ZM15 12C15 10.343 13.657 9 12 9C10.343 9 9 10.343 9 12C9 13.657 10.343 15 12 15C13.657 15 15 13.657 15 12ZM7.5 12C7.5 9.51469 9.51469 7.5 12 7.5C14.4853 7.5 16.5 9.51469 16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51469 16.5 7.5 14.4853 7.5 12Z" fill="black" />
                    </svg>
                </div>
                <div class="wp-block-acf-store-locator-filters">
                    <h3 class="wp-block-acf-store-locator-filters-title">
                        Filter by...
                    </h3>
                    <div class="wp-block-acf-store-locator-filters-list">
                        <?php foreach ($facilities as $facility) : ?>
                            <div class="wp-block-acf-store-locator-filters-list-item">
                                <input type="checkbox" id="wp-block-acf-store-locator-filter-<?php echo esc_attr($facility->slug); ?>" class="wp-block-acf-store-locator-filter-item-checkbox">
                                <label for="wp-block-acf-store-locator-filter-<?php echo esc_attr($facility->slug); ?>" class="wp-block-acf-store-locator-filter-item-label">
                                    <?php echo esc_html($facility->name); ?>
                                </label>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
            <div class="wp-block-acf-store-locator-card">
                <h3 class="wp-block-acf-store-locator-card-title">
                    Find a garden
                </h3>
                <div class="wp-block-acf-store-locator-locations-list">
                    <?php foreach ($locations as $location) :
                        $coordinates = get_field('coordinates', $location->ID);
                        $name = get_field('name', $location->ID);
                        $postcode = get_field('postcode', $location->ID);
                        $description = get_field('description', $location->ID);
                    ?>
                        <div class="wp-block-acf-store-locator-locations-list-item"
                            data-lat="<?php echo esc_attr($coordinates['lat']); ?>"
                            data-lng="<?php echo esc_attr($coordinates['lng']); ?>"
                            data-title="<?php echo esc_attr($name); ?>">
                            <h3 class="wp-block-acf-store-locator-locations-list-item-title">
                                <?php echo esc_html($name); ?>
                            </h3>
                            <p class="wp-block-acf-store-locator-locations-list-item-postcode">
                                <?php echo esc_html($postcode); ?>
                            </p>
                            <ul class="wp-block-acf-store-locator-locations-list-item-facilities">
                                
                            </ul>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <div class="wp-block-acf-store-locator-map" id="wp-block-acf-store-locator-map"></div>
    </div>

    <?php if (! $is_preview) : ?>
    </div>
<?php endif; ?>