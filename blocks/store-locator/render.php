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
                    <div id="wp-block-acf-store-locator-filters-list" class="wp-block-acf-store-locator-filters-list">
                        <!-- Filters will be rendered here by JavaScript -->
                    </div>
                </div>
            </div>
            <div class="wp-block-acf-store-locator-card">
                <h3 class="wp-block-acf-store-locator-card-title">
                    Find a garden
                </h3>
                <div id="wp-block-acf-store-locator-locations-list" class="wp-block-acf-store-locator-locations-list">
                    <!-- Locations will be rendered here by JavaScript -->
                </div>
            </div>
        </div>
        <div id="wp-block-acf-store-locator-map" class="wp-block-acf-store-locator-map"></div>
    </div>

    <?php if (! $is_preview) : ?>
    </div>
<?php endif; ?>

<script>
    (g => {
        var h, a, k, p = "The Google Maps JavaScript API",
            c = "google",
            l = "importLibrary",
            q = "__ib__",
            m = document,
            b = window;
        b = b[c] || (b[c] = {});
        var d = b.maps || (b.maps = {}),
            r = new Set,
            e = new URLSearchParams,
            u = () => h || (h = new Promise(async (f, n) => {
                await (a = m.createElement("script"));
                e.set("libraries", [...r] + "");
                for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
                e.set("callback", c + ".maps." + q);
                a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
                d[q] = f;
                a.onerror = () => h = n(Error(p + " could not load."));
                a.nonce = m.querySelector("script[nonce]")?.nonce || "";
                m.head.append(a)
            }));
        d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n))
    })({
        key: '<?php echo get_field('google_api_key', 'option'); ?>',
        v: "weekly",
    });
</script>