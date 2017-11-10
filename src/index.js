$(document).ready(function() {
  $('.top-section__scroll-btn').click(function(event) {
    $("html, body").animate({ scrollTop: $('.second-section').offset().top }, 1000);
  });
  $('.second-section__scroll-btn').click(function(event) {
    $("html, body").animate({ scrollTop: $('.form-section').offset().top }, 1000);
  });

  $('.register-form__country-select').select2({
    placeholder: 'Select country',
    width: '100%'
  });
  $('.register-form__multi-select').select2({
    placeholder: 'Select phone',
    width: '100%'
  });
});

