import { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

function BoxList(props) {
    const [boxes, setBoxes] = useState([]);

    const create = (boxObj) => {
        setBoxes(boxes => [...boxes, boxObj]);
    };

    const remove = (id) => {
        setBoxes(boxes.filter(box => box.id !== id));
    };

    return (
        <div>
            <h1>Color Box Maker</h1>
            <NewBoxForm create={create} />
            {boxes.map(box => <Box key={box.id} id={box.id} width={box.width} height={box.height} color={box.color} removeBox={() => remove(box.id)} />)}
        </div>
    );
};

export default BoxList;