import React, { useState, FormEvent } from "react";
import callGraphQL from "../models/graphql-api";

import { createTodo } from "../graphql/mutations";
import { CreateTodoMutation, CreateTodoMutationVariables } from "../API";

const CreateTodo = () => {
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [author, setAuthor] = useState<string>();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!!name && !!description && !!author) saveTodo(name, description, author);

    setName("");
    setDescription("");
    setAuthor("");
  };

  const saveTodo = async (name: string, description: string, author: string) => {
    try {
      // to send a mutation the wrapper can be reused.
      const response = await callGraphQL<CreateTodoMutation>(createTodo, {
        input: { name, description, author },
      } as CreateTodoMutationVariables);
    } catch (error) {
      console.error("Error creating todo", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          ToDo Name:
          <input
            id="name"
            name="name"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          ToDo Description:
          <input
            id="description"
            name="description"
            type="text"
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          ToDo Author:
          <input
            id="author"
            name="author"
            type="text"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </label>
      </div>
      <button type="submit">Save Todo</button>
    </form>
  );
};

export default CreateTodo;