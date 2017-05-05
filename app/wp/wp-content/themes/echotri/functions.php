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

//Source: http://callmenick.com/post/custom-wordpress-loop-with-pagination thx
function custom_pagination($numpages = '', $pagerange = '', $paged='') {

    if (empty($pagerange)) {
        $pagerange = 2;
    }

    /**
    * This first part of our function is a fallback
    * for custom pagination inside a regular loop that
    * uses the global $paged and global $wp_query variables.
    *
    * It's good because we can now override default pagination
    * in our theme, and use this function in default quries
    * and custom queries.
    */
    global $paged;
        if (empty($paged)) {
        $paged = 1;
    }
    if ($numpages == '') {
        global $wp_query;
        $numpages = $wp_query->max_num_pages;
        if(!$numpages) {
            $numpages = 1;
        }
    }

    /**
    * We construct the pagination arguments to enter into our paginate_links
    * function.
    */
    $pagination_args = array(
        'base'            => get_pagenum_link(1) . '%_%',
        'format'          => 'page/%#%',
        'total'           => $numpages,
        'current'         => $paged,
        'show_all'        => False,
        'end_size'        => 1,
        'mid_size'        => $pagerange,
        'prev_next'       => True,
        'prev_text'       => __('&laquo;'),
        'next_text'       => __('&raquo;'),
        'type'            => 'plain',
        'add_args'        => false,
        'add_fragment'    => ''
    );

    $paginate_links = paginate_links($pagination_args);

    if ($paginate_links) {
        echo "<nav class='custom-pagination'>";
            //echo "<span class='page-numbers page-num'>Page " . $paged . " of " . $numpages . "</span> ";
            echo $paginate_links;
        echo "</nav>";
    }

}

// Add custom fields to json response
function slug_register_featured() {
    register_api_field( 'posts',
        'featured',
        array(
            'get_callback'    => 'get_meta_to_response',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}
add_action( 'rest_api_init', 'slug_register_featured' );

function get_meta_to_response( $object, $field_name, $request ) {
    return get_post_meta( $object[ 'id' ], $field_name, true );
}

add_filter( 'acf/rest_api/key', function( $key, $request, $type ) {
    return 'acf_fields';
}, 10, 3 );
// add_filter( 'acf/rest_api/types', function( $types ) {
//     if ( array_key_exists( 'post', $types ) ) {
//         unset( $types['post'] );
//     }
// 
//     return $types;
// } );

add_action( 'rest_api_init', 'slug_register_acf' );
function slug_register_acf() {
  $post_types = get_post_types(array('public'=>true), 'names');
  foreach ($post_types as $type) {
    register_api_field( $type,
        'acf',
        array(
            'get_callback'    => 'slug_get_acf',
            'update_callback' => null,
            'schema'          => null,
        )
    );
  }
}
function slug_get_acf( $object, $field_name, $request ) {
    return get_fields($object[ 'id' ]);
}
