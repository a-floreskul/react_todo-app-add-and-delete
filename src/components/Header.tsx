import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  allCompleted: boolean;
  onAdd: (title: string) => Promise<boolean>;
  onError: (message: string) => void;
};

export const Header: React.FC<Props> = ({ allCompleted, onAdd, onError }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      onError('Title should not be empty');

      return;
    }

    const isSuccess = await onAdd(trimmedTitle);

    if (isSuccess) {
      setTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: allCompleted,
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
