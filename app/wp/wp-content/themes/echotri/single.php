<?php
/**
 * The template for displaying all single posts and attachments
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

get_header(); ?>

    <!-- Header -->
	<?php
		echo get_template_part( 'template-parts/header' );
	?>
    <section>

		<section class="info-section missions">
			<div class="info-section__content">
                <?php if (have_posts()) : ?>
                <?php while (have_posts()) : the_post(); ?>
                <section class="article-post" <?php post_class(); ?>>
                    <article itemscope itemType="http://schema.org/BlogPosting">

                        <header class="article-post__header">
                            <?php //the_title( '<h2 class="article-posts__title">', '</h2>' ); ?>
                            <h2 itemprop="headline" class="article-post__title">
                                <?php the_title() ?>
                            </h2>
                        </header>
                        <div class="article-post__meta">
                            <span class="date">
                                <time datetime="<?php the_time('Y-m-d') ?>" itemprop="datePublished"><?php the_time('j F Y') ?></time>
                            </span>
                            <?php
                                $comm_count = (((int) get_comments_number()) > 0) ? get_comments_number() : 'Pas de';
                            ?>
                            <span class="category"><?php echo $comm_count; ?> Commentaire<? if($comm_count>1) echo 's' ?></span>
                        </div>
                        <div class="article-post__content"  itemprop="articleBody">
                            <?php the_content(); ?>
                        </div>
                        <?php
                        // If comments are open or we have at least one comment, load up the comment template.
            			if ( comments_open() || get_comments_number() ) :
            				comments_template();
                            endif;
                        ?>
                    </article>
                </section>
                <?php endwhile; ?>
                <?php endif; ?>
            </div>
        </section>
        <!-- Footer -->
		<?php
			echo get_template_part( 'template-parts/footer' );
		?>
    </section>

<?php get_footer(); ?>
