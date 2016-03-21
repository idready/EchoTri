<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after
 *
 * @package WordPress
 * @subpackage Echo_Tri
 * @since EchoTri 1.0
 */
?>

	  <!-- oter -->
      <footer class="footer">
          <ul class="footer-links">
              <li class="footer-links__item">
                <?php //Get this dynamically ?>
                <a href="#" my-modal-link data-modal-event="modal-trigger" page-type="secondary" data-type="cd-modal-trigger" data-posticon="people-us" data-postId="84">Qui sommes nous ?</a>
              </li>
              <li class="footer-links__item"><a href="#">Blog</a></li>
              <li class="footer-links__item"><a target="_blank" rel="noopener" href="https://www.facebook.com/EchoTri-545067608842775/">Facebook</a></li>
          </ul>
          <p class="footer-cpr">EchoTri tous droits reservés 2015</p>
      </footer>

    </main>

    <div class="cd-modal" data-modal="modal-trigger" ng-controller="ModalCtrl">
        <div class="cd-svg-bg" data-step1="M-59.9,540.5l-0.9-1.4c-0.1-0.1,0-0.3,0.1-0.3L864.8-41c0.1-0.1,0.3,0,0.3,0.1l0.9,1.4c0.1,0.1,0,0.3-0.1,0.3L-59.5,540.6 C-59.6,540.7-59.8,540.7-59.9,540.5z" data-step2="M33.8,690l-188.2-300.3c-0.1-0.1,0-0.3,0.1-0.3l925.4-579.8c0.1-0.1,0.3,0,0.3,0.1L959.6,110c0.1,0.1,0,0.3-0.1,0.3 L34.1,690.1C34,690.2,33.9,690.1,33.8,690z" data-step3="M-465.1,287.5l-0.9-1.4c-0.1-0.1,0-0.3,0.1-0.3L459.5-294c0.1-0.1,0.3,0,0.3,0.1l0.9,1.4c0.1,0.1,0,0.3-0.1,0.3 l-925.4,579.8C-464.9,287.7-465,287.7-465.1,287.5z" data-step4="M-329.3,504.3l-272.5-435c-0.1-0.1,0-0.3,0.1-0.3l925.4-579.8c0.1-0.1,0.3,0,0.3,0.1l272.5,435c0.1,0.1,0,0.3-0.1,0.3 l-925.4,579.8C-329,504.5-329.2,504.5-329.3,504.3z" data-step5="M341.1,797.5l-0.9-1.4c-0.1-0.1,0-0.3,0.1-0.3L1265.8,216c0.1-0.1,0.3,0,0.3,0.1l0.9,1.4c0.1,0.1,0,0.3-0.1,0.3L341.5,797.6 C341.4,797.7,341.2,797.7,341.1,797.5z" data-step6="M476.4,1013.4L205,580.3c-0.1-0.1,0-0.3,0.1-0.3L1130.5,0.2c0.1-0.1,0.3,0,0.3,0.1l271.4,433.1c0.1,0.1,0,0.3-0.1,0.3 l-925.4,579.8C476.6,1013.6,476.5,1013.5,476.4,1013.4z">
            <svg height="100%" width="100%" preserveAspectRatio="none" viewBox="0 0 800 500">
                <title>SVG Modal background</title>
                <path id="cd-changing-path-1" d="M-59.9,540.5l-0.9-1.4c-0.1-0.1,0-0.3,0.1-0.3L864.8-41c0.1-0.1,0.3,0,0.3,0.1l0.9,1.4c0.1,0.1,0,0.3-0.1,0.3L-59.5,540.6 C-59.6,540.7-59.8,540.7-59.9,540.5z"/>
                <path id="cd-changing-path-2" d="M-465.1,287.5l-0.9-1.4c-0.1-0.1,0-0.3,0.1-0.3L459.5-294c0.1-0.1,0.3,0,0.3,0.1l0.9,1.4c0.1,0.1,0,0.3-0.1,0.3 l-925.4,579.8C-464.9,287.7-465,287.7-465.1,287.5z"/>
                <path id="cd-changing-path-3" d="M341.1,797.5l-0.9-1.4c-0.1-0.1,0-0.3,0.1-0.3L1265.8,216c0.1-0.1,0.3,0,0.3,0.1l0.9,1.4c0.1,0.1,0,0.3-0.1,0.3L341.5,797.6 C341.4,797.7,341.2,797.7,341.1,797.5z"/>
            </svg>
        </div>
        <div class="cd-modal-content">

            <div class="ng-hide" ng-show="isLoading">
                Chargement en cours.....
            </div>
            <div class="cd-modal-dyn-content"></div>
        </div> <!-- cd-modal-content -->

        <!-- MessageNotifier -->
        <div my-feedback-notifier data-feedback-timeout="1500">
        </div>
        <a href="#" class="modal-close" title="Fermer">
            <span class="icon-elt" ng-click="closeModal($event)">
                <svg class="icon"><use xlink:href="<?php echo get_template_directory_uri() ?>/images/svg/svg-defs.svg#shapes-close" /></svg>
            </span>
        </a>
    </div> <!-- cd-modal -->

    <div class="cd-cover-layer"></div> <!-- .cd-cover-layer -->

	<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <script>
      (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
      function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
      e=o.createElement(i);r=o.getElementsByTagName(i)[0];
      e.src='https://www.google-analytics.com/analytics.js';
      r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
      ga('create','UA-XXXXX-X');ga('send','pageview');
    </script>


<?php wp_footer(); ?>
</body>
</html>
