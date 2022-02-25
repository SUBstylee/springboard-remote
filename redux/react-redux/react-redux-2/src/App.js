import './App.css';

import Math from './components/Math/Math';
import NumberInputs from './components/NumberInputs/NumberInputs';
import Counter from './components/Counter/Counter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Math />
        <NumberInputs />
        <Counter />
      </header>
    </div>
  );
}

export default App;