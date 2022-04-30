import React, { useState, useEffect } from "react";
import "./App.css";
import { listTodos } from "./graphql/queries";
import { ListTodosQuery, OnCreateTodoSubscription } from "./API";
import Todo, {
  mapListTodosQuery,
  mapOnCreateTodoSubscription,
} from "./models/todo";
import callGraphQL, { subscribeGraphQL } from "./models/graphql-api";
import CreateTodo from "./components/create-todo";
import { onCreateTodo } from "./graphql/subscriptions";

// Import Amplify and configure it.
import Amplify from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

function App() {
  // Create a state which contains Todos with the useState<Todo[]> Hook.
  const [todos, setTodos] = useState<Todo[]>([]);

  // useEffet is used to call the API initally.
  useEffect(() => {
    // Since the API call is asynchronous we define an asyc function getData()
    async function getData() {
      try {
        // Call the GraphQl API with our rapper callGraphQL().
        const todoData = await callGraphQL<ListTodosQuery>(listTodos);
        const todos = mapListTodosQuery(todoData);
        setTodos(todos);
      } catch (error) {
        console.error("Error fetching todos", error);
      }
    }
    getData();
  }, []);

  const onCreateTodoHandler = (
    createTodoSubscription: OnCreateTodoSubscription
  ) => {
    const todo = mapOnCreateTodoSubscription(createTodoSubscription);
    setTodos([...todos, todo]);
  };

  useEffect(() => {
    const subscription = subscribeGraphQL<OnCreateTodoSubscription>(
      onCreateTodo,
      onCreateTodoHandler
    );

    return () => subscription.unsubscribe();
  }, [todos]);

  return (
    <div className="App">
      <CreateTodo />

      <h2>Todos:</h2>
      {todos?.map((t) => (
        <div key={t.id}>
          <h2>{t.name}</h2>
          <p>{t.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

