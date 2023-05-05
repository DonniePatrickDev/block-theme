<?php
/**
 * EDD Updater Admin Functions
 *
 * @package Organic Blocks Bundle
 * @since Organic Blocks Bundle 1.0
 */

/**
 * Activates the license key.
 *
 * @return void
 */
function obb_activate_license() {

	// listen for our activate button to be clicked.
	if ( ! isset( $_POST['obb_license_activate'] ) ) {
		return;
	}

	// run a quick security check.
	if ( ! check_admin_referer( 'obb_nonce', 'obb_nonce' ) ) {
		return; // get out if we didn't click the Activate button.
	}

	// retrieve the license from the database.
	$license = trim( get_option( 'obb_license_key' ) );
	if ( ! $license ) {
		$license = ! empty( $_POST['obb_license_key'] ) ? sanitize_text_field( $_POST['obb_license_key'] ) : '';
	}
	if ( ! $license ) {
		return;
	}

	// data to send in our API request.
	$api_params = array(
		'edd_action'  => 'activate_license',
		'license'     => $license,
		'item_id'     => OBB_PRODUCT_ID,
		'item_name'   => rawurlencode( 'Blocks Bundle' ), // the name of our product in EDD.
		'url'         => home_url(),
		'environment' => function_exists( 'wp_get_environment_type' ) ? wp_get_environment_type() : 'production',
	);

	// Call the custom API.
	$response = wp_remote_post(
		OBB_OT_STORE_URL,
		array(
			'timeout'   => 15,
			'sslverify' => false,
			'body'      => $api_params,
		)
	);

	// make sure the response came back okay.
	if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {

		if ( is_wp_error( $response ) ) {
			$message = $response->get_error_message();
		} else {
			$message = __( 'An error occurred, please try again.' );
		}
	} else {

		$license_data = json_decode( wp_remote_retrieve_body( $response ) );

		if ( false === $license_data->success ) {

			switch ( $license_data->error ) {

				case 'expired':
					$message = sprintf(
						/* translators: the license key expiration date */
						__( 'Your license key expired on %s.', 'obb' ),
						date_i18n( get_option( 'date_format' ), strtotime( $license_data->expires, current_time( 'timestamp' ) ) )
					);
					break;

				case 'disabled':
				case 'revoked':
					$message = __( 'Your license key has been disabled.', 'obb' );
					break;

				case 'missing':
					$message = __( 'Invalid license.', 'obb' );
					break;

				case 'invalid':
				case 'site_inactive':
					$message = __( 'Your license is not active for this URL.', 'obb' );
					break;

				case 'item_name_mismatch':
					/* translators: the plugin name */
					$message = sprintf( __( 'This appears to be an invalid license key for %s.', 'obb' ), 'Blocks Bundle' );
					break;

				case 'no_activations_left':
					$message = __( 'Your license key has reached its activation limit.', 'obb' );
					break;

				default:
					$message = __( 'An error occurred, please try again.', 'obb' );
					break;
			}
		}
	}

	// Check if anything passed on a message constituting a failure.
	if ( ! empty( $message ) ) {
		$redirect = add_query_arg(
			array(
				'page'          => OBB_LICENSE_PAGE,
				'sl_activation' => 'false',
				'message'       => rawurlencode( $message ),
			),
			admin_url( 'plugins.php' )
		);

		wp_safe_redirect( $redirect );
		exit();
	}

	// $license_data->license will be either "valid" or "invalid"
	if ( 'valid' === $license_data->license ) {
		update_option( 'obb_license_key', $license );
	}
	update_option( 'obb_license_status', $license_data->license );
	wp_safe_redirect( admin_url( 'plugins.php?page=' . OBB_LICENSE_PAGE ) );
	exit();
}
add_action( 'admin_init', 'obb_activate_license' );

/**
 * Deactivates the license key.
 * This will decrease the site count.
 *
 * @return void
 */
function obb_deactivate_license() {

	// listen for our activate button to be clicked.
	if ( isset( $_POST['edd_license_deactivate'] ) ) {

		// run a quick security check.
		if ( ! check_admin_referer( 'obb_nonce', 'obb_nonce' ) ) {
			return; // get out if we didn't click the Activate button.
		}

		// retrieve the license from the database.
		$license = trim( get_option( 'obb_license_key' ) );

		// data to send in our API request.
		$api_params = array(
			'edd_action'  => 'deactivate_license',
			'license'     => $license,
			'item_id'     => OBB_PRODUCT_ID,
			'item_name'   => rawurlencode( 'Blocks Bundle' ), // the name of our product in EDD.
			'url'         => home_url(),
			'environment' => function_exists( 'wp_get_environment_type' ) ? wp_get_environment_type() : 'production',
		);

		// Call the custom API.
		$response = wp_remote_post(
			OBB_OT_STORE_URL,
			array(
				'timeout'   => 15,
				'sslverify' => false,
				'body'      => $api_params,
			)
		);

		// make sure the response came back okay.
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {

			if ( is_wp_error( $response ) ) {
				$message = $response->get_error_message();
			} else {
				$message = __( 'An error occurred, please try again.' );
			}

			$redirect = add_query_arg(
				array(
					'page'          => OBB_LICENSE_PAGE,
					'sl_activation' => 'false',
					'message'       => rawurlencode( $message ),
				),
				admin_url( 'plugins.php' )
			);

			wp_safe_redirect( $redirect );
			exit();
		}

		// decode the license data.
		$license_data = json_decode( wp_remote_retrieve_body( $response ) );

		// $license_data->license will be either "deactivated" or "failed".
		if ( 'deactivated' === $license_data->license ) {
			delete_option( 'obb_license_status' );
		}

		wp_safe_redirect( admin_url( 'plugins.php?page=' . OBB_LICENSE_PAGE ) );
		exit();

	}
}
add_action( 'admin_init', 'obb_deactivate_license' );

/**
 * This is a means of catching errors from the activation method above and displaying it to the customer
 */
function obb_admin_notices() {
	if ( isset( $_GET['sl_activation'] ) && ! empty( $_GET['message'] ) ) {

		switch ( $_GET['sl_activation'] ) {

			case 'false':
				$message = urldecode( sanitize_text_field( $_GET['message'] ) );
				?>
				<div class="error">
					<p><?php echo wp_kses_post( $message ); ?></p>
				</div>
				<?php
				break;

			case 'true':
			default:
				// Developers can put a custom success message here for when activation is successful if they way.
				break;

		}
	}
}
add_action( 'admin_notices', 'obb_admin_notices' );
