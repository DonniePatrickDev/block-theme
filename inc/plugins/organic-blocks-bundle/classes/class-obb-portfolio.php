<?php
/**
 * Organic Block Portfolio Class
 *
 * @package Organic Blocks Bundle
 * @since Organic Blocks Bundle 1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	die();
}

if ( ! class_exists( 'OBB_Portfolio_Block' ) ) {

	/**
	 * Class for Portfolio block.
	 */
	class OBB_Portfolio_Block {

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
				'editMode'         => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'position'         => array(
					'type'    => 'string',
					'default' => 'center center',
				),
				'textalignment'    => array(
					'type'    => 'string',
					'default' => 'center',
				),
				'postcategory'     => array(
					'type' => 'array',
				),
				'posttype'         => array(
					'type' => 'string',
				),
				'posttaxonomy'     => array(
					'type' => 'string',
				),
				'portstyle'        => array(
					'type'    => 'string',
					'default' => 'minimal',
				),
				'portlayout'       => array(
					'type'    => 'string',
					'default' => 'position-overlay',
				),
				'postorder'        => array(
					'type'    => 'string',
					'default' => 'DESC',
				),
				'randomize'        => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'portheading'      => array(
					'type'    => 'string',
					'default' => 'h4',
				),
				'portheadingsize'  => array(
					'type'    => 'string',
					'default' => '24px',
				),
				'portbodysize'     => array(
					'type'    => 'string',
					'default' => '16px',
				),
				'porttitle'        => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'portexcerpt'      => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'portbutton'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'portlink'         => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'portcontent'      => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'portpagination'   => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'masonrylayout'    => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'filternav'        => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'portcolumns'      => array(
					'type'    => 'number',
					'default' => 2,
				),
				'maxposts'         => array(
					'type'    => 'string',
					'default' => '12',
				),
				'offset'           => array(
					'type'    => 'string',
					'default' => '',
				),
				'gutterwidth'      => array(
					'type'    => 'string',
					'default' => '24',
				),
				'porttitlecolor'   => array(
					'type'    => 'string',
					'default' => '#fff',
				),
				'porttextcolor'    => array(
					'type'    => 'string',
					'default' => '#fff',
				),
				'porticoncolor'    => array(
					'type'    => 'string',
					'default' => '#fff',
				),
				'buttoncolor'      => array(
					'type'    => 'string',
					'default' => '#fff',
				),
				'buttonbg'         => array(
					'type'    => 'string',
					'default' => '',
				),
				'buttongradient'   => array(
					'type'    => 'string',
				),
				'porthovercolor'   => array(
					'type'    => 'string',
					'default' => '#000',
				),
				'porthoveropacity' => array(
					'type'    => 'number',
					'default' => 0.5,
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

			$randomid    = wp_rand();
			$portfolioid = "obb-portfolio-$randomid";

			$portstyle          = ( isset( $att['portstyle'] ) ) ? $att['portstyle'] : 'minimal';
			$position           = ( isset( $att['position'] ) ) ? $att['position'] : 'center center';
			$portlayout         = ( isset( $att['portlayout'] ) ) ? $att['portlayout'] : 'position-overlay';
			$textalignment      = ( isset( $att['textalignment'] ) ) ? $att['textalignment'] : 'center';
			$portheading        = ( isset( $att['portheading'] ) ) ? $att['portheading'] : 'h4';
			$portheadingsize    = ( isset( $att['portheadingsize'] ) ) ? $att['portheadingsize'] : '24px';
			$portbodysize       = ( isset( $att['portbodysize'] ) ) ? $att['portbodysize'] : '16px';
			$porttitle          = ( isset( $att['porttitle'] ) ) ? $att['porttitle'] : true;
			$portexcerpt        = ( isset( $att['portexcerpt'] ) ) ? $att['portexcerpt'] : true;
			$portbutton         = ( isset( $att['portbutton'] ) ) ? $att['portbutton'] : true;
			$portlink           = ( isset( $att['portlink'] ) ) ? $att['portlink'] : true;
			$portcontent        = ( isset( $att['portcontent'] ) ) ? $att['portcontent'] : true;
			$portpagination     = ( isset( $att['portpagination'] ) ) ? $att['portpagination'] : true;
			$masonrylayout      = ( isset( $att['masonrylayout'] ) ) ? $att['masonrylayout'] : true;
			$filternav          = ( isset( $att['filternav'] ) ) ? $att['filternav'] : false;
			$portcolumns        = ( isset( $att['portcolumns'] ) ) ? $att['portcolumns'] : 2;
			$maxposts           = ( isset( $att['maxposts'] ) ) ? $att['maxposts'] : 12;
			$offset             = ( isset( $att['offset'] ) ) ? $att['offset'] : '';
			$gutterwidth        = ( isset( $att['gutterwidth'] ) ) ? $att['gutterwidth'] : 24;
			$port_title_color   = ( isset( $att['porttitlecolor'] ) ) ? $att['porttitlecolor'] : '#fff';
			$port_text_color    = ( isset( $att['porttextcolor'] ) ) ? $att['porttextcolor'] : '#fff';
			$port_icon_color    = ( isset( $att['porticoncolor'] ) ) ? $att['porticoncolor'] : '#fff';
			$button_color       = ( isset( $att['buttoncolor'] ) ) ? $att['buttoncolor'] : '#fff';
			$button_bg          = ( isset( $att['buttonbg'] ) ) ? $att['buttonbg'] : '';
			$button_gradient    = ( isset( $att['buttongradient'] ) ) ? $att['buttongradient'] : '';
			$port_hover_color   = ( isset( $att['porthovercolor'] ) ) ? $att['porthovercolor'] : '#000';
			$port_hover_opactiy = ( isset( $att['porthoveropacity'] ) ) ? $att['porthoveropacity'] : 0.5;

			$alignment = ( isset( $att['align'] ) ) ? $att['align'] : '';

			// Add Classes based on settings.
			if ( isset( $att['align'] ) ) {
				$classes = 'align' . $alignment . ' ';
			}
			$positionclass = 'obb-position-' . str_replace( ' ', '-', $position );
			$layoutclass   = 'obb-content-' . $portlayout;
			$styleclass    = 'obb-style-' . $portstyle;
			$classes      .= $positionclass . ' ';
			$classes      .= $layoutclass . ' ';
			$classes      .= $styleclass . ' ';
			if ( ! empty( $att['className'] ) ) {
				$classes .= sprintf( ' %s', $att['className'] );
			}
			if ( true !== $masonrylayout ) {
				$classes .= 'obb-masonry-off';
			}

			// Declare filter class variables.
			$filter_classes  = '';
			$filternav_class = '';

			if ( true === $masonrylayout ) {
				$masonry_class = 'obb-masonry-wrapper';
			} else {
				$masonry_class = '';
			}

			ob_start();

			?>

			<style type="text/css">
				<?php if ( '' !== $portheadingsize ) { ?>
				#<?php echo esc_html( $portfolioid ); ?> .obb-title {
					font-size: <?php echo esc_html( $portheadingsize ); ?>;
				}
				<?php } ?>
				<?php if ( '' !== $portbodysize ) { ?>
				#<?php echo esc_html( $portfolioid ); ?> .obb-excerpt {
					font-size: <?php echo esc_html( $portbodysize ); ?>;
				}
				<?php } ?>
				<?php if ( '' !== $button_color || '' !== $button_bg || '' !== $button_gradient ) { ?>
				#<?php echo esc_html( $portfolioid ); ?> .wp-block-button__link {
					<?php if ( '' !== $button_color ) { ?>
						color: <?php echo esc_html( $button_color ); ?>;
					<?php } ?>
					<?php if ( '' !== $button_bg || '' !== $button_gradient ) { ?>
						background-color: <?php echo esc_html( $button_bg ); ?>;
						background-image: <?php echo esc_html( $button_gradient ); ?>;
						border-color: <?php echo esc_html( $button_bg ); ?>;
					<?php } ?>
				}
				<?php } ?>
				<?php if ( false === $portcontent ) { ?>
				#<?php echo esc_html( $portfolioid ); ?> .obb-content {
					opacity: 1;
				}
				<?php } ?>

				<?php if ( false === $masonrylayout ) { ?>
				#<?php echo esc_html( $portfolioid ); ?> .obb-portfolio-item {
					margin-right: calc(<?php echo esc_html( $gutterwidth ); ?>px / 2);
					margin-left: calc(<?php echo esc_html( $gutterwidth ); ?>px / 2);
				}
				<?php } ?>

				#<?php echo esc_html( $portfolioid ); ?> .obb-column {
					margin-bottom: <?php echo esc_html( $gutterwidth ); ?>px;
					<?php if ( true === $masonrylayout && 2 === $portcolumns ) { ?>
						width: calc(50% - ( <?php echo esc_html( $gutterwidth ); ?>px * 1 / 2 ));
					<?php } ?>
					<?php if ( true === $masonrylayout && 3 === $portcolumns ) { ?>
						width: calc(33.33% - ( <?php echo esc_html( $gutterwidth ); ?>px * 2 / 3 ));
					<?php } ?>
					<?php if ( true === $masonrylayout && 4 === $portcolumns ) { ?>
						width: calc(25% - ( <?php echo esc_html( $gutterwidth ); ?>px * 3 / 4 ));
					<?php } ?>
					<?php if ( true === $masonrylayout && 5 === $portcolumns ) { ?>
						width: calc(20% - ( <?php echo esc_html( $gutterwidth ); ?>px * 4 / 5 ));
					<?php } ?>
					<?php if ( true === $masonrylayout && 6 === $portcolumns ) { ?>
						width: calc(16.66% - ( <?php echo esc_html( $gutterwidth ); ?>px * 5 / 6 ));
					<?php } ?>
				}
			</style>

			<?php

			$paged = 1;

			if ( get_query_var( 'paged' ) ) {
				$paged = get_query_var( 'paged' );
			} elseif ( get_query_var( 'page' ) ) {
				$paged = get_query_var( 'page' );
			}

			// Portfolio Query Arguments.
			$post_type = ( isset( $att['posttype'] ) ) ? $att['posttype'] : 'post';
			$postorder = ( isset( $att['postorder'] ) ) ? $att['postorder'] : 'DESC';
			$randomize = ( isset( $att['randomize'] ) ) ? $att['randomize'] : false;
			$taxonomy  = ( isset( $att['posttaxonomy'] ) ) ? $att['posttaxonomy'] : 0;
			$category  = ( isset( $att['postcategory'] ) ) ? $att['postcategory'] : 0;

			$args = array(
				'paged'            => $paged,
				'posts_per_page'   => $maxposts,
				'offset'           => $offset,
				'post_type'        => $post_type,
				'order'            => $postorder,
				'suppress_filters' => 0,
			);

			// Add additional args based on post type & taxonomy selected.
			if ( 'product' === $post_type && $category ) {
				$args['product_cat'] = implode( ',', $category );
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

			$portfolio_query = new WP_Query( $args );

			?>

			<?php if ( $portfolio_query->have_posts() ) : ?>

					<!--  BEGIN .organic-block  -->
					<div id="<?php echo esc_html( $portfolioid ); ?>" data-id="<?php echo esc_html( $portfolioid ); ?>" class="organic-block obb-portfolio clearfix <?php echo esc_html( $classes ); ?>" <?php if ( 'full' === $alignment ) { ?>
						style="padding-left: <?php echo esc_html( $gutterwidth ); ?>px; padding-right: <?php echo esc_html( $gutterwidth ); ?>px;"<?php } ?>>

						<?php if ( true === $masonrylayout && true === $filternav && '' !== $taxonomy ) { ?>
						<div class="obb-filter-nav">
							<div class="obb-filter-buttons wp-block-button">
							<?php
							$terms = get_terms(
								array(
									'taxonomy'   => $taxonomy,
									'hide_empty' => true,
								)
							);
							$count = count( $terms ); // This counts the number of categories.
							echo '<button class="obb-button wp-block-button__link secondary" data-filter="*">Show All</button>';
							if ( $count > 0 ) {
								foreach ( $terms as $term ) {
									$termname = strtolower( $term->name );
									$termname = str_replace( ' ', '-', $termname );
									echo '<button class="obb-button wp-block-button__link secondary" data-filter=".' . esc_attr( $termname ) . '">' . esc_html( $term->name ) . '</button>';
								}
							} // In the above foreach loop, the code will return all the values stored in $terms array.
							?>
							</div>
							<div class="obb-filter-search">
								<input type="text" class="quicksearch" placeholder="Search" />
							</div>
						</div>
						<?php } ?>

						<?php
						if ( true === $masonrylayout && true === $filternav && '' !== $taxonomy ) {
							$filternav_class = ' obb-isotope';
						}
						?>

						<!-- /** BEGIN .obb-masonry-container */ -->
						<div class="obb-masonry-container<?php echo esc_html( $filternav_class ); ?>">

							<div class="obb-grid-spacer" style="width: <?php echo esc_html( $gutterwidth ); ?>px;"></div>

							<?php
							while ( $portfolio_query->have_posts() ) :
								$portfolio_query->the_post();
								?>

								<?php $terms = get_the_terms( get_the_ID(), $taxonomy ); ?>

								<?php
								if ( true === $masonrylayout && true === $filternav && '' !== $taxonomy ) {
									$slugs = array();
									foreach ( $terms as $term ) {
										$slugs[] = $term->slug;
									}
									$filter_classes = join( ' ', $slugs );
								}
								?>

								<?php $thumb = ( get_the_post_thumbnail() ) ? wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' ) : false; ?>
								<?php if ( has_post_thumbnail() ) { ?>

									<?php /** BEGIN .obb-masonry-wrapper */ ?>
									<div class="<?php echo esc_html( $masonry_class ); ?> obb-content obb-column obb-columns-<?php echo esc_html( $portcolumns ); ?> <?php echo esc_html( $filter_classes ); ?>">

										<?php /** BEGIN .obb-portfolio-item */ ?>
										<div class="obb-portfolio-item">

											<?php if ( $portbutton ) { ?>
												<a class="obb-pin-link" href="https://www.pinterest.com/pin/create/button/" data-pin-do="buttonPin" data-pin-custom="true" data-pin-media="<?php echo esc_url( $thumb[0] ); ?>" data-pin-url="<?php echo esc_url( get_the_permalink() ); ?>">
													<svg class="obb-pin-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path style="fill:<?php echo esc_html( $port_icon_color ); ?>" d="M6.166 16.943l1.4 1.4-4.622 4.657h-2.944l6.166-6.057zm11.768-6.012c2.322-2.322 4.482-.457 6.066-1.931l-8-8c-1.474 1.584.142 3.494-2.18 5.817-3.016 3.016-4.861-.625-10.228 4.742l9.6 9.6c5.367-5.367 1.725-7.211 4.742-10.228z"/></svg>
												</a>
											<?php } ?>

											<a class="obb-portfolio-link" rel="noreferrer" href="<?php echo ( esc_attr( $portlink ) ? esc_attr( get_the_permalink() ) : '#' ); ?>">

												<?php if ( $porttitle || $portexcerpt ) { ?>

													<?php /** BEGIN .obb-content */ ?>
													<div class="obb-content">

														<div class="obb-text" style="text-align: <?php echo esc_html( $textalignment ); ?>;">

															<?php if ( $porttitle ) { ?>
															<<?php echo esc_html( $portheading ); ?> class="obb-title" style="color:<?php echo esc_html( $port_title_color ); ?>"><?php the_title(); ?></<?php echo esc_html( $portheading ); ?>>
															<?php } ?>

															<?php if ( $portexcerpt ) { ?>
															<div class="obb-excerpt" style="color:<?php echo esc_html( $port_text_color ); ?>">
																<?php the_excerpt(); ?>
															</div>
															<?php } ?>

														</div>

														<?php if ( ! empty( $port_hover_color ) ) { ?>
															<span class="obb-bg-overlay"
															style="background-color: <?php echo esc_html( $port_hover_color ); ?>;
															opacity: <?php echo esc_html( $port_hover_opactiy ); ?>;"></span>
														<?php } ?>

													<?php /** END .obb-content */ ?>
													</div>

												<?php } ?>

												<div class="obb-featured-img"><?php the_post_thumbnail( 'large' ); ?></div>

											</a>

										<?php /** END .obb-portfolio-item */ ?>
										</div>

									<?php /** END .obb-masonry-wrapper */ ?>
									</div>

							<?php } ?>

							<?php endwhile; ?>

						<?php /** END .obb-masonry-container */ ?>
						</div>

						<?php if ( true === $portpagination ) { ?>

							<?php if ( $portfolio_query->max_num_pages > 1 ) { ?>

								<div class="obb-pagination">

									<nav class="pagination navigation">

										<?php
											$big = 999999999;
											echo wp_kses_post(
												paginate_links(
													array(
														'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
														'format' => '?paged=%#%',
														'current' => max( 1, get_query_var( 'paged' ) ),
														'total' => $portfolio_query->max_num_pages,
														'prev_text' => '<span class="meta-nav screen-reader-text">' . esc_html__( 'Previous Page', 'obb' ) . '</span>&laquo;',
														'next_text' => '<span class="meta-nav screen-reader-text">' . esc_html__( 'Next Page', 'obb' ) . '</span>&raquo;',
													)
												)
											);
										?>

									</nav>

								</div>

							<?php } ?>

						<?php } ?>

					<?php endif; ?>
					<?php wp_reset_postdata(); ?>

				<?php /** END .organic-block */ ?>
				</div>

			<?php
				return ob_get_clean();

		} //End of render html function

	} //End of class

} // End of if conditional

?>
