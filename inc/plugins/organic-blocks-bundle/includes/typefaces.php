<?php
/**
 * Register font variables.
 */
function obb_get_fonts() {

	$font_families = array(
		'Aleo',
		'Archivo',
		'Archivo Narrow',
		'Andada Pro',
		'Georama',
		'Open Sans',
		'Caladea',
		'Bangers',
		'Bebas Neue',
		'Dancing Script',
		'Dosis',
		'DM Serif Text',
		'Oxanium',
		'Fjalla One',
		'Rochester',
		'Righteous',
		'Fredoka One',
		'Overlock',
		'Noto Serif',
		'Noto Sans',
		'Poppins',
		'Oxygen',
		'Libre Franklin',
		'Limelight',
		'Droid Serif',
		'Helvetica Neue',
		'Lora',
		'Lobster Two',
		'Merriweather',
		'Montserrat',
		'Nunito',
		'Oswald',
		'Playfair Display',
		'Quicksand',
		'Raleway',
		'Roboto',
		'Roboto Condensed',
		'Roboto Slab',
		'Roboto Mono',
		'Lato',
		'Lily Script One',
		'Cinzel',
		'Cinzel Decorative',
		'Shrikhand',
		'Titan One',
		'Amatic SC',
		'Berkshire Swash',
		'Abril Fatface',
		'Patua One',
		'Vujahday Script',
		'Monoton',
	);

	sort( $font_families );

	return $font_families;
}

/**
 * Enqueue Google fonts for blocks.
 *
 * @param array $font The Google font.
 */
function obb_display_font_link( $font ) {
	if ( ! empty( $font ) && 'inherit' !== $font ) {
		// Replace space with plus.
		$font       = str_replace( ' ', '+', $font );
		$stylesheet = 'stylesheet';
		echo "<link rel='" . esc_html( $stylesheet ) . "' href='https://fonts.googleapis.com/css2?family=" . esc_html( $font ) . ":wght@200;300;400;700'>";
	}
}
