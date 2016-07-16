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
 * Template Name: Page icones
 *
 * @package WordPress
 * @subpackage Echo_Tri
 * @since EchoTri 1.0
 */

?>

    <?php /* Only accepts connected users */ ?>
    <?php

        if ( !is_user_logged_in() ) {

            header('Location: http://'.$_SERVER['HTTP_HOST'].'/wp/');
        }
    ?>

    <?php get_header(); ?>
    <!-- Header -->
    <header class="header">
        <div class="hero-cover lazyload" data-bgset="<?php echo get_template_directory_uri() ?>/images/hero-cover.jpg 4000w" data-sizes="auto">
            <span class="icon-elt"><span my-svg-file svg-icon-id="logo-echotri"></span></span>
            <p class="header-text">Insertion, Collection, Tri, Valorisation...</p>
            <p class="header-text">Papiers, cartons et autres</p>
        </div>
    </header>
    <!-- Main cotent -->
    <section>

      <section class="info-section missions">

        <header><?php the_title( '<h2 class="title">', '</h2>' ); ?></header>

            <!-- Infos item -->
            <?php

                $file = '/var/www/wp/wp-content/themes/echotri/images/icons.json';
                if (file_exists($file)) {

                    $icons_names = file($file);
                    $icons = json_decode($icons_names[0], true);
                }

                if (sizeof($icons) > 0):
            ?>
            <?php

                $ignoreIcons = array ('logo-echotri', 'input-check', 'error', 'envelope', 'location-point', 'close');
                foreach ($icons as $key => $value):

                    if (in_array($value, $ignoreIcons)) {
                        continue;
                    }
            ?>
                <div class="info-section__item span-xs-12 span-sm-3">
                    <span class="icon-elt">
                        <span my-svg-file svg-icon-id="<?php echo $value; ?>"></span>
                    </span>
                    <h3 class="info-section__item-label"><?php echo $value; ?></h3>
                </div>
            <?php endforeach; ?>
            <?php endif;  ?>

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
