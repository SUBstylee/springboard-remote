import './App.css';

import NavBar from './NavBar';
import SiteRoutes from './SiteRoutes';
import { BrowserRouter } from 'react-router-dom';
import whiskey from './assets/img/whiskey.jpg';
import duke from './assets/img/duke.jpg';
import perry from './assets/img/perry.jpg';
import tubby from './assets/img/tubby.jpg';

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar dogs={props.dogs} />
        <div className='container'>
          <SiteRoutes dogs={props.dogs} />
        </div>
      </BrowserRouter>
    </div>
  );
};

App.defaultProps = {
  dogs: [
    {
      name: "Whiskey",
      age: 5,
      src: whiskey,
      facts: [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!"
      ]
    },
    {
      name: "Duke",
      age: 3,
      src: duke,
      facts: [
        "Duke believes that ball is life.",
        "Duke likes snow.",
        "Duke enjoys pawing other dogs."
      ]
    },
    {
      name: "Perry",
      age: 4,
      src: perry,
      facts: [
        "Perry loves all humans.",
        "Perry demolishes all snacks.",
        "Perry hates the rain."
      ]
    },
    {
      name: "Tubby",
      age: 4,
      src: tubby,
      facts: [
        "Tubby is really stupid.",
        "Tubby does not like walks.",
        "Angelina used to hate Tubby, but claims not to anymore."
      ]
    }
  ]
};

export default App;
