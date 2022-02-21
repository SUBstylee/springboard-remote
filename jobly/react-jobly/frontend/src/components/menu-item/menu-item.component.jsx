import { withRouter } from 'react-router-dom';
import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match, logout }) => (
    <div className={`menu-item ${size}`} onClick={linkUrl === 'logout' ? logout : () => history.push(`${match.url}${linkUrl}`)}>
        <div className='background-image' style={{
            backgroundImage: `url(${imageUrl})`
        }} />
        <div className="content">
            <h1 className="title">{title.toUpperCase()}</h1>
        </div>
    </div >
);

export default withRouter(MenuItem);