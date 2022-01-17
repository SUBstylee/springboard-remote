import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Eat from './Eat';
import Drink from './Drink';
import Navbar from './Navbar';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='eat' element={<Eat />} />
          <Route path='drink' element={<Drink />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
