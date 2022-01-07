import { render, fireEvent, wait } from "@testing-library/react";
import BoxList from "./BoxList";

function addBox(boxList, height = '100', width = '100', color = 'red') {
    const heightInput = boxList.getByLabelText("Height");
    const widthInput = boxList.getByLabelText('Width');
    const colorInput = boxList.getByLabelText('Color');
    fireEvent.change(colorInput, { target: { value: color } });
    fireEvent.change(widthInput, { target: { value: width } });
    fireEvent.change(heightInput, { target: { value: height } });
    const button = boxList.getByText("MAKE A BOX!");
    fireEvent.click(button);
}

it('renders without crashing', () => {
    render(<BoxList />);
});

it('matches snapshot', () => {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
});

it('can add a new box', () => {
    const boxList = render(<BoxList />);
    //no box on intial page load
    expect(boxList.queryByText('X')).not.toBeInTheDocument();
    //add a box
    addBox(boxList);
    //check if there is a box
    const removeBtn = boxList.getByText('X');
    expect(removeBtn).toBeInTheDocument();
    expect(removeBtn.previousSibling).toHaveStyle(`
    width: 100;
    height: 100;
    backgroundColor: red;
  `);
    //input fields should be empty after new box is made
    expect(boxList.getAllByDisplayValue('')).toHaveLength(3);
});

it('can remove a box', () => {
    const boxList = render(<BoxList />);
    addBox(boxList);
    const removeBtn = boxList.getByText('X');
    //button will remove box
    fireEvent.click(removeBtn);
    expect(removeBtn).not.toBeInTheDocument();
});
