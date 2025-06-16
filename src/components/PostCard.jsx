import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const PostCard = ({ post, onEdit, onDelete, onClick }) => {
  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(post);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(post);
  };

  return (
    <Card
      sx={{
        width: "80%",
        margin: "auto",
        mb: 4,
        boxShadow: 4,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => onClick(post.id)}
    >
      <CardMedia
        component="img"
        height="200"
        image={post.image || "/placeholder.jpg"}
        alt={post.title || "Post image"}
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        <Typography variant="h6" fontWeight={600}>
          {post.title || "Untitled Post"}
        </Typography>

        <Typography variant="body2" mt={1} color="text.secondary">
          {post.content
            ? post.content.length > 300
              ? post.content.slice(0, 300) + "..."
              : post.content
            : "No content available."}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mt={2}
        >
          By{" "}
          <Typography
            component="span"
            fontWeight={600}
            fontSize="0.9rem"
            color="text.primary"
          >
            {post.author || "Unknown"}
          </Typography>{" "}
          •{" "}
          {post.date
            ? new Date(post.date).toLocaleDateString()
            : "Unknown date"}
        </Typography>
      </CardContent>

      {post.authorId == JSON.parse(localStorage.getItem("user") ?? 0).id && (
        <CardActions sx={{ justifyContent: "flex-end", px: 2 }}>
          <IconButton onClick={handleEditClick} color="primary">
            <Edit />
          </IconButton>
          <IconButton onClick={handleDeleteClick} color="error">
            <Delete />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default PostCard;
