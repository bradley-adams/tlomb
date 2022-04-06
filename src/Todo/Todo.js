import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
import { listTodos } from "../graphql/queries";

import "@aws-amplify/ui-react/styles.css";
import "./Todo.scss";

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

const initialState = { name: "", description: "" };

const Todo = () => {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return (
    <div id="container">
      <h2>Amplify Todos</h2>
      <input
        onChange={(event) => setInput("name", event.target.value)}
        id="input"
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={(event) => setInput("description", event.target.value)}
        id="input"
        value={formState.description}
        placeholder="Description"
      />
      <button id="button" onClick={addTodo}>
        Create Todo
      </button>
      {todos.map((todo, index) => (
        <div id="todo" key={todo.id ? todo.id : index}>
          <p id="todoName">{todo.name}</p>
          <p id="todoDescription">{todo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Todo;
