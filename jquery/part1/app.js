$(() => console.log(`Let's get ready to party with jQuery!`));
$('article img').addClass('image-center');
$('p:last-of-type').remove();
$('#title').css('font-size', `${Math.floor(Math.random() * 101)}px`);
$('ol').append('<li>Another one.</li>');
$('aside').empty().append(`<p>Apologies for overusing lists.  Won't happen again</p>`);
$('input').on('input', function () {
    $('body').css('background-color', `rgb(${$('input').eq(0).val()},${$('input').eq(1).val()},${$('input').eq(2).val()})`)
});
$('img').on('click', function () {
    $(this).remove();
});