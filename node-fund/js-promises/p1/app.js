const favNum = 42;
const apiUrl = 'http://numbersapi.com/';
const multNums = [1, 3, 5, 8, 15, 22, 700, 850, 1000];

$('#multNums').text(`${multNums} list of facts.`);
$('#fourFacts').text(`Four facts about ${favNum}.`);

$.getJSON(`${apiUrl}${favNum}?json`)
    .then(data => $('#favNum').text(`${data.text}`));

$.getJSON(`${apiUrl}${multNums}?json`)
    .then(data => {
        for (let i = 0; i < multNums.length; i++) {
            $('#multNumsLst').append(`<li>${data[multNums[i]]}</li>`);
        };
    });

Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${apiUrl}${favNum}?json`)))
    .then(data => {
        for (let i = 0; i < 4; i++) {
            $('#fourFactsLst').append(`<li>${data[i].text}</li>`);
        };
    });
