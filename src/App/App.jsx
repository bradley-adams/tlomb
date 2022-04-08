/* src/App.js */
import React from "react";
import Amplify from "aws-amplify";
import Todo from "../Todo/Todo";
import "./App.scss";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

const App = () => {
  return (
    <div>
      <header>
        <button
          class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit MuiIconButton-edgeStart MuiIconButton-sizeMedium sc-jOxtWs kRLcZJ css-1a1y772"
          tabindex="0"
          type="button"
          aria-label="open drawer"
        >
          <img src = "https://tipping.super.rugby/static/media/logoRegistration.227f441a74c760caf5d3d25dff18de3e.svg" alt="Super Rugby Pacific Tipping Logo"/>
        </button>
      </header>
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
