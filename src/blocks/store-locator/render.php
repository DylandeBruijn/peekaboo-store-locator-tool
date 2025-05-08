<?php
/**
 * Server-side rendering of the store locator block.
 *
 * @package PSLT
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Renders the store locator block.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      The block instance.
 * @return string The rendered block markup.
 */
function render_store_locator_block($attributes, $content, $block) {
    $width = $attributes['width'] ?? '100%';
    $height = $attributes['height'] ?? '500px';
    $zoom = $attributes['zoom'] ?? 12;

    $wrapper_attributes = get_block_wrapper_attributes([
        'class' => 'pslt-store-locator-block',
        'style' => sprintf('width: %s; height: %s;', esc_attr($width), esc_attr($height))
    ]);

    ob_start();
    ?>
    <div <?php echo $wrapper_attributes; ?>>
        <div class="pslt-search-container">
            <form id="pslt-search-form" class="pslt-search-form">
                <div class="pslt-search-field">
                    <input type="text" id="pslt-postcode" name="postcode" placeholder="Enter your postcode" required>
                    <button type="submit" class="pslt-search-button">Find Stores</button>
                </div>
                <div class="pslt-filters">
                    <select id="pslt-radius" name="radius">
                        <option value="5">Within 5 miles</option>
                        <option value="10">Within 10 miles</option>
                        <option value="20">Within 20 miles</option>
                        <option value="50">Within 50 miles</option>
                    </select>
                </div>
            </form>
        </div>
        
        <div class="pslt-container">
            <div id="pslt-map" class="pslt-map"></div>
            <div id="pslt-results" class="pslt-results">
                <div class="pslt-results-list"></div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
} 