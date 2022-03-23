import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/Form";
import OrgChart from "./components/OrgChart";

export default function App() {
  const [formData, setFormData] = useState([]);

  const childToParent = (data) => {
    console.log(data)
    setFormData(data)
  }

  return (
    <div className="App">
      <Form childToParent={childToParent} />

      <OrgChart formData={formData} />
    </div>
  );
}

/* src/App.js */
// import Todo from './todo/todo';

// import { Authenticator } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";

// const App = () => {
//   return (
//     <Authenticator>
//       {({ signOut, user }) => (
//         <div style={styles.container}>
//           <h1>Hello {user.username}</h1>
//           <button style={styles.button} onClick={signOut}>
//             Sign out
//           </button>
//           <Todo />
//         </div>
//       )}
//     </Authenticator>
//   );
// };

// const styles = {
//   container: {
//     width: 400,
//     margin: "0 auto",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     padding: 20,
//   },
//   todoName: { fontSize: 20, fontWeight: "bold" },
//   todoDescription: { marginBottom: 0 },
//   button: {
//     backgroundColor: "black",
//     color: "white",
//     outline: "none",
//     fontSize: 18,
//     padding: "12px 0px",
//   },
// };

// export default App;
