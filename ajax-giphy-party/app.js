// key: 57LY3SbkXjMDldaYKmcEwBKI59w2QFHI

const $searchInput = $('#searchInput');
const $imgContainer = $('#imgContainer');

function appendImg(res) {
    let resLength = res.data.length;
    if (resLength) {//this will check that the search returned results, and that the input was not empty
        let randomGif = Math.floor(Math.random() * resLength);
        let $newCol = $('<div>', { class: 'col-md-4 col-12, my-3' });
        let $newGif = $('<img>', { src: res.data[randomGif].images.original.url, class: 'w-100' });
        $newCol.append($newGif);
        $imgContainer.append($newCol);
    }
}

//this will get an array matching search term
$('#search').on('click', async function (e) {
    e.preventDefault();
    let searchTerm = $searchInput.val();
    $searchInput.val('');
    const res = await axios.get('http://api.giphy.com/v1/gifs/search', {
        params: { q: searchTerm, api_key: '57LY3SbkXjMDldaYKmcEwBKI59w2QFHI' }
    });
    appendImg(res.data);
    // console.log(res.data);
});
//this will get an array of the currently trending gifs
$('#trending').on('click', async function (e) {
    e.preventDefault();
    const res = await axios.get('http://api.giphy.com/v1/gifs/trending', {
        params: { api_key: '57LY3SbkXjMDldaYKmcEwBKI59w2QFHI' }
    });
    appendImg(res.data);
    // console.log(res.data);
});
//this will empty the imgContainer
$('remove').on('click', function (e) {
    e.preventDefault();
    $imgContainer.empty();
    // console.log('remove clicked');
});
