import { Route, Routes, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/auth"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post" element={<EditPost />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </>
  );
}

export default App;
