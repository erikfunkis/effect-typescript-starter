import type { Todo } from '@template/shared';

type TodoListProps = {
  readonly todos: ReadonlyArray<Todo>;
  readonly isBusy: boolean;
  readonly onToggle: (todo: Todo) => Promise<void>;
  readonly onRemove: (todo: Todo) => Promise<void>;
};

export const TodoList = ({ todos, isBusy, onToggle, onRemove }: TodoListProps) => (
  <ul className="todo-list">
    {todos.map((todo) => (
      <li className="todo-list-item" key={todo.id}>
        <input
          aria-label={`Toggle ${todo.title}`}
          checked={todo.completed}
          disabled={isBusy}
          onChange={() => void onToggle(todo)}
          type="checkbox"
        />
        <span className={todo.completed ? 'todo-title todo-title-completed' : 'todo-title'}>
          {todo.title}
        </span>
        <button disabled={isBusy} onClick={() => void onRemove(todo)} type="button">
          Delete
        </button>
      </li>
    ))}
  </ul>
);
