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
 * @package WordPress
 * @subpackage Echo_Tri
 * @since EchoTri 1.0
 */


get_header(); ?>

	<!-- Header -->
	<?php //@TODO: Transform this to a single block ?>
	<header class="header">
		<div class="hero-cover lazyload" data-bgset="<?php echo get_template_directory_uri() ?>/images/blog-header.jpg 5400w" data-sizes="auto">
			<span class="icon-elt">
				<span my-svg-file svg-icon-id="logo-echotri"></span>
			</span>
			<p class="header-text">Insertion, Collection, Tri, Valorisation...</p>
			<p class="header-text">Papiers, cartons et autres</p>
		</div>
	</header>
	<!-- Main cotent -->
	<section>

		<section class="info-section activity">
			<header><h2 class="title">Nos Articles</h2></header>

			<?php

                $args = array(
                    'post_type' => 'post',
                    'category_name' => 'Blog',
                    'posts_per_page' => 10,
                    'order' => 'ASC',
                );

                $my_query = new WP_Query($args);

                if($my_query->have_posts()):
                ?>

                <?php
                // Loop
                while ($my_query->have_posts() ) : $my_query->the_post();
                ?>

					<section class="article-posts" <?php post_class(); ?>>
						<header>
							<?php the_title( '<h4 class="article-posts__title">', '</h4>' ); ?>
							<div class="article-posts__infos">
								<?php the_category(', ') ?>
								<?php the_time('jS F Y') ?>
							</div>
							<div class="article-posts__content">
								<?php // the_content(); ?>
							</div>
						</header>
					</section>
                    <h3 class="info-section__item-label"></h3>

                <?php

                endwhile;
                endif;

                // Reset
                wp_reset_postdata();
                ?>
		</section>
		<?php //@TODO: Transform this to a single block ?>
		<section class="info-section contact">

			<header><h2 class="title">Contact</h2></header>
			<div class="content clearfix">
				<a href="#" my-modal-link data-modal-event="modal-trigger" data-type="cd-modal-trigger" page-type="secondary" page-template="writeToUs" class="span-xs-12 span-sm-6 info-section__item">
					<span class="icon-elt">
						<span my-svg-file svg-icon-id="envelope"></span>
					</span>
					<h3 class="info-section__item-label">Nous écrire</h3>
				</a>
				<a href="#" my-modal-link data-modal-event="modal-trigger" data-type="cd-modal-trigger" page-type="secondary" page-template="reachUs" class="span-xs-12 span-sm-6 info-section__item">
					<span class="icon-elt">
						<span my-svg-file svg-icon-id="location-point"></span>
					</span>
					<h3 class="info-section__item-label">Nos coordonnées</h3>
				</a>
			</div>
		</section>
	</section>

<?php get_footer(); ?>
