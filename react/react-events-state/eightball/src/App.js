import './App.css';
import EightBall from './EightBall';
import Answers from './Answers';

function App() {
  return (
    <div>
      <EightBall answers={Answers} />
    </div>
  );
}

export default App;
