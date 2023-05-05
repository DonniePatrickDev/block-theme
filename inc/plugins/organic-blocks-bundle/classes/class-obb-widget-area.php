<?php
/**
 * Organic Block Widget Area Class
 *
 * @package Organic Blocks Bundle
 * @since Organic Blocks Bundle 1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	die();
}

if ( ! class_exists( 'OBB_Widget_Area_Block' ) ) {

	class OBB_Widget_Area_Block {

		private static $instance;

		public static function get_instance() {

			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		// Attributes for block.
		public static function get_attributes() {

			$atts = array(
				'widgetAreaTitle' => array(
					'type'    => 'string',
					'default' => '',
				),
				'isSaved'         => array(
					'type'    => 'string',
					'default' => '',
				),
				'alignment'       => array(
					'type'    => 'string',
					'default' => 'none',
				),
			);

			return $atts;
		}

		/**
		 * Callback for block render.
		 *
		 * @param array $att Render widget area based on title.
		 */
		public static function render_block_html( $att ) {

			$randomid     = wp_rand();
			$widgetareaid = "obb-widget-area-$randomid";

			$alignment = ( isset( $att['align'] ) ) ? $att['align'] : '';
			$classes   = 'align' . $alignment . '';

			ob_start();

			$widget_area_title = $att['widgetAreaTitle'];

			?>

			<div id="<?php echo esc_html( $widgetareaid ); ?>" class="organic-block organic-block-widget-area <?php echo esc_html( $classes ); ?>">

				<?php dynamic_sidebar( sanitize_title( $widget_area_title ) ); ?>

			</div>

			<?php

			$output = ob_get_clean();

			return $output;
		}

		/**
		 * Load widgets area for all pages/posts.
		 */
		public static function register_widget_sidebar() {

			$saved_widgets = get_option( 'organic_blocks_widget_area-block' );

			if ( ! empty( $saved_widgets ) ) {
				foreach ( $saved_widgets as $post_id => $widgets ) {
					if ( false !== get_post_status( $post_id ) ) {
						foreach ( $widgets as $widget_name ) {
							if ( '' !== trim( $widget_name ) ) {
								$side_bar_id = register_sidebar(
									array(
										'name'          => __( $widget_name, 'obb' ),
										'id'            => sanitize_title( $widget_name ),
										'description'   => __( 'Add widgets here to appear in your sidebar on blog posts and archive pages.', 'obb' ),
										'before_widget' => '<div id="%1$s" class="organic-widget widget %2$s">',
										'after_widget'  => '</div>',
										'before_title'  => '<h2 class="widget-title">',
										'after_title'   => '</h2>',
									)
								);
							}
						}
					}
				}
			}

		}

		/**
		 * Save newly added widgets in options on post save.
		 *
		 * @param int    $post_id post id.
		 * @param object $post
		 * @param string $update
		 */
		public static function update_widgets_log( $post_id, $post, $update ) {
			// Check if user has permissions to save data.
			if ( ! current_user_can( 'edit_post', $post_id ) ) {
				return;
			}

			// Check if not an autosave.
			if ( wp_is_post_autosave( $post_id ) ) {
				return;
			}

			// Check if not a revision.
			if ( wp_is_post_revision( $post_id ) ) {
				return;
			}

			$saved_widgets = get_option( 'organic_blocks_widget_area-block' );

			$blocks = parse_blocks( $post->post_content );
			if ( isset( $saved_widgets[ $post_id ] ) ) {
				unset( $saved_widgets[ $post_id ] );
			}

			if ( ! empty( $blocks ) ) {
				foreach ( $blocks as $block ) {
					if ( isset( $block['blockName'] ) && 'obb/widget-area-block' === $block['blockName'] ) {
						if ( '' !== trim( $block['attrs']['widgetAreaTitle'] ) ) {
							$saved_widgets[ $post_id ][] = $block['attrs']['widgetAreaTitle'];
						}
					}
				}
			}

			$saved_widgets = self::find_saved_widgets_recursive( $saved_widgets, $post_id, $blocks );

			update_option( 'organic_blocks_widget_area-block', $saved_widgets, true );

		}

		/**
		 * Walk the post content blocks recursively and find widget area blocks.
		 *
		 * @param array $saved_widgets // Find saved widgets.
		 * @param int   $post_id // Get the post id.
		 * @param array $blocks // The blocks.
		 * @return array $saved_widgets
		 */
		protected static function find_saved_widgets_recursive( &$saved_widgets, $post_id, $blocks ) {

			if ( ! empty( $blocks ) ) {
				foreach ( $blocks as $block ) {
					if ( isset( $block['blockName'] ) && 'obb/widget-area-block' === $block['blockName'] ) {
						if ( '' !== trim( $block['attrs']['widgetAreaTitle'] ) ) {
							$saved_widgets[ $post_id ][] = $block['attrs']['widgetAreaTitle'];
						}
					} elseif ( isset( $block['innerBlocks'] ) && ! empty( $block['innerBlocks'] ) ) {
						self::find_saved_widgets_recursive( $saved_widgets, $post_id, $block['innerBlocks'] );
					}
				}
			}

			return $saved_widgets;
		}

		/**
		 * Update when a post deleted for widgets in options.
		 *
		 * @param int $post_id post id.
		 */
		public static function delete_widgets_log( $post_id ) {
			$saved_widgets = get_option( 'organic_blocks_widget_area-block' );

			if ( isset( $saved_widgets[ $post_id ] ) ) {
				unset( $saved_widgets[ $post_id ] );
			}

			update_option( 'organic_blocks_widget_area-block', $saved_widgets, true );
		}

	}
}
