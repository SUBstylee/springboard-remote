import { useSelector } from "react-redux";

const FirstCounter = () => {
    const count = useSelector(store => store.count);
    return (
        <div>
            <h1>The count is : {count}</h1>
        </div>
    );
};

export default FirstCounter;