//jquery code
$(document).ready(function () {

    $('#send').on('click', function (e) {
        e.preventDefault(e);
        $.ajax({
            type: 'POST',
            url: '/signup', // url is : http://localhost:3000 , param = (here) '/signup' so : url+param = http://localhost:3000/signup
            // send data to server
            data:
            {
                pseudo: $('#pseudo').val(),
                email: $('#email').val(),
                password: $('#password').val(),
                password2: $('#password2').val(),
            },

            success: function (data) {
                console.log(data);
                showSuccess(data);
                window.location='/login';
            },

            error: function (err) {
                console.log(err);
                showErr(err);
            }
        })
    })
});

function showErr(err) {
    const $errorMessage = $('#errorMessage');
    $errorMessage.css({ display: 'block' })
    $errorMessage.text(err.responseJSON.message);
}

function showSuccess(data) {
    $('#errorMessage').css({ display: 'none' })

    const $successMessage = $('#successMessage');
    $successMessage.css({ display: 'block' })
    $successMessage.text(data.message);
}