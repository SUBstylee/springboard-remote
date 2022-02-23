import './App.css';
import FirstCounter from './FirstCounter';
import SecondCounter from './SecondCounter';
import ColorHeader from './ColorHeader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FirstCounter />
        <SecondCounter />
        <ColorHeader />
      </header>
    </div>
  );
};

export default App;
