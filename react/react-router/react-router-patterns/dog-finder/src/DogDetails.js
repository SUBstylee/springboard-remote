import { Route, Routes, Navigate, Link } from "react-router-dom";

const DogDetails = ({ dog }) => {

    if (!dog) return (
        <Routes>
            <Route path="*" element={<Navigate to='/dogs' />} />
        </Routes>
    );

    return (
        <div className="DogDetails row justify-content-center mt-5">
            <div className="col-11 col-lg-5">
                <div className="DogDetails-card card">
                    <img className="card-img-top" src={dog.src} alt={dog.name} />
                    <div className="card-body">
                        <h1 className="card-title">{dog.name}</h1>
                        <h3 className="card-subtitle text-muted">{dog.age} years old</h3>
                    </div>
                    <ul className="list-group list-group-flush">
                        {dog.facts.map((fact, i) => (
                            <li className="list-group-item" key={i}>{fact}</li>
                        ))}

                    </ul>
                    <div className="card-body">
                        <Link className="btn btn-dark" to='/dogs'>Go Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DogDetails;