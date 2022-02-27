import { Routes, Route } from 'react-router-dom';
import NewPost from '../components/NewPost/NewPost';
import Home from '../components/Home/Home';
import NotFound from '../components/NotFound/NotFound';
const SiteRoutes = () => {

    return (
        <div className="Routes">
            <Routes>
                <Route path='/new' element={<NewPost />} />
                <Route path='/' element={<Home />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    )
};

export default SiteRoutes;