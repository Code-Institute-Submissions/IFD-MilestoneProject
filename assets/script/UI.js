var slider = document.getElementById("range-slider");
var poiFlag = document.getElementsByClassName("poi-flag");
var poiOptions = [];

//Responsive design implemented by dynamically changing class that governs the layout of toolbar.
$(window).resize(function() {
  if ($(window).width() < 576) {
    $('#toolbar').removeClass('btn-group');
    $('#toolbar').addClass('btn-group-vertical');
  } else {
    $('#toolbar').removeClass('btn-group-vertical');
    $('#toolbar').addClass('btn-group');
  }
});

//Unchecks all buttons in toolbar.
function resetToolbarUI() {
  $('.toolbar-button').removeClass('active');
}

function clearDropDownMenu(){
  poiOptions.length = 0;
  for (var i = 0; i < poiFlag.length; i++) {
    poiFlag[i].checked = false;
  }
}

//Completely resets toolbar (both in terms of UI and its actual state).
function resetToolbar() {
  resetToolbarState();
  resetToolbarUI();
  clearDropDownMenu();
}

//Calling a set of functions as a standard method for completely resetting UI.
function resetUI() {
  slider.value = 500;
  sliderValue();
  resetToolbar();
  resetMarkers();
  clearCircle();
}

function sliderValue() {
  $("#slider-info").html(slider.value + "m");
}

slider.oninput = function() {
  sliderValue();
  updateSearch();
}

//Code taken from https://codepen.io/bseth99/pen/fboKH
$('.dropdown-menu a').on('click', function(event) {

  var $target = $(event.currentTarget),
    val = $target.attr('data-value'),
    $inp = $target.find('input'),
    idx;

  if ((idx = poiOptions.indexOf(val)) > -1) {
    poiOptions.splice(idx, 1);
    setTimeout(function() {
      $inp.prop('checked', false)
    }, 0);
  } else {
    poiOptions.push(val);
    setTimeout(function() {
      $inp.prop('checked', true)
    }, 0);
  }

  $(event.target).blur();

  poiSearch(poiOptions);

  return false;
});

//End of referenced code.
