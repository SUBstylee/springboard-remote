import Box from "./Box";
import './BoxContainer.css'

const BoxContainer = (props) => {
    const boxes = Array.from({ length: props.numBoxes }).map(() => <Box colors={props.allColors} />)
    return (
        <div className="BoxContainer">
            {boxes}
        </div>
    );
};

BoxContainer.defaultProps = {
    numBoxes: 18,
    allColors: ['#C0C0C0', '#808080', '#800000', '#808000', '#00FF00', '#00FFFF', '#008080', '#FF00FF', '#800080 ', '#FF7F50', '#FFFACD', '#EEE8AA', '#228B22', '#2E8B57', '#87CEFA', ' #4682B4', '#FFEBCD', '#D2691E', '#A52A2A', '#FFE4B5', '#FFFFE0', '#FF6347', '#E9967A', '#BDB76B', '#7CFC00', '#98FB98']
};

export default BoxContainer;