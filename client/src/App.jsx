import { useState, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import LayoutLoader from "./components/layout/Loader";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Group"));
const NotFound = lazy(() => import("./pages/NotFound"));

let user = true;

function App() {
  return (
    <Router>
      <Suspense fallback={<div><LayoutLoader/></div>}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/group" element={<Group />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
