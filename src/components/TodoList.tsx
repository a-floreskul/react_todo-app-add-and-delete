import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  currentTodo: Todo | null;
};
export const TodoList: React.FC<Props> = ({ todos, currentTodo = null }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {currentTodo && <TodoItem todo={currentTodo} isLoading={true} />}
    </section>
  );
};
