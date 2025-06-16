import {
  Box,
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../services/authService";

const CreatePost = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const uploadToImgbb = async (file) => {
    const imgbbApiKey = "e83b1cbcaff9682818c5677c8e8985af";

    const formData = new FormData();
    formData.append("image", file); // This is the binary image file

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );

      // Return the image URL from the response
      return res.data.data.url;
    } catch (err) {
      console.error("Upload to ImgBB failed:", err);
      throw new Error("Image upload to ImgBB failed.");
    }
  };

  const handleSubmit = async () => {
    if (
      !title ||
      !content ||
      (tab === 0 && !imageFile) ||
      (tab === 1 && !imageUrl)
    ) {
      return setAlert({
        open: true,
        message: "All fields are required.",
        type: "error",
      });
    }

    let image = imageUrl;

    try {
      if (tab === 0 && imageFile) {
        image = await uploadToImgbb(imageFile); // 🔼 Upload to ImgBB and get the URL
      }

      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post(`${API_BASE_URL}/posts`, {
        title,
        content,
        image,
        author: user?.name || "Guest",
        authorId: user?.id || null,
        date: new Date().toISOString(),
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      setAlert({
        open: true,
        message: "Failed to create post.",
        type: "error",
      });
    }
  };

  return (
    <Paper sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create a New Post
      </Typography>

      <TextField
        label="Title"
        fullWidth
        sx={{ mb: 2 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        label="Content"
        multiline
        rows={6}
        fullWidth
        sx={{ mb: 2 }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab label="Upload Image" />
        <Tab label="Use Image URL" />
      </Tabs>

      {tab === 0 ? (
        <Box sx={{ my: 2 }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </Box>
      ) : (
        <TextField
          label="Image URL"
          fullWidth
          sx={{ my: 2 }}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      )}

      <Button
        variant="contained"
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.type}>{alert.message}</Alert>
      </Snackbar>
    </Paper>
  );
};

export default CreatePost;
