const store = Redux.createStore(moodReducer);
const mood = document.getElementById('mood');
const container = document.getElementById('container');

const moodObj = {
    1: { type: 'HAPPY', payload: ['٩(◕‿◕｡)۶', 'yellow'] },
    2: { type: 'SAD', payload: ['ಥ﹏ಥ', 'blue'] },
    3: { type: 'ANGRY', payload: ['٩(ఠ益ఠ)۶', 'red'] },
    4: { type: 'CONFUSED', payload: ['ლ(ಠ_ಠ ლ', 'green'] }
};

document.getElementById('happy').addEventListener('click', () => {
    store.dispatch(moodObj[1]);
});

document.getElementById('sad').addEventListener('click', () => {
    store.dispatch(moodObj[2]);
});

document.getElementById('angry').addEventListener('click', () => {
    store.dispatch(moodObj[3])
});

document.getElementById('confused').addEventListener('click', () => {
    store.dispatch(moodObj[4]);
});

document.getElementById('random').addEventListener('click', () => {
    store.dispatch(moodObj[Math.floor(Math.random() * 4 + 1)]);
});

function updateMood() {
    mood.innerText = store.getState().face[0];
    container.style.backgroundColor = store.getState().face[1];
};

updateMood();
store.subscribe(updateMood);