import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Footer from "./components/Footer";
import Login from "./components/LoginForm";
import Home from "./components/Home";
import Error from "./components/Error";
import Account from "./components/Account";
import Accounts from "./components/Accounts";
import Task from "./components/Task";
import Tasks from "./components/Tasks";

export default function App() {
  return (
    <Router>
      <Navigation />
      <Route path="/" Component={Home} />
      <Route path="/login" Component={Login} />
      <Route path="/accounts/:id" Component={Account} />
      <Route path="/accounts" Component={Accounts} />
      <Route path="/tasks/:id" Component={Task} />
      <Route path="/tasks" Component={Tasks} />
      <Route Component={Error} />
      <Footer />
    </Router>
  );
}
