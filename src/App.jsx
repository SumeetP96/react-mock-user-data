import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import "./App.css";

const Home = lazy(() => import("./views/home"));
const Users = lazy(() => import("./views/users"));

function App() {
  return (
    <div className="App">
      <TopBar />

      <Suspense fallback={<div className="loading" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
