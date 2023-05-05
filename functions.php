<?php
/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Organic Rialto
 * @since Organic Rialto 1.0
 */

/*
-------------------------------------------------------------------------------------------------------
	Theme Setup
-------------------------------------------------------------------------------------------------------
*/

if ( ! function_exists( 'organic_rialto_setup' ) ) {
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 *
	 * @since Rialto 1.0
	 * @return void
	 */
	function organic_rialto_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 */
		load_theme_textdomain( 'organic-rialto', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );
		set_post_thumbnail_size( 2400, 9999 );

		// Add support for Block Styles.
		add_theme_support( 'wp-block-styles' );

		// Add support for editor styles.
		add_theme_support( 'editor-styles' );

		// Add support for responsive embedded content.
		add_theme_support( 'responsive-embeds' );

		// Add support for experimental link color control.
		add_theme_support( 'experimental-link-color' );

		// Add support for custom block spacing.
		add_theme_support( 'custom-spacing' );

		// Add support for wide alignment class for Gutenberg blocks.
		add_theme_support( 'align-wide' );

		// Add support for custom units.
		add_theme_support( 'custom-units' );

		// Enqueue editor styles.
		add_editor_style( 'style.css' );

		/*
		* Enable custom color palette.
		*/
		add_theme_support(
			'editor-color-palette',
			array(
				array(
					'name'  => esc_attr__( 'Primary Accent', 'organic-rialto' ),
					'slug'  => 'accent-primary',
					'color' => '#38bda6',
				),
				array(
					'name'  => esc_attr__( 'Secondary Accent', 'organic-rialto' ),
					'slug'  => 'accent-secondary',
					'color' => '#D9E9E7',
				),
				array(
					'name'  => esc_attr__( 'Background Dark', 'organic-rialto' ),
					'slug'  => 'bg-dark',
					'color' => '#495369',
				),
				array(
					'name'  => esc_attr__( 'Background Light', 'organic-rialto' ),
					'slug'  => 'bg-light',
					'color' => '#E5EEED',
				),
			)
		);

		/*
		* Enable support for custom menus.
		*/
		register_nav_menus(
			array(
				'main-menu'      => esc_html__( 'Main Menu', 'organic-rialto' ),
				'secondary-menu' => esc_html__( 'Secondary Menu', 'organic-rialto' ),
				'social-menu'    => esc_html__( 'Social Menu', 'organic-rialto' ),
			)
		);
	}
	add_action( 'after_setup_theme', 'organic_rialto_setup' );
}

/*
-------------------------------------------------------------------------------------------------------
	Register Pattern Categories
-------------------------------------------------------------------------------------------------------
*/

/**
 * Register Block Pattern Category.
 */
if ( function_exists( 'register_block_pattern_category' ) ) {

	register_block_pattern_category(
		'organic-rialto-patterns',
		array( 'label' => esc_html__( 'Rialto Theme', 'organic-maker' ) )
	);
}

/*
-------------------------------------------------------------------------------------------------------
	Enqueue Styles and Scripts
-------------------------------------------------------------------------------------------------------
*/

