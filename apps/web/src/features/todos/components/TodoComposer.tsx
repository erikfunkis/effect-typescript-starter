import type { FormEvent } from 'react';

type TodoComposerProps = {
  readonly title: string;
  readonly isBusy: boolean;
  readonly onTitleChange: (title: string) => void;
  readonly onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export const TodoComposer = ({ title, isBusy, onTitleChange, onSubmit }: TodoComposerProps) => (
  <form className="todo-composer" onSubmit={(event) => void onSubmit(event)}>
    <input
      aria-label="New todo title"
      disabled={isBusy}
      onChange={(event) => onTitleChange(event.target.value)}
      placeholder="Add a todo title"
      value={title}
    />
    <button disabled={isBusy || title.trim().length === 0} type="submit">
      Add
    </button>
  </form>
);
