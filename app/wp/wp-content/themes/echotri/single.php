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
