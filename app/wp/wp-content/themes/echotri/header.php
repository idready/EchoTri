<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 * @package WordPress
 * @subpackage Echo_Tri
 * @since EchoTri 1.0
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>
	<title><?php bloginfo( 'name' ); ?></title>

	<link rel="apple-touch-icon" href="apple-touch-icon.png">
    <!-- Place favicon.ico in the root directory -->

    <!-- Tile icon for Win8 (144x144 + tile color) -->
    <meta name="msapplication-TileImage" content="images/touch/ms-touch-icon-144x144-precomposed.png">
    <meta name="msapplication-TileColor" content="#3372DF">

    <!-- build:css styles/main.css -->
    <link rel="stylesheet" href="<?php echo get_template_directory_uri() ?>/css/home.css">
    <!-- endbuild -->


	<?php wp_head(); ?>

	<?php /* Variables for Js */ ?>

	<script>

		var CONFIG_VARS =  {
			WP_TEMPLATE_URL : "<?php echo get_template_directory_uri(); ?>"
		};

	</script>
</head>

<body <?php body_class(); ?> ng-app="echoTri" ng-strict-di>
<!--[if lt IE 9]>
  <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->

	<main role="main" class="wrapper lazyload" data-bgset="<?php echo get_template_directory_uri() ?>/images/polygon-650.png 3000w" data-sizes="auto">
