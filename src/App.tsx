import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyle from "./global/styles";

import { RoutesApp } from "./routes";

function App() {
  return (
    <>
      <ToastContainer />
      <GlobalStyle />
      <RoutesApp />
    </>
  );
}

export default App;
