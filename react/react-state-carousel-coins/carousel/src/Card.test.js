import { render } from "@testing-library/react";
import Card from "./Card";

it('renders a card without crashing', () => {
    render(<Card />);
});

it('matches snapshot', () => {
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
});