<?php
/**
 * The Header for our theme.
 * Displays all of the <head> section and wrapper blocks for PHP templates.
 *
 * @package Organic Rialto
 * @since Organic Rialto 1.0
 */

?><!DOCTYPE html>

<html class="no-js" <?php language_attributes(); ?>>

<?php
	$header  = do_blocks( '<!-- wp:template-part {"slug":"header","theme":"organic-rialto","tagName":"header","align":"full","className":"site-header"} /-->' );
	$wrapper = do_blocks( '<!-- wp:group {"tagName":"main","align":"full","className":"site-main","layout":{"inherit":true}} --><main class="wp-block-group alignfull site-main"><!-- wp:group {"align":"full","layout":{"inherit":array(),"type":"constrained"}} --><div class="wp-block-group alignfull">' );

	session_start();
	$_SESSION['footer'] = do_blocks( '<!-- wp:template-part {"slug":"footer","theme":"organic-rialto","tagName":"footer","align":"full","className":"site-footer"} /-->' );

	$allowed_html = array(
		'header' => array(
			'class' => array(),
		),
		'img'    => array(
			'id'     => array(),
			'class'  => array(),
			'style'  => array(),
			'title'  => array(),
			'src'    => array(),
			'alt'    => array(),
			'width'  => array(),
			'height' => array(),
		),
		'h1'     => array(
			'class' => array(),
			'style' => array(),
		),
		'p'      => array(
			'class' => array(),
			'style' => array(),
		),
		'strong' => array(),
		'em'     => array(),
		'br'     => array(),
		'div'    => array(
			'class'                      => array(),
			'style'                      => array(),
			'data-block-name'            => array(),
			'data-add-to-cart-behaviour' => array(),
			'data-has-hidden-price'      => array(),
			'tabindex'                   => array(),
		),
		'span'   => array(
			'class' => array(),
			'style' => array(),
		),
		'svg'    => array(
			'class'       => array(),
			'xmlns'       => array(),
			'fill'        => array(),
			'viewbox'     => array(),
			'role'        => array(),
			'aria-hidden' => array(),
			'focusable'   => array(),
			'height'      => array(),
			'width'       => array(),
		),
		'path'   => array(
			'd'         => array(),
			'fill'      => array(),
			'fill-rule' => array(),
			'clip-rule' => array(),
		),
		'ul'     => array(
			'class' => array(),
			'style' => array(),
		),
		'li'     => array(
			'class' => array(),
			'style' => array(),
		),
		'nav'    => array(
			'class'      => array(),
			'style'      => array(),
			'aria-label' => array(),
		),
		'label'  => array(
			'class' => array(),
			'for'   => array(),
		),
		'button' => array(
			'class' => array(),
			'style' => array(),
			'type'  => array(),
		),
		'a'      => array(
			'id'     => array(),
			'href'   => array(),
			'title'  => array(),
			'target' => array(),
			'class'  => array(),
		),
		'form'   => array(
			'role'   => array(),
			'method' => array(),
			'action' => array(),
			'class'  => array(),
		),
		'input'  => array(
			'type'        => array(),
			'name'        => array(),
			'value'       => array(),
			'class'       => array(),
			'id'          => array(),
			'placeholder' => array(),
			'required'    => array(),
		),
	)
	?>

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<?php
if ( function_exists( 'wp_body_open' ) ) {
	wp_body_open();
}
?>

<!-- BEGIN .wp-site-blocks -->
<div class="wp-site-blocks">

	<?php echo wp_kses( $header, $allowed_html ); ?>
	<?php echo wp_kses_post( $wrapper ); ?>
