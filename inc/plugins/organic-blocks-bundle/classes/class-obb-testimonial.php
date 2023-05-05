<?php
/**
 * Organic Block Testimonial Class
 *
 * @package Organic Blocks Bundle
 * @since Organic Blocks Bundle 1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	die();
}

if ( ! class_exists( 'OBB_Testimonial_Block' ) ) {

	/**
	 * Class for Testimonial block.
	 */
	class OBB_Testimonial_Block {

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
				'textalignment'     => array(
					'type'    => 'string',
					'default' => 'center',
				),
				'postbodysize'      => array(
					'type'    => 'string',
					'default' => '18px',
				),
				'postauthorsize'    => array(
					'type'    => 'string',
					'default' => '14px',
				),
				'iconsize'          => array(
					'type'    => 'string',
					'default' => '24px',
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
				'randomize'         => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'transspeed'        => array(
					'type'    => 'number',
					'default' => 10000,
				),
				'transstyle'        => array(
					'type'    => 'string',
					'default' => 'fade',
				),
				'poststyle'         => array(
					'type'    => 'string',
					'default' => 'style-minimal',
				),
				'postsperslide'     => array(
					'type'    => 'number',
					'default' => 1,
				),
				'testimonialicon'   => array(
					'type'    => 'string',
					'default' => 'icon-none',
				),
				'displaytitle'      => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayexcerpt'    => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displaylink'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displaybg'         => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displaycontentbg'  => array(
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
				'contentlayout'     => array(
					'type'    => 'string',
					'default' => 'content-position-bottom',
				),
				'testimonialsize'   => array(
					'type'    => 'number',
					'default' => 240,
				),
				'slidebgcolor'      => array(
					'type'    => 'string',
					'default' => 'transparent',
				),
				'slidebggradient'   => array(
					'type' => 'string',
				),
				'titlecolor'        => array(
					'type'    => 'string',
					'default' => '#000',
				),
				'contentcolor'      => array(
					'type'    => 'string',
					'default' => '#666',
				),
				'iconcolor'         => array(
					'type'    => 'string',
					'default' => '#ccc',
				),
				'contentbgcolor'    => array(
					'type'    => 'string',
					'default' => 'transparent',
				),
				'contentbggradient' => array(
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

			$randomid      = wp_rand();
			$testimonialid = "flexslider-$randomid";

			// Default attributes.
			$slideshow_interval         = ( isset( $att['transspeed'] ) ) ? $att['transspeed'] : 10000;
			$slideshow_transition_style = ( isset( $att['transstyle'] ) ) ? $att['transstyle'] : 'fade';
			$testimonial_style          = ( isset( $att['poststyle'] ) ) ? $att['poststyle'] : 'style-minimal';
			$posts_per_slide            = ( isset( $att['postsperslide'] ) ) ? $att['postsperslide'] : 1;
			$slide_arrows               = ( isset( $att['slidearrows'] ) ) ? $att['slidearrows'] : true;
			$slide_nav                  = ( isset( $att['slidenav'] ) ) ? $att['slidenav'] : true;

			$postauthorsize = ( isset( $att['postauthorsize'] ) ) ? $att['postauthorsize'] : '14px';
			$postbodysize   = ( isset( $att['postbodysize'] ) ) ? $att['postbodysize'] : '18px';
			$iconsize       = ( isset( $att['iconsize'] ) ) ? $att['iconsize'] : '24px';

			$alignment     = ( isset( $att['align'] ) ) ? $att['align'] : '';
			$textalignment = ( isset( $att['textalignment'] ) ) ? $att['textalignment'] : 'center';
			$layout        = ( isset( $att['contentlayout'] ) ) ? $att['contentlayout'] : 'content-position-bottom';
			$img_size      = ( isset( $att['testimonialsize'] ) ) ? $att['testimonialsize'] : 240;

			$testimonial_icon     = ( isset( $att['testimonialicon'] ) ) ? $att['testimonialicon'] : 'icon-none';
			$display_post_title   = ( isset( $att['displaytitle'] ) ) ? $att['displaytitle'] : true;
			$display_post_link    = ( isset( $att['displaylink'] ) ) ? $att['displaylink'] : true;
			$display_post_content = ( isset( $att['displayexcerpt'] ) ) ? $att['displayexcerpt'] : true;
			$display_content_bg   = ( isset( $att['displaycontentbg'] ) ) ? $att['displaycontentbg'] : true;
			$display_bg           = ( isset( $att['displaybg'] ) ) ? $att['displaybg'] : true;

			$slide_bg_color      = ( isset( $att['slidebgcolor'] ) ) ? $att['slidebgcolor'] : 'transparent';
			$slide_bg_gradient   = ( isset( $att['slidebggradient'] ) ) ? $att['slidebggradient'] : '';
			$title_color         = ( isset( $att['titlecolor'] ) ) ? $att['titlecolor'] : '#000';
			$content_color       = ( isset( $att['contentcolor'] ) ) ? $att['contentcolor'] : '#666';
			$icon_color          = ( isset( $att['iconcolor'] ) ) ? $att['iconcolor'] : '#ccc';
			$content_bg_color    = ( isset( $att['contentbgcolor'] ) ) ? $att['contentbgcolor'] : 'transparent';
			$content_bg_gradient = ( isset( $att['contentbggradient'] ) ) ? $att['contentbggradient'] : '';

			if ( isset( $att['transstyle'] ) && 'fade' === $slideshow_transition_style && 1 !== $posts_per_slide ) {
				$slideshow_transition_style = 'slide';
			} else {
				$slideshow_transition_style = $att['transstyle'];
			}

			// Add Classes based on settings.
			$classes      = 'align' . $alignment . ' ';
			$layout_class = 'obb-align-' . $layout;
			if ( isset( $att['postsperslide'] ) && 1 !== $posts_per_slide ) {
				$classes .= 'obb-multi-posts-slide ';
			}
			if ( false === $display_content_bg ) {
				$classes .= 'obb-hide-content-bg ';
			}
			if ( ! empty( $att['className'] ) ) {
				$classes .= sprintf( '%s ', $att['className'] );
			}
			$classes .= $testimonial_style;

			ob_start();

			?>

			<style type="text/css">
				<?php if ( '' !== $postauthorsize ) { ?>
				#<?php echo esc_html( $testimonialid ); ?> .obb-title {
					font-size: <?php echo esc_html( $postauthorsize ); ?>;
				}
				<?php } ?>
				<?php if ( '' !== $postbodysize ) { ?>
				#<?php echo esc_html( $testimonialid ); ?> .obb-excerpt {
					font-size: <?php echo esc_html( $postbodysize ); ?>;
				}
				<?php } ?>
				<?php if ( '' !== $icon_color || '' !== $iconsize ) { ?>
				#<?php echo esc_html( $testimonialid ); ?> .obb-testimonial-icon i {
					<?php if ( '' !== $icon_color ) { ?>
					color: <?php echo esc_html( $icon_color ); ?>;
					<?php } ?>
					<?php if ( '' !== $iconsize ) { ?>
					font-size: <?php echo esc_html( $iconsize ); ?>;
					<?php } ?>
				}
				<?php } ?>

				/* Layout Styles */
				#<?php echo esc_html( $testimonialid ); ?> .testimonial-slide {
					<?php if ( 'style-overlap style-modern' === $testimonial_style && 'content-position-top' === $layout || 'style-overlap style-rounded' === $testimonial_style && 'content-position-top' === $layout ) { ?>
						padding-bottom: calc(<?php echo absint( $img_size ); ?>px / 2);
					<?php } ?>
					<?php if ( 'style-overlap style-modern' === $testimonial_style && 'content-position-bottom' === $layout || 'style-overlap style-rounded' === $testimonial_style && 'content-position-bottom' === $layout ) { ?>
						padding-top: calc(<?php echo absint( $img_size ); ?>px / 2);
					<?php } ?>
				}
				#<?php echo esc_html( $testimonialid ); ?> .obb-featured-img {
					max-width: <?php echo esc_html( $img_size ); ?>px;
					<?php if ( has_post_thumbnail() ) { ?>
						background-image: url(<?php echo esc_url( $thumb[0] ); ?>);
					<?php } ?>
					<?php if ( 'style-overlap style-modern' === $testimonial_style && 'content-position-top' === $layout || 'style-overlap style-rounded' === $testimonial_style && 'content-position-top' === $layout ) { ?>
						margin-bottom: calc(-<?php echo absint( $img_size ); ?>px / 2);
					<?php } ?>
					<?php if ( 'style-overlap style-modern' === $testimonial_style && 'content-position-bottom' === $layout || 'style-overlap style-rounded' === $testimonial_style && 'content-position-bottom' === $layout ) { ?>
						margin-top: calc(-<?php echo absint( $img_size ); ?>px / 2);
					<?php } ?>
				}
				<?php if ( true === $display_content_bg ) { ?>
				#<?php echo esc_html( $testimonialid ); ?> .obb-aligner {
					background-color: <?php echo esc_html( $content_bg_color ); ?>;
					<?php if ( '' !== $content_bg_gradient ) { ?>
						background-image: <?php echo esc_html( $content_bg_gradient ); ?>;
					<?php } ?>
				}
				<?php } ?>
			</style>

			<?php
			// Testimonial Query Arguments.
			$post_type = ( isset( $att['posttype'] ) ) ? $att['posttype'] : 'post';
			$postorder = ( isset( $att['postorder'] ) ) ? $att['postorder'] : 'DESC';
			$randomize = ( isset( $att['randomize'] ) ) ? $att['randomize'] : false;
			$taxonomy  = ( isset( $att['posttaxonomy'] ) ) ? $att['posttaxonomy'] : 0;
			$category  = ( isset( $att['postcategory'] ) ) ? $att['postcategory'] : 0;

			$args = array(
				'posts_per_page' => -1,
				'post_type'      => $post_type,
				'order'          => $postorder,
			);

			// Add additional args based on post type & taxonomy selected.
			if ( 'jetpack-testimonial' === $post_type ) {
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
			if ( true === $randomize ) {
				$args['orderby'] = 'rand';
			}

			$testimonials_query = new WP_Query( $args );
			$out                = '<p><i>Not Found</i></p>';
			?>

			<div id="<?php echo esc_html( $testimonialid ); ?>"
				data-slide-id="<?php echo esc_html( $testimonialid ); ?>"
				data-slide-nav="<?php echo esc_html( $slide_nav ); ?>"
				data-slide-arrows="<?php echo esc_html( $slide_arrows ); ?>"
				<?php if ( true === $display_bg ) { ?>
				style="background-color: <?php echo esc_html( $slide_bg_color ); ?>;
				background-image: <?php echo esc_html( $slide_bg_gradient ); ?>;"
				<?php } ?>
				class="organic-block organic-block-testimonials obb-slideshow <?php echo esc_html( $classes ); ?>">

				<?php if ( $testimonials_query->have_posts() ) { ?>

					<?php /** BEGIN .flexslider */ ?>
					<div class="obb-flexslider loading"
						data-type="testimonials"
						data-speed="<?php echo esc_attr( $slideshow_interval ); ?>"
						data-transition="<?php echo esc_attr( $slideshow_transition_style ); ?>"
						data-height="
						<?php
						if ( isset( $att['transstyle'] ) && 'slide' === $slideshow_transition_style ) {
							echo 'true';
						} else {
							echo 'false';
						}
						?>
						"
						data-per-slide="<?php echo absint( $posts_per_slide ); ?>">

						<div class="preloader"></div>

						<?php /** BEGIN .slides */ ?>
						<ul class="slides">

							<?php
							while ( $testimonials_query->have_posts() ) {

								$testimonials_query->the_post();
								$thumb = ( get_the_post_thumbnail() ) ? wp_get_attachment_image_src( get_post_thumbnail_id(), 'obb-featured-large' ) : false;
								?>

								<li <?php post_class( 'slide testimonial-slide' ); ?> id="post-<?php the_ID(); ?>">

									<?php /** BEGIN .obb-aligner */ ?>
									<div class="obb-aligner <?php echo esc_html( $layout_class ); ?>">

										<?php if ( ! empty( $thumb ) ) { ?>

										<div class="obb-featured-img">
											<?php the_post_thumbnail( 'large' ); ?>
										</div>

										<?php } ?>

										<?php if ( $display_post_title || $display_post_content ) { ?>

											<?php /** BEGIN .obb-content */ ?>
											<div class="obb-content clearfix" style="text-align: <?php echo esc_html( $textalignment ); ?>;">

												<?php if ( 'icon-quote' === $testimonial_icon ) { ?>
													<span class="obb-testimonial-icon">
														<i class="fas fa-quote-left"></i>
													</span>
												<?php } ?>
												<?php if ( 'icon-stars' === $testimonial_icon ) { ?>
													<span class="obb-testimonial-icon obb-stars">
														<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
													</span>
												<?php } ?>

												<?php if ( $display_post_content ) { ?>
													<?php /** BEGIN .excerpt */ ?>
													<blockquote class="obb-excerpt" style="color: <?php echo esc_html( $content_color ); ?>;">
														<?php the_excerpt(); ?>
													<?php /** END .obb-excerpt */ ?>
													</blockquote>
												<?php } ?>

												<?php if ( true === $display_post_title ) { ?>
													<p class="obb-title" style="color: <?php echo esc_html( $title_color ); ?>;">
														<?php if ( $display_post_link ) { ?>
														<a href="<?php echo esc_url( get_the_permalink() ); ?>" style="color: <?php echo esc_html( $title_color ); ?>;" rel="bookmark">
														<?php } ?>
															<?php the_title(); ?>
														<?php if ( true === $display_post_link ) { ?>
														</a>
														<?php } ?>
													</p>
												<?php } ?>

											<?php /** END .obb-content */ ?>
											</div>

										<?php } ?>

									<?php /** END .obb-aligner */ ?>
									</div>

								</li>

							<?php } ?>

						<?php /** END .slides */ ?>
						</ul>

					<?php /** END .flexslider */ ?>
					</div>

				<?php } ?>
				<?php wp_reset_postdata(); ?>

			<?php /** END .obb */ ?>
			</div>

			<?php return ob_get_clean();
		} // End of render html function.

	} // End of class.

} // End of if conditional.

?>
