<?php
/*
Plugin Name: Peekaboo Store Locator Tool
Plugin URI: https://www.peekaboo.co.uk
Description: Peekaboo Store Locator Tool
Version: 1.0.0
Author: Peekaboo
Author URI: https://www.peekaboo.co.uk
License: GPL2
Text Domain: pslt
Domain Path: /languages
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'PSLT_VERSION', '1.0.0' );
define( 'PSLT_DIR', plugin_dir_path( __FILE__ ) );
define( 'PSLT_URL', plugin_dir_url( __FILE__ ) );

require_once PSLT_DIR . "includes/class-pslt-acf.php";

class PSLT {
	private static $instance = null;

	public static function get_instance() {
		if (null === self::$instance) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		$this->init_hooks();
		$this->load_dependencies();
	}

	private function init_hooks() {
		add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
	}

	private function load_dependencies() {
		new PSLT_ACF();
	}

	public function enqueue_scripts() {
		wp_enqueue_style(
			'pslt-styles',
			PSLT_URL . 'assets/css/styles.css',
			array(),
			PSLT_VERSION
		);

		wp_enqueue_script(
			'pslt-scripts',
			PSLT_URL . 'assets/js/scripts.js',
			array('jquery'),
			PSLT_VERSION,
			true
		);

		wp_localize_script('pslt-scripts', 'psltData', array(
			'ajaxurl' => admin_url('admin-ajax.php'),
			'nonce' => wp_create_nonce('pslt-nonce'),
			'googleApiKey' => get_field('google_api_key', 'option')
		));
	}
}

function PSLT() {
	return PSLT::get_instance();
}

PSLT();