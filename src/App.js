import { Login } from './component/login';
import './App.css';
import { Register } from './component/Register';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </>
  );
}

export default App;
