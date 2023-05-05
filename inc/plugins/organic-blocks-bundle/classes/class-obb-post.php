<?php
/**
 * Organic Block Post Class
 *
 * @package Organic Blocks Bundle
 * @since Organic Blocks Bundle 1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	die();
}

if ( ! class_exists( 'OBB_Post_Block' ) ) {

	/**
	 * Class for Post block.
	 */
	class OBB_Post_Block {

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
				'editMode'        => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'className'       => array(
					'type' => 'string',
				),
				'textalignment'   => array(
					'type'    => 'string',
					'default' => 'center',
				),
				'pageid'          => array(
					'type' => 'array',
				),
				'postcategory'    => array(
					'type' => 'array',
				),
				'posttype'        => array(
					'type' => 'string',
				),
				'posttaxonomy'    => array(
					'type' => 'string',
				),
				'poststyle'       => array(
					'type'    => 'string',
					'default' => 'minimal',
				),
				'postorientation' => array(
					'type'    => 'string',
					'default' => 'vertical',
				),
				'postorder'       => array(
					'type'    => 'string',
					'default' => 'DESC',
				),
				'postheading'     => array(
					'type'    => 'string',
					'default' => 'h4',
				),
				'postheadingsize' => array(
					'type'    => 'string',
					'default' => '24px',
				),
				'postbodysize'    => array(
					'type'    => 'string',
					'default' => '16px',
				),
				'postimage'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'postdate'        => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'postauthor'      => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'postcat'         => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'posttitle'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'postexcerpt'     => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'postlink'        => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'postbackground'  => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'postpagination'  => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'masonrylayout'   => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'filternav'       => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'postcolumns'     => array(
					'type'    => 'number',
					'default' => 3,
				),
				'maxposts'        => array(
					'type'    => 'string',
					'default' => '12',
				),
				'offset'          => array(
					'type'    => 'string',
					'default' => '',
				),
				'gutterwidth'     => array(
					'type'    => 'string',
					'default' => '24',
				),
				'posttitlecolor'  => array(
					'type'    => 'string',
					'default' => '',
				),
				'posttextcolor'   => array(
					'type'    => 'string',
					'default' => '',
				),
				'postlinkcolor'   => array(
					'type'    => 'string',
					'default' => '',
				),
				'btntextcolor'    => array(
					'type'    => 'string',
					'default' => '',
				),
				'postbgcolor'     => array(
					'type'    => 'string',
					'default' => 'transparent',
				),
				'postbggradient'  => array(
					'type' => 'string',
				),
				'buttoncolor'     => array(
					'type'    => 'string',
					'default' => '',
				),
				'buttongradient'  => array(
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
			$postid   = "obb-post-$randomid";

			$poststyle        = ( isset( $att['poststyle'] ) ) ? $att['poststyle'] : 'minimal';
			$postorientation  = ( isset( $att['postorientation'] ) ) ? $att['postorientation'] : 'vertical';
			$textalignment    = ( isset( $att['textalignment'] ) ) ? $att['textalignment'] : 'center';
			$postheading      = ( isset( $att['postheading'] ) ) ? $att['postheading'] : 'h4';
			$postheadingsize  = ( isset( $att['postheadingsize'] ) ) ? $att['postheadingsize'] : '24px';
			$postbodysize     = ( isset( $att['postbodysize'] ) ) ? $att['postbodysize'] : '16px';
			$postimage        = ( isset( $att['postimage'] ) ) ? $att['postimage'] : true;
			$postdate         = ( isset( $att['postdate'] ) ) ? $att['postdate'] : true;
			$postauthor       = ( isset( $att['postauthor'] ) ) ? $att['postauthor'] : true;
			$postcat          = ( isset( $att['postcat'] ) ) ? $att['postcat'] : true;
			$posttitle        = ( isset( $att['posttitle'] ) ) ? $att['posttitle'] : true;
			$postexcerpt      = ( isset( $att['postexcerpt'] ) ) ? $att['postexcerpt'] : true;
			$postlink         = ( isset( $att['postlink'] ) ) ? $att['postlink'] : true;
			$postbackground   = ( isset( $att['postbackground'] ) ) ? $att['postbackground'] : true;
			$postpagination   = ( isset( $att['postpagination'] ) ) ? $att['postpagination'] : true;
			$masonrylayout    = ( isset( $att['masonrylayout'] ) ) ? $att['masonrylayout'] : true;
			$filternav        = ( isset( $att['filternav'] ) ) ? $att['filternav'] : false;
			$postcolumns      = ( isset( $att['postcolumns'] ) ) ? $att['postcolumns'] : 3;
			$maxposts         = ( isset( $att['maxposts'] ) ) ? $att['maxposts'] : 12;
			$offset           = ( isset( $att['offset'] ) ) ? $att['offset'] : '';
			$gutterwidth      = ( isset( $att['gutterwidth'] ) ) ? $att['gutterwidth'] : 24;
			$post_title_color = ( isset( $att['posttitlecolor'] ) ) ? $att['posttitlecolor'] : '';
			$post_text_color  = ( isset( $att['posttextcolor'] ) ) ? $att['posttextcolor'] : '';
			$post_link_color  = ( isset( $att['postlinkcolor'] ) ) ? $att['postlinkcolor'] : '';
			$btn_text_color   = ( isset( $att['btntextcolor'] ) ) ? $att['btntextcolor'] : '';
			$post_bg_color    = ( isset( $att['postbgcolor'] ) ) ? $att['postbgcolor'] : 'transparent';
			$post_bg_gradient = ( isset( $att['postbggradient'] ) ) ? $att['postbggradient'] : '';
			$button_color     = ( isset( $att['buttoncolor'] ) ) ? $att['buttoncolor'] : '';
			$button_gradient  = ( isset( $att['buttongradient'] ) ) ? $att['buttongradient'] : '';

			$alignment     = ( isset( $att['align'] ) ) ? $att['align'] : '';
			$postalignment = ( isset( $att['postlayout'] ) ) ? $att['postlayout'] : 'content-position-center';

			// Add Classes based on settings.
			$classes          = 'align' . $alignment . ' ';
			$styleclass       = 'obb-style-' . $poststyle;
			$orientationclass = 'obb-orientation-' . $postorientation;
			$classes         .= $styleclass . ' ';
			$classes         .= $orientationclass . ' ';
			if ( ! empty( $att['className'] ) ) {
				$classes .= sprintf( ' %s', $att['className'] );
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
				<?php if ( '' !== $post_title_color ) { ?>
					#<?php echo esc_html( $postid ); ?> .obb-title a {
						color: <?php echo esc_html( $post_title_color ); ?>;
					}
				<?php } ?>
				<?php if ( '' !== $postheadingsize ) { ?>
				#<?php echo esc_html( $postid ); ?> .obb-title {
					font-size: <?php echo esc_html( $postheadingsize ); ?>;
				}
				<?php } ?>
				<?php if ( '' !== $postbodysize ) { ?>
				#<?php echo esc_html( $postid ); ?> .obb-excerpt {
					font-size: <?php echo esc_html( $postbodysize ); ?>;
				}
				<?php } ?>
				<?php if ( '' !== $post_text_color ) { ?>
				#<?php echo esc_html( $postid ); ?> .obb-excerpt p {
					color: <?php echo esc_html( $post_text_color ); ?>;
				}
				<?php } ?>
				<?php if ( '' !== $btn_text_color || '' !== $button_color || '' !== $button_gradient ) { ?>
				#<?php echo esc_html( $postid ); ?> .wp-block-button__link {
					<?php if ( '' !== $btn_text_color ) { ?>
						color: <?php echo esc_html( $btn_text_color ); ?>;
					<?php } ?>
					<?php if ( '' !== $button_color || '' !== $button_gradient ) { ?>
						background-color: <?php echo esc_html( $button_color ); ?>;
						background-image: <?php echo esc_html( $button_gradient ); ?>;
						border-color: <?php echo esc_html( $button_color ); ?>;
					<?php } ?>
				}
				<?php } ?>
				<?php if ( '' !== $post_link_color ) { ?>
				#<?php echo esc_html( $postid ); ?> .obb-excerpt a,
				#<?php echo esc_html( $postid ); ?> .obb-post-meta a,
				#<?php echo esc_html( $postid ); ?> .obb-author-info a,
				#<?php echo esc_html( $postid ); ?> .obb-post-edit a {
					color: <?php echo esc_html( $post_link_color ); ?>;
				}
				<?php } ?>
				<?php if ( 'right' === $textalignment ) { ?>
				#<?php echo esc_html( $postid ); ?> .obb-post-info {
					justify-content: flex-end;
				}
				<?php } ?>
				<?php if ( 'center' === $textalignment ) { ?>
				#<?php echo esc_html( $postid ); ?> .obb-post-info {
					justify-content: center;
				}
				<?php } ?>
				<?php if ( 'left' === $textalignment ) { ?>
				#<?php echo esc_html( $postid ); ?> .obb-post-info {
					justify-content: flex-start;
				}
				<?php } ?>

				#<?php echo esc_html( $postid ); ?> .obb-column {
					margin-bottom: <?php echo esc_html( $gutterwidth ); ?>px;
					<?php if ( true === $masonrylayout && 2 === $postcolumns ) { ?>
						width: calc(50% - ( <?php echo esc_html( $gutterwidth ); ?>px * 1 / 2 ));
					<?php } ?>
					<?php if ( true === $masonrylayout && 3 === $postcolumns ) { ?>
						width: calc(33.33% - ( <?php echo esc_html( $gutterwidth ); ?>px * 2 / 3 ));
					<?php } ?>
					<?php if ( true === $masonrylayout && 4 === $postcolumns ) { ?>
						width: calc(25% - ( <?php echo esc_html( $gutterwidth ); ?>px * 3 / 4 ));
					<?php } ?>
					<?php if ( true === $masonrylayout && 5 === $postcolumns ) { ?>
						width: calc(20% - ( <?php echo esc_html( $gutterwidth ); ?>px * 4 / 5 ));
					<?php } ?>
					<?php if ( true === $masonrylayout && 6 === $postcolumns ) { ?>
						width: calc(16.66% - ( <?php echo esc_html( $gutterwidth ); ?>px * 5 / 6 ));
					<?php } ?>
				}
			</style>

			<!-- BEGIN .obb-post -->
			<div id="<?php echo esc_html( $postid ); ?>" data-id="<?php echo esc_html( $postid ); ?>" class="organic-block obb-posts clearfix <?php echo esc_html( $classes ); ?>" <?php if ( 'full' === $alignment ) { ?>
				style="padding-left: <?php echo esc_html( $gutterwidth ); ?>px; padding-right: <?php echo esc_html( $gutterwidth ); ?>px;"<?php } ?>>

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

				$post_query = new WP_Query( $args );

				?>

				<?php if ( $post_query->have_posts() ) : ?>

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

					<?php if ( true === $masonrylayout ) { ?>
					<!-- BEGIN .obb-masonry-container -->
					<div class="obb-masonry-container<?php echo esc_html( $filternav_class ); ?>">
					<?php } else { ?>
					<!-- BEGIN .obb-post-container -->
					<div class="obb-post-container">
					<?php } ?>

					<?php if ( true === $masonrylayout ) { ?>
						<div class="obb-grid-spacer" style="width: <?php echo esc_html( $gutterwidth ); ?>px;"></div>
					<?php } ?>

					<?php
					while ( $post_query->have_posts() ) :
						$post_query->the_post();
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

						<?php if ( 2 >= $postcolumns ) { ?>
							<?php $thumb = ( '' !== get_the_post_thumbnail() ) ? wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' ) : false; ?>
						<?php } else { ?>
							<?php $thumb = ( '' !== get_the_post_thumbnail() ) ? wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' ) : false; ?>
						<?php } ?>

						<!-- BEGIN .obb-masonry-wrapper -->
						<div class="<?php echo esc_html( $masonry_class ); ?> obb-column obb-columns-<?php echo esc_html( $postcolumns ); ?> <?php echo esc_html( $filter_classes ); ?>">

							<article <?php post_class( 'obb-content' ); ?> style="text-align: <?php echo esc_html( $textalignment ); ?>; color: <?php echo esc_html( $post_text_color ); ?>;
							<?php if ( true === $postbackground ) { ?>
								background-color: <?php echo esc_html( $post_bg_color ); ?>;
								background-image: <?php echo esc_html( $post_bg_gradient ); ?>;
							<?php } ?>
							<?php if ( false === $masonrylayout ) { ?>
								margin-right: calc(<?php echo esc_html( $gutterwidth ); ?>px / 2); margin-left: calc(<?php echo esc_html( $gutterwidth ); ?>px / 2);
							<?php } ?>">

								<!-- BEGIN .obb-img-and-title -->
								<div class="obb-img-and-title">

									<?php if ( has_post_thumbnail() && true === $postimage ) { ?>
									<a class="obb-featured-img" href="<?php the_permalink(); ?>" style="background-image: url(<?php echo esc_url( $thumb[0] ); ?>);">
										<?php if ( class_exists( 'Woocommerce' ) && 'product' === $post_type ) { ?>
											<?php $price = get_post_meta( get_the_ID(), '_price', true ); ?>
											<span class="obb-price"><?php echo wp_kses_post( wc_price( $price ) ); ?></span>
										<?php } ?>
										<?php if ( 2 >= $postcolumns ) { ?>
											<span class="obb-hide-img"><?php the_post_thumbnail( 'full' ); ?></span>
										<?php } else { ?>
											<span class="obb-hide-img"><?php the_post_thumbnail( 'large' ); ?></span>
										<?php } ?>
									</a>
									<?php } ?>

									<?php if ( 'vertical' === $postorientation ) { ?>

									<!-- BEGIN .obb-title-and-meta -->
									<div class="obb-title-and-meta">

										<?php if ( class_exists( 'Woocommerce' ) && 'product' === $post_type && ! has_post_thumbnail() ) { ?>
											<?php $price = get_post_meta( get_the_ID(), '_price', true ); ?>
											<span class="obb-price"><?php echo wp_kses_post( wc_price( $price ) ); ?></span>
										<?php } ?>

										<?php if ( true === $postcat && 'category' === $taxonomy ) { ?>
											<!-- BEGIN .obb-post-meta -->
											<div class="obb-post-meta">
											<?php if ( true === $postcat && 'category' === $taxonomy ) { ?>
												<div class="obb-post-category">
													<?php the_category( ' ' ); ?>
												</div>
											<?php } ?>
											<!-- END .obb-post-meta -->
											</div>
										<?php } ?>

										<?php if ( true === $posttitle ) { ?>
											<<?php echo esc_html( $postheading ); ?> class="obb-title">
												<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
											</<?php echo esc_html( $postheading ); ?>>
										<?php } ?>

										<?php if ( true === $postdate && 'product' !== $post_type || true === $postauthor && 'product' !== $post_type ) { ?>
											<div class="obb-post-info">
												<?php if ( true === $postauthor ) { ?>
													<div class="obb-author-info">
														<div class="obb-author-avatar"><?php echo get_avatar( get_the_author_meta( 'user_email' ), 24 ); ?></div>
														<span class="obb-author-name"><?php the_author_posts_link(); ?></span>
													</div>
												<?php } ?>
												<?php if ( true === $postdate ) { ?>
													<div class="obb-date-info">
														<span class="posted-on"><em><?php esc_html_e( 'posted on', 'obb' ); ?></em></span>
														<time class="obb-post-date" datetime="<?php echo get_the_date( 'Y-m-d' ); ?>">
															<?php echo get_the_date( get_option( 'date_format' ) ); ?>
														</time>
													</div>
												<?php } ?>
											</div>
										<?php } ?>

									<!-- END .obb-title-and-meta -->
									</div>

									<?php } ?>

								<!-- END .obb-img-and-title -->
								</div>

								<!-- BEGIN .obb-excerpt-and-more -->
								<div class="obb-excerpt-and-more">

									<?php if ( 'horizontal' === $postorientation ) { ?>

									<!-- BEGIN .obb-title-and-meta -->
									<div class="obb-title-and-meta">

										<?php if ( class_exists( 'Woocommerce' ) && 'product' === $post_type && ! has_post_thumbnail() ) { ?>
											<?php $price = get_post_meta( get_the_ID(), '_price', true ); ?>
											<span class="obb-price"><?php echo wp_kses_post( wc_price( $price ) ); ?></span>
										<?php } ?>

										<?php if ( true === $postcat && 'category' === $taxonomy ) { ?>
											<!-- BEGIN .obb-post-meta -->
											<div class="obb-post-meta">
											<?php if ( true === $postcat && 'category' === $taxonomy ) { ?>
												<div class="obb-post-category">
													<?php the_category( ' ' ); ?>
												</div>
											<?php } ?>
											<!-- END .obb-post-meta -->
											</div>
										<?php } ?>

										<?php if ( true === $posttitle ) { ?>
											<<?php echo esc_html( $postheading ); ?> class="obb-title">
												<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
											</<?php echo esc_html( $postheading ); ?>>
										<?php } ?>

										<?php if ( true === $postdate && 'product' !== $post_type || true === $postauthor && 'product' !== $post_type ) { ?>
											<div class="obb-post-info">
												<?php if ( true === $postauthor ) { ?>
													<div class="obb-author-info">
														<div class="obb-author-avatar"><?php echo get_avatar( get_the_author_meta( 'user_email' ), 24 ); ?></div>
														<span class="obb-author-name"><?php the_author_posts_link(); ?></span>
													</div>
												<?php } ?>
												<?php if ( true === $postdate ) { ?>
													<div class="obb-date-info">
														<span class="posted-on"><em><?php esc_html_e( 'posted on', 'obb' ); ?></em></span>
														<time class="obb-post-date" datetime="<?php echo get_the_date( 'Y-m-d' ); ?>">
															<?php echo get_the_date( get_option( 'date_format' ) ); ?>
														</time>
													</div>
												<?php } ?>
											</div>
										<?php } ?>

									<!-- END .obb-title-and-meta -->
									</div>

									<?php } ?>

									<?php if ( true === $postexcerpt ) { ?>
										<!-- BEGIN .obb-excerpt -->
										<div class="obb-excerpt">
											<?php the_excerpt(); ?>
										<!-- END .obb-post-excerpt -->
										</div>
									<?php } ?>

									<?php if ( true === $postlink ) { ?>
										<div class="wp-block-button obb-button">
											<a class="wp-block-button__link" href="<?php the_permalink(); ?>">
												<?php esc_html_e( 'Read More', 'obb' ); ?>
											</a>
										</div>
									<?php } ?>

									<?php edit_post_link( esc_html__( '(Edit Post)', 'obb' ), '<p class="obb-post-edit">', '</p>' ); ?>

								<!-- END .obb-excerpt-and-more -->
								</div>

							</article>

						<!-- END .obb-masonry-wrapper -->
						</div>

					<?php endwhile; ?>

				<!-- END .obb-masonry-container -->
				</div>

					<?php if ( true === $postpagination ) { ?>

						<?php if ( $post_query->max_num_pages > 1 ) { ?>

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
													'total' => $post_query->max_num_pages,
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

			<!-- END .obb-post -->
			</div>

			<?php
				return ob_get_clean();

		} // End of render html function.

	} // End of class.

} // End of if conditional.

?>
