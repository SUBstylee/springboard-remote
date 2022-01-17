import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Drink from './Drink';
import Snack from './Snack';
import Tbd from './Tbd';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/drink' element={<Drink />} />
          <Route path='/snack' element={<Snack />} />
          <Route path='/tbd' element={<Tbd />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
