import { Route, Routes, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import Navbar from "./components/Navbar";
import { GlobalStyles } from "@mui/material";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/auth"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <>
      <GlobalStyles
        styles={{
          "*": {
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE
          },
          "*::-webkit-scrollbar": {
            display: "none", // Chrome, Safari, Opera
          },
        }}
      />
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
