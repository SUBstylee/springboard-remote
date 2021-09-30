
const apiUrl = 'http://deckofcardsapi.com/api/deck/'

let deckId = null;
const $dealButton = $('#dealButton');
const $cardContainer = $('#cardContainer');

$.getJSON(`${apiUrl}/new/shuffle`)
    .then(data => { deckId = data.deck_id; $dealButton.toggleClass('hidden') });

$dealButton.on('click', () => {
    $.getJSON(`${apiUrl}${deckId}/draw/`)
        .then(data => {
            const cardImg = data.cards[0].image;
            const angle = Math.random() * 90 - 45;
            const randX = Math.random() * 40 - 20;
            const randY = Math.random() * 40 - 20;
            $cardContainer.append($('<img>', { src: cardImg, css: { transform: `translate(${randX}px, ${randY}px) rotate(${angle}deg)` } }));
            $('#cardCounter').text(`Cards remaining: ${data.remaining}`);
            if (data.remaining === 0) $dealButton.toggleClass('hidden');
        });
});