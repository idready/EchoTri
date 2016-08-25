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
	<?php
		echo get_template_part( 'template-parts/header' );
	?>
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

		</section>
		<!-- Footer -->
		<?php
			echo get_template_part( 'template-parts/footer' );
		?>
	</section>

<?php get_footer(); ?>
