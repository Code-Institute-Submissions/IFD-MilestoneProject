//Responsive design implemented by dynamically changing class that governs the layout of toolbar.
$(window).resize(function() {
  if($(window).width() < 576) {
    $('#toolbar').removeClass('btn-group');
    $('#toolbar').addClass('btn-group-vertical');
  } else {
    $('#toolbar').removeClass('btn-group-vertical');
    $('#toolbar').addClass('btn-group');
  }
});

//This function is called when a new nearby search takes place - all buttons in the toolbar will be unchecked.
function toolbarReset() {
  $('.toolbar-button').removeClass('active');
}
