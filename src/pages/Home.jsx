import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Fab,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PostCard from "../components/PostCard";
import HeroSection from "../components/HeroSection";
import { useNavigate } from "react-router-dom";
import PostSkeleton from "../components/PostLoading";
import { API_BASE_URL } from "../services/authService";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/posts`);
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

  const confirmDelete = (id) => {
    setPostToDelete(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/posts/${postToDelete}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postToDelete));
    } catch (err) {
      alert("Failed to delete post.");
    } finally {
      setOpenDialog(false);
      setPostToDelete(null);
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

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
          {Array.from({ length: 3 }).map((_, i) => (
            <PostSkeleton key={i} />
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
              onDelete={() => confirmDelete(post.id)}
              onEdit={handleEdit}
              onClick={handleCardClick}
            />
          ))}
        </Box>
      )}

      <Fab
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          color: "white",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
