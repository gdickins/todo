$(document).ready(function(){
  $.ajax({
    url: 'http://tiny-za-server.herokuapp.com/collections/gabe',
    type: 'GET',
    dataType: 'json',
    success: function(response) {
      response.forEach(function(listItem){
        var $li = $('<li></li>');
        var $but = $('<button class="delete">Delete</button>');
        $li.text(listItem.input);
        $li.prepend($but);
        $('#listDisp').append($li);
      });
    }
  });
  $('#addBox').on('submit', function(evt) {
    evt.preventDefault();
    var input = $('#inputBox').val();
    var $li = $('<li></li>');
    var $but = $('<button class="delete">Delete</button>');
    $li.text(input);
    $li.prepend($but);
    $('#listDisp').append($li);
    $.ajax({
      url: 'http://tiny-za-server.herokuapp.com/collections/gabe',
      type: 'POST',
      success: function(response) {
        console.log('POST', response);
      },
      contentType: 'application/json',
      data: JSON.stringify({input: input})
    });
  });
});
