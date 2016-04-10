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

      <section class="info-section missions">

        <header><?php the_title( '<h2 class="title">', '</h2>' ); ?></header>

            <!-- Infos item -->
            <?php

                function getDirContents($dir, &$results = array()){

                    $files = scandir($dir);

                    foreach($files as $key => $value){
                        $path = realpath($dir.DIRECTORY_SEPARATOR.$value);
                        if(!is_dir($path)) {
                            $file = explode('/', $path);
                            $results[] = $file[sizeof($file) - 1];
                        } else if($value != "." && $value != "..") {
                            getDirContents($path, $results);
                            $file = explode('/', $path);
                            $results[] = $file[sizeof($file) - 1];
                        }
                    }

                    return $results;
                }

                $icons = getDirContents('/var/www/wp/wp-content/themes/echotri/icons/svg-src/');

                //Loop through icons
                if (sizeof($icons) > 0):
            ?>
            <?php

                $ignoreIcons = array ('logo-echotri.svg', 'input-check.svg', 'error.svg', 'envelope.svg', 'location-point.svg', 'close.svg');
                foreach ($icons as $key => $value):

                    if (in_array($value, $ignoreIcons)) {
                        continue;
                    }
            ?>
                <div class="info-section__item span-xs-12 span-sm-3">
                    <?php  $svgFile =  explode('.svg', $value); ?>
                    <span class="icon-elt">
                        <span my-svg-file svg-icon-id="<?php echo $svgFile[0]; ?>"></span>
                    </span>
                    <h3 class="info-section__item-label"><?php echo $svgFile[0]; ?></h3>
                </div>
            <?php endforeach; ?>
            <?php endif; ?>

      </section>
      <section class="info-section contact">

        <header><h2 class="title">Contact</h2></header>
        <div class="content clearfix">
            <a href="#" my-modal-link data-modal-event="modal-trigger" data-type="cd-modal-trigger" page-type="secondary" page-template="writeToUs" class="span-xs-12 span-sm-6 info-section__item">
                <span class="icon-elt">
                    <span my-svg-file svg-icon-id="envelope"></span>
                    <?php /*
                    <svg class="icon"><use xlink:href="<?php echo get_template_directory_uri() ?>/images/svg/svg-defs.svg#shapes-envelope" /></svg>
                    */  ?>
                </span>
                <h3 class="info-section__item-label">Nous écrire</h3>
            </a>
            <a href="#" my-modal-link data-modal-event="modal-trigger" data-type="cd-modal-trigger" page-type="secondary" page-template="reachUs" class="span-xs-12 span-sm-6 info-section__item">
                <span class="icon-elt">
                    <span my-svg-file svg-icon-id="location-point"></span>
                    <?php /*
                    <svg class="icon"><use xlink:href="<?php echo get_template_directory_uri() ?>/images/svg/svg-defs.svg#shapes-location-point" /></svg>
                    */  ?>
                </span>
                <h3 class="info-section__item-label">Nos coordonnées</h3>
            </a>
        </div>
      </section>
    </section>


<?php get_footer(); ?>
