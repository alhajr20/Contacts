import { BrowserRouter,  Route, Routes  } from "react-router-dom";

import './App.css';
import Contacts from './components/contacts';
import Login from "./components/login";
import SignUp from "./components/sign-up";

import { useSelector } from "react-redux";
import Header from "./components/header";

const App = () => {
  const { user } = useSelector(state => state.authReducer);

  return (
    <BrowserRouter>
      {user.activated ? <Header/> : ''}
      <div className='App'>
        <Routes>
          <Route index path="/" element={<Contacts/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;