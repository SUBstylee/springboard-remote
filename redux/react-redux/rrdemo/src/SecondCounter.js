import { useSelector, useDispatch } from "react-redux";

const SecondCounter = () => {
    const dispatch = useDispatch();
    const count = useSelector(store => store.count);

    const increment = () => dispatch({ type: 'INCREMENT' });
    const decrement = () => dispatch({ type: 'DECREMENT' });
    const reset = () => dispatch({ type: 'RESET' });

    return (
        <div>
            <h1>The count is : {count}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default SecondCounter;