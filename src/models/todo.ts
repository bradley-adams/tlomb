import { ListTodosQuery, OnCreateTodoSubscription } from "../API";
import { GraphQLResult } from "@aws-amplify/api"; // Generated by the Amplify CLI

interface Todo {
  id?: string;
  name?: string;
  description?: string;
  author?: string;
}

// Maps and object from type GraphQLResult<ListTodosQuery> to an array of our ToDo.
function mapListTodosQuery(listTodosQuery: GraphQLResult<ListTodosQuery>): Todo[] {
  return listTodosQuery.data?.listTodos?.items?.map(todo => ({
    id: todo?.id,
    name: todo?.name,
    description: todo?.description,
    author: todo?.author
  } as Todo)) || []
}

// Mapping function for out ToDo model.
function mapOnCreateTodoSubscription(createTodoSubscription: OnCreateTodoSubscription): Todo {
  const { id, name, description, author } = createTodoSubscription.onCreateTodo || {};
  return {
    id, name, description, author
  } as Todo
}

export default Todo;
export { mapListTodosQuery, mapOnCreateTodoSubscription }