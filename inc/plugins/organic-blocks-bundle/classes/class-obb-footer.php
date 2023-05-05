<?php
/**
 * Organic Block Footer Class
 *
 * @package Organic Blocks Bundle
 * @since Organic Blocks Bundle 1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	die();
}

if ( ! class_exists( 'OBB_Footer_Block' ) ) {

	/**
	 * Class for Footer block.
	 */
	class OBB_Footer_Block {

		/**
		 * Setup instance for block.
		 *
		 * @var $instance Instance variable.
		 */
		private static $instance;

		/**
		 * Get instance for block.
		 */
		public static function get_instance() {

			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Get attributes for block.
		 */
		public static function get_attributes() {

			$atts = array(
				'align'             => array(
					'type'    => 'string',
					'default' => 'full',
				),
				'copyright'         => array(
					'type'    => 'string',
					'default' => __( 'Copyright © 2020 · All Rights Reserved', 'obb' ),
				),
				'copyrightsize'     => array(
					'type'    => 'number',
					'default' => 12,
				),
				'mediaID'           => array(
					'type' => 'number',
				),
				'mediaURL'          => array(
					'type' => 'string',
				),
				'iconsize'          => array(
					'type'    => 'number',
					'default' => 50,
				),
				'footermenu'        => array(
					'type' => 'string',
				),
				'retlinkdisp'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'footermenufont'    => array(
					'type' => 'string',
				),
				'footermenusize'    => array(
					'type'    => 'number',
					'default' => 14,
				),
				'footermenulinkgap' => array(
					'type'    => 'number',
					'default' => 12,
				),
				'footeralign'       => array(
					'type'    => 'string',
					'default' => 'center',
				),
				'toppadding'        => array(
					'type'    => 'string',
					'default' => '24',
				),
				'bottompadding'     => array(
					'type'    => 'string',
					'default' => '24',
				),
				'leftpadding'       => array(
					'type'    => 'string',
					'default' => '24',
				),
				'rightpadding'      => array(
					'type'    => 'string',
					'default' => '24',
				),
				'copyrightcolor'    => array(
					'type'    => 'string',
					'default' => '#999',
				),
				'retarrowcolor'     => array(
					'type'    => 'string',
					'default' => '#fff',
				),
				'retlinkcolor'      => array(
					'type'    => 'string',
					'default' => '#333',
				),
				'menulinkcolor'     => array(
					'type'    => 'string',
					'default' => '#666',
				),
				'menuhovercolor'    => array(
					'type'    => 'string',
					'default' => '#000',
				),
				'footerbgcolor'     => array(
					'type' => 'string',
				),
				'footerbggradient'  => array(
					'type' => 'string',
				),
			);

			return $atts;
		}

		/**
		 * Render block.
		 *
		 * @param array $att Block attributes.
		 */
		public static function render_block_html( $att ) {

			$randomid = wp_rand();
			$footerid = "obb_footer-$randomid";

			$class_names       = ( isset( $att['className'] ) ) ? $att['className'] : '';
			$alignment         = ( isset( $att['align'] ) ) ? $att['align'] : 'full';
			$copyright         = ( isset( $att['copyright'] ) ) ? $att['copyright'] : __( 'Copyright © 2020 · All Rights Reserved', 'obb' );
			$copyrightsize     = ( isset( $att['copyrightsize'] ) ) ? $att['copyrightsize'] : 12;
			$iconsize          = ( isset( $att['iconsize'] ) ) ? $att['iconsize'] : 50;
			$footericon        = ( isset( $att['mediaURL'] ) ) ? $att['mediaURL'] : '';
			$footermenu        = ( isset( $att['footermenu'] ) ) ? $att['footermenu'] : '';
			$ret_link_disp     = ( isset( $att['retlinkdisp'] ) ) ? $att['retlinkdisp'] : '';
			$footermenufont    = ( isset( $att['footermenufont'] ) ) ? $att['footermenufont'] : '';
			$footermenusize    = ( isset( $att['footermenusize'] ) ) ? $att['footermenusize'] : 14;
			$footermenulinkgap = ( isset( $att['footermenulinkgap'] ) ) ? $att['footermenulinkgap'] : 12;
			$footeralign       = ( isset( $att['footeralign'] ) ) ? $att['footeralign'] : 'center';
			$toppadding        = ( isset( $att['toppadding'] ) ) ? $att['toppadding'] : '';
			$bottompadding     = ( isset( $att['bottompadding'] ) ) ? $att['bottompadding'] : '';
			$leftpadding       = ( isset( $att['leftpadding'] ) ) ? $att['leftpadding'] : '';
			$rightpadding      = ( isset( $att['rightpadding'] ) ) ? $att['rightpadding'] : '';
			$copyrightcolor    = ( isset( $att['copyrightcolor'] ) ) ? $att['copyrightcolor'] : '';
			$ret_arrowcolor    = ( isset( $att['retarrowcolor'] ) ) ? $att['retarrowcolor'] : '';
			$ret_linkcolor     = ( isset( $att['retlinkcolor'] ) ) ? $att['retlinkcolor'] : '';
			$menu_linkcolor    = ( isset( $att['menulinkcolor'] ) ) ? $att['menulinkcolor'] : '';
			$menu_hovercolor   = ( isset( $att['menuhovercolor'] ) ) ? $att['menuhovercolor'] : '';
			$footer_bgcolor    = ( isset( $att['footerbgcolor'] ) ) ? $att['footerbgcolor'] : '';
			$footer_bggradient = ( isset( $att['footerbggradient'] ) ) ? $att['footerbggradient'] : '';

			// Attempt to add custom spacing styles
			// $style             = ( isset( $att['style'] ) ) ? $att['style'] : '';
			// $styles = $style;

			$classes = 'align' . $alignment . ' ';

			// Add Classes based on settings.
			$classes .= 'footer-align-' . $footeralign . '';

			// Add custom class names from Advanced panel.
			$classes .= ' ' . $class_names;

			$args = array(
				'menu'           => $footermenu, // from top-ancestor of current page.
				'echo'           => false,  // true or 0.
				'fallback_cb'    => false,
				'container'      => false,
				'depth'          => 1,
				'menu_class'     => 'obb-menu obb-social-menu',
				'theme_location' => 'none',
				'link_before'    => '<span role="menuitem">',
				'link_after'     => '</span>',
			);
			$menu = wp_nav_menu( $args );

			ob_start();

			$footermenufont = ( 'Theme Default' === $footermenufont ) ? 'inherit' : $footermenufont;
			obb_display_font_link( $footermenufont );

			?>

	<style type="text/css">
		#<?php echo esc_html( $footerid ); ?> {
			<?php if ( '' !== $footer_bgcolor ) { ?>
			background-color: <?php echo esc_html( $footer_bgcolor ); ?>;
			<?php } ?>
			<?php if ( '' !== $footer_bggradient ) { ?>
			background-image: <?php echo esc_html( $footer_bggradient ); ?>;
			<?php } ?>
			padding-top: <?php echo esc_html( $toppadding ); ?>px;
			padding-bottom: <?php echo esc_html( $bottompadding ); ?>px;
			padding-left: <?php echo esc_html( $leftpadding ); ?>px;
			padding-right: <?php echo esc_html( $rightpadding ); ?>px;
		}
		#<?php echo esc_html( $footerid ); ?> .obb-footer-copyright {
			color: <?php echo esc_html( $copyrightcolor ); ?>;
			font-size: <?php echo esc_html( $copyrightsize ); ?>px;
		}
		#<?php echo esc_html( $footerid ); ?> .obb-footer-return {
			background: <?php echo esc_html( $ret_linkcolor ); ?>;
		}
		#<?php echo esc_html( $footerid ); ?> .obb-footer-return i {
			color: <?php echo esc_html( $ret_arrowcolor ); ?>;
		}
		#<?php echo esc_html( $footerid ); ?> .obb-navigation {
			font-family: <?php echo esc_html( $footermenufont ); ?>;
		}
		#<?php echo esc_html( $footerid ); ?> .obb-navigation li a {
			color: <?php echo esc_html( $menu_linkcolor ); ?>;
			font-size: <?php echo esc_html( $footermenusize ); ?>px;
		}
		#<?php echo esc_html( $footerid ); ?> .obb-navigation li a:hover {
			color: <?php echo esc_html( $menu_hovercolor ); ?>;
		}
		#<?php echo esc_html( $footerid ); ?> .obb-navigation .obb-menu > li > a {
			padding-left: <?php echo esc_html( $footermenulinkgap ); ?>px;
			padding-right: <?php echo esc_html( $footermenulinkgap ); ?>px;
		}
	</style>

	<!-- BEGIN #footer -->
	<div id="<?php echo esc_html( $footerid ); ?>" class="organic-block obb-footer <?php echo esc_html( $classes ); ?>">

		<!-- BEGIN .obb-footer-container -->
		<div class="obb-footer-container">

			<?php if ( $footericon ) { ?>
			<div class="obb-footer-icon">
				<?php $iconwidth = $iconsize . 'px'; ?>
				<img src="<?php echo esc_url( $footericon ); ?>" style="width: <?php echo esc_html( $iconwidth ); ?>;" />
			</div>
			<?php } ?>

			<!-- BEGIN .obb-footer-info -->
			<div class="obb-footer-info">

				<!-- BEGIN .obb-footer-nav -->
				<div class="obb-footer-nav">

					<?php if ( $ret_link_disp ) { ?>
						<button class="obb-footer-return"><i class="fas fa-chevron-up"></i></button>
					<?php	} ?>

					<?php if ( $menu ) { ?>
						<!-- BEGIN #obb-footer-nav -->
						<nav id="obb-footer-nav" class="obb-navigation clearfix" role="navigation" aria-label="<?php esc_attr_e( 'Footer Navigation', 'obb' ); ?>">
							<?php echo wp_kses_post( $menu ); ?>
						<!-- END #obb-footer-nav -->
						</nav>
					<?php	} ?>

				<!-- END .obb-footer-nav -->
				</div>

				<?php if ( $copyright ) { ?>
					<p class="obb-footer-copyright">
						<?php echo wp_kses_post( $copyright ); ?>
					</p>
				<?php } ?>

			<!-- END .obb-footer-info -->
			</div>

		<!-- END .obb-footer-container -->
		</div>

	<!-- END #footer -->
	</div>

			<?php
				return ob_get_clean();

		} //End of render html function

	} //End of class

} // End of if conditional

?>
