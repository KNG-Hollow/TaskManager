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

export default function App() {
  const { appState } = UseAppState();

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={appState?.active ? <Home /> : <Login />} />
        <Route path="/home" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/logout" Component={Logout} />
        <Route path="/accounts/:id" Component={Account} />
        <Route path="/accounts" Component={Accounts} />
        <Route path="/tasks/:id" Component={Task} />
        <Route path="/tasks" Component={Tasks} />
        <Route path="/error" Component={Error} />
      </Routes>
      <Footer />
    </Router>
  );
}
