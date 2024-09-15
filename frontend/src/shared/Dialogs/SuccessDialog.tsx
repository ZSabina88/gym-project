import {
  Dialog,
  DialogContent,
  Button as MuiButton,
  Typography,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface SuccessDialogProps {
  openModal: boolean;
  handleCloseModal: () => void;
  title: string;
  message: string;
  message2?: string; // Mark message2 as optional
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  openModal,
  handleCloseModal,
  title,
  message,
  message2,
}) => {
  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogContent
        sx={{
          textAlign: "center",
          padding: "0",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#4CAF50",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem 0",
            width: "500px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "5px solid white",
              borderRadius: "50%",
              width: "80px",
              height: "80px",
            }}
          >
            <CheckCircleIcon
              fontSize="large"
              sx={{
                color: "white",
                fontSize: "40px",
              }}
            />
          </Box>
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            marginBottom: "0.5rem",
            fontSize: "30px",
            marginTop: "1rem",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: "1.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {message}
          {message2 && <span>{message2}</span>}
        </Typography>

        <MuiButton
          onClick={handleCloseModal}
          color="primary"
          variant="contained"
          sx={{
            textTransform: "none",
            marginBottom: "30px",
            borderRadius: "20px",
            backgroundColor: "#9EF300",
            color: "black",
          }}
        >
          OK
        </MuiButton>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
