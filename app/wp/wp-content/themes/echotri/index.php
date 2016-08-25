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
 * Template Name: Page blog
 *
 * @package WordPress
 * @subpackage Echo_Tri
 * @since EchoTri 1.0
 */


get_header(); ?>

	<!-- Header -->
	<?php //@TODO: Transform this to a single block ?>
	<header class="header">
		<div class="hero-cover lazyload" data-bgset="<?php echo get_template_directory_uri() ?>/images/blog-header-<?php echo rand(1, 4); ?>.jpg 5400w" data-sizes="auto">
			<span class="icon-elt">
				<span my-svg-file svg-icon-id="logo-echotri"></span>
			</span>
			<p class="header-text">Insertion, Collection, Tri, Valorisation...</p>
			<p class="header-text">Papiers, cartons et autres</p>
		</div>
	</header>
	<!-- Main cotent -->
	<section>
		<section class="info-section missions">
			<div class="info-section__content">
				<header><h2 class="title">Nos Articles</h2></header>

				<?php

					$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
	                $args = array(
	                    'post_type' => 'post',
	                    'category_name' => 'Blog',
	                    'posts_per_page' => 5,
	                    'order' => 'ASC',
						'paged' => $paged
	                );
	                $my_query = new WP_Query($args);
	                ?>

	                <?php
	                // Loop
					echo '<div class="article-posts">';
	                if($my_query->have_posts()): while ($my_query->have_posts()) : $my_query->the_post();
	                ?>

						<section class="article-post" <?php post_class(); ?>>
							<article itemscope itemType="http://schema.org/BlogPosting">

								<header class="article-post__header">
									<h2 itemprop="headline" class="article-post__title">
										<a class="article-post__link" href="<?php echo the_permalink(); ?>"><?php the_title() ?></a>
									</h2>
								</header>
								<div class="article-post__meta">
									<span class="date">
										<time datetime="<?php the_time('Y-m-d') ?>" itemprop="datePublished"><?php the_time('j F Y') ?></time>
									</span>
									<?php
										$comments = get_comments_number($my_query->post->ID);
										$comm_count = (((int) $comments) > 0) ? $comments : 'Pas de';
									?>
									<span class="category"><?php echo $comm_count ?> Commentaire<? if($comm_count>1) echo 's' ?></span>
								</div>
								<div class="article-post__content"  itemprop="articleBody">
									<?php the_excerpt(); ?>
								</div>
							</article>
						</section>
	                <?php
	                endwhile;
					echo '</div>';
	                endif;

					/* Pagination */
					// if (function_exists(custom_pagination)) {
						custom_pagination($my_query->max_num_pages,"",$paged);
					// }
	                // Reset
	                wp_reset_postdata();
	            ?>
			</div>

			<?php  ?>
			<?php if ($my_query->max_num_pages > 1) { // check if the max number of pages is greater than 1  ?>
			<nav class="prev-next-posts">
				<div class="prev-posts-link">
					<?php //echo get_next_posts_link( 'Older Entries', $my_query->max_num_pages ); // display older posts link ?>
				</div>
				<div class="next-posts-link">
					<?php //echo get_previous_posts_link( 'Newer Entries' ); // display newer posts link ?>
				</div>
			</nav>
			<?php } ?>

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
