
<!-- The page icon -->
<span class="elt-icon icon-bg">
    <!-- @TODO: Add the dynamic path for ressource -->
    <svg class="icon"><use xlink:href="<?php echo get_template_directory_uri() ?>/images/svg/svg-defs.svg#shapes-<?php echo strtolower(the_field('icone_article')) ?>" /></svg>
</span>
<h3 class="page-title"><?php the_field('titre_article'); ?></h3>
<div class="page-content">

    <?php the_content(); ?>
</div>
