<?php
/**
 * Twenty Sixteen functions and definitions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 *
 * When using a child theme you can override certain functions (those wrapped
 * in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before
 * the parent theme's file, so the child theme functions would be used.
 *
 * @link https://codex.wordpress.org/Theme_Development
 * @link https://codex.wordpress.org/Child_Themes
 *
 * Functions that are not pluggable (not wrapped in function_exists()) are
 * instead attached to a filter or action hook.
 *
 * For more information on hooks, actions, and filters,
 * {@link https://codex.wordpress.org/Plugin_API}
 *
 * @package WordPress
 * @subpackage Echo_Tri
 * @since EchoTri 1.0
 */


/**
 * Add scripts to retrieve posts with Ajax
 *
 *
 * @since EchoTri 1.0
 *
 * @return {*}.
 */
function add_js_scripts() {

  wp_enqueue_script( 'script-header', get_template_directory_uri().'/js/header-all.js', array(), '1.0');
  wp_enqueue_script( 'script-footer', get_template_directory_uri().'/js/all.js', array(), '1.0', true );

  // pass Ajax Url to all.js
  wp_localize_script('script-footer', 'ajaxurl', admin_url( 'admin-ajax.php' ) );
}
add_action('wp_enqueue_scripts', 'add_js_scripts');

add_action( 'wp_ajax_get_articles', 'get_articles' );
add_action( 'wp_ajax_nopriv_get_articles', 'get_articles' );

function get_articles() {

    $post_id = trim($_REQUEST['post_id']);
    if ( $post_id === 'undefined' || !is_numeric($post_id) ) $post_id = 1;

    // @TODO: clean $_REQUEST['post_id'] for security
    $args = array(
      'post_type' => 'post',
      'p' => $post_id
    );

    $ajax_query = new WP_Query($args);

    if ( $ajax_query->have_posts() ) :
        while ( $ajax_query->have_posts() ) : $ajax_query->the_post();
            get_template_part( 'template-parts/modal' );
        endwhile;
    endif;

    // @TODO: Send Template part instead
    // echo json_encode(array('title'=> $ajax_query->post->post_title, 'content'=> $ajax_query->post->post_content));

    die();
}

if( !function_exists( 'theme_pagination' ) ) {

    function theme_pagination() {

    	global $wp_query, $wp_rewrite;
    	$wp_query->query_vars['paged'] > 1 ? $current = $wp_query->query_vars['paged'] : $current = 1;

    	$pagination = array(
    		'base' => @add_query_arg('page','%#%'),
    		'format' => '',
    		'total' => $wp_query->max_num_pages,
    		'current' => $current,
    	        'show_all' => false,
    	        'end_size'     => 1,
    	        'mid_size'     => 2,
    		'type' => 'list',
    		'next_text' => '»',
    		'prev_text' => '«'
    	);

    	if( $wp_rewrite->using_permalinks() )
    		$pagination['base'] = user_trailingslashit( trailingslashit( remove_query_arg( 's', get_pagenum_link( 1 ) ) ) . 'page/%#%/', 'paged' );

    	if( !empty($wp_query->query_vars['s']) )
    		$pagination['add_args'] = array( 's' => str_replace( ' ' , '+', get_query_var( 's' ) ) );

    	echo str_replace('page/1/','', paginate_links( $pagination ) );
    }
}
