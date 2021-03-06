
$(function () {

  $(".datepicker").flatpickr({altInput: true, altFormat: 'J F Y'});
  $(".datetimepicker").flatpickr({altInput: true, altFormat: 'J F Y, H:i', enableTime: true, time_24hr: true});

  $('input[type=text].slug').each(function () {
    var slug = $(this);
    var start_length = slug.val().length;
    var pos = $.inArray(this, $('input', this.form)) - 1;
    var title = $($('input', this.form).get(pos));
    slug.focus(function () {
      slug.data('focus', true);
    });
    title.keyup(function () {
      if (start_length == 0 && slug.data('focus') != true)
        slug.val(title.val().toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9\-]/g, ''));
    });
  });

  $("abbr.timeago").timeago()

  $('textarea.wysiwyg').each(function () {
    var textarea = this
    var editor = textboxio.replace(textarea, {
      css: {
        stylesheets: ['/stylesheets/app.css']
      },
      paste: {
        style: 'plain'
      },
      images: {
        allowLocal: false
      }
    });
    if (textarea.form)
      $(textarea.form).submit(function () {
        if ($(editor.content.get()).text().trim() == '')
          editor.content.set(' ')
      })
  });

  $(document).on('click', 'a[data-confirm]', function (e) {
    var message = $(this).data('confirm');
    if (!confirm(message)) {
      e.preventDefault();
      e.stopped = true;
    }
  });

  $(document).on('click', 'a.popup', function (e) {
    window.open(this.href, null, 'scrollbars=yes,width=600,height=600,left=150,top=150').focus();
    return false;
  });

  $('.geopicker').geopicker({
    width: '100%',
    getLatLng: function (container) {
      var lat = $('input[name$="[lat]"]', container).val()
      var lng = $('input[name$="[lng]"]', container).val()
      if (lat.length && lng.length)
        return new google.maps.LatLng(lat, lng)
    },
    set: function (container, latLng) {
      $('input[name$="[lat]"]', container).val(latLng.lat());
      $('input[name$="[lng]"]', container).val(latLng.lng());
    }
  });

});