<?php
/**
 * Store Locator Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during backend preview render.
 * @param   int $post_id The post ID the block is rendering content into.
 * @param   array $context The context provided to the block by the post or its parent block.
 */

// Create id attribute allowing for custom "anchor" value
$id = 'store-locator-' . $block['id'];
if (!empty($block['anchor'])) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values
$className = 'pslt-store-locator-block';
if (!empty($block['className'])) {
    $className .= ' ' . $block['className'];
}
if (!empty($block['align'])) {
    $className .= ' align' . $block['align'];
}

// Load values and assign defaults
$width = get_field('width') ?: '100%';
$height = get_field('height') ?: '500px';
$zoom = get_field('zoom') ?: '12';
?>

<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>">
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
        <div id="pslt-map" class="pslt-map" style="width: <?php echo esc_attr($width); ?>; height: <?php echo esc_attr($height); ?>;"></div>
        <div id="pslt-results" class="pslt-results">
            <div class="pslt-results-list"></div>
        </div>
    </div>
</div>

<?php if ($is_preview) : ?>
    <script>
        // Preview mode script
        document.addEventListener('DOMContentLoaded', function() {
            const mapElement = document.getElementById('pslt-map');
            if (mapElement) {
                mapElement.innerHTML = '<div style="padding: 20px; text-align: center; background: #f0f0f0; height: 100%; display: flex; align-items: center; justify-content: center;">Store Locator Map Preview</div>';
            }
        });
    </script>
<?php endif; ?> 