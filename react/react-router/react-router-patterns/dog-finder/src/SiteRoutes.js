import { Route, Routes } from "react-router-dom";
import DogList from './DogList';
import FilterDogDetails from './FilterDogDetails';
import NotFound from './NotFound';
const SiteRoutes = ({ dogs }) => {

    return (
        <Routes>
            <Route path='/dogs' element={<DogList dogs={dogs} />} />
            <Route path='/dogs/:name/*' element={<FilterDogDetails dogs={dogs} />} />
            <Route path='*' element={<NotFound />} status={404} />
        </Routes>
    );
};

export default SiteRoutes;