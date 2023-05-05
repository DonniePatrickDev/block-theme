<?php
/**
 * Available filters for extending Merlin WP.
 *
 * @package   Merlin WP
 * @version   @@pkg.version
 * @link      https://merlinwp.com/
 */

/**
 * Remove the child theme step.
 * This is for a Rialto child theme.
 *
 * @since   0.1.0
 *
 * @return  $array  The merlin import steps.
 */
if ( defined( 'IS_ATOMIC' ) && IS_ATOMIC && defined( 'ATOMIC_CLIENT_ID' ) && '2' === ATOMIC_CLIENT_ID ) {
	add_filter(
		'organic-rialto_merlin_steps',
		function( $steps ) {
			unset( $steps['child'] );
			unset( $steps['license'] );
			return $steps;
		}
	);
} else {
	add_filter(
		'organic-rialto_merlin_steps',
		function( $steps ) {
			unset( $steps['child'] );
			return $steps;
		}
	);
}

/**
* Prevent WooCommerce from creating default pages on import.
*/
add_filter( 'woocommerce_create_pages', '__return_empty_array' );

/**
 * Execute custom code after the whole import has finished.
 */
function organic_rialto_merlin_after_import_setup() {

	$woocommerce_shop      = get_page_by_title( 'Shop' );
	$woocommerce_checkout  = get_page_by_path( 'checkout-2' );
	$woocommerce_cart      = get_page_by_path( 'cart-2' );
	$woocommerce_myaccount = get_page_by_path( 'myaccount-2' );

	update_option( 'woocommerce_cart', $woocommerce_cart->ID );
	update_option( 'woocommerce_checkout_page_id', $woocommerce_checkout->ID );
	update_option( 'woocommerce_cart_page_id', $woocommerce_cart->ID );
	update_option( 'woocommerce_myaccount_page_id', $woocommerce_myaccount->ID );
	update_option( 'woocommerce_shop_page_id', $woocommerce_shop->ID );

	// Set permalink structure.
	if ( '' == get_option( 'permalink_structure' ) ) {
		global $wp_rewrite;
		$wp_rewrite->set_permalink_structure( '/%postname%/' );
		$wp_rewrite->flush_rules();
		wp_safe_redirect( 'options-permalink.php' );
	}

}
add_action( 'merlin_after_all_import', 'organic_rialto_merlin_after_import_setup' );
