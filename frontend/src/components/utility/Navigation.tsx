import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/accounts">Accounts</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
      </ul>
    </nav>
  );
}
