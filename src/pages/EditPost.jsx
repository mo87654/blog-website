import {
  Box,
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../services/authService";

const IMGBB_API_KEY = "e83b1cbcaff9682818c5677c8e8985af"; // Replace with your actual key

const EditPost = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState(state?.title || "");
  const [content, setContent] = useState(state?.content || "");
  const [imageType, setImageType] = useState(state?.image?.startsWith("http") ? "url" : "upload");
  const [imageURL, setImageURL] = useState(state?.image || "");
  const [uploadFile, setUploadFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      formData
    );
    return res.data.data.url;
  };

  const handleUpdate = async () => {
    if (!title || !content || (imageType === "url" && !imageURL) || (imageType === "upload" && !uploadFile)) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      let image = imageURL;
      if (imageType === "upload") {
        image = await uploadToImgBB(uploadFile);
      }

      const updatedPost = {
        title,
        content,
        image,
      };

      await axios.patch(`${API_BASE_URL}/posts/${state.id}`, updatedPost);
      alert("Post updated successfully!");
      navigate("/");
    } catch (err) {
      alert("Failed to update post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={3}>Edit Post</Typography>

      <TextField
        fullWidth
        label="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Post Content"
        multiline
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Tabs value={imageType} onChange={(_, val) => setImageType(val)} sx={{ mb: 2 }}>
        <Tab label="Upload Image" value="upload" />
        <Tab label="Image URL" value="url" />
      </Tabs>

      {imageType === "upload" ? (
        <input
          style={{ display: 'block', padding: 17 }}
          type="file"
          accept="image/*"
          onChange={(e) => setUploadFile(e.target.files[0])}
        />
      ) : (
        <TextField
          fullWidth
          label="Image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
      )}

      <Button
        variant="contained"
        disabled={loading}
        sx={{
          mt: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
        onClick={handleUpdate}
      >
        {loading ? "Updating..." : "Update Post"}
      </Button>
    </Box>
  );
};

export default EditPost;
