import { Link } from "react-router-dom";

const ColorList = ({ colors }) => {
    const colorLinks = Object.keys(colors).map(color => (
        <li key={color}>
            <Link to={`/colors/${color}`}>{color}</Link>
        </li>
    ))
    return (
        <div>
            <h1>Color Factory</h1>
            <Link to='/colors/new'>Add a new color!</Link>
            <p>Pick a color!</p>
            <ul>{colorLinks}</ul>
        </div>
    );
};

export default ColorList;