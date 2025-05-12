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
                <div id="wp-block-acf-store-locator-locations-list" class="wp-block-acf-store-locator-locations-list">
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
                            <div>
                                <h3 class="wp-block-acf-store-locator-locations-list-item-title">
                                    <?php echo esc_html($name); ?>
                                </h3>
                                <p class="wp-block-acf-store-locator-locations-list-item-postcode">
                                    <?php echo esc_html($postcode); ?>
                                </p>
                            </div>
                            <ul class="wp-block-acf-store-locator-locations-list-item-facilities">
                                <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.1115 0.168571L11.7785 6.07471C12.0535 6.31669 12.0744 6.73094 11.8285 7.00164C11.5827 7.27234 11.1618 7.29285 10.8868 7.05086L4.21979 1.14472C3.94477 0.902736 3.92394 0.488487 4.16979 0.217789C4.41563 -0.0529091 4.83649 -0.0734165 5.1115 0.168571ZM5.99905 7.87526H10.666V15.7214C10.4451 15.7419 10.2243 15.7501 9.99926 15.7501C8.7992 15.7501 7.6658 15.4671 6.66575 14.9626V19.6875C6.66575 20.4135 6.06989 21 5.33235 21H3.99894C3.26141 21 2.66554 20.4135 2.66554 19.6875V10.2459C1.46548 9.79885 0.523763 8.79809 0.198747 7.51843L0.0404049 6.8827C-0.138771 6.18134 0.294585 5.46769 1.01129 5.29132C1.72799 5.11496 2.44886 5.54151 2.62804 6.24697L2.79055 6.8827C2.93639 7.46511 3.46975 7.87526 4.08228 7.87526H5.99905ZM13.3328 14.9626C12.9119 15.1759 12.4661 15.3482 11.9994 15.4794V8.53559L17.333 10.7463V19.6875C17.333 20.4135 16.7371 21 15.9996 21H14.6662C13.9286 21 13.3328 20.4135 13.3328 19.6875V14.9626ZM17.7788 7.87526L17.5205 9.40101L12.7452 7.41999L13.862 0.816605C13.9411 0.344935 14.3537 0 14.837 0C15.1495 0 15.4412 0.143552 15.6287 0.389641L16.3329 1.31247H18.5039C19.0331 1.31247 19.5414 1.52165 19.9164 1.89078L20.6665 2.62495H22.9999C23.5541 2.62495 24 3.06381 24 3.6093V4.59366C24 6.40652 22.5082 7.87485 20.6665 7.87485H17.7788V7.87526ZM18.6664 3.93783C19.0347 3.93783 19.3331 3.64417 19.3331 3.2816C19.3331 2.91903 19.0347 2.62536 18.6664 2.62536C18.298 2.62536 17.9997 2.91903 17.9997 3.2816C17.9997 3.64417 18.298 3.93783 18.6664 3.93783Z" fill="black" />
                                </svg>
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.87562 3.9375C8.96302 3.9375 9.84452 3.05607 9.84452 1.96875C9.84452 0.881426 8.96302 0 7.87562 0C6.78821 0 5.90671 0.881426 5.90671 1.96875C5.90671 3.05607 6.78821 3.9375 7.87562 3.9375ZM4.94277 10.1391C5.4514 9.94629 5.70982 9.38027 5.51703 8.87168C5.32424 8.36309 4.75818 8.10469 4.24955 8.29746C1.76791 9.23262 0 11.6279 0 14.4375C0 18.0633 2.93695 21 6.56301 21C9.07337 21 11.2515 19.5932 12.3549 17.526C12.6092 17.0461 12.4287 16.4514 11.9488 16.193C11.4689 15.9346 10.8741 16.1191 10.6157 16.599C9.84452 18.0469 8.31862 19.0312 6.56301 19.0312C4.02395 19.0312 1.9689 16.9764 1.9689 14.4375C1.9689 12.4729 3.20357 10.7953 4.94277 10.1391ZM10.6567 7.21875L10.5788 6.8209C10.3942 5.90625 9.5943 5.25 8.65907 5.25C7.42441 5.25 6.49738 6.37793 6.73939 7.58789L7.68693 12.3252C7.93304 13.5516 9.00773 14.4334 10.2629 14.4334H14.3853C14.6601 14.4334 14.9021 14.6016 15.0006 14.86L16.4896 18.8344C16.7357 19.4947 17.4658 19.8434 18.1344 19.6178L20.1033 18.9615C20.7924 18.7318 21.1616 17.9895 20.9319 17.3004C20.7022 16.6113 19.9598 16.2422 19.2706 16.4719L18.5036 16.7262L17.4576 13.9371C16.9777 12.6574 15.7512 11.8084 14.3853 11.8084H11.5755L11.1817 9.83965H13.7823C14.5084 9.83965 15.0949 9.25313 15.0949 8.52715C15.0949 7.80117 14.5084 7.21465 13.7823 7.21465H10.6567V7.21875Z" fill="black" />
                                </svg>
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 0C1.34531 0 0 1.34531 0 3V18C0 19.6547 1.34531 21 3 21H18C19.6547 21 21 19.6547 21 18V3C21 1.34531 19.6547 0 18 0H3ZM9 10.5H11.25C12.0797 10.5 12.75 9.82969 12.75 9C12.75 8.17031 12.0797 7.5 11.25 7.5H9V10.5ZM11.25 13.5H9V15C9 15.8297 8.32969 16.5 7.5 16.5C6.67031 16.5 6 15.8297 6 15V6.375C6 5.33906 6.83906 4.5 7.875 4.5H11.25C13.7344 4.5 15.75 6.51562 15.75 9C15.75 11.4844 13.7344 13.5 11.25 13.5Z" fill="black" />
                                </svg>
                            </ul>
                            <a href="<?php echo esc_url($location->permalink); ?>" class="wp-block-acf-store-locator-locations-list-item-link">
                                More details
                            </a>
                        </div>
                    <?php endforeach; ?>
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