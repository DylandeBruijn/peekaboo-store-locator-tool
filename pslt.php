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
define( 'PSLT_DIR', __DIR__ );
define( 'PSLT_URL', plugin_dir_url( __FILE__ ) );

require 'includes/acf.php';
