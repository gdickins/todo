$(document).ready(function() {
    $.ajax({ //AJAX get
        url: 'http://tiny-za-server.herokuapp.com/collections/gabe',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            response.forEach(function(listItem) {
                var $li = $('<li></li>').attr('class', listItem._id);
                var $but = $('<button>Delete</button>').on('click', function(evt) { //Adding the delete button on ready list
                    console.log(evt);
                    $('.' + listItem._id).remove();
                    $.ajax({ //AJAX delete
                        url: 'http://tiny-za-server.herokuapp.com/collections/gabe/' + listItem._id,
                        type: 'DELETE',
                        dataType: 'json',
                        success: function(response) {
                            console.log('delete', response);
                        }
                    });
                });
                $li.text(listItem.input);
                $li.prepend($but);
                $('#listDisp').append($li);
            });
        }
    });
    $('#addBox').on('submit', function(evt) { //Start of the submit event
        evt.preventDefault();
        var input = $('#inputBox').val();
        var $li = $('<li></li>');
        var $but = $('<button class="delete">Delete</button>');
        $li.text(input);
        $li.prepend($but);
        $('#listDisp').prepend($li);

        $.ajax({ //AJAX POST
            url: 'http://tiny-za-server.herokuapp.com/collections/gabe',
            type: 'POST',
            success: function(response) {
                $li.attr('class', response._id);
                $but.on('click', function(evt) {
                    console.log('click', evt);
                    $('.' + response._id).remove();
                    $.ajax({ //AJAX delete
                        url: 'http://tiny-za-server.herokuapp.com/collections/gabe/' + response._id,
                        type: 'DELETE',
                        dataType: 'json',
                        success: function(response) {
                            console.log('delete', response);
                        }
                    });
                });
            },
            contentType: 'application/json',
            data: JSON.stringify({
                input: input
            })
        });
    });
});
