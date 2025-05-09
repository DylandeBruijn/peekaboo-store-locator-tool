<?php

add_action('init', 'pslt_register_custom_post_type');
add_action('acf/include_fields', 'pslt_register_custom_post_type_field_group');
add_action('init', 'pslt_register_custom_post_type_taxonomy');
add_action('acf/init', 'pslt_register_custom_post_type_settings');
add_action('acf/include_fields', 'pslt_register_custom_post_type_settings_field_group');
add_action('init', 'pslt_register_all_blocks');
add_action('acf/init', 'pslt_update_google_api_key');
add_action('wp_enqueue_scripts', 'pslt_enqueue_google_maps');

function pslt_register_custom_post_type()
{
    register_post_type('location', array(
        'labels' => array(
            'name' => 'Locations',
            'singular_name' => 'Location',
            'menu_name' => 'Locations',
            'all_items' => 'All Locations',
            'edit_item' => 'Edit Location',
            'view_item' => 'View Location',
            'view_items' => 'View Locations',
            'add_new_item' => 'Add New Location',
            'add_new' => 'Add New Location',
            'new_item' => 'New Location',
            'parent_item_colon' => 'Parent Location:',
            'search_items' => 'Search Locations',
            'not_found' => 'No locations found',
            'not_found_in_trash' => 'No locations found in the bin',
            'archives' => 'Location Archives',
            'attributes' => 'Location Attributes',
            'insert_into_item' => 'Insert into location',
            'uploaded_to_this_item' => 'Uploaded to this location',
            'filter_items_list' => 'Filter locations list',
            'filter_by_date' => 'Filter locations by date',
            'items_list_navigation' => 'Locations list navigation',
            'items_list' => 'Locations list',
            'item_published' => 'Location published.',
            'item_published_privately' => 'Location published privately.',
            'item_reverted_to_draft' => 'Location reverted to draft.',
            'item_scheduled' => 'Location scheduled.',
            'item_updated' => 'Location updated.',
            'item_link' => 'Location Link',
            'item_link_description' => 'A link to a location.',
        ),
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-location-alt',
        'supports' => array(
            0 => 'title',
            1 => 'custom-fields',
        ),
        'delete_with_user' => false,
    ));
}

