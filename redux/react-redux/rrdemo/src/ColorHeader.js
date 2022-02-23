import { useSelector } from "react-redux";

const ColorHeader = () => {
    const color = useSelector(store => store.color);

    return (
        <div>
            <h1 style={{ color }}>The color is : {color}</h1>
        </div>
    );
};

export default ColorHeader;