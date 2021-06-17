$('input[type=range]').on('input', () => $('label span').text($('#rating').val()));

$('button#submit').on('click', function (e) {
    e.preventDefault();
    const inputVal = $('input').eq(0).val();
    console.log(inputVal);
    if (inputVal.length > 2) {
        $('ol').append(`<li class="movie"><span class="title">${$('input').eq(0).val()}</span><span class="rating">${$('input').eq(1).val()}</span><span
        class="remove">&#10060;</span></li>`);
        $('input').eq(0).val('');
    }
});

$('ol').on('click', 'span.remove', function () {
    $(this).parent('li').remove();
});

