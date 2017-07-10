$(document).ready(function () {
    $('.skillbar').tipsy({gravity: 'se', fade: true});
    $(".thumbs a").colorbox();

    //fast and simple stars ratings creation function
    var starsOrdinal = ['none', 'low', 'basic', 'intermediate', 'good', 'excellent'];
    var stars = [
        '&#9734&#9734&#9734&#9734&#9734', //0
        '&#9733&#9734&#9734&#9734&#9734', //1
        '&#9733&#9733&#9734&#9734&#9734', //2
        '&#9733&#9733&#9733&#9734&#9734', //3
        '&#9733&#9733&#9733&#9733&#9734', //4
        '&#9733&#9733&#9733&#9733&#9733' //5
    ];
    $('[data-stars]').each(function (i, el) {
        var numStars = $(el).data('stars');
        $(el).html('(' + stars[numStars] + ')');
        $(el).attr('title', starsOrdinal[numStars])
    });
});