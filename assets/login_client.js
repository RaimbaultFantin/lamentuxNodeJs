//jquery code
$(document).ready(function () {
    $('#send').on('click', function (e) {
        e.preventDefault(e);
        $.ajax({
            type: 'POST',
            url: '/login',
            // send data to server
            data:
            {
                email: $('#email').val(),
                password: $('#password').val()
            },

            success: function (data) {
                console.log(data);
                window.location='/home';
            },

            error: function (err) {
                showErr(err);
            }
        })
    })
});

function showErr(err) {
    console.log(err)
    const $errorMessage = $('#errorMessage');
    $errorMessage.css({ display: 'block' })
    $errorMessage.text(err.responseJSON.message);
}
