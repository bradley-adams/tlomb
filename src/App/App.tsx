/* src/App.js */
import React from "react";
import Amplify from "aws-amplify";
import Todo from "../Todo/Todo.tsx";
import "./App.scss";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

const App = () => {
  return (
    <div>
      <Authenticator>
        {({ signOut, user }) => (
          <div id="container">
            <h1>Hello {user.username}</h1>
            <button id="button" onClick={signOut}>
              Sign out
            </button>
            <br />
            <Todo />
          </div>
        )}
      </Authenticator>
    </div>
  );
};

export default App;
