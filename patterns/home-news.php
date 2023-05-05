<?php
/**
 * Title: Home News
 * Slug: organic-rialto/home-news
 * Categories: organic-rialto-patterns
 *
 * @package Organic Rialto
 * @since Organic Rialto 1.0
 */

?>

<!-- wp:group {"align":"wide"} -->
<div class="wp-block-group alignwide"><!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:separator {"backgroundColor":"light-gray"} -->
<hr class="wp-block-separator has-text-color has-light-gray-color has-alpha-channel-opacity has-light-gray-background-color has-background"/>
<!-- /wp:separator -->

<!-- wp:image {"align":"center","id":1813,"width":36,"height":36,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image aligncenter size-large is-resized"><img src="http://organicthemes.com/demo/rialto/files/2021/06/icon-news.png" alt="" class="wp-image-1813" width="36" height="36"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"textAlign":"center","textColor":"black"} -->
<h2 class="wp-block-heading has-text-align-center has-black-color has-text-color">News From Our Blog</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#999999"}}} -->
<p class="has-text-align-center has-text-color" style="color:#999999">Stay informed of the changes happening in our company.</p>
<!-- /wp:paragraph -->

<!-- wp:query {"queryId":16,"query":{"perPage":"3","pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false,"taxQuery":{"category":[16]}},"displayLayout":{"type":"flex","columns":3}} -->
<div class="wp-block-query"><!-- wp:post-template -->
<!-- wp:post-featured-image {"isLink":true,"align":"wide"} /-->

<!-- wp:post-title {"level":4,"isLink":true,"fontSize":"medium"} /-->

<!-- wp:post-excerpt {"style":{"color":{"text":"#666666"},"spacing":{"margin":{"bottom":"12px"}}},"fontSize":"normal"} /-->

<!-- wp:read-more /-->
<!-- /wp:post-template --></div>
<!-- /wp:query -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:group -->
