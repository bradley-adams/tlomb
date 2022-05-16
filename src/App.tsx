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
        // Call the GraphQl API with our rapper callGraphQL(). Defines the generic type as ListTodosQuery
        const todoData = await callGraphQL<ListTodosQuery>(listTodos);
        // The result being passed to the mapListTodos function which will return the ToDos as an array.
        const todos = mapListTodosQuery(todoData);
        setTodos(todos);
      } catch (error) {
        console.error("Error fetching todos", error);
      }
    }
    getData();
  }, []);

  // // handle the subscription
  // useEffect(() => {
  //   // Api.graphql(...) funciton return type is from Promise<GraphQLResult> | Observable<object>
  //   // Only the Observable has the subscribe function.
  //   // @ts-ignore (without this compiler would complain that subscribe does not exist on type Promise<GraphQLResult> | Observable<object>)
  //   const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
  //     // subscribe function itself takes an object as an argument with a next property, which needs a function that gets called whenever a new ToDo is created.
  //     // The Parameter of the function is of type SubscriptionValue<OnCreateTodoSubscription>
  //     next: (response: SubscriptionValue<OnCreateTodoSubscription>) => {
  //       // Pass response.value.data to the mapOnCreateTodoSubscription function which will retirn the ToDo.
  //       const todo = mapOnCreateTodoSubscription(response.value.data);
  //       console.log(todo);
  //       // The state is update with the new Todo.
  //       setTodos([...todos, todo]);
  //     },
  //   });
  //   // subscription is unsubscribed when the component gets unmounted to avoid memory leak
  //   return () => subscription.unsubscribe()
  // });
     
  // onCreateTodoHandler is calling the mapping funcitno and updateing the state with the new ToDo.
  const onCreateTodoHandler = (
    createTodoSubscription: OnCreateTodoSubscription
  ) => {
    const todo = mapOnCreateTodoSubscription(createTodoSubscription);
    setTodos([...todos, todo]);
  };

  useEffect(() => {
    // call sbscriberGraphQL wrapper func passing the onCreateTodo subscription and our onCreateTodoHandler
    const subscription = subscribeGraphQL<OnCreateTodoSubscription>(
      onCreateTodo,
      onCreateTodoHandler
    );
    // subscription is unsubscribed when the component gets unmounted
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

