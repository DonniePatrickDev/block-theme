<?php
/**
 * Theme License and Updater
 *
 * @package Organic Rialto
 * @version 1.0.0
 */

// Includes the files needed for the theme updater.
if ( ! class_exists( 'EDD_Theme_Updater_Admin' ) ) {
	include dirname( __FILE__ ) . '/theme-updater-admin.php';
}

// Loads the updater classes.
$updater = new EDD_Theme_Updater_Admin(
	// Config settings.
	array(
		'remote_api_url' => 'https://organicthemes.com', // Site where EDD is hosted.
		'item_name'      => 'Rialto Theme', // Name of theme.
		'theme_slug'     => 'organic-rialto', // Theme slug.
		'version'        => '1.0.2', // The current version of this theme.
		'author'         => 'Organic Themes', // The author of this theme.
		'download_id'    => '', // Optional, used for generating a license renewal link.
		'renew_url'      => '', // Optional, allows for a custom license renewal link.
		'beta'           => false, // Optional, set to true to opt into beta versions.
		'item_id'        => '',
	),
	// Strings.
	array(
		'theme-license'             => __( 'Theme License', 'organic-rialto' ),
		'enter-key'                 => __( 'Enter your theme license key.', 'organic-rialto' ),
		'license-key'               => __( 'License Key', 'organic-rialto' ),
		'license-action'            => __( 'License Action', 'organic-rialto' ),
		'deactivate-license'        => __( 'Deactivate License', 'organic-rialto' ),
		'activate-license'          => __( 'Activate License', 'organic-rialto' ),
		'status-unknown'            => __( 'License status is unknown.', 'organic-rialto' ),
		'renew'                     => __( 'Renew?', 'organic-rialto' ),
		'unlimited'                 => __( 'unlimited', 'organic-rialto' ),
		'license-key-is-active'     => __( 'License key is active.', 'organic-rialto' ),
		/* translators: %s: Expiration date */
		'expires%s'                 => __( 'Expires %s.', 'organic-rialto' ),
		/* translators: 1: Activated sites, 2: Total activations */
		'%1$s/%2$-sites'            => __( 'You have %1$s / %2$s sites activated.', 'organic-rialto' ),
		/* translators: %s: Expiration date */
		'license-key-expired-%s'    => __( 'License key expired %s.', 'organic-rialto' ),
		'license-key-expired'       => __( 'License key has expired.', 'organic-rialto' ),
		'license-keys-do-not-match' => __( 'License keys do not match.', 'organic-rialto' ),
		'license-is-inactive'       => __( 'License is inactive.', 'organic-rialto' ),
		'license-key-is-disabled'   => __( 'License key is disabled.', 'organic-rialto' ),
		'site-is-inactive'          => __( 'Site is inactive.', 'organic-rialto' ),
		'license-status-unknown'    => __( 'License status is unknown.', 'organic-rialto' ),
		'update-notice'             => __( "Updating this theme will lose any customizations you have made. 'Cancel' to stop, 'OK' to update.", 'organic-rialto' ),
		/* translators: 1: Product title, 2: Version number, 3: Thickbox URL, 4: Title attribute, 5: Update URL, 6: Attributes */
		'update-available'          => __( '<strong>%1$s %2$s</strong> is available. <a href="%3$s" class="thickbox" title="%4$s">Check out what\'s new</a> or <a href="%5$s"%6$s>update now</a>.', 'organic-rialto' ),
	)
);
