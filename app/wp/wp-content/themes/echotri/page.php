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
 * Template Name: Page Accueil
 *
 * @package WordPress
 * @subpackage Echo_Tri
 * @since EchoTri 1.0
 */


get_header(); ?>

    <!-- Add your site or application content here -->
    <?php
        echo get_template_part( 'template-parts/header' );
    ?>
    <!-- Main cotent -->
    <section>
        <section class="info-section activity">
            <div class="info-section__content">
                <header><h2 class="title">Domaines d'intervention</h2></header>

                <?php

                    $args = array(
                        'post_type' => 'post',
                        'category_name' => 'domaines_interventions',
                        'posts_per_page' => 10,
                        'meta_key' => 'position_lien',
                        'orderby' => 'meta_value_num',
                        'order' => 'ASC',
                    );

                    $my_query = new WP_Query($args);

                    if($my_query->have_posts()):
                    ?>

                    <?php
                    // Loop
                    while ($my_query->have_posts() ) : $my_query->the_post();
                    ?>

                        <!-- Infos item -->
                        <a href="#" my-modal-link data-modal-event="modal-trigger" data-type="cd-modal-trigger" data-posticon="<?php echo strtolower(the_field('icone_article')) ?>" data-postId="<?php the_ID() ?>" class="info-section__item span-xs-12 span-sm-4 span-md-3">
                            <span class="icon-elt">
                                <span my-svg-file svg-icon-id="<?php echo strtolower(the_field('icone_article')) ?>"></span>
                            </span>
                            <h3 class="info-section__item-label"><?php the_title() ?></h3>
                        </a>

                    <?php

                    endwhile;
                    endif;
                    // Reset
                    wp_reset_postdata();
                    ?>
            </div>
        </section>
        <section class="info-section missions">
            <div class="info-section__content">
                <header><h2 class="title">Missions sociales</h2></header>
                <!-- Infos item -->
                <?php

                    $args = array(
                        'post_type' => 'post',
                        'category_name' => 'missions_sociales',
                        'posts_per_page' => 10,
                        'meta_key' => 'position_lien',
                        'orderby' => 'meta_value_num',
                        'order' => 'ASC',
                    );

                    $my_query = new WP_Query($args);

                    if($my_query->have_posts()):
                    ?>

                    <?php
                    // Loop
                    while ($my_query->have_posts() ) : $my_query->the_post();
                    ?>

                        <!-- Infos item -->
                        <a href="#" my-modal-link data-modal-event="modal-trigger" page-type="tertiary" data-type="cd-modal-trigger" data-posticon="<?php echo strtolower(the_field('icone_article')) ?>" data-postId="<?php the_ID() ?>" class="info-section__item span-xs-12 span-sm-3">
                            <span class="icon-elt">
                                <span my-svg-file svg-icon-id="<?php echo strtolower(the_field('icone_article')) ?>"></span>
                            </span>
                            <h3 class="info-section__item-label"><?php the_title() ?></h3>
                        </a>

                    <?php
                    endwhile;
                    endif;

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
