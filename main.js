$(document).ready(function(){
  $.ajax({
    url: 'http://tiny-za-server.herokuapp.com/collections/gabe',
    type: 'GET',
    dataType: 'json',
    success: function(response) {
      response.forEach(function(listItem){
        var $li = $('<li></li>');
        var $but = $('<button>Delete</button>').attr('class',listItem._id);
        $li.text(listItem.input);
        $li.prepend($but).on('click', function(evt) {
                console.log(evt);
                evt.target.parentElement.remove();
                $.ajax({
                url: 'http://tiny-za-server.herokuapp.com/collections/gabe/'+listItem._id,
                type: 'DELETE',
                dataType: 'json',
                success: function (response) {
                  console.log('delete', response);
              }
            });
          });
        $('#listDisp').append($li);
      });
    }
  });
  $('#addBox').on('submit', function(evt) {         //Start of the submit event
    evt.preventDefault();
    var input = $('#inputBox').val();
    var $li = $('<li></li>');
    var $but = $('<button class="delete">Delete</button>');
    $li.text(input);
    $li.prepend($but).on('click', function(evt) {
      console.log('click', evt);
    });
    $('#listDisp').prepend($li);
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
