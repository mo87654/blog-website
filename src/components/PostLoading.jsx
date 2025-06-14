import { Skeleton, Box, Stack } from "@mui/material";

const PostSkeleton = () => {
  return (
    <Box
      sx={{
        width: "80%",
        height: "auto",
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        marginBottom: 4,
      }}
    >
      {/* Image */}
      <Skeleton variant="rectangular" height={200} />
      {/* Post Content */}
      <Box sx={{ p: 2 }}>
        {/* Title */}
        <Skeleton variant="text" height={32} width="60%" />

        {/* Content lines */}
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="65%" />
        {/* Author and Date */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
          {/* <Skeleton variant="circular" width={40} height={40} /> */}

          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={80} height={16} />
        </Stack>

        {/* Actions */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2, flexGrow: 1, justifyContent: "flex-end" }}
        >
            {/**/}
          <Skeleton
            variant="rectangular"
            width={36}
            height={36}
            sx={{ borderRadius: 1 }}
          />
          <Skeleton
            variant="rectangular"
            width={36}
            height={36}
            sx={{ borderRadius: 1 }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default PostSkeleton;
