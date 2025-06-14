import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Skeleton } from "@mui/material";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`blog-backend-production-b03b.up.railway.app/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Error fetching post", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box p={4}>
        <Skeleton variant="rectangular" height={200} />
        <Skeleton height={40} />
        <Skeleton height={100} />
      </Box>
    );
  }

  if (!post) return <Typography p={4}>Post not found.</Typography>;

  return (
    <Box p={4}>
      <img
        src={post.image}
        alt={post.title}
        style={{ width: "100%", maxHeight: 400, objectFit: "contain", borderRadius: 8 }}
      />
      <Typography variant="h4" mt={2}>{post.title}</Typography>
      <Typography variant="subtitle2" color="text.secondary">
        By {post.author} • {new Date(post.date).toLocaleDateString()}
      </Typography>
      <Typography variant="body1" mt={2}>{post.content}</Typography>
    </Box>
  );
};

export default PostDetails;
