<?php
/**
 * Organic Block Slider Class
 *
 * @package Organic Blocks Bundle
 * @since Organic Blocks Bundle 1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	die();
}

if ( ! class_exists( 'OBB_Slideshow_Block' ) ) {

	/**
	 * Class for Slideshow block.
	 */
	class OBB_Slideshow_Block {

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
				'editMode'          => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'position'          => array(
					'type'    => 'string',
					'default' => 'center center',
				),
				'textalignment'     => array(
					'type'    => 'string',
					'default' => 'center',
				),
				'postheading'       => array(
					'type'    => 'string',
					'default' => 'h4',
				),
				'postheadingsize'   => array(
					'type'    => 'string',
					'default' => '24px',
				),
				'postbodysize'      => array(
					'type'    => 'string',
					'default' => '16px',
				),
				'postcategory'      => array(
					'type' => 'array',
				),
				'posttype'          => array(
					'type' => 'string',
				),
				'posttaxonomy'      => array(
					'type' => 'string',
				),
				'postorder'         => array(
					'type'    => 'string',
					'default' => 'DESC',
				),
				'transspeed'        => array(
					'type'    => 'number',
					'default' => 10000,
				),
				'transstyle'        => array(
					'type'    => 'string',
					'default' => 'fade',
				),
				'slidestyle'        => array(
					'type'    => 'string',
					'default' => 'style-minimal',
				),
				'postsperslide'     => array(
					'type'    => 'number',
					'default' => 1,
				),
				'smoothheight'      => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'slideheight'       => array(
					'type' => 'string',
					'default' => '640px',
				),
				'slidetitle'        => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'slideexcerpt'      => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'slidelink'         => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'slidebackground'   => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'slidearrows'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'slidenav'          => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'slidelayout'       => array(
					'type'    => 'string',
					'default' => 'obb-content-layout-overlay',
				),
				'slidebgcolor'      => array(
					'type'    => 'string',
					'default' => 'transparent',
				),
				'slidebggradient'   => array(
					'type' => 'string',
				),
				'slideoverlaycolor' => array(
					'type'    => 'string',
					'default' => '#000',
				),
				'slideopacity'      => array(
					'type'    => 'number',
					'default' => 0.5,
				),
				'slidetitlecolor'   => array(
					'type'    => 'string',
					'default' => '#000',
				),
				'slidecontentcolor' => array(
					'type'    => 'string',
					'default' => '#666',
				),
				'contentbgcolor'    => array(
					'type'    => 'string',
					'default' => '#fff',
				),
				'contentbggradient' => array(
					'type' => 'string',
				),
				'buttoncolor'       => array(
					'type'    => 'string',
					'default' => '',
				),
				'buttontxtcolor'    => array(
					'type'    => 'string',
					'default' => '',
				),
				'buttontxt'    => array(
					'type'    => 'string',
					'default' => 'Read More',
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
			$slideid  = "flexslider-$randomid";

			// Default attributes.
			$slideshow_interval         = ( isset( $att['transspeed'] ) ) ? $att['transspeed'] : 10000;
			$slideshow_transition_style = ( isset( $att['transstyle'] ) ) ? $att['transstyle'] : 'fade';
			$slide_style                = ( isset( $att['slidestyle'] ) ) ? $att['slidestyle'] : 'style-minimal';
			$posts_per_slide            = ( isset( $att['postsperslide'] ) ) ? $att['postsperslide'] : 1;
			$max_posts                  = 5;
			$smooth_height              = ( isset( $att['smoothheight'] ) ) ? $att['smoothheight'] : true;
			$fixed_slide_height         = ( isset( $att['slideheight'] ) ) ? $att['slideheight'] : '640px';
			$slide_arrows               = ( isset( $att['slidearrows'] ) ) ? $att['slidearrows'] : true;
			$slide_nav                  = ( isset( $att['slidenav'] ) ) ? $att['slidenav'] : true;

			$postheading     = ( isset( $att['postheading'] ) ) ? $att['postheading'] : 'h4';
			$postheadingsize = ( isset( $att['postheadingsize'] ) ) ? $att['postheadingsize'] : '24px';
			$postbodysize    = ( isset( $att['postbodysize'] ) ) ? $att['postbodysize'] : '16px';

			$alignment     = ( isset( $att['align'] ) ) ? $att['align'] : '';
			$position      = ( isset( $att['position'] ) ) ? $att['position'] : 'center center';
			$positionclass = ( isset( $att['position'] ) ) ? 'obb-position-' . str_replace( ' ', '-', $position ) : '';
			$textalignment = ( isset( $att['textalignment'] ) ) ? $att['textalignment'] : 'center';
			$slidelayout   = ( isset( $att['slidelayout'] ) ) ? $att['slidelayout'] : 'obb-content-layout-overlay';

			$hide_content_bg   = ( isset( $att['slidebackground'] ) ) ? $att['slidebackground'] : true;
			$hide_post_title   = ( isset( $att['slidetitle'] ) ) ? $att['slidetitle'] : true;
			$hide_post_button  = ( isset( $att['slidelink'] ) ) ? $att['slidelink'] : true;
			$hide_post_content = ( isset( $att['slideexcerpt'] ) ) ? $att['slideexcerpt'] : true;

			$slide_bg_color      = ( isset( $att['slidebgcolor'] ) ) ? $att['slidebgcolor'] : 'transparent';
			$slide_bg_gradient   = ( isset( $att['slidebggradient'] ) ) ? $att['slidebggradient'] : '';
			$slide_overlay_color = ( isset( $att['slideoverlaycolor'] ) ) ? $att['slideoverlaycolor'] : '';
			$slide_opacity       = ( isset( $att['slideopacity'] ) ) ? $att['slideopacity'] : 0.5;
			$slide_title_color   = ( isset( $att['slidetitlecolor'] ) ) ? $att['slidetitlecolor'] : '#000';
			$slide_content_color = ( isset( $att['slidecontentcolor'] ) ) ? $att['slidecontentcolor'] : '#666';
			$content_bg_color    = ( isset( $att['contentbgcolor'] ) ) ? $att['contentbgcolor'] : '#fff';
			$content_bg_gradient = ( isset( $att['contentbggradient'] ) ) ? $att['contentbggradient'] : '';
			$button_color        = ( isset( $att['buttoncolor'] ) ) ? $att['buttoncolor'] : '';
			$button_text_color   = ( isset( $att['buttontxtcolor'] ) ) ? $att['buttontxtcolor'] : '#fff';
			$button_text         = ( isset( $att['buttontxt'] ) ) ? $att['buttontxt'] : 'Read More';

			if ( isset( $att['transstyle'] ) && 'fade' === $slideshow_transition_style && 1 !== $posts_per_slide ) {
				$slideshow_transition_style = 'slide';
			} else {
				$slideshow_transition_style = $att['transstyle'];
			}

			// Set defaults.
			$classes = '';

			// Add Classes based on settings.
			if ( isset( $att['align'] ) ) {
				$classes = 'align' . $alignment . ' ';
			}
			$slidelayoutclass = $slidelayout;
			if ( ! $hide_content_bg ) {
				$classes .= 'obb-no-content-bg ';
			}
			if ( isset( $att['postsperslide'] ) && 1 !== $posts_per_slide ) {
				$classes .= 'obb-multi-posts-slide ';
			}
			if ( ! empty( $att['className'] ) && isset( $att['className'] ) ) {
				$classes .= sprintf( '%s ', $att['className'] );
			}
			if ( ! empty( $att['position'] ) && isset( $att['position'] ) ) {
				$classes .= $positionclass . ' ';
			}
			if ( ! empty( $att['slidestyle'] ) && isset( $att['slidestyle'] ) ) {
				$classes .= $slide_style;
			}

			if ( ! empty( $fixed_slide_height ) ) {
				$height_class = ' obb-fixed-slide-height';
			}

			ob_start();

			?>

			<style type="text/css">
				<?php if ( '' !== $postheadingsize ) { ?>
				#<?php echo esc_html( $slideid ); ?> .obb-title {
					font-size: <?php echo esc_html( $postheadingsize ); ?>;
				}
				<?php } ?>
				<?php if ( '' !== $postbodysize || '' !== $slide_content_color ) { ?>
				#<?php echo esc_html( $slideid ); ?> .obb-excerpt,
				#<?php echo esc_html( $slideid ); ?> .obb-excerpt p {
					color: <?php echo esc_html( $slide_content_color ); ?>;
					font-size: <?php echo esc_html( $postbodysize ); ?>;
				}
				<?php } ?>

				#<?php echo esc_html( $slideid ); ?> .obb-flexslider {
					<?php if ( ! empty( $fixed_slide_height ) ) { ?>
						height: <?php echo esc_html( $fixed_slide_height ); ?>;
					<?php } ?>
					<?php if ( '' !== $slide_bg_color ) { ?>
						background-color: <?php echo esc_html( $slide_bg_color ); ?>;
					<?php } ?>
					<?php if ( '' !== $slide_bg_gradient ) { ?>
						background-image: <?php echo esc_html( $slide_bg_gradient ); ?>;
					<?php } ?>
				}
				#<?php echo esc_html( $slideid ); ?> .slide {
					<?php if ( ! empty( $fixed_slide_height ) ) { ?>
						height: <?php echo esc_html( $fixed_slide_height ); ?>;
					<?php } ?>
				}
				#<?php echo esc_html( $slideid ); ?> .obb-content {
					text-align: <?php echo esc_html( $textalignment ); ?>;
					<?php if ( $hide_content_bg ) { ?>
						background-color: <?php echo esc_html( $content_bg_color ); ?>;
						<?php if ( '' !== $content_bg_gradient ) { ?>
							background-image: <?php echo esc_html( $content_bg_gradient ); ?>;
						<?php } ?>
					<?php } ?>
				}
				#<?php echo esc_html( $slideid ); ?> .obb-card .wp-block-button__link {
					<?php if ( '' !== $button_text_color ) { ?>
						color: <?php echo esc_html( $button_text_color ); ?>;
					<?php } ?>
					<?php if ( '' !== $button_color ) { ?>
						background: <?php echo esc_html( $button_color ); ?>;
						border-color: <?php echo esc_html( $button_color ); ?>
					<?php } ?>
				}
			</style>

			<?php
			// Slideshow Query Arguments.
			$post_type = ( isset( $att['posttype'] ) ) ? $att['posttype'] : 'post';
			$postorder = ( isset( $att['postorder'] ) ) ? $att['postorder'] : 'DESC';
			$taxonomy  = ( isset( $att['posttaxonomy'] ) ) ? $att['posttaxonomy'] : 0;
			$category  = ( isset( $att['postcategory'] ) ) ? $att['postcategory'] : 0;

			$args = array(
				'posts_per_page' => -1,
				'post_type'      => $post_type,
				'order'          => $postorder,
			);

			// Add additional args based on post type & taxonomy selected.
			if ( 'product' === $post_type && $category ) {
				$args['product_cat'] = implode( ',', $category );
			} elseif ( 'page' === $post_type ) {
				$args['post__in'] = $category;
			} elseif ( 'category' !== $taxonomy && $taxonomy ) {
				$args['tax_query'] = array(
					array(
						'taxonomy' => $taxonomy,
						'field'    => 'name',
						'terms'    => $category,
					),
				);
			} elseif ( $category && count( $category ) > 0 ) {
				$args['category_name'] = implode( ',', $category );
			}

			$slideshow_query = new WP_Query( $args );

			$out = '<p><i>Not Found</i></p>';
			?>

			<div id="<?php echo esc_html( $slideid ); ?>"
				data-slide-id="<?php echo esc_html( $slideid ); ?>"
				data-slide-nav="<?php echo esc_html( $slide_nav ); ?>"
				data-slide-arrows="<?php echo esc_html( $slide_arrows ); ?>"
				class="organic-block organic-block-content-slideshow obb-slideshow <?php echo esc_html( $classes ); ?>">

				<?php if ( $slideshow_query->have_posts() ) { ?>

					<?php /** BEGIN .flexslider */ ?>
					<div class="obb-flexslider loading"
						data-speed="<?php echo esc_attr( $slideshow_interval ); ?>"
						data-transition="<?php echo esc_attr( $slideshow_transition_style ); ?>"
						data-height="<?php echo esc_attr( $smooth_height ); ?>"
						data-per-slide="<?php echo absint( $posts_per_slide ); ?>">

						<div class="preloader"></div>

						<?php /** BEGIN .slides */ ?>
						<ul class="slides
						<?php
						if ( ! empty( $fixed_slide_height ) ) {
							echo esc_html( $height_class );
						}
						?>
						">

							<?php
							while ( $slideshow_query->have_posts() ) {

								$slideshow_query->the_post();
								$thumb = ( get_the_post_thumbnail() ) ? wp_get_attachment_image_src( get_post_thumbnail_id(), 'obb-featured-large' ) : false;
								?>

								<li <?php post_class( 'slide' ); ?> id="post-<?php the_ID(); ?>" style="<?php if ( has_post_thumbnail() ) { ?>
									background-image: url(<?php echo esc_url( $thumb[0] ); ?>);<?php } ?>">

									<?php /** BEGIN .obb-aligner */ ?>
									<div class="obb-aligner <?php echo esc_html( $slidelayoutclass ); ?>">

										<?php if ( $hide_post_title || $hide_post_content || $hide_post_button ) { ?>

											<?php /** BEGIN .obb-content */ ?>
											<div class="obb-content">

											<?php /** BEGIN .obb-card */ ?>
											<div class="obb-card clearfix">

												<?php if ( class_exists( 'Woocommerce' ) && 'product' === $post_type ) { ?>
													<?php /** BEGIN .obb-title-price */ ?>
													<div class="obb-title-price">
												<?php } ?>

												<?php if ( $hide_post_title ) { ?>
													<<?php echo esc_html( $postheading ); ?> class="obb-title">
														<a href="<?php echo esc_url( get_the_permalink() ); ?>" rel="bookmark" style="color: <?php echo esc_html( $slide_title_color ); ?>;"><?php the_title(); ?></a>
													</<?php echo esc_html( $postheading ); ?>>
												<?php } ?>

												<?php if ( class_exists( 'Woocommerce' ) && 'product' === $post_type ) { ?>
														<?php $price = get_post_meta( get_the_ID(), '_price', true ); ?>
														<span class="obb-price" style="color: <?php echo esc_html( $slide_content_color ); ?>;"><?php echo wp_kses_post( wc_price( $price ) ); ?></span>
													<?php /** END .obb-title-price */ ?>
													</div >
												<?php } ?>

												<?php if ( $hide_post_content ) { ?>
													<?php /** BEGIN .excerpt */ ?>
													<div class="obb-excerpt">
														<?php the_excerpt(); ?>
													<?php /** END .obb-excerpt */ ?>
													</div>
												<?php } ?>

												<?php if ( $hide_post_button ) { ?>
												<div class="wp-block-button obb-button">
													<a class="wp-block-button__link" href="<?php the_permalink(); ?>">
														<?php echo esc_html( $button_text ); ?>
													</a>
												</div>
												<?php } ?>

											<?php /** END .obb-card */ ?>
											</div>

											<?php /** END .obb-content */ ?>
										</div>

										<?php } ?>

										<?php if ( has_post_thumbnail() && ( 'obb-content-layout-bottom' === $slidelayout || 'obb-content-layout-top' === $slidelayout ) ) { ?>
										<a class="obb-slide-img" href="<?php the_permalink(); ?>" <?php echo 'style="background-image:url(' . esc_url( $thumb[0] ) . ')"'; ?>>
											<?php the_post_thumbnail( 'full' ); ?>
										</a>
										<?php } ?>

									<?php /** END .obb-aligner */ ?>
									</div>

									<?php if ( ! empty( $slide_overlay_color ) ) { ?>
										<span class="obb-bg-overlay"
										style="background-color: <?php echo esc_html( $slide_overlay_color ); ?>;
										opacity: <?php echo esc_html( $slide_opacity ); ?>;"></span>
									<?php } ?>

								</li>

							<?php } // End while. ?>

						<?php /** END .slides */ ?>
						</ul>

					<?php /** END .flexslider */ ?>
					</div>

				<?php } // End if. ?>
				<?php wp_reset_postdata(); ?>

			<?php /** END .obb */ ?>
			</div>

			<?php return ob_get_clean();
		} // End of render html function.

	} // End of class.

} // End of if conditional.

?>
