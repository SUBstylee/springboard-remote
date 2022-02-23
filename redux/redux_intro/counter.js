const h1 = document.getElementById('counter');
const incBtn = document.getElementById('increment');
const decBtn = document.getElementById('decrement');
const resBtn = document.getElementById('reset');
const dblBtn = document.getElementById('double');

incBtn.addEventListener('click', (e) => {
    store.dispatch({ type: 'INCREMENT' });
    const state = store.getState();
    updateCounter(state);
});
decBtn.addEventListener('click', (e) => {
    store.dispatch({ type: 'DECREMENT' });
    const state = store.getState();
    updateCounter(state);
});
resBtn.addEventListener('click', (e) => {
    store.dispatch({ type: 'RESET' });
    const state = store.getState();
    updateCounter(state);
});
dblBtn.addEventListener('click', (e) => {
    store.dispatch({ type: 'MULTIPLY', payload: 2 });
    const state = store.getState();
    updateCounter(state);
});

const updateCounter = (state) => {
    h1.innerText = state.count;
};