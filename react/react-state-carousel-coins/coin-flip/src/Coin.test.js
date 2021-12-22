import Coin from "./Coin";
import { render } from "@testing-library/react";


it('renders without crashing', () => {
    render(<Coin info='heads' />)

});

it('matches snapshot', () => {
    const { asFragment } = render(<Coin />);
    expect(asFragment()).toMatchSnapshot();
});

it('shows heads', () => {
    const { queryByAltText } = render(<Coin info='heads' />);
    expect(queryByAltText('heads')).toBeInTheDocument();
    expect(queryByAltText('tails')).not.toBeInTheDocument();
});

it('shows tails', () => {
    const { queryByAltText } = render(<Coin info='tails' />);
    expect(queryByAltText('tails')).toBeInTheDocument();
    expect(queryByAltText('heads')).not.toBeInTheDocument();
});