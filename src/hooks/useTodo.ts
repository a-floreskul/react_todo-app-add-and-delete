import { useEffect, useState } from 'react';
import { getTodos, addTodo, USER_ID } from '../api/todos';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

function getFilteredTodos(todos: Todo[], filter: Filter) {
  switch (filter) {
    case Filter.Active:
      return todos.filter(todo => !todo.completed);
    case Filter.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [tmpTodo, setTmpTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER_ID]);

  useEffect(() => {
    if (!errorMessage) {
      return undefined;
    }

    const timerId = setTimeout(() => setErrorMessage(''), 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  const visibleTodos = getFilteredTodos(todos, filter);
  const activeCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  const createTodo = (title: string) => {
    const data = {
      userId: USER_ID,
      title: title,
      completed: false,
    };

    setTmpTodo({ ...data, id: 0 });

    return addTodo(data)
      .then(newTodo => {
        setTodos(currentTodos => [...currentTodos, newTodo]);
        setTmpTodo(null);
      })
      .catch(() => setErrorMessage('Unable to add a todo'));
  };

  return {
    todos,
    visibleTodos,
    activeCount,
    hasCompleted,
    filter,
    setFilter,
    errorMessage,
    setErrorMessage,
    createTodo,
    tmpTodo,
  };
};
