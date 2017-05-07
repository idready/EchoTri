<?php if( is_home() || is_single() ): ?>

    <header class="header">
        <div class="hero-cover lazyload" data-bgset="<?php echo get_template_directory_uri() ?>/images/blog-header-<?php echo rand(1, 4); ?>.jpg 5400w" data-sizes="auto">
            <a href="/blog/" class="icon-elt">
                <span my-svg-file svg-icon-id="logo-echotri"></span>
            </a>
            <p class="header-text">Insertion, Collection, Tri, Valorisation...</p>
            <p class="header-text">Papiers, cartons et autres</p>
        </div>
    </header>

<?php else: ?>

    <header class="header">
          <div class="hero-cover lazyload" data-bgset="<?php echo get_template_directory_uri() ?>/images/hero-cover.jpg 4000w" data-sizes="auto">
              <a href="/" class="icon-elt"><span my-svg-file svg-icon-id="logo-echotri"></span></a>
              <p class="header-text">Insertion, Collection, Tri, Valorisation...</p>
              <p class="header-text">Papiers, cartons et autres</p>
          </div>
    </header>

<?php endif; ?>