function pslt_register_custom_post_type_field_group()
{
    if (! function_exists('acf_add_local_field_group')) {
        return;
    }

    acf_add_local_field_group(array(
        'key' => 'pslt_location_field_group',
        'title' => 'Custom Fields',
        'fields' => array(
            array(
                'key' => 'pslt_location_field_group_name',
                'label' => 'Name',
                'name' => 'name',
                'aria-label' => '',
                'type' => 'text',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'default_value' => '',
                'maxlength' => '',
                'allow_in_bindings' => 0,
                'placeholder' => '',
                'prepend' => '',
                'append' => '',
            ),
            array(
                'key' => 'pslt_location_field_group_postcode',
                'label' => 'Postcode',
                'name' => 'postcode',
                'aria-label' => '',
                'type' => 'text',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'default_value' => '',
                'maxlength' => '',
                'allow_in_bindings' => 0,
                'placeholder' => '',
                'prepend' => '',
                'append' => '',
            ),
            array(
                'key' => 'pslt_location_field_group_description',
                'label' => 'Description',
                'name' => 'description',
                'aria-label' => '',
                'type' => 'wysiwyg',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'default_value' => '',
                'allow_in_bindings' => 0,
                'tabs' => 'all',
                'toolbar' => 'full',
                'media_upload' => 1,
                'delay' => 0,
            ),
            array(
                'key' => 'pslt_location_field_group_coordinates',
                'label' => 'Coordinates',
                'name' => 'coordinates',
                'aria-label' => '',
                'type' => 'google_map',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'center_lat' => '',
                'center_lng' => '',
                'zoom' => '',
                'height' => '',
                'allow_in_bindings' => 0,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'location',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'hide_on_screen' => '',
        'active' => true,
        'description' => '',
        'show_in_rest' => 0,
    ));
}

function pslt_register_custom_post_type_taxonomy()
{
    register_taxonomy('facility', array(
        0 => 'location',
    ), array(
        'labels' => array(
            'name' => 'Facilities',
            'singular_name' => 'Facility',
            'menu_name' => 'Facilities',
            'all_items' => 'All Facilities',
            'edit_item' => 'Edit Facility',
            'view_item' => 'View Facility',
            'update_item' => 'Update Facility',
            'add_new_item' => 'Add New Facility',
            'new_item_name' => 'New Facility Name',
            'search_items' => 'Search Facilities',
            'popular_items' => 'Popular Facilities',
            'separate_items_with_commas' => 'Separate facilities with commas',
            'add_or_remove_items' => 'Add or remove facilities',
            'choose_from_most_used' => 'Choose from the most used facilities',
            'not_found' => 'No facilities found',
            'no_terms' => 'No facilities',
            'items_list_navigation' => 'Facilities list navigation',
            'items_list' => 'Facilities list',
            'back_to_items' => '← Go to facilities',
            'item_link' => 'Facility Link',
            'item_link_description' => 'A link to a facility',
        ),
        'public' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'hierarchical' => true,
        'meta_box_cb' => function ($post, $box) {
            $tax_name = esc_attr($box['args']['taxonomy']);
            $terms = get_terms(array(
                'taxonomy' => $tax_name,
                'hide_empty' => false,
            ));

            if (!empty($terms)) {
                echo '<style>
                        #' . $tax_name . 'div .inside {
                            padding: 10px;
                            margin: 0;
                        }
                        #' . $tax_name . 'div .inside ul {
                            list-style: none;
                            padding: 0;
                            margin: 0;
                        }
                        #' . $tax_name . 'div .inside li:last-child {
                            margin-bottom: 0;
                        }
                        #' . $tax_name . 'div .inside label {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            cursor: pointer;
                        }
                        #' . $tax_name . 'div .inside input[type="checkbox"] {
                            margin: 0;
                        }
                    </style>';
                echo '<input type="hidden" name="tax_input[' . $tax_name . '][]" value="" />';
                echo '<ul>';
                foreach ($terms as $term) {
                    $checked = has_term($term->term_id, $tax_name, $post) ? ' checked="checked"' : '';
                    echo '<li><label><input type="checkbox" name="tax_input[' . $tax_name . '][]" value="' . esc_attr($term->term_id) . '"' . $checked . ' /> ' . esc_html($term->name) . '</label></li>';
                }
                echo '</ul>';
            }
        }
    ));
}

function pslt_register_custom_post_type_settings()
{
    acf_add_options_page(array(
        'page_title' => 'Settings',
        'menu_slug' => 'settings',
        'parent_slug' => 'edit.php?post_type=location',
        'position' => '',
        'redirect' => false,
    ));
}

function pslt_register_custom_post_type_settings_field_group()
{
    if (! function_exists('acf_add_local_field_group')) {
        return;
    }

    acf_add_local_field_group(array(
        'key' => 'pslt_locations_settings',
        'title' => 'Settings',
        'fields' => array(
            array(
                'key' => 'pslt_locations_settings_google_api_key',
                'label' => 'Google API Key',
                'name' => 'google_api_key',
                'aria-label' => '',
                'type' => 'text',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'default_value' => '',
                'maxlength' => '',
                'allow_in_bindings' => 0,
                'placeholder' => '',
                'prepend' => '',
                'append' => '',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'options_page',
                    'operator' => '==',
                    'value' => 'settings',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'hide_on_screen' => '',
        'active' => true,
        'description' => '',
        'show_in_rest' => 0,
    ));
}

function pslt_register_all_blocks()
{
    $block_directories = glob(PSLT_DIR . "/blocks/*", GLOB_ONLYDIR);

	foreach ($block_directories as $block) {
		register_block_type( $block );
	}
}

function pslt_update_google_api_key()
{
    acf_update_setting('google_api_key', get_field('google_api_key', 'option'));
}

function pslt_enqueue_google_maps() {
    $api_key = get_field('google_api_key', 'option');
    
    if (!empty($api_key)) {
        wp_enqueue_script(
            'google-maps',
            "https://maps.googleapis.com/maps/api/js?key={$api_key}",
            array(),
            null,
            true
        );
    }
}
