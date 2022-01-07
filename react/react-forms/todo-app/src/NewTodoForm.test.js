import { fireEvent, render } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

it('renders without crashing', () => {
    render(<NewTodoForm />);
});

it('matches snapshot', () => {
    const { asFragment } = render(<NewTodoForm />);
    expect(asFragment()).toMatchSnapshot();
});

it('creates on form submit', () => {
    const createTodo = jest.fn();
    const { getByText } = render(<NewTodoForm createTodo={createTodo} />);
    const createBtn = getByText('Add Todo');
    fireEvent.click(createBtn);
    expect(createTodo).toHaveBeenCalled();
});