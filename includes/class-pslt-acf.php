<?php

class PSLT_ACF
{
    public function __construct()
    {
        add_action('init', [$this, 'register_custom_post_type']);
        add_action('acf/include_fields', [$this, 'register_custom_post_type_field_group']);
        add_action('init', [$this, 'register_custom_post_type_taxonomy']);
        add_action('acf/init', [$this, 'register_custom_post_type_settings']);
        add_action('acf/include_fields', [$this, 'register_custom_post_type_settings_field_group']);
    }

    public function register_custom_post_type()
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

    public function register_custom_post_type_field_group()
    {
        if (! function_exists('acf_add_local_field_group')) {
            return;
        }

        acf_add_local_field_group(array(
            'key' => 'group_681caf4414545',
            'title' => 'Custom Fields',
            'fields' => array(
                array(
                    'key' => 'field_681caf448ae41',
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
                    'key' => 'field_681cb1d6f46c5',
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
                    'key' => 'field_681cb0adf46c2',
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
                    'key' => 'field_681cb20bf46c6',
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

    public function register_custom_post_type_taxonomy()
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
        ));
    }

    public function register_custom_post_type_settings()
    {
        acf_add_options_page(array(
            'page_title' => 'Settings',
            'menu_slug' => 'settings',
            'parent_slug' => 'edit.php?post_type=location',
            'position' => '',
            'redirect' => false,
        ));
    }

    public function register_custom_post_type_settings_field_group()
    {
        if (! function_exists('acf_add_local_field_group')) {
            return;
        }

        acf_add_local_field_group(array(
            'key' => 'group_681cba2133753',
            'title' => 'Settings',
            'fields' => array(
                array(
                    'key' => 'field_681cba214bcec',
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
}

new PSLT_ACF;
