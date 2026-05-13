import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { Todo } from '@template/shared';
import { todoClient } from './api/client.js';
import { TodoComposer } from './components/TodoComposer.js';
import { TodoList } from './components/TodoList.js';

type SaveState = 'idle' | 'saving';
type AppError = string | null;

export const TodosFeature = () => {
  const [health, setHealth] = useState('Checking API health...');
  const [todos, setTodos] = useState<ReadonlyArray<Todo>>([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState<AppError>(null);
  const [saveState, setSaveState] = useState<SaveState>('idle');

  const isBusy = saveState === 'saving';

  const loadTodos = useMemo(() => () => todoClient.list(), []);

  useEffect(() => {
    void todoClient
      .health()
      .then((response) => {
        setHealth(`API healthy: ${response.service} ${response.version}`);
      })
      .catch((reason) => {
        setHealth(`API unreachable: ${reason instanceof Error ? reason.message : String(reason)}`);
      });

    void loadTodos()
      .then((items) => {
        setTodos(items);
      })
      .catch((reason) => {
        setError(reason instanceof Error ? reason.message : String(reason));
      });
  }, [loadTodos]);

  const submitTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim().length === 0 || isBusy) {
      return;
    }
    setSaveState('saving');
    setError(null);
    try {
      await todoClient.create(title.trim());
      setTitle('');
      setTodos(await loadTodos());
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setSaveState('idle');
    }
  };

  const toggleTodo = async (todo: Todo) => {
    if (isBusy) return;
    setSaveState('saving');
    setError(null);
    try {
      await todoClient.toggle(todo.id, !todo.completed);
      setTodos(await loadTodos());
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setSaveState('idle');
    }
  };

  const removeTodo = async (todo: Todo) => {
    if (isBusy) return;
    setSaveState('saving');
    setError(null);
    try {
      await todoClient.remove(todo.id);
      setTodos(await loadTodos());
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setSaveState('idle');
    }
  };

  return (
    <section>
      <p id="health-status">{health}</p>
      <TodoComposer isBusy={isBusy} onSubmit={submitTodo} onTitleChange={setTitle} title={title} />
      {error ? <p role="alert">Error: {error}</p> : null}
      <TodoList isBusy={isBusy} onRemove={removeTodo} onToggle={toggleTodo} todos={todos} />
    </section>
  );
};
