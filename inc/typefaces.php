<?php
/**
 * Register Google Font URLs
 *
 * @package Organic Rialto
 * @since Organic Rialto 1.0
 */

if ( ! function_exists( 'organic_rialto_register_fonts' ) ) {
	/**
	 * Register local fonts for site editor.
	 */
	function organic_rialto_register_fonts() {
		/* If the function does not exist, return early: */
		if ( ! function_exists( 'wp_register_webfonts' ) ) {
			return;
		}

		// Register Google Fonts.
		wp_register_webfonts(
			array(
				array(
					'font-family'  => 'Bebas Neue',
					'font-weight'  => '400',
					'font-style'   => 'normal',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/BebasNeue-Regular.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Bitter',
					'font-weight'  => '100 900',
					'font-style'   => 'normal',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Bitter-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Bitter',
					'font-weight'  => '100 900',
					'font-style'   => 'italic',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Bitter-Italic-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Cabin',
					'font-weight'  => '100 900',
					'font-style'   => 'italic',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Cabin-Italic-VariableFont_wdth,wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Cabin',
					'font-weight'  => '100 900',
					'font-style'   => 'normal',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Cabin-VariableFont_wdth,wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Cinzel',
					'font-weight'  => '100 900',
					'font-style'   => 'normal',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Cinzel-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Libre Franklin',
					'font-weight'  => '100 900',
					'font-style'   => 'italic',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/LibreFranklin-Italic-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Libre Franklin',
					'font-weight'  => '100 900',
					'font-style'   => 'normal',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/LibreFranklin-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Lora',
					'font-weight'  => '100 900',
					'font-style'   => 'italic',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Lora-Italic-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Lora',
					'font-weight'  => '100 900',
					'font-style'   => 'normal',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Lora-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Montserrat',
					'font-weight'  => '100 900',
					'font-style'   => 'italic',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Montserrat-Italic-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Montserrat',
					'font-weight'  => '100 900',
					'font-style'   => 'normal',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Montserrat-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Nunito',
					'font-weight'  => '100 900',
					'font-style'   => 'italic',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Nunito-Italic-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Nunito',
					'font-weight'  => '100 900',
					'font-style'   => 'normal',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Nunito-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Open Sans',
					'font-weight'  => '100 900',
					'font-style'   => 'italic',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/OpenSans-Italic-VariableFont_wdth,wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Open Sans',
					'font-weight'  => '100 900',
					'font-style'   => 'normal',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/OpenSans-VariableFont_wdth,wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Oswald',
					'font-weight'  => '100 900',
					'font-style'   => 'normal',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Oswald-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Playfair Display',
					'font-weight'  => '100 900',
					'font-style'   => 'italic',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Playfair Display',
					'font-weight'  => '100 900',
					'font-style'   => 'normal',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/PlayfairDisplay-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Quicksand',
					'font-weight'  => '100 900',
					'font-style'   => 'normal',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Quicksand-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Raleway',
					'font-weight'  => '100 900',
					'font-style'   => 'italic',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Raleway-Italic-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Raleway',
					'font-weight'  => '100 900',
					'font-style'   => 'normal',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Raleway-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Rubik',
					'font-weight'  => '100 900',
					'font-style'   => 'italic',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Rubik-Italic-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
				array(
					'font-family'  => 'Rubik',
					'font-weight'  => '100 900',
					'font-style'   => 'normal',
					'font-display' => 'fallback',
					'src'          => get_theme_file_uri( 'assets/fonts/Rubik-VariableFont_wght.ttf' ),
					'provider'     => 'local',
				),
			)
		);
	}
	add_action( 'after_setup_theme', 'organic_rialto_register_fonts' );
}
