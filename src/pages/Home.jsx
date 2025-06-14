import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Skeleton, Fab, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PostCard from "../components/PostCard";
import HeroSection from "../components/HeroSection";
import { useNavigate } from "react-router-dom";
import PostSkeleton from "../components/PostLoading";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/posts");
      setPosts(res.data.reverse());
    } catch (err) {
      console.error("Failed to fetch posts", err);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      alert("Failed to delete post.");
    }
  };

  const handleEdit = (post) => {
    navigate("/edit-post", { state: post });
  };

  const handleCardClick = (id) => {
    navigate(`/posts/${id}`);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box p={4}>
      <HeroSection />
      <Typography variant="h4" mb={3} textAlign="center">
        Recent Posts
      </Typography>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Loading Skeletons */}
      {loading ? (
        <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
          {Array.from({ length: 3 }).map((_, i) => (
            <PostSkeleton key={i} />
            // <Skeleton
            //   key={i}
            //   variant="rectangular"
            //   height={400}
            //   sx={{
            //     width: "80%",
            //     borderRadius: 2,
            //   }}
            // />
          ))}
        </Box>
      ) : posts.length === 0 ? (
        <Typography textAlign="center" variant="h6" mt={4}>
          No posts yet. Be the first to add one!
        </Typography>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onClick={handleCardClick}
            />
          ))}
        </Box>
      )}

      {/* Floating Add Button */}
      <Fab
        sx={{ position: "fixed", bottom: 24, right: 24,color: 'white', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',}}
        onClick={() => {
          if (!user) {
            alert("Please login first.");
            navigate("/auth");
          } else {
            navigate("/create-post");
          }
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Home;
