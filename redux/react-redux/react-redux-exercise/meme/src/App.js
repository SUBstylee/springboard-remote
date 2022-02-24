import './App.css';

import { useSelector, useDispatch } from 'react-redux';

import Meme from './components/Meme/Meme';
import NewMemeForm from './components/NewMemeForm/NewMemeForm';

function App() {
  const memes = useSelector(state => state.memes);
  const dispatch = useDispatch();

  const addMeme = (newMeme) => {
    dispatch({ type: 'ADD_MEME', meme: newMeme });
  };

  const deleteMeme = (id) => {
    dispatch({ type: 'DELETE_MEME', id });
  };

  const memeList = memes.map(m => (
    <Meme
      key={m.id}
      topText={m.topText}
      bottomText={m.bottomText}
      url={m.url}
      deleteMeme={() => deleteMeme(m.id)}
    />
  ));

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meme Maker</h1>
        <NewMemeForm addMeme={addMeme} />
        {memeList}
      </header>
    </div>
  );
};

export default App;
