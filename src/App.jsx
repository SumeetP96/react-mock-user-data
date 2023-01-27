import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Users from "./views/Users";

function App() {
  return (
    <div className="App">
      <TopBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
