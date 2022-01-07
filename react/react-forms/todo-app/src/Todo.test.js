import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';

it('renders without crashing', () => {
    render(<Todo />);
});

it('matches snapshot', () => {
    const { asFragment } = render(<Todo />);
    expect(asFragment()).toMatchSnapshot();
});

it('matches snapshot when editing', () => {
    const { asFragment, getByRole } = render(<Todo />);
    const editBtn = getByRole('button', { name: /edit/ });
    fireEvent.click(editBtn);
    expect(asFragment()).toMatchSnapshot();
});

it('updates on form submit', () => {
    const updateTodo = jest.fn();
    const { getByRole, getByText } = render(<Todo update={updateTodo} />);
    const editBtn = getByRole('button', { name: /edit/ });
    fireEvent.click(editBtn);
    const updateBtn = getByText('Save Changes');
    fireEvent.click(updateBtn);
    expect(updateTodo).toHaveBeenCalled();
});

it('deletes todo on delete button click', () => {
    const removeTodo = jest.fn();
    const { getByRole } = render(<Todo remove={removeTodo} />);
    const deleteBtn = getByRole('button', { name: /delete/ });
    fireEvent.click(deleteBtn);
    expect(removeTodo).toHaveBeenCalled();
});