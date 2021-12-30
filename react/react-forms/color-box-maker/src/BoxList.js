import { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

function BoxList(props) {
    const [boxes, setBoxes] = useState([]);

    const create = (boxObj) => {
        setBoxes(boxes => [...boxes, boxObj]);
    };

    return (
        <div>
            <h1>Color Box Maker</h1>
            <NewBoxForm createBox={create} />
            {boxes.map(box => <Box width={box.width} height={box.height} color={box.color} />)}
        </div>
    );
};

export default BoxList;