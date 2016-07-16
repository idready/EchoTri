<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * Template Name: Article blog
 *
 * @package WordPress
 * @subpackage Echo_Tri
 * @since EchoTri 1.0
 */


get_header(); ?>


    <!-- Add your site or application content here -->
    <header class="header">
        <div class="hero-cover lazyload" data-bgset="<?php echo get_template_directory_uri() ?>/images/hero-cover.jpg 4000w" data-sizes="auto">
            <span class="icon-elt"><svg class="icon"><use xlink:href="<?php echo get_template_directory_uri() ?>/images/svg/svg-defs.svg#shapes-logo-echotri" /></svg></span>
            <p class="header-text">Insertion, Collection, Tri, Valorisation...</p>
            <p class="header-text">Papiers, cartons et autres</p>
        </div>
    </header>
    <!-- Main cotent -->
    <section>

        <div id="primary" class="content-area">
    		<main id="main" class="site-main" role="main">

    		<?php
    		// Start the loop.
    		while ( have_posts() ) : the_post();

    			/*
    			 * Include the post format-specific template for the content. If you want to
    			 * use this in a child theme, then include a file called called content-___.php
    			 * (where ___ is the post format) and that will be used instead.
    			 */
    			get_template_part( 'content', get_post_format() );

    			// If comments are open or we have at least one comment, load up the comment template.
    			if ( comments_open() || get_comments_number() ) :
    				comments_template();
    			endif;

    			// Previous/next post navigation.
    			the_post_navigation( array(
    				'next_text' => '<span class="meta-nav" aria-hidden="true">' . __( 'Next', 'twentyfifteen' ) . '</span> ' .
    					'<span class="screen-reader-text">' . __( 'Next post:', 'twentyfifteen' ) . '</span> ' .
    					'<span class="post-title">%title</span>',
    				'prev_text' => '<span class="meta-nav" aria-hidden="true">' . __( 'Previous', 'twentyfifteen' ) . '</span> ' .
    					'<span class="screen-reader-text">' . __( 'Previous post:', 'twentyfifteen' ) . '</span> ' .
    					'<span class="post-title">%title</span>',
    			) );

    		// End the loop.
    		endwhile;
    		?>

    		</main><!-- .site-main -->
    	</div><!-- .content-area -->
    </section>

<?php get_footer(); ?>
