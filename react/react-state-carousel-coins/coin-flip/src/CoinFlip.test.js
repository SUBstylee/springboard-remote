
import { fireEvent, render } from "@testing-library/react";
import CoinFlip from "./CoinFlip";

// make sure we get numbers we want for tests instead of random
// this will make first click 'heads'--index[0], second click 'tails'--index[1]
beforeEach(function () {
    jest
        .spyOn(Math, "random")
        .mockReturnValueOnce(0.25)
        .mockReturnValueOnce(0.75);
});

afterEach(function () {
    Math.random.mockRestore();
});

it('renders without crashing', () => {
    render(<CoinFlip />);
});

it('matches snapshot', () => {
    const { asFragment } = render(<CoinFlip />);
    expect(asFragment()).toMatchSnapshot();
});

it('correctly displays coin and values on button press', () => {
    const { queryByRole, getByText, queryByAltText } = render(<CoinFlip />);
    // get the text for number of flips. this will fail giving asignment error if not on page or numbers are wrong, so it acts as a test that number of flips (across all) starts at zero.
    const flips = getByText('Out of 0 flips, there have been 0 heads and 0 tails.');
    // check that image is not displayed on page load
    expect(queryByRole('image')).not.toBeInTheDocument();
    // check that image appears and is heads on first button click
    fireEvent.click(getByText('Flip the coin!'))
    expect(queryByAltText('heads')).toBeInTheDocument();
    // check that the text for number of flips updates (1 total, 1 heads, 0 tails)
    expect(flips).toHaveTextContent('Out of 1 flips, there have been 1 heads and 0 tails.');
    // check that image appears and is tails on second button click
    fireEvent.click(getByText('Flip the coin!'))
    expect(queryByAltText('tails')).toBeInTheDocument();
    // check that the text for number of flips updates (2 total, 1 heads, 1 tails)
    expect(flips).toHaveTextContent('Out of 2 flips, there have been 1 heads and 1 tails.');

});

