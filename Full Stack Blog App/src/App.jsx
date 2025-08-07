import { Routes, Route } from "react-router-dom";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

import Home from "./pages/home.jsx";
import SinglePostpage from "./pages/singlePostpage.jsx";
import Write from "./pages/write.jsx";
import Listpage from "./pages/postListPage.jsx";
import SingleNew from "./components/singlenew.jsx";
import About from "./pages/about.jsx";

const ProtectedRoute = ({ children }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
);

const App = () => {
  return (
    <div className="p-4 md:px-8 lg:px-[60px] xl:px-[100px] 2xl:px-[100px]">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <Write/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/singlepost/:slug"
          element={
            <ProtectedRoute>
              <SinglePostpage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/listspage"
          element={
            <ProtectedRoute>
              <Listpage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/newposts/:slug"
          element={
            <ProtectedRoute>
              <SingleNew/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
