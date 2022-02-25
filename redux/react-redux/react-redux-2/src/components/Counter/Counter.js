import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from '../../actions';

const Counter = () => {
    const dispatch = useDispatch();
    const count = useSelector(store => store.count);

    const up = () => dispatch(increment());
    const down = () => dispatch(decrement());
    const zero = () => dispatch(reset());

    return (
        <div>
            <h1>The count is : {count}</h1>
            <button onClick={up}>+</button>
            <button onClick={down}>-</button>
            <button onClick={zero}>Reset</button>
        </div>
    );
};

export default Counter;