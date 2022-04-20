import React, { useState, useEffect } from "react";
import { listTodos } from "./graphql/queries";
import { ListTodosQuery } from "./API";
import Todo, { mapListTodos } from "./models/todo";

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

function App() {
  const [todos, setTodos] = useState<Todo[]>();

  useEffect(() => {
    async function getData() {
      try {
        const todoData = await callGraphQL<ListTodosQuery>(listTodos);
        const todos = mapListTodos(todoData);
        setTodos(todos);
      } catch (error) {
        console.error("Error fetching todos", error);
      }
    }
    getData();
  }, []);

  return (
    <div className="App">
      {todos?.map((t) => (
        <div key={t.id}>
          <h2>{t.name}</h2>
          <p>{t.description}</p>
        </div>
      ))}
    </div>
  );
}