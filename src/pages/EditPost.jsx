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

const EditPost = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState(state?.title || "");
  const [content, setContent] = useState(state?.content || "");
  const [imageType, setImageType] = useState(state?.image?.startsWith("http") ? "url" : "upload");
  const [imageURL, setImageURL] = useState(state?.image || "");
  const [uploadFile, setUploadFile] = useState(null);

  const handleUpdate = async () => {
    if (!title || !content || (imageType === "url" && !imageURL)) {
      alert("Please fill in all fields.");
      return;
    }

    const image = imageType === "upload"
      ? URL.createObjectURL(uploadFile) // simulate upload
      : imageURL;

    const updatedPost = {
      title,
      content,
      image,
    };

    try {
      await axios.put(`blog-backend-production-b03b.up.railway.app/posts/${state.id}`, updatedPost);
      alert("Post updated successfully!");
      navigate("/");
    } catch (err) {
      alert("Failed to update post.");
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
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleUpdate}
      >
        Update Post
      </Button>
    </Box>
  );
};

export default EditPost;
