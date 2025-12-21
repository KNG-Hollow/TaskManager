import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { UseAppState } from './context/Context';
import Navigation from './components/utility/Navigation';
import Footer from './components/utility/Footer';
import Login from './components/LoginForm';
import Home from './components/Home';
import Error from './components/utility/Error';
import Account from './components/accounts/ViewAccount';
import Accounts from './components/accounts/Accounts';
import Task from './components/tasks/ViewTask';
import Tasks from './components/tasks/Tasks';
import Logout from './components/utility/Logout';
import CreateAccountForm from './components/accounts/CreateAccountForm';
import CreateTaskForm from './components/tasks/CreateTaskForm';
import EditAccountForm from './components/accounts/EditAccountForm';
import EditTaskForm from './components/tasks/EditTaskForm';

export default function App() {
  const { appState } = UseAppState();

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={appState?.active ? <Home /> : <Login />} />
        <Route path="/home" element={appState?.active ? <Home /> : <Login />} />
        <Route path="/login" Component={Login} />
        <Route path="/logout" Component={Logout} />
        <Route path="/create-account" Component={CreateAccountForm} />
        <Route path="/edit-account/:id" Component={EditAccountForm} />
        <Route path="/accounts/:id" Component={Account} />
        <Route path="/accounts" Component={Accounts} />
        <Route path="/create-task" Component={CreateTaskForm} />
        <Route path="/edit-task/:id" Component={EditTaskForm} />
        <Route path="/tasks/:id" Component={Task} />
        <Route path="/tasks" Component={Tasks} />
        <Route path="/error" Component={Error} />
      </Routes>
      <Footer />
    </Router>
  );
}
