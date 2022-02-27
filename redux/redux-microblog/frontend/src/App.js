import SiteRoutes from './routes/routes';
import './App.css';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <SiteRoutes />
    </div>
  );
}

export default App;
