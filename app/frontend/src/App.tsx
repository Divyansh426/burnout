import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Leaderboard from "./pages/Leaderboard";
import Team from "./pages/Team";
import Creators from "./pages/Creators";
import Sponsors from "./pages/Sponsors";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/team" element={<Team />} />
      <Route path="/creators" element={<Creators />} />
      <Route path="/sponsors" element={<Sponsors />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
