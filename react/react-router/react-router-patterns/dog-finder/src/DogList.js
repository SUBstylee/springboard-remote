import { Link } from 'react-router-dom';
import './DogList.css';
// import { Link, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const DogList = ({ dogs }) => {

    return (
        <div className="DogList">
            <h1 className="display-1 text-center">DOG LIST!</h1>
            <div className="row justify-content-center">
                {dogs.map(dog => (

                    <div className="Dog col-lg-4 text-center" key={dog.name}>
                        <Link className='btn' to={`/dogs/${dog.name}`}>
                            <img className='mt-5' src={dog.src} alt={dog.name} />
                            <h3>{dog.name}</h3>
                        </Link>
                    </div>

                ))}
            </div>
        </div >
    );
};

export default DogList;