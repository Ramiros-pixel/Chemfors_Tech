import Login from "./components/login";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import Register from "./components/register";
import Documentation from "./components/documentation";
import Calculate from "./components/calculate";
import History from "./components/history";
import Account from "./components/account";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Dashboard" element={<><Navbar /><Dashboard /></>} />
        <Route path="/documentation" element={<><Navbar /><Documentation /></>} />
        <Route path="/calculate" element={<><Navbar /><Calculate /></>} />
        <Route path="/history" element={<><Navbar /><History /></>} />
        <Route path="/account" element={<><Navbar /><Account /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
