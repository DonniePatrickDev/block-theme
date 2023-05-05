<?php
/**
 * The footer for our theme.
 * Displays the footer and closing wrapper blocks for PHP templates.
 *
 * @package Organic Rialto
 * @since Organic Rialto 1.0
 */

?>

<?php
	session_start();
	$wrapper_close = do_blocks( '</div><!-- /wp:group --></main><!-- /wp:group -->' );
?>

<?php echo wp_kses_post( $wrapper_close ); ?>
<?php echo wp_kses_post( $_SESSION['footer'] ); ?>

<!-- END .wp-site-blocks -->
</div>

<?php wp_footer(); ?>

</body>
</html>
