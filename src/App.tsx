import "./App.css";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RankingPage from "./pages/RankingPage";
import Wind from "./pages/elements/Wind";
import Water from "./pages/elements/Water";
import Fire from "./pages/elements/Fire";
import Earth from "./pages/elements/Earth";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/elements/wind" element={<Wind />} />
        <Route path="/elements/water" element={<Water />} />
        <Route path="/elements/fire" element={<Fire />} />
        <Route path="/elements/earth" element={<Earth />} />
      </Routes>
    </Router>
  );
}

export default App;
