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

var options = [];

//Code taken from https://codepen.io/bseth99/pen/fboKH
$( '.dropdown-menu a' ).on( 'click', function( event ) {

   var $target = $( event.currentTarget ),
       val = $target.attr( 'data-value' ),
       $inp = $target.find( 'input' ),
       idx;

   if ( ( idx = options.indexOf( val ) ) > -1 ) {
      options.splice( idx, 1 );
      setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
   } else {
      options.push( val );
      setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
   }

   $( event.target ).blur();

   console.log( options );
   return false;
});

//End of referenced code.
