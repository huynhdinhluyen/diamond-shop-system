import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Không tìm thấy trang
        </Typography>
        <Typography variant="body1" gutterBottom>
          Trang bạn tìm kiếm không tồn tại.
        </Typography>
      </Box>
      <Button component={Link} to="/" variant="contained" color="primary">
        Quay về trang chủ
      </Button>
    </Container>
  )
}
