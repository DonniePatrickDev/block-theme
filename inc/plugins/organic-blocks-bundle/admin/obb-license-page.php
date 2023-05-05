<?php
/**
 * The Settings Page Content
 *
 * @package Organic Blocks Bundle
 * @since Organic Blocks Bundle 1.0
 */

?>

<?php $license = get_option( 'obb_license_key' ); ?>
<?php $license_status = get_option( 'obb_license_status' ); ?>

<div class="wrap">
	<h2><?php esc_html_e( 'Plugin License Options', 'obb' ); ?></h2>
	<form method="post" action="options.php">

		<?php settings_fields( 'obb_license' ); ?>

		<table class="form-table">
			<tbody>
				<tr valign="top">
					<th scope="row" valign="top">
						<?php esc_html_e( 'License Key', 'obb' ); ?>
					</th>
					<td>
						<input id="obb_license_key" name="obb_license_key" type="text" class="regular-text" value="<?php esc_attr_e( $license ); ?>" />
						<label class="description" for="obb_license_key"><?php esc_html_e( 'Enter your license key', 'obb' ); ?></label>
					</td>
				</tr>
				<?php if ( $license ) { ?>
					<tr valign="middle">
						<th scope="row" valign="top">
							<?php esc_html_e( 'Activate License', 'obb' ); ?>
						</th>
						<td>
							<?php if ( false !== $license_status && 'valid' === $license_status ) { ?>
								<?php wp_nonce_field( 'obb_nonce', 'obb_nonce' ); ?>
								<input type="submit" class="button-secondary" name="obb_license_deactivate" value="<?php esc_html_e( 'Deactivate License', 'obb' ); ?>"/>
								<span style="display:inline-block;color:green;margin:4px 0px 0px 6px;"><?php esc_html_e( 'Active', 'obb' ); ?></span>
								<?php
							} else {
								wp_nonce_field( 'obb_nonce', 'obb_nonce' );
								?>
								<input type="submit" class="button-secondary" name="obb_license_activate" value="<?php esc_html_e( 'Activate License', 'obb' ); ?>"/>
							<?php } ?>
						</td>
					</tr>
				<?php } ?>
			</tbody>
		</table>
		<?php submit_button(); ?>

	</form>
</div>