if ( ! function_exists( 'organic_rialto_scripts' ) ) {
	/**
	 * Enqueue scripts and styles for frontend.
	 *
	 * @since Rialto 1.0
	 * @return void
	 */
	function organic_rialto_scripts() {
		wp_enqueue_style( 'organic-rialto-style', get_template_directory_uri() . '/style.css', array(), wp_get_theme()->get( 'Version' ) );
		wp_enqueue_style( 'organic-rialto-font-awesome', get_template_directory_uri() . '/assets/css/font-awesome.css', array( 'organic-rialto-style' ), '5.15.2' );
		wp_enqueue_style( 'organic-rialto-animate', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css', array( 'organic-rialto-style' ), '4.1.1' );
		wp_enqueue_script( 'organic-rialto-custom-js', get_template_directory_uri() . '/assets/js/jquery.custom.js', array( 'jquery' ), '1.0', true );
		if ( class_exists( 'WeDevs_Dokan' ) ) {
			wp_enqueue_style( 'organic-rialto-dokan', get_template_directory_uri() . '/assets/css/dokan.css', array( 'organic-rialto-style' ), wp_get_theme()->get( 'Version' ) );
		}
	}
	add_action( 'wp_enqueue_scripts', 'organic_rialto_scripts' );
}

/*
-------------------------------------------------------------------------------------------------------
	Gutenberg Editor Scripts
-------------------------------------------------------------------------------------------------------
*/

if ( ! function_exists( 'organic_rialto_editor_scripts' ) ) {

	/**
	 * Enqueue WordPress theme styles within Gutenberg.
	 */
	function organic_rialto_editor_scripts() {
		wp_enqueue_style(
			'organic-rialto-editor',
			get_theme_file_uri( '/assets/css/editor.css' ),
			false,
			'1.0',
			'all'
		);
		if ( class_exists( 'Woocommerce' ) ) {
			wp_enqueue_style(
				'organic-rialto-editor-woocommerce',
				get_theme_file_uri( '/assets/css/woocommerce.css' ),
				false,
				'1.0',
				'all'
			);
		}
		if ( class_exists( 'WeDevs_Dokan' ) ) {
			wp_enqueue_style(
				'organic-rialto-editor-dokan',
				get_theme_file_uri( '/assets/css/dokan.css' ),
				false,
				'1.0',
				'all'
			);
		}
	}
}
add_action( 'enqueue_block_editor_assets', 'organic_rialto_editor_scripts', 10 );

/*
-------------------------------------------------------------------------------------------------------
	Theme Updater
-------------------------------------------------------------------------------------------------------
*/

if ( ! function_exists( 'organic_rialto_theme_updater' ) ) {

	/** Function organic_rialto_theme_updater */
	function organic_rialto_theme_updater() {
		require get_template_directory() . '/updater/theme-updater.php';
	}
}
add_action( 'after_setup_theme', 'organic_rialto_theme_updater' );

/*
-------------------------------------------------------------------------------------------------------
	Includes
-------------------------------------------------------------------------------------------------------
*/

// Typefaces.
require_once get_template_directory() . '/inc/typefaces.php';

// WooCommerce Setup.
if ( class_exists( 'Woocommerce' ) ) {
	require get_template_directory() . '/inc/woocommerce.php';
}

/*
-------------------------------------------------------------------------------------------------------
	Theme Setup Wizard
-------------------------------------------------------------------------------------------------------
*/

require_once get_parent_theme_file_path( '/inc/plugin-activation.php' );
require_once get_parent_theme_file_path( '/inc/merlin/vendor/autoload.php' );
require_once get_parent_theme_file_path( '/inc/merlin/class-merlin.php' );
require_once get_parent_theme_file_path( '/inc/merlin-config.php' );
require_once get_parent_theme_file_path( '/inc/merlin-filters.php' );

/** Function merlin_local_import_files */
function merlin_local_import_files() {
	return array(
		array(
			'import_file_name'  => 'Demo Import',
			'local_import_file' => get_parent_theme_file_path( '/demo/default-demo-content.xml' ),
			'preview_url'       => esc_url( 'https://rialto.organicthemes.com/' ),
		),
	);
}
add_filter( 'merlin_import_files', 'merlin_local_import_files' );

/*
-------------------------------------------------------------------------------------------------------
	WP.com Auto Load Organic Blocks
-------------------------------------------------------------------------------------------------------
*/

if ( defined( 'IS_ATOMIC' ) && IS_ATOMIC && defined( 'ATOMIC_CLIENT_ID' ) && '2' === ATOMIC_CLIENT_ID ) {

	/** Function organic_rialto_load_obb */
	function organic_rialto_load_obb() {
		if ( ! class_exists( 'Organic_Blocks_Bundle' ) ) {
			include_once get_template_directory() . '/inc/plugins/organic-blocks-bundle/organic-blocks-bundle.php';
		}
	}
	add_action( 'after_setup_theme', 'organic_rialto_load_obb' );
}
