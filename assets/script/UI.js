$(window).resize(function() {
  if($(window).width() < 576) {
    $('#toolbar').removeClass('btn-group');
    $('#toolbar').addClass('btn-group-vertical');
  } else {
    $('#toolbar').removeClass('btn-group-vertical');
    $('#toolbar').addClass('btn-group');
  }
});

function toolbarReset() {
  $('.toolbar-button').removeClass('active');
}
