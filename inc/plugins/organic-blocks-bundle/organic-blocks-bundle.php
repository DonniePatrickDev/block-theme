<?php
/**
 * Plugin Name: Organic Blocks Bundle
 * Plugin URI: https://organicthemes.com
 * Description: A collection of powerful blocks for the Gutenberg editor.
 * Version: 2.2.2
 * Author: Organic Themes
 * Author URI: https://organicthemes.com
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: obb
 * Domain Path: /languages
 *
 * @package Organic Blocks Bundle
 */

if ( ! defined( 'ABSPATH' ) ) {
	die();
}

// Current Version (Keep in sync with Version # above).
define( 'OBB_CURRENT_VERSION', '2.2.2' );
define( 'OBB_OT_STORE_URL', 'https://organicthemes.com' ); // The URL of our store.
define( 'OBB_PRODUCT_ID', 399454 ); // The EDD product ID.
define( 'OBB_PLUGIN_NAME', 'Blocks Bundle' ); // The EDD product name.
define( 'OBB_LICENSE_PAGE', 'organic-blocks' ); // The name of the settings page for the license input.

if ( ! class_exists( 'OBB_Plugin_Updater' ) ) {
	// Load our custom updater class.
	include dirname( __FILE__ ) . '/includes/updater/obb-updater-class.php';
	// Load our custom updater admin.
	include dirname( __FILE__ ) . '/includes/updater/obb-updater-admin.php';
}

/**
 * The code that compares version numbers for updates.
 */
function obb_plugin_updater() {

	// To support auto-updates, this needs to run during the wp_version_check cron job for privileged users.
	$doing_cron = defined( 'DOING_CRON' ) && DOING_CRON;
	if ( ! current_user_can( 'manage_options' ) && ! $doing_cron ) {
		return;
	}

	// Retrieve our license key from the DB.
	$license_key = trim( get_option( 'obb_license_key' ) );
	$status      = get_option( 'obb_license_status' );

	// Setup the updater.
	$edd_updater = new OBB_Plugin_Updater(
		OBB_OT_STORE_URL,
		__FILE__,
		array(
			'version' => OBB_CURRENT_VERSION, // Current version number, i.e. '1.0'.
			'license' => $license_key, // License key (used get_option above to retrieve from DB).
			'item_id' => OBB_PRODUCT_ID, // ID of the product.
			'author'  => 'Organic Themes', // Author of this plugin.
			'beta'    => false,
		)
	);

}
add_action( 'init', 'obb_plugin_updater' );

/**
 * Register Organic Widgets menu pages.
 *
 * @since 1.0.0
 */
function obb_admin_menus() {

	$icon_svg = 'data:image/svg+xml;base64,' . base64_encode(
		'<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="120 10 40 40" xml:space="preserve">
		<g>
			<path fill="#a0a5aa" d="M144.128,11.221c-7.733,0-13.455,1.824-17.002,5.421c-8.137,8.252-5.41,17.112-4.38,19.634
				c0.906,2.217,2.021,3.613,2.875,4.35l2.957-2.609l-0.278-13.13l2.999,10.728l4.374-3.86l0.438-10.677l1.894,8.617l10.528-8.433
				l-8.292,10.76l8.57,1.933l-10.595,0.444l-3.776,4.422l10.614,3.049l-12.974-0.278l-2.522,2.956c0.092,0.11,0.194,0.228,0.315,0.344
				c1.9,1.938,5.897,3.889,10.54,3.889c3.257,0,8.112-0.991,12.775-5.72c8.079-8.19,4.882-25.648,3.841-30.338
				C154.816,12.222,149.721,11.221,144.128,11.221L144.128,11.221L144.128,11.221z"/>
		</g>
		</svg>'
	);

	// Add Menu Item. WP.com conditionally hide license page.
	if ( defined( 'IS_ATOMIC' ) && IS_ATOMIC && defined( 'ATOMIC_CLIENT_ID' ) && '2' === ATOMIC_CLIENT_ID && ( 'organic-stax' === get_template() || 'natural-block' === get_template() || 'restaurant-block' === get_template() || 'photographer-block' === get_template() ) ) {
		return;
	} else {
		add_menu_page(
			esc_html__( 'Organic Blocks', 'obb' ),
			esc_html__( 'Organic Blocks', 'obb' ),
			'manage_options',
			OBB_LICENSE_PAGE,
			'obb_license_page',
			$icon_svg,
			110
		);
	}

}
add_action( 'admin_menu', 'obb_admin_menus' );

