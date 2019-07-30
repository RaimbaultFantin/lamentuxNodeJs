//jquery code
$(document).ready(function () {

    $('#send').on('click', function (e) {
        e.preventDefault(e);
        $.ajax({
            type: 'POST',
            url: '/home', // url is : http://localhost:3000 , param (here) = '/signup' so : url+param = http://localhost:3000/signup
            // send data to server
            data:
            {
                message: $('#message').val()
            },

            success: function (data) {
                $('.back-input').after(
                    "<div class='container tweet-box'><div class='row row-box'><div class='col-md-2 left-tweet'><div class='rounded-circle photo-profil-tweet'></div> </div> <div class='col-md-10 main-tweet'> <div class='row info-tweet'><p> <strong class='pseudo-tweet'>" + data.user.pseudo + "</strong> <span class='tag-tweet'>@beta</span> <span class='date-tweet'>" + data.tweet_date + "</span></p></div><div class='row tweet-message'> <p>" + data.tweet_message + "</p></div></div></div></div>"
                );
                $('#message').val('');

            },

            error: function (err) {
                console.log(err);
            }
        })
    })

    $('.follow').on('click', function (e) {
        e.preventDefault(e);
        var userId = $(this).attr("name").replace(/ /g,"-");
        $.ajax({
            url:'/home/add-follow/'+userId,
            type: "PUT",
            contentType: "application/json",
            data: userId,
            success: function () {
                console.log("succes")
            },

            error: function (err) {
                console.log(err);
            }
        })
    })
});
