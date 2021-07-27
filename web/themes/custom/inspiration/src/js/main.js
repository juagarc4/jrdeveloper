/**
 * Javascript behaviours
 */

(function ($, Drupal) {
    'use strict';

    // shows and hides mobile menu on burger menu click

    Drupal.behaviors.mainMenuMobile = {
        attach: function (context, settings) {

            var $mainMenuMobile = $('.js-main-menu-container');

            $('.js-open-main-menu').on('click', function () {
                $mainMenuMobile.addClass('main-menu-mobile__container--visible');
            });
            $('.js-close-main-menu').on('click', function () {
                $mainMenuMobile.removeClass('main-menu-mobile__container--visible');
            });
        }
    };

    // add target blank to external links

    Drupal.behaviors.openExternalLinksInNewWindow = {
        attach: function (context, settings) {
            $("a[href^='http://'], a[href^='https://']", context).attr('target', '_blank').attr('rel', 'nofollow');
        }
    };

    // triggers os file selection menu on button click.
    // Button overlays OS' default input for files.

    Drupal.behaviors.triggerInputFile = {
        attach: function (context, settings) {

            var $button = $('.js-trigger-input-file', context);

            $button.on('click', function (e) {
                e.preventDefault();
                $button.parent().find('.js-form-file').trigger('click');
            });
        }
    };

    // Add toggle behavior to faq entries.

    Drupal.behaviors.toggleFaq = {
        attach: function (context, settings) {


            var $headline = $('.js-faq-headline', context);
            $('.js-faq__item').addClass('faq__item--collaped');

            $headline.on('click', function (e) {
                $(this).parent().parent().toggleClass('faq__item--collaped');
            });
        }
    };
})(jQuery, Drupal);
