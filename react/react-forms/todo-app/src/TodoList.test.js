import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

function addTodo(todoList, task = "this is a test") {
    const todoInput = todoList.getByLabelText("New Todo");
    fireEvent.change(todoInput, { target: { value: task } });
    const submitBtn = todoList.getByText("Add Todo");
    fireEvent.click(submitBtn);
}

it('renders without crashing', () => {
    render(<TodoList />);
});

it('matches snapshot', () => {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it('can add todo', () => {
    const list = render(<TodoList />);
    addTodo(list);
    //form should clear and todo added to page
    expect(list.getByLabelText('New Todo')).toHaveValue('');
    expect(list.getByText('this is a test')).toBeInTheDocument();
    expect(list.getByRole('button', { name: /edit/ })).toBeInTheDocument();
    expect(list.getByRole('button', { name: /delete/ })).toBeInTheDocument();
});

it('can edit a todo', () => {
    const list = render(<TodoList />);
    addTodo(list);
    fireEvent.click(list.getByRole('button', { name: /edit/ }));
    const editInput = list.getByDisplayValue('this is a test');
    fireEvent.change(editInput, { target: { value: 'edited' } });
    fireEvent.click(list.getByText('Save Changes'));
    //text in todo should have changed
    expect(list.getByText('edited')).toBeInTheDocument();
    expect(list.queryByText('this is a test')).not.toBeInTheDocument();
});

it('can delete a todo', () => {
    const list = render(<TodoList />);
    addTodo(list);
    fireEvent.click(list.getByRole('button', { name: /delete/ }));
    //todo should be deleted
    expect(list.queryByText('this is a test')).not.toBeInTheDocument();
});