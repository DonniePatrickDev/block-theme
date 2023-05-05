<?php
/**
 * WooCommerce Setup Functions
 *
 * @package Organic Rialto
 * @since Organic Rialto 1.0
 */

/*
-------------------------------------------------------------------------------------------------------
	Deactivate WooCommerce Setup Wizard
-------------------------------------------------------------------------------------------------------
*/

add_filter( 'woocommerce_prevent_automatic_wizard_redirect', '__return_true' );

/*
-------------------------------------------------------------------------------------------------------
	WooCommerce Theme Setup
-------------------------------------------------------------------------------------------------------
*/

if ( ! function_exists( 'organic_rialto_woo_setup' ) ) {
	/**
	 * Sets up theme defaults and registers support for various WooCommerce features.
	 *
	 * @since Rialto 1.0
	 * @return void
	 */
	function organic_rialto_woo_setup() {
		add_theme_support(
			'woocommerce',
			array(
				// WooCommerce Thumbnail Size.
				'single_image_width'            => 980,
				'thumbnail_image_width'         => 520,
				'gallery_thumbnail_image_width' => 240,
				// Product Grid Settings.
				'product_grid'                  => array(
					'default_columns' => 3,
					'default_rows'    => 4,
					'min_columns'     => 2,
					'max_columns'     => 5,
					'min_rows'        => 1,
				),
			)
		);
		add_theme_support( 'wc-product-gallery-zoom' );
		add_theme_support( 'wc-product-gallery-lightbox' );
		add_theme_support( 'wc-product-gallery-slider' );
	}
	add_action( 'after_setup_theme', 'organic_rialto_woo_setup' );
}

/*
-------------------------------------------------------------------------------------------------------
	Custom Quantity Input Buttons
-------------------------------------------------------------------------------------------------------
*/

/**
 * Custom minus button.
 */
function organic_rialto_custom_quantity_plus() {
	echo '<button type="button" class="plus" onclick="this.parentNode.querySelector(\'input[type=number]\').stepUp()">+</button>';
}
add_action( 'woocommerce_after_quantity_input_field', 'organic_rialto_custom_quantity_plus' );

/**
 * Custom minus button.
 */
function organic_rialto_custom_quantity_minus() {
	echo '<button type="button" class="minus" onclick="this.parentNode.querySelector(\'input[type=number]\').stepDown()">-</button>';
}
add_action( 'woocommerce_before_quantity_input_field', 'organic_rialto_custom_quantity_minus' );

/*
-------------------------------------------------------------------------------------------------------
	Enqueue Styles and Scripts
-------------------------------------------------------------------------------------------------------
*/

if ( ! function_exists( 'organic_rialto_woo_scripts' ) ) {
	/**
	 * Enqueue scripts and styles for frontend.
	 *
	 * @since Rialto 1.0
	 * @return void
	 */
	function organic_rialto_woo_scripts() {
		wp_enqueue_style( 'organic-rialto-woocommerce-style', get_template_directory_uri() . '/assets/css/woocommerce.css', '', '1.0' );

		$font_path   = WC()->plugin_url() . '/assets/fonts/';
		$inline_font = '@font-face {
			font-family: "star";
			src: url("' . $font_path . 'star.eot");
			src: url("' . $font_path . 'star.eot?#iefix") format("embedded-opentype"),
				url("' . $font_path . 'star.woff") format("woff"),
				url("' . $font_path . 'star.ttf") format("truetype"),
				url("' . $font_path . 'star.svg#star") format("svg");
			font-weight: normal;
			font-style: normal;
		}';
		wp_add_inline_style( 'organic-rialto-woocommerce-style', $inline_font );
	}
	add_action( 'wp_enqueue_scripts', 'organic_rialto_woo_scripts' );
}

/**
 * Disable the default WooCommerce stylesheet.
 *
 * Removing the default WooCommerce stylesheet and enqueing your own will
 * protect you during WooCommerce core updates.
 *
 * @link https://docs.woocommerce.com/document/disable-the-default-stylesheet/
 */
add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );

/*
-------------------------------------------------------------------------------------------------------
	Main Menu Cart
-------------------------------------------------------------------------------------------------------
*/

/**
 * Add cart link to primary menu.
 *
 * @param string $items Custom menu link.
 * @param array  $args Custom menu args.
 */
function organic_rialto_add_cart_menu_link( $items, $args ) {
	if ( WC()->cart ) { // Conditional check for FSE.
		if ( 'obb-menu primary' === $args->menu_class && 0 < WC()->cart->get_cart_contents_count() ) {
			$items .= '<li class="menu-item woocommerce-cart-menu-item"><a href="' . wc_get_cart_url() . '" class="menu-cart-link"><i class="fas fa-shopping-cart"></i> <span class="menu-cart-count">' . wp_kses_data( sprintf( '%d', WC()->cart->get_cart_contents_count() ) ) . '</span></a></li>';
		}
	}
	return $items;
}
add_filter( 'wp_nav_menu_items', 'organic_rialto_add_cart_menu_link', 10, 2 );
