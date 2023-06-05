import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Board from "./components/Board/Board";

import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/:cardId" element={<Board />} />
      </Routes>
    </Router>
  );
}

export default App;
