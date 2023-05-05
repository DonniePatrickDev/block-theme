<?php
/**
 * Organic Block Header Class
 *
 * Class used for Organic Header Block.
 *
 * @package Organic Blocks Bundle
 * @since Organic Blocks Bundle 1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	die();
}

if ( ! class_exists( 'OBB_Header_Block' ) ) {

	/**
	 * Class for Header block.
	 */
	class OBB_Header_Block {

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
				'className'           => array(
					'type' => 'string',
				),
				'align'               => array(
					'type'    => 'string',
					'default' => 'full',
				),
				'logoID'              => array(
					'type'    => 'number',
					'default' => 0,
				),
				'logoURL'             => array(
					'type'    => 'string',
					'default' => '',
				),
				'logosecondaryID'     => array(
					'type'    => 'number',
					'default' => 0,
				),
				'logosecondaryURL'    => array(
					'type'    => 'string',
					'default' => '',
				),
				'logosize'            => array(
					'type'    => 'number',
					'default' => 120,
				),
				'sitetitle'           => array(
					'type' => 'string',
				),
				'sitedesc'            => array(
					'type' => 'string',
				),
				'navigationmenu'      => array(
					'type' => 'string',
				),
				'secondarymenu'       => array(
					'type' => 'string',
				),
				'mobilemenu1'         => array(
					'type' => 'string',
				),
				'mobilemenu2'         => array(
					'type' => 'string',
				),
				'headeralignment'     => array(
					'type'    => 'string',
					'default' => 'left',
				),
				'headerposition'      => array(
					'type'    => 'string',
					'default' => 'position-relative',
				),
				'headercontainer'     => array(
					'type' => 'string',
				),
				'headerwidth'         => array(
					'type' => 'string',
				),
				'sitetitledisp'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'sitedescdisp'        => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'headerscroll'        => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'headerborders'       => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'mobileview'          => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'headershadow'        => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'sitetitlefont'       => array(
					'type' => 'string',
				),
				'sitetitlesize'       => array(
					'type'    => 'number',
					'default' => 36,
				),
				'sitetitlesizemobile' => array(
					'type'    => 'number',
					'default' => 24,
				),
				'siteweight'          => array(
					'type'    => 'string',
					'default' => 'normal',
				),
				'titlespacing'        => array(
					'type'    => 'number',
					'default' => 0,
				),
				'sitedescfont'        => array(
					'type' => 'string',
				),
				'navmenufont'         => array(
					'type' => 'string',
				),
				'navmenucaps'         => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'navmenusize'         => array(
					'type'    => 'number',
					'default' => 16,
				),
				'navmenuheight'       => array(
					'type'    => 'number',
					'default' => 24,
				),
				'navmenuspacing'      => array(
					'type'    => 'number',
					'default' => 0,
				),
				'navmenulinkgap'      => array(
					'type'    => 'number',
					'default' => 12,
				),
				'submenusize'         => array(
					'type'    => 'number',
					'default' => 16,
				),
				'navmenufont2'        => array(
					'type' => 'string',
				),
				'navmenucaps2'        => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'navmenusize2'        => array(
					'type'    => 'number',
					'default' => 16,
				),
				'navmenuspacing2'     => array(
					'type'    => 'number',
					'default' => 0,
				),
				'navmenulinkgap2'     => array(
					'type'    => 'number',
					'default' => 12,
				),
				'submenusize2'        => array(
					'type'    => 'number',
					'default' => 16,
				),
				'navmenufont3'        => array(
					'type' => 'string',
				),
				'navmenusize3'        => array(
					'type'    => 'number',
					'default' => 36,
				),
				'navmenufont4'        => array(
					'type' => 'string',
				),
				'navmenusize4'        => array(
					'type'    => 'number',
					'default' => 16,
				),
				'toppadding'          => array(
					'type'    => 'string',
					'default' => '24',
				),
				'bottompadding'       => array(
					'type'    => 'string',
					'default' => '24',
				),
				'leftpadding'         => array(
					'type'    => 'string',
					'default' => '36',
				),
				'rightpadding'        => array(
					'type'    => 'string',
					'default' => '36',
				),
				'sitetitlecolor'      => array(
					'type'    => 'string',
					'default' => '#000',
				),
				'sitedesccolor'       => array(
					'type'    => 'string',
					'default' => '#000',
				),
				'menulinkcolor'       => array(
					'type'    => 'string',
					'default' => '#666',
				),
				'menulinkscroll'      => array(
					'type'    => 'string',
					'default' => '#666',
				),
				'menulinkscrollhover' => array(
					'type'    => 'string',
					'default' => '#000',
				),
				'submenulinkcolor'    => array(
					'type'    => 'string',
					'default' => '#666',
				),
				'menuhovercolor'      => array(
					'type'    => 'string',
					'default' => '#000',
				),
				'submenuhovercolor'   => array(
					'type'    => 'string',
					'default' => '#000',
				),
				'mobilelinkcolor'     => array(
					'type'    => 'string',
					'default' => '#999',
				),
				'mobilehovercolor'    => array(
					'type'    => 'string',
					'default' => '#000',
				),
				'submenubgcolor'      => array(
					'type'    => 'string',
					'default' => '#fff',
				),
				'submenubggradient'   => array(
					'type' => 'string',
				),
				'headerbgcolor'       => array(
					'type'    => 'string',
					'default' => '#fff',
				),
				'headerbggradient'    => array(
					'type' => 'string',
				),
				'mobilebgcolor'       => array(
					'type'    => 'string',
					'default' => '#fff',
				),
				'mobilebggradient'    => array(
					'type' => 'string',
				),
				'headerbgopacity'     => array(
					'type'    => 'number',
					'default' => 1.0,
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
			$headerid = "obb-header-$randomid";

			$alignment           = ( isset( $att['align'] ) ) ? $att['align'] : 'full';
			$logosize            = ( isset( $att['logosize'] ) ) ? $att['logosize'] : 120;
			$site_title          = ( isset( $att['sitetitle'] ) ) ? $att['sitetitle'] : '';
			$site_weight         = ( isset( $att['siteweight'] ) ) ? $att['siteweight'] : '';
			$site_desc           = ( isset( $att['sitedesc'] ) ) ? $att['sitedesc'] : '';
			$site_logo           = ( isset( $att['logoURL'] ) ) ? $att['logoURL'] : '';
			$site_logo2          = ( isset( $att['logosecondaryURL'] ) ) ? $att['logosecondaryURL'] : '';
			$navigationmenu      = ( isset( $att['navigationmenu'] ) ) ? $att['navigationmenu'] : '';
			$secondarymenu       = ( isset( $att['secondarymenu'] ) ) ? $att['secondarymenu'] : '';
			$mobilemenu1         = ( isset( $att['mobilemenu1'] ) ) ? $att['mobilemenu1'] : '';
			$mobilemenu2         = ( isset( $att['mobilemenu2'] ) ) ? $att['mobilemenu2'] : '';
			$headeralignment     = ( isset( $att['headeralignment'] ) ) ? $att['headeralignment'] : 'left';
			$headerposition      = ( isset( $att['headerposition'] ) ) ? $att['headerposition'] : '';
			$headercontainer     = ( isset( $att['headercontainer'] ) ) ? $att['headercontainer'] : '';
			$headerwidth         = ( isset( $att['headerwidth'] ) ) ? $att['headerwidth'] : '';
			$site_title_disp     = ( isset( $att['sitetitledisp'] ) ) ? $att['sitetitledisp'] : true;
			$site_desc_disp      = ( isset( $att['sitedescdisp'] ) ) ? $att['sitedescdisp'] : true;
			$header_scroll       = ( isset( $att['headerscroll'] ) ) ? $att['headerscroll'] : true;
			$header_borders      = ( isset( $att['headerborders'] ) ) ? $att['headerborders'] : false;
			$mobileview          = ( isset( $att['mobileview'] ) ) ? $att['mobileview'] : false;
			$header_shadow       = ( isset( $att['headershadow'] ) ) ? $att['headershadow'] : false;
			$titlespacing        = ( isset( $att['titlespacing'] ) ) ? $att['titlespacing'] : 0;
			$sitetitlefont       = ( isset( $att['sitetitlefont'] ) ) ? $att['sitetitlefont'] : '';
			$sitetitlesize       = ( isset( $att['sitetitlesize'] ) ) ? $att['sitetitlesize'] : 36;
			$sitetitlesizemobile = ( isset( $att['sitetitlesizemobile'] ) ) ? $att['sitetitlesizemobile'] : 24;
			$sitedescfont        = ( isset( $att['sitedescfont'] ) ) ? $att['sitedescfont'] : '';
			$navmenufont         = ( isset( $att['navmenufont'] ) ) ? $att['navmenufont'] : '';
			$navmenucaps         = ( isset( $att['navmenucaps'] ) ) ? $att['navmenucaps'] : false;
			$navmenusize         = ( isset( $att['navmenusize'] ) ) ? $att['navmenusize'] : 16;
			$navmenuheight       = ( isset( $att['navmenuheight'] ) ) ? $att['navmenuheight'] : 24;
			$navmenuspacing      = ( isset( $att['navmenuspacing'] ) ) ? $att['navmenuspacing'] : 0;
			$navmenulinkgap      = ( isset( $att['navmenulinkgap'] ) ) ? $att['navmenulinkgap'] : 12;
			$submenusize         = ( isset( $att['submenusize'] ) ) ? $att['submenusize'] : 16;
			$navmenufont2        = ( isset( $att['navmenufont2'] ) ) ? $att['navmenufont2'] : '';
			$navmenucaps2        = ( isset( $att['navmenucaps2'] ) ) ? $att['navmenucaps2'] : false;
			$navmenusize2        = ( isset( $att['navmenusize2'] ) ) ? $att['navmenusize2'] : 16;
			$navmenuspacing2     = ( isset( $att['navmenuspacing2'] ) ) ? $att['navmenuspacing2'] : 0;
			$navmenulinkgap2     = ( isset( $att['navmenulinkgap2'] ) ) ? $att['navmenulinkgap2'] : 12;
			$submenusize2        = ( isset( $att['submenusize2'] ) ) ? $att['submenusize2'] : 16;
			$navmenufont3        = ( isset( $att['navmenufont3'] ) ) ? $att['navmenufont3'] : '';
			$navmenusize3        = ( isset( $att['navmenusize3'] ) ) ? $att['navmenusize3'] : 36;
			$navmenufont4        = ( isset( $att['navmenufont4'] ) ) ? $att['navmenufont4'] : '';
			$navmenusize4        = ( isset( $att['navmenusize4'] ) ) ? $att['navmenusize4'] : 16;
			$toppadding          = ( isset( $att['toppadding'] ) ) ? $att['toppadding'] : '24';
			$bottompadding       = ( isset( $att['bottompadding'] ) ) ? $att['bottompadding'] : '24';
			$leftpadding         = ( isset( $att['leftpadding'] ) ) ? $att['leftpadding'] : '36';
			$rightpadding        = ( isset( $att['rightpadding'] ) ) ? $att['rightpadding'] : '36';
			$site_titlecolor     = ( isset( $att['sitetitlecolor'] ) ) ? $att['sitetitlecolor'] : '#000';
			$site_desccolor      = ( isset( $att['sitedesccolor'] ) ) ? $att['sitedesccolor'] : '#000';
			$menu_linkcolor      = ( isset( $att['menulinkcolor'] ) ) ? $att['menulinkcolor'] : '#666';
			$menucolorscroll     = ( isset( $att['menulinkscroll'] ) ) ? $att['menulinkscroll'] : '#666';
			$menuscrollhover     = ( isset( $att['menulinkscrollhover'] ) ) ? $att['menulinkscrollhover'] : '#000';
			$menu_hovercolor     = ( isset( $att['menuhovercolor'] ) ) ? $att['menuhovercolor'] : '#000';
			$submenu_color       = ( isset( $att['submenulinkcolor'] ) ) ? $att['submenulinkcolor'] : '#666';
			$submenu_hover       = ( isset( $att['submenuhovercolor'] ) ) ? $att['submenuhovercolor'] : '#000';
			$mobile_color        = ( isset( $att['mobilelinkcolor'] ) ) ? $att['mobilelinkcolor'] : '#999';
			$mobile_hover        = ( isset( $att['mobilehovercolor'] ) ) ? $att['mobilehovercolor'] : '#000';
			$submenu_bgcolor     = ( isset( $att['submenubgcolor'] ) ) ? $att['submenubgcolor'] : '#fff';
			$submenu_bggradient  = ( isset( $att['submenubggradient'] ) ) ? $att['submenubggradient'] : '';
			$header_bgcolor      = ( isset( $att['headerbgcolor'] ) ) ? $att['headerbgcolor'] : '#fff';
			$header_bggradient   = ( isset( $att['headerbggradient'] ) ) ? $att['headerbggradient'] : '';
			$mobile_bgcolor      = ( isset( $att['mobilebgcolor'] ) ) ? $att['mobilebgcolor'] : '#fff';
			$mobile_bggradient   = ( isset( $att['mobilebggradient'] ) ) ? $att['mobilebggradient'] : '';
			$header_opacity      = ( isset( $att['headerbgopacity'] ) ) ? $att['headerbgopacity'] : 1.0;

			$classes = 'align' . $alignment . ' ';

			// Add Classes based on settings.
			$classes .= "$headerposition ";
			$classes .= 'header-align-' . $headeralignment . ' ';
			if ( $site_logo && $site_logo2 ) {
				$classes .= 'header-multiple-logos ';
			}
			if ( true === $header_scroll && 1.0 > $header_opacity ) {
				$classes .= 'header-transparent-scroll ';
			}
			if ( true === $mobileview ) {
				$classes .= 'header-mobile-view ';
			}
			if ( ! empty( $att['className'] ) ) {
				$classes .= sprintf( '%s', $att['className'] );
			}

			// Separate class for mobile menu slide out when mobile view option is selected.
			if ( true === $mobileview ) {
				$mobileview_class = ' header-mobile-view';
			} else {
				$mobileview_class = '';
			}

			if ( $site_title ) {
				update_option( 'blogname', $site_title );
			}
			if ( $site_desc ) {
				update_option( 'blogdescription', $site_desc );
			}

			$args         = array(
				'menu'            => $navigationmenu, // from top-ancestor of current page.
				'echo'            => false,  // true or 0.
				'fallback_cb'     => false,
				'container_class' => 'obb-menu-container',
				'menu_class'      => 'obb-menu primary',
				'theme_location'  => 'none',
				'link_before'     => '<span role="menuitem">',
				'link_after'      => '</span>',
			);
			$menu_primary = wp_nav_menu( $args );

			$args2          = array(
				'menu'            => $secondarymenu, // from top-ancestor of current page.
				'echo'            => false,  // true or 0.
				'fallback_cb'     => false,
				'container_class' => 'obb-menu-container',
				'menu_class'      => 'obb-menu secondary',
				'theme_location'  => 'none',
				'link_before'     => '<span role="menuitem">',
				'link_after'      => '</span>',
			);
			$menu_secondary = wp_nav_menu( $args2 );

			$args3               = array(
				'menu'            => $mobilemenu1, // from top-ancestor of current page.
				'echo'            => false,  // true or 0.
				'fallback_cb'     => false,
				'container_class' => 'obb-menu-container',
				'menu_class'      => 'obb-menu mobile',
				'theme_location'  => 'none',
				'link_before'     => '<span role="menuitem">',
				'link_after'      => '</span>',
			);
			$menu_mobile_primary = wp_nav_menu( $args3 );

			$args4                 = array(
				'menu'            => $mobilemenu2, // from top-ancestor of current page.
				'echo'            => false,  // true or 0.
				'fallback_cb'     => false,
				'container_class' => 'obb-menu-container',
				'menu_class'      => 'obb-menu mobile',
				'theme_location'  => 'none',
				'link_before'     => '<span role="menuitem">',
				'link_after'      => '</span>',
			);
			$menu_mobile_secondary = wp_nav_menu( $args4 );

			ob_start();

			$sitetitlefont = ( 'Theme Default' === $sitetitlefont ) ? 'inherit' : $sitetitlefont;
			$sitedescfont  = ( 'Theme Default' === $sitedescfont ) ? 'inherit' : $sitedescfont;
			$navmenufont   = ( 'Theme Default' === $navmenufont ) ? '' : $navmenufont;
			$navmenufont2  = ( 'Theme Default' === $navmenufont2 ) ? '' : $navmenufont2;
			$navmenufont3  = ( 'Theme Default' === $navmenufont3 ) ? '' : $navmenufont3;
			$navmenufont4  = ( 'Theme Default' === $navmenufont4 ) ? '' : $navmenufont4;
			obb_display_font_link( $navmenufont );
			obb_display_font_link( $navmenufont2 );
			obb_display_font_link( $navmenufont3 );
			obb_display_font_link( $navmenufont4 );
			obb_display_font_link( $sitedescfont );
			obb_display_font_link( $sitetitlefont );

			global $post;
			?>

	<style type="text/css">
		#<?php echo esc_html( $headerid ); ?> .obb-header-container {
			<?php if ( '' !== $header_bgcolor && 1.0 === $header_opacity ) { ?>
				background-color: <?php echo esc_html( $header_bgcolor ); ?>;
			<?php } ?>
			<?php if ( '' !== $header_bggradient && 1.0 === $header_opacity ) { ?>
				background-image: <?php echo esc_html( $header_bggradient ); ?>;
			<?php } ?>
			padding-left: <?php echo esc_html( $leftpadding ); ?>px;
			padding-right: <?php echo esc_html( $rightpadding ); ?>px;
			padding-top: <?php echo esc_html( $toppadding ); ?>px;
			padding-bottom: <?php echo esc_html( $bottompadding ); ?>px;
		}
		.<?php echo esc_html( $headerid ); ?>.obb-mobile-menu-container {
			<?php if ( '' !== $mobile_bgcolor ) { ?>
				background-color: <?php echo esc_html( $mobile_bgcolor ); ?>;
			<?php } ?>
			<?php if ( '' !== $mobile_bggradient ) { ?>
				background-image: <?php echo esc_html( $mobile_bggradient ); ?>;
			<?php } ?>
		}
		#<?php echo esc_html( $headerid ); ?> .sub-menu {
			background-color: <?php echo esc_html( $submenu_bgcolor ); ?>;
			background-image: <?php echo esc_html( $submenu_bggradient ); ?>;
		}
		#<?php echo esc_html( $headerid ); ?> ul.obb-menu > li > ul.sub-menu::after {
			border-bottom-color: <?php echo esc_html( $submenu_bgcolor ); ?>;
		}
			<?php if ( 1.0 > $header_opacity ) { ?>
				#<?php echo esc_html( $headerid ); ?>::after {
					<?php if ( '' !== $header_bgcolor ) { ?>
						background-color: <?php echo esc_html( $header_bgcolor ); ?>;
					<?php } ?>
					<?php if ( '' !== $header_bggradient ) { ?>
						background-image: <?php echo esc_html( $header_bggradient ); ?>;
					<?php } ?>
					opacity: <?php echo esc_html( $header_opacity ); ?>;
					position: absolute;
					top: 0; left: 0;
					background-size: cover;
					content: '';
					width: 100%;
					height: 100%;
				}
			<?php } ?>
		.<?php echo esc_html( $headerid ); ?>.obb-mobile-menu-container {
			padding-top: <?php echo esc_html( $toppadding ); ?>px;
		}
		.<?php echo esc_html( $headerid ); ?>.obb-mobile-menu-container .obb-site-info,
		.<?php echo esc_html( $headerid ); ?>.obb-mobile-menu-container .obb-mobile-menus {
			padding-left: <?php echo esc_html( $leftpadding ); ?>px;
			padding-right: <?php echo esc_html( $rightpadding ); ?>px;
		}
		/* STAX Theme Specific */
		.site-main > .entry-content > .<?php echo esc_html( $headerid ); ?>.obb-mobile-menu-container {
			padding-left: 0 !important;
			padding-right: 0 !important;
		}
			<?php if ( 'position-fixed' === $headerposition ) { ?>
				.page-id-<?php echo esc_html( $post->ID ); ?> #header {
					display: none;
				}
			<?php } ?>
			<?php if ( true === $header_scroll && 1.0 > $header_opacity ) { ?>
				#<?php echo esc_html( $headerid ); ?>.header-transparent-scroll {
					border-bottom-color: rgba(0, 0, 0, 0);
				}
			<?php } ?>
			<?php if ( true === $header_scroll ) { ?>
				#<?php echo esc_html( $headerid ); ?>.header-transparent-scroll.scrolling {
					<?php if ( '' !== $header_bgcolor ) { ?>
						background-color: <?php echo esc_html( $header_bgcolor ); ?>;
					<?php } ?>
					<?php if ( '' !== $header_bggradient ) { ?>
						background-image: <?php echo esc_html( $header_bggradient ); ?>;
					<?php } ?>
					border-bottom-color: rgba(0, 0, 0, 0.12);
				}
			<?php } ?>
			<?php if ( '' !== $headercontainer ) { ?>
				#<?php echo esc_html( $headerid ); ?> .obb-header-container {
					max-width: <?php echo esc_html( $headercontainer ); ?>px;
				}
			<?php } ?>
			<?php if ( '' !== $headerwidth ) { ?>
				#<?php echo esc_html( $headerid ); ?> .obb-header-content,
				#<?php echo esc_html( $headerid ); ?> .obb-navigation.secondary .obb-menu-container {
					max-width: <?php echo esc_html( $headerwidth ); ?>px;
				}
			<?php } ?>
			<?php if ( true === $header_borders ) { ?>
				#<?php echo esc_html( $headerid ); ?>:not(.is-style-obb-center-logo) .obb-navigation.secondary {
					border-bottom: 1px solid rgba(0, 0, 0, 0.12);
				}
				#<?php echo esc_html( $headerid ); ?>:not(.is-style-obb-center-logo) .obb-navigation.secondary::after {
					content: '';
					width: 100%;
					border-bottom: 1px solid rgba(255, 255, 255, 0.12);
				}
				#<?php echo esc_html( $headerid ); ?> .obb-menu > li > a {
					border-left: 1px solid rgba(0, 0, 0, 0.12);
					border-right: 1px solid rgba(255, 255, 255, 0.12);
				}
				#<?php echo esc_html( $headerid ); ?> .obb-menu .sub-menu li a {
					border-top: 1px solid rgba(0, 0, 0, 0.12);
					border-bottom: 1px solid rgba(255, 255, 255, 0.12);
				}
				#<?php echo esc_html( $headerid ); ?>:not(.is-style-obb-center-logo) .obb-navigation.secondary .obb-menu > li:last-child::after {
					content: '';
					align-self: stretch;
					border-right: 1px solid rgba(0, 0, 0, 0.12);
				}
				#<?php echo esc_html( $headerid ); ?>:not(.is-style-obb-center-logo) .obb-navigation.secondary .obb-menu > li:first-child::before {
					content: '';
					align-self: stretch;
					border-left: 1px solid rgba(255, 255, 255, 0.12);
				}
			<?php } ?>
		#<?php echo esc_html( $headerid ); ?> .obb-site-title,
		.<?php echo esc_html( $headerid ); ?> .obb-site-title {
			color: <?php echo esc_html( $site_titlecolor ); ?>;
			<?php if ( $sitetitlefont ) { ?>
			font-family: '<?php echo esc_html( $sitetitlefont ); ?>';
			<?php } ?>
			<?php if ( $sitetitlesize ) { ?>
			font-size: <?php echo esc_html( $sitetitlesize ); ?>px;
			<?php } ?>
			font-weight: <?php echo esc_html( $site_weight ); ?>;
			letter-spacing: <?php echo esc_html( $titlespacing ); ?>px;
			margin: 0px;
		}
		@media screen and (max-width: 768px) {
			#<?php echo esc_html( $headerid ); ?> .obb-site-title,
			.<?php echo esc_html( $headerid ); ?> .obb-site-title {
				<?php if ( $sitetitlesizemobile ) { ?>
				font-size: <?php echo esc_html( $sitetitlesizemobile ); ?>px;
				<?php } ?>
			}
		}
		#<?php echo esc_html( $headerid ); ?> .obb-site-title a,
		.<?php echo esc_html( $headerid ); ?> .obb-site-title a {
			color: <?php echo esc_html( $site_titlecolor ); ?>;
			text-decoration: none;
		}
		#<?php echo esc_html( $headerid ); ?> .obb-site-desc,
		.<?php echo esc_html( $headerid ); ?> .obb-site-desc {
			color: <?php echo esc_html( $site_desccolor ); ?>;
			<?php if ( $sitedescfont ) { ?>
			font-family: '<?php echo esc_html( $sitedescfont ); ?>';
			<?php } ?>
			margin: 0px;
		}
		#<?php echo esc_html( $headerid ); ?>:not(.is-style-obb-center-logo) .obb-navigation.secondary {
			margin-top: -<?php echo esc_html( $toppadding ); ?>px;
			margin-bottom: <?php echo esc_html( $toppadding ); ?>px;
			width: calc(100% + <?php echo esc_html( $leftpadding ); ?>px + <?php echo esc_html( $rightpadding ); ?>px );
		}
		#<?php echo esc_html( $headerid ); ?> .obb-navigation.primary .obb-menu > li > a {
			padding-left: <?php echo esc_html( $navmenulinkgap ); ?>px;
			padding-right: <?php echo esc_html( $navmenulinkgap ); ?>px;
			letter-spacing: <?php echo esc_html( $navmenuspacing ); ?>px;
			line-height: <?php echo esc_html( $navmenuheight ); ?>px;
			<?php if ( true === $navmenucaps ) { ?>
			text-transform: uppercase;
			<?php } ?>
		}
		#<?php echo esc_html( $headerid ); ?> .obb-navigation.secondary .obb-menu > li > a {
			padding-left: <?php echo esc_html( $navmenulinkgap2 ); ?>px;
			padding-right: <?php echo esc_html( $navmenulinkgap2 ); ?>px;
			letter-spacing: <?php echo esc_html( $navmenuspacing2 ); ?>px;
			<?php if ( true === $navmenucaps2 ) { ?>
			text-transform: uppercase;
			<?php } ?>
		}
		#<?php echo esc_html( $headerid ); ?> .obb-navigation.primary li a {
			<?php if ( $navmenufont ) { ?>
			font-family: '<?php echo esc_html( $navmenufont ); ?>';
			<?php } ?>
			font-size: <?php echo esc_html( $navmenusize ); ?>px;
		}
		#<?php echo esc_html( $headerid ); ?> .obb-navigation.secondary li a {
			<?php if ( $navmenufont2 ) { ?>
			font-family: '<?php echo esc_html( $navmenufont2 ); ?>';
			<?php } ?>
			font-size: <?php echo esc_html( $navmenusize2 ); ?>px;
		}
		.<?php echo esc_html( $headerid ); ?> .obb-mobile-menus .obb-navigation.primary li a {
			<?php if ( $navmenufont3 ) { ?>
			font-family: '<?php echo esc_html( $navmenufont3 ); ?>';
			<?php } ?>
			font-size: <?php echo esc_html( $navmenusize3 ); ?>px;
		}
		.<?php echo esc_html( $headerid ); ?> .obb-mobile-menus .obb-navigation.secondary li a {
			<?php if ( $navmenufont4 ) { ?>
			font-family: '<?php echo esc_html( $navmenufont4 ); ?>';
			<?php } ?>
			font-size: <?php echo esc_html( $navmenusize4 ); ?>px;
		}
		#<?php echo esc_html( $headerid ); ?> .obb-navigation.primary li li a {
			font-size: <?php echo esc_html( $submenusize ); ?>px;
		}
		#<?php echo esc_html( $headerid ); ?> .obb-navigation.secondary li li a {
			font-size: <?php echo esc_html( $submenusize2 ); ?>px;
		}
		#<?php echo esc_html( $headerid ); ?> .obb-navigation li a,
		.<?php echo esc_html( $headerid ); ?> .obb-navigation li a {
			color: <?php echo esc_html( $menu_linkcolor ); ?>;
		}
		.<?php echo esc_html( $headerid ); ?>:not(.obb-mobile-menu-container) button.obb-menu-toggle svg,
		#<?php echo esc_html( $headerid ); ?>:not(.header-transparent-scroll) button.obb-menu-toggle svg {
			fill: <?php echo esc_html( $menu_linkcolor ); ?>;
		}
		.<?php echo esc_html( $headerid ); ?>:not(.obb-mobile-menu-container) button.obb-menu-toggle:hover svg,
		#<?php echo esc_html( $headerid ); ?>:not(.header-transparent-scroll) button.obb-menu-toggle:hover svg {
			fill: <?php echo esc_html( $menu_hovercolor ); ?>;
		}
		#<?php echo esc_html( $headerid ); ?>.header-transparent-scroll.scrolling .obb-navigation .obb-menu > li > a {
			color: <?php echo esc_html( $menucolorscroll ); ?>;
		}
		#<?php echo esc_html( $headerid ); ?>.header-transparent-scroll.scrolling .obb-navigation .obb-menu > li > a:hover {
			color: <?php echo esc_html( $menuscrollhover ); ?>;
		}
		#<?php echo esc_html( $headerid ); ?> .obb-navigation li a:hover,
		.<?php echo esc_html( $headerid ); ?> .obb-navigation li a:hover {
			color: <?php echo esc_html( $menu_hovercolor ); ?>;
		}
		#<?php echo esc_html( $headerid ); ?> .obb-navigation li li a {
			color: <?php echo esc_html( $submenu_color ); ?>;
		}
		#<?php echo esc_html( $headerid ); ?> .obb-navigation li li a:hover {
			color: <?php echo esc_html( $submenu_hover ); ?>;
		}
		.<?php echo esc_html( $headerid ); ?>.obb-mobile-menu-container button.obb-menu-toggle svg.icon-menu-close {
			fill: <?php echo esc_html( $mobile_color ); ?>;
		}
		.<?php echo esc_html( $headerid ); ?>.obb-mobile-menu-container .obb-mobile-menus .obb-navigation li a,
		.<?php echo esc_html( $headerid ); ?>.obb-mobile-menu-container .obb-mobile-menus .obb-navigation li .dropdown {
			color: <?php echo esc_html( $mobile_color ); ?>;
		}
		.<?php echo esc_html( $headerid ); ?>.obb-mobile-menu-container button.obb-menu-toggle:hover svg.icon-menu-close {
			fill: <?php echo esc_html( $mobile_hover ); ?>;
		}
		.<?php echo esc_html( $headerid ); ?>.obb-mobile-menu-container .obb-mobile-menus .obb-navigation li a:hover {
			color: <?php echo esc_html( $mobile_hover ); ?>;
		}
	</style>

	<!-- BEGIN .obb-mobile-menu-container -->
	<div class="<?php echo esc_html( $headerid ); ?><?php echo esc_html( $mobileview_class ); ?> obb-mobile-menu-container" data-mobile-id="<?php echo esc_html( $headerid ); ?>">

		<!-- BEGIN .obb-site-info -->
		<div class="obb-site-info">

			<div class="obb-logo-title">

				<?php if ( $site_logo2 ) { ?>
				<div class="obb-site-logo">
					<a class="logo-primary" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
						<?php $logowidth = $logosize . 'px'; ?>
						<img src="<?php echo esc_url( $site_logo2 ); ?>" style="width: <?php echo esc_html( $logowidth ); ?>;" />
					</a>
				</div>
				<?php } elseif ( $site_logo ) { ?>
				<div class="obb-site-logo">
					<a class="logo-primary" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
						<?php $logowidth = $logosize . 'px'; ?>
						<img src="<?php echo esc_url( $site_logo ); ?>" style="width: <?php echo esc_html( $logowidth ); ?>;" />
					</a>
				</div>
				<?php } ?>

				<?php if ( $site_title_disp || $site_desc_disp ) { ?>
				<div class="obb-site-title-tagline">
					<?php if ( $site_title_disp ) { ?>
						<?php if ( is_front_page() ) { ?>
							<h1 class="obb-site-title">
								<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php echo wp_kses_post( get_bloginfo( 'name' ) ); ?></a>
							</h1>
						<?php } else { ?>
							<p class="obb-site-title">
								<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php echo wp_kses_post( get_bloginfo( 'name' ) ); ?></a>
							</p>
						<?php } ?>
					<?php } ?>

					<?php if ( $site_desc_disp ) { ?>
						<p class="obb-site-desc">
							<?php echo wp_kses_post( html_entity_decode( get_bloginfo( 'description' ) ) ); ?>
						</p>
					<?php } ?>
				</div>
				<?php } ?>

			</div>

			<button class="obb-menu-toggle close">
				<span class="screen-reader-text"><?php esc_html_e( 'Toggle Mobile Menu', 'organic-market' ); ?></span>
				<svg id="icon-close" class="icon-menu-close" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
					<rect x="0" y="11" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 12 28.9706)" width="24" height="2"/>
					<rect x="0" y="11" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 28.9706 12)" width="24" height="2"/>
				</svg>
			</button>

		<!-- END .obb-site-info -->
		</div>

		<!-- BEGIN .mobile-menus -->
		<div class="obb-mobile-menus">

			<?php if ( $menu_mobile_primary || $menu_mobile_secondary ) { ?>

				<?php if ( $menu_mobile_primary ) { ?>

					<!-- BEGIN .navigation -->
					<nav id="mobile-nav-large" class="obb-navigation mobile primary clearfix" role="navigation" aria-label="<?php esc_attr_e( 'Primary Mobile Navigation', 'obb' ); ?>">
						<?php echo wp_kses_post( $menu_mobile_primary ); ?>
					<!-- END .navigation -->
					</nav>

				<?php	} ?>

				<?php if ( $menu_mobile_secondary ) { ?>

					<!-- BEGIN .navigation -->
					<nav id="mobile-nav-small" class="obb-navigation mobile secondary clearfix" role="navigation" aria-label="<?php esc_attr_e( 'Secondary Mobile Navigation', 'obb' ); ?>">
						<?php echo wp_kses_post( $menu_mobile_secondary ); ?>
					<!-- END .navigation -->
					</nav>

				<?php	} ?>

			<?php	} else { ?>

				<?php if ( $menu_primary ) { ?>

					<!-- BEGIN .navigation -->
					<nav id="mobile-nav-large" class="obb-navigation primary clearfix" role="navigation" aria-label="<?php esc_attr_e( 'Primary Navigation', 'obb' ); ?>">
						<?php echo wp_kses_post( $menu_primary ); ?>
					<!-- END .navigation -->
					</nav>

				<?php	} ?>

				<?php if ( $menu_secondary ) { ?>

				<!-- BEGIN .navigation -->
				<nav id="mobile-nav-small" class="obb-navigation secondary clearfix" role="navigation" aria-label="<?php esc_attr_e( 'Secondary Navigation', 'obb' ); ?>">
					<?php echo wp_kses_post( $menu_secondary ); ?>
				<!-- END .navigation -->
				</nav>

				<?php	} ?>

			<?php	} ?>

		<!-- END .obb-mobile-menus -->
		</div>

	<!-- END .obb-mobile-menu-container -->
	</div>

	<!-- BEGIN #header -->
	<div id="<?php echo esc_html( $headerid ); ?>" class="organic-block obb-header no-js <?php echo esc_html( $classes ); ?>" data-header-id="<?php echo esc_html( $headerid ); ?>">

		<!-- BEGIN .obb-header-container -->
		<div class="obb-header-container">

			<!-- BEGIN .obb-header-content -->
			<div class="obb-header-content">

				<?php if ( $menu_secondary ) { ?>

				<!-- BEGIN .navigation -->
				<nav class="obb-navigation secondary clearfix" role="navigation" aria-label="<?php esc_attr_e( 'Secondary Navigation', 'obb' ); ?>">
					<?php echo wp_kses_post( $menu_secondary ); ?>
				<!-- END .navigation -->
				</nav>

				<?php	} ?>

				<?php if ( $site_logo || $site_logo2 || $site_title_disp || $site_desc_disp ) { ?>

				<!-- BEGIN .obb-site-identity -->
				<div class="obb-site-identity">

					<?php if ( $site_logo ) { ?>
					<div class="obb-site-logo">
						<a class="logo-primary" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
							<?php $logowidth = $logosize . 'px'; ?>
							<img src="<?php echo esc_url( $site_logo ); ?>" style="width: <?php echo esc_html( $logowidth ); ?>;" />
						</a>
						<?php if ( $site_logo2 ) { ?>
						<a class="logo-secondary" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
							<?php $logowidth = $logosize . 'px'; ?>
							<img src="<?php echo esc_url( $site_logo2 ); ?>" style="width: <?php echo esc_html( $logowidth ); ?>;" />
						</a>
						<?php } ?>
					</div>
					<?php } ?>

					<?php if ( $site_title_disp || $site_desc_disp ) { ?>
					<div class="obb-site-title-tagline">
						<?php if ( $site_title_disp ) { ?>
							<h1 class="obb-site-title">
								<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php echo wp_kses_post( get_bloginfo( 'name' ) ); ?></a>
							</h1>
						<?php } ?>

						<?php if ( $site_desc_disp ) { ?>
							<p class="obb-site-desc">
								<?php echo wp_kses_post( html_entity_decode( get_bloginfo( 'description' ) ) ); ?>
							</p>
						<?php } ?>
					</div>
					<?php } ?>

				<!-- END .obb-site-identity -->
				</div>

				<?php	} ?>

				<?php if ( $menu_primary ) { ?>

					<!-- BEGIN .navigation -->
					<nav id="obb-nav" class="obb-navigation primary clearfix" role="navigation" aria-label="<?php esc_attr_e( 'Primary Navigation', 'obb' ); ?>">
						<?php echo wp_kses_post( $menu_primary ); ?>
					<!-- END .navigation -->
					</nav>

					<button id="obb-menu-toggle" class="obb-menu-toggle open">
						<span class="screen-reader-text"><?php esc_html_e( 'Toggle Mobile Menu', 'obb' ); ?></span>
						<svg id="icon-open" class="icon-menu-open" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
							width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
							<rect y="2" width="24" height="2"/>
							<rect y="11" width="24" height="2"/>
							<rect y="20" width="24" height="2"/>
						</svg>
					</button>

				<?php	} ?>

			<!-- END .obb-header-content -->
			</div>

		<!-- END .obb-header-container -->
		</div>

			<?php if ( true === $header_shadow ) { ?>
				<div class="obb-header-shadow"></div>
			<?php	} ?>

	</div>

			<?php
				return ob_get_clean();

		} // End of render html function.

	} // End of class.

} // End of if conditional.

?>