/**
 * Include license screen content.
 *
 * @since    1.0.0
 */
function obb_license_page() {
	include_once plugin_dir_path( __FILE__ ) . '/admin/obb-license-page.php';
}

/**
 * Register license option.
 *
 * @since 1.0.0
 */
function obb_register_option() {
	// Creates our settings in the options table.
	register_setting( 'obb_license', 'obb_license_key', 'obb_sanitize_license' );
}
add_action( 'admin_init', 'obb_register_option' );

/**
 * Sanitize license.
 *
 * @param array $new Update old instance.
 * @since 1.0.0
 */
function obb_sanitize_license( $new ) {
	$old = get_option( 'obb_license_key' );
	if ( $old && $old != $new ) {
		delete_option( 'obb_license_status' ); // New license has been entered, so must reactivate.
	}
	return $new;
}

if ( ! class_exists( 'Organic_Blocks_Bundle' ) ) {

	/**
	 * Load our plugin class.
	 */
	class Organic_Blocks_Bundle {

		/**
		 * Load instance variable.
		 *
		 * @var $instance Set instance variable.
		 */
		private static $instance;

		/**
		 * Load instance of class.
		 */
		public static function get_instance() {

			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Constructor.
		 */
		public function __construct() {

			$this->define_constants();
			$this->loader();

			add_action( 'init', array( $this, 'register_styles' ) );
			add_action( 'init', array( $this, 'register_block_types' ) );
			add_action( 'enqueue_block_assets', array( $this, 'editor_scripts' ) );
			add_filter( 'block_categories_all', array( $this, 'organic_block_category' ), 10, 2 );

			// Widget Area Actions.
			add_action( 'widgets_init', array( 'OBB_Widget_Area_Block', 'register_widget_sidebar' ), 0 );
			add_action( 'save_post', array( 'OBB_Widget_Area_Block', 'update_widgets_log' ), 10, 3 );
			add_action( 'delete_post', array( 'OBB_Widget_Area_Block', 'delete_widgets_log' ), 10 );

			// Add rest api routes that call methods to retrieve menus and fonts in blocks.
			add_action(
				'rest_api_init',
				function () {
					register_rest_route(
						'obbroute',
						'/menu',
						array(
							'methods'  => 'GET',
							'callback' => array( $this, 'get_menu' ),
						)
					);
				}
			);

			add_action(
				'rest_api_init',
				function () {
					register_rest_route(
						'obbroute',
						'/fonts',
						array(
							'methods'  => 'GET',
							'callback' => array( $this, 'get_fonts' ),
						)
					);
				}
			);

		}

		/**
		 * Get custom menus.
		 */
		public function get_menu() {
			$menus = get_terms( 'nav_menu' );
			return $menus;
		}

		/**
		 * Get Google Fonts.
		 */
		public function get_fonts() {
			$fonts = obb_get_fonts();
			return $fonts;
		}

		/**
		 * Define constants for paths.
		 */
		public function define_constants() {
			// WP.com conditional to load files from theme folder.
			if ( defined( 'IS_ATOMIC' ) && IS_ATOMIC && defined( 'ATOMIC_CLIENT_ID' ) && '2' === ATOMIC_CLIENT_ID && ( 'organic-stax' === get_template() || 'natural-block' === get_template() || 'restaurant-block' === get_template() || 'photographer-block' === get_template() ) ) {
				define( 'OBB_PLUGIN_URL', get_template_directory_uri() . '/inc/plugins/organic-blocks-bundle' );
				define( 'OBB_PLUGIN_DIR_PATH', get_template_directory() . '/inc/plugins/organic-blocks-bundle/' );
			} else {
				define( 'OBB_PLUGIN_URL', plugins_url( 'organic-blocks-bundle' ) );
				define( 'OBB_PLUGIN_DIR_PATH', plugin_dir_path( __FILE__ ) );
			}
		}

		/**
		 * Load block classes for server side blocks.
		 */
		public function loader() {
			require_once OBB_PLUGIN_DIR_PATH . 'classes/class-obb-slider.php';
			require_once OBB_PLUGIN_DIR_PATH . 'classes/class-obb-testimonial.php';
			require_once OBB_PLUGIN_DIR_PATH . 'classes/class-obb-post.php';
			require_once OBB_PLUGIN_DIR_PATH . 'classes/class-obb-portfolio.php';
			require_once OBB_PLUGIN_DIR_PATH . 'classes/class-obb-header.php';
			require_once OBB_PLUGIN_DIR_PATH . 'classes/class-obb-widget-area.php';
			require_once OBB_PLUGIN_DIR_PATH . 'classes/class-obb-footer.php';
			require_once OBB_PLUGIN_DIR_PATH . 'includes/typefaces.php';
		}

		/**
		 * Load Organic Blocks block category.
		 *
		 * @param array $categories // Get categories.
		 * @param int   $post  // Get the post.
		 */
		public function organic_block_category( $categories, $post ) {
			return array_merge(
				$categories,
				array(
					array(
						'slug'  => 'organic-blocks',
						'title' => __( 'Organic Blocks', 'obb' ),
					),
				)
			);
		}

		/**
		 * Register block styles & scripts.
		 */
		public function register_styles() {

			if ( ! function_exists( 'register_block_type' ) ) {
				// Gutenberg is not active.
				return;
			}

			// Block front end styles.
			wp_register_style(
				'organic-blocks-front-end-styles',
				OBB_PLUGIN_URL . '/css/style.css',
				array( 'obb-font-awesome' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'css/style.css' )
			);
			// Block editor styles.
			wp_register_style(
				'organic-blocks-editor-styles',
				OBB_PLUGIN_URL . '/css/editor.css',
				array( 'wp-edit-blocks' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'css/editor.css' )
			);
			// Font Awesome styles.
			wp_register_style(
				'obb-font-awesome',
				OBB_PLUGIN_URL . '/css/font-awesome.css',
				array(),
				filemtime( OBB_PLUGIN_DIR_PATH . 'css/font-awesome.css' )
			);

			// Slideshow Editor Script.
			wp_register_script(
				'slideshow-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/slideshow-block.js',
				array( 'wp-data', 'wp-api-fetch', 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'obb-flexslider-initialize' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/slideshow-block.js' ),
				true
			);

			// Testimonial Editor Script.
			wp_register_script(
				'testimonial-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/testimonial-block.js',
				array( 'wp-data', 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'obb-flexslider-initialize' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/testimonial-block.js' ),
				true
			);

			// Post Editor Script.
			wp_register_script(
				'post-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/post-block.js',
				array( 'wp-data', 'wp-api-fetch', 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'obb-masonry-initialize' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/post-block.js' ),
				true
			);

			// Portfolio Editor Script.
			wp_register_script(
				'portfolio-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/portfolio-block.js',
				array( 'wp-data', 'wp-api-fetch', 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'obb-masonry-initialize' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/portfolio-block.js' ),
				true
			);

			// Header Editor Script.
			wp_register_script(
				'header-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/header-block.js',
				array( 'wp-data', 'wp-api-fetch', 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/header-block.js' ),
				true
			);

			// Widget Area Editor Script.
			wp_register_script(
				'widget-area-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/widget-area-block.js',
				array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/widget-area-block.js' ),
				true
			);

			// Profile Editor Script.
			wp_register_script(
				'profile-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/profile-block.js',
				array( 'wp-blocks', 'wp-api-fetch', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/profile-block.js' ),
				true
			);

			// Toggle Editor Script.
			wp_register_script(
				'toggle-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/toggle-block.js',
				array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/toggle-block.js' ),
				true
			);

			// Modal Editor Script.
			wp_register_script(
				'modal-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/modal-block.js',
				array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-compose', 'obb-modal' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/modal-block.js' ),
				true
			);
			wp_localize_script(
				'modal-block-editor-js',
				'js_img_data',
				array(
					'default_image_url' => plugins_url( 'images/default-img.jpg', __FILE__ ),
				)
			);

			// Clipboard Editor Script.
			wp_register_script(
				'clipboard-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/clipboard-block.js',
				array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-compose', 'underscore', 'obb-clipboard-initialize' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/clipboard-block.js' ),
				true
			);

			// Alert Editor Script.
			wp_register_script(
				'alert-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/alert-block.js',
				array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'obb-alert-initialize' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/alert-block.js' ),
				true
			);

			// Footer Editor Script.
			wp_register_script(
				'footer-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/footer-block.js',
				array( 'wp-data', 'wp-api-fetch', 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/footer-block.js' ),
				true
			);

			// Pricing Table Editor Script.
			wp_register_script(
				'pricing-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/pricing-block.js',
				array( 'wp-blocks', 'wp-api-fetch', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/pricing-block.js' ),
				true
			);
			wp_localize_script(
				'pricing-block-editor-js',
				'js_icon_data',
				array(
					'default_icon_url' => plugins_url( 'images/default-icon.png', __FILE__ ),
				)
			);

			// Link Container Editor Script.
			wp_register_script(
				'link-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/link-block.js',
				array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/link-block.js' ),
				true
			);

			// Hero Editor Script.
			wp_register_script(
				'hero-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/hero-block.js',
				array( 'wp-data', 'wp-api-fetch', 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-edit-post', 'wp-core-data' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/hero-block.js' ),
				true
			);

			// Width Container Editor Script.
			wp_register_script(
				'width-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/width-block.js',
				array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/width-block.js' ),
				true
			);

			// Callout Editor Script.
			wp_register_script(
				'callout-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/callout-block.js',
				array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/callout-block.js' ),
				true
			);
			wp_localize_script(
				'callout-block-editor-js',
				'js_graphic_data',
				array(
					'callout_graphic_url' => plugins_url( 'images/callout-graphic.png', __FILE__ ),
				)
			);

			// Position Block Editor Script.
			wp_register_script(
				'position-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/position-block.js',
				array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/position-block.js' ),
				true
			);

			// Featured Content Editor Script.
			wp_register_script(
				'content-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/content-block.js',
				array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/content-block.js' ),
				true
			);

			// Featured List Editor Script.
			wp_register_script(
				'icon-block-editor-js',
				OBB_PLUGIN_URL . '/blocks/icon-block.js',
				array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
				filemtime( OBB_PLUGIN_DIR_PATH . 'blocks/icon-block.js' ),
				true
			);

			wp_register_script( 'obb-flexslider', OBB_PLUGIN_URL . '/js/jquery.flexslider.js', array( 'jquery' ), filemtime( plugin_dir_path( __FILE__ ) . 'js/jquery.flexslider.js' ), true );
			wp_register_script( 'obb-isotope', OBB_PLUGIN_URL . '/js/jquery.isotope.js', array( 'jquery', 'masonry' ), filemtime( plugin_dir_path( __FILE__ ) . 'js/jquery.isotope.js' ), true );
			wp_register_script( 'obb-modal', '//cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.2/jquery.modal.min.js', array( 'jquery' ), '0.9.2', true );
			wp_register_script( 'obb-clipboard', '//cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.8/clipboard.min.js', array( 'jquery' ), '2.0.8', true );
			wp_register_script( 'obb-clipboard-initialize', OBB_PLUGIN_URL . '/js/clipboard-setup.js', array( 'jquery', 'jquery-ui-dialog', 'obb-clipboard' ), filemtime( plugin_dir_path( __FILE__ ) . 'js/clipboard-setup.js' ), true );
			wp_register_script( 'obb-alert-initialize', OBB_PLUGIN_URL . '/js/alert-setup.js', array( 'jquery' ), '1.0', true );

			// Load scripts in FSE Template editor. Must also include dependency in block script. For example, 'obb-flexslider-initialize'. May not be needed as FSE integration improves.
			global $pagenow;
			if ( is_admin() && 'post.php' === $pagenow ) {
				wp_enqueue_script( 'obb-flexslider-initialize', OBB_PLUGIN_URL . '/js/flexslider-admin.js', array( 'obb-flexslider' ), filemtime( plugin_dir_path( __FILE__ ) . 'js/flexslider-admin.js' ), true );
				wp_enqueue_script( 'obb-masonry-initialize', OBB_PLUGIN_URL . '/js/masonry-admin.js', array( 'obb-isotope', 'imagesloaded' ), filemtime( plugin_dir_path( __FILE__ ) . 'js/masonry-admin.js' ), true );
			} else {
				wp_enqueue_script( 'obb-flexslider-initialize', OBB_PLUGIN_URL . '/js/flexslider-setup.js', array( 'obb-flexslider' ), filemtime( plugin_dir_path( __FILE__ ) . 'js/flexslider-setup.js' ), true );
				wp_enqueue_script( 'obb-masonry-initialize', OBB_PLUGIN_URL . '/js/masonry-setup.js', array( 'obb-isotope', 'imagesloaded' ), filemtime( plugin_dir_path( __FILE__ ) . 'js/masonry-setup.js' ), true );
			}

		}

		/**
		 * Register Gutenberg Blocks.
		 */
		public function register_block_types() {

			register_block_type(
				'obb/slideshow-block',
				array(
					'style'           => 'organic-blocks-front-end-styles',
					'script'          => 'obb-flexslider-initialize',
					'editor_style'    => 'organic-blocks-editor-styles',
					'editor_script'   => 'slideshow-block-editor-js',
					'attributes'      => OBB_Slideshow_Block::get_attributes(),
					'render_callback' => function ( $block ) {
						$html = OBB_Slideshow_Block::render_block_html( $block );
						return $html;
					},
				)
			);

			register_block_type(
				'obb/testimonial-block',
				array(
					'style'           => 'organic-blocks-front-end-styles',
					'script'          => 'obb-flexslider-initialize',
					'editor_style'    => 'organic-blocks-editor-styles',
					'editor_script'   => 'testimonial-block-editor-js',
					'attributes'      => OBB_Testimonial_Block::get_attributes(),
					'render_callback' => function ( $block ) {
						$html = OBB_Testimonial_Block::render_block_html( $block );
						return $html;
					},
				)
			);

			register_block_type(
				'obb/post-block',
				array(
					'style'           => 'organic-blocks-front-end-styles',
					'script'          => 'obb-masonry-initialize',
					'editor_style'    => 'organic-blocks-editor-styles',
					'editor_script'   => 'post-block-editor-js',
					'attributes'      => OBB_Post_Block::get_attributes(),
					'render_callback' => function ( $block ) {
						$html = OBB_Post_Block::render_block_html( $block );
						return $html;
					},
				)
			);

			register_block_type(
				'obb/portfolio-block',
				array(
					'style'           => 'organic-blocks-front-end-styles',
					'script'          => 'obb-masonry-initialize',
					'editor_style'    => 'organic-blocks-editor-styles',
					'editor_script'   => 'portfolio-block-editor-js',
					'attributes'      => OBB_Portfolio_Block::get_attributes(),
					'render_callback' => function ( $block ) {
						wp_enqueue_script( 'obb-pinterest', '//assets.pinterest.com/js/pinit.js', array(), '1.0', true );
						$html = OBB_Portfolio_Block::render_block_html( $block );
						return $html;
					},
				)
			);

			register_block_type(
				'obb/header-block',
				array(
					'style'           => 'organic-blocks-front-end-styles',
					'script'          => 'obb-custom',
					'editor_style'    => 'organic-blocks-editor-styles',
					'editor_script'   => 'header-block-editor-js',
					'attributes'      => OBB_Header_Block::get_attributes(),
					'render_callback' => function ( $block ) {
						$html = OBB_Header_Block::render_block_html( $block );
						return $html;
					},
				)
			);

			register_block_type(
				'obb/widget-area-block',
				array(
					'style'           => 'organic-blocks-front-end-styles',
					'editor_style'    => 'organic-blocks-editor-styles',
					'editor_script'   => 'widget-area-block-editor-js',
					'attributes'      => OBB_Widget_Area_Block::get_attributes(),
					'render_callback' => function ( $block ) {
						$html = OBB_Widget_Area_Block::render_block_html( $block );
						return $html;
					},
				)
			);

			register_block_type(
				'obb/profile-block',
				array(
					'style'         => 'organic-blocks-front-end-styles',
					'editor_style'  => 'organic-blocks-editor-styles',
					'editor_script' => 'profile-block-editor-js',
				)
			);

			register_block_type(
				'obb/toggle-block',
				array(
					'style'         => 'organic-blocks-front-end-styles',
					'editor_style'  => 'organic-blocks-editor-styles',
					'editor_script' => 'toggle-block-editor-js',
				)
			);

			register_block_type(
				'obb/modal-block',
				array(
					'style'         => 'organic-blocks-front-end-styles',
					'script'        => 'obb-modal',
					'editor_style'  => 'organic-blocks-editor-styles',
					'editor_script' => 'modal-block-editor-js',
				)
			);

			register_block_type(
				'obb/clipboard-block',
				array(
					'style'         => 'organic-blocks-front-end-styles',
					'script'        => 'obb-clipboard-initialize',
					'editor_style'  => 'organic-blocks-editor-styles',
					'editor_script' => 'clipboard-block-editor-js',
				)
			);

			register_block_type(
				'obb/alert-block',
				array(
					'style'         => 'organic-blocks-front-end-styles',
					'script'        => 'obb-alert-initialize',
					'editor_style'  => 'organic-blocks-editor-styles',
					'editor_script' => 'alert-block-editor-js',
				)
			);

			register_block_type(
				'obb/footer-block',
				array(
					'style'           => 'organic-blocks-front-end-styles',
					'editor_style'    => 'organic-blocks-editor-styles',
					'editor_script'   => 'footer-block-editor-js',
					'attributes'      => OBB_Footer_Block::get_attributes(),
					'render_callback' => function ( $block ) {
						$html = OBB_Footer_Block::render_block_html( $block );
						return $html;
					},
				)
			);

			register_block_type(
				'obb/pricing-block',
				array(
					'style'         => 'organic-blocks-front-end-styles',
					'editor_style'  => 'organic-blocks-editor-styles',
					'editor_script' => 'pricing-block-editor-js',
				)
			);

			register_block_type(
				'obb/link-block',
				array(
					'style'         => 'organic-blocks-front-end-styles',
					'editor_style'  => 'organic-blocks-editor-styles',
					'editor_script' => 'link-block-editor-js',
				)
			);

			register_block_type(
				'obb/hero-block',
				array(
					'style'         => 'organic-blocks-front-end-styles',
					'editor_style'  => 'organic-blocks-editor-styles',
					'editor_script' => 'hero-block-editor-js',
				)
			);

			register_block_type(
				'obb/width-block',
				array(
					'style'         => 'organic-blocks-front-end-styles',
					'editor_style'  => 'organic-blocks-editor-styles',
					'editor_script' => 'width-block-editor-js',
				)
			);

			register_block_type(
				'obb/callout-block',
				array(
					'style'         => 'organic-blocks-front-end-styles',
					'editor_style'  => 'organic-blocks-editor-styles',
					'editor_script' => 'callout-block-editor-js',
				)
			);

			register_block_type(
				'obb/position-block',
				array(
					'style'         => 'organic-blocks-front-end-styles',
					'editor_style'  => 'organic-blocks-editor-styles',
					'editor_script' => 'position-block-editor-js',
				)
			);

			register_block_type(
				'obb/content-block',
				array(
					'style'         => 'organic-blocks-front-end-styles',
					'editor_style'  => 'organic-blocks-editor-styles',
					'editor_script' => 'content-block-editor-js',
				)
			);

			register_block_type(
				'obb/icon-block',
				array(
					'style'         => 'organic-blocks-front-end-styles',
					'editor_style'  => 'organic-blocks-editor-styles',
					'editor_script' => 'icon-block-editor-js',
				)
			);
		}

		/**
		 * Add scripts to WP editor.
		 */
		public function editor_scripts() {
			if ( ! is_admin() ) {
				wp_enqueue_script( 'obb-toggle', OBB_PLUGIN_URL . '/js/toggle-setup.js', array( 'jquery' ), '1.0', true );
			}
			wp_enqueue_script( 'obb-custom', OBB_PLUGIN_URL . '/js/jquery.custom.js', array( 'jquery' ), '1.0', true );
		}

	} // End of class

	Organic_Blocks_Bundle::get_instance();

}
