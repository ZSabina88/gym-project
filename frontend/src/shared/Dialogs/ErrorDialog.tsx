import {
  Dialog,
  DialogContent,
  Button as MuiButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ErrorDialogProps {
  message: string;
  openErrorModal: boolean;
  handleCloseErrorModal: () => void;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({
  message,
  openErrorModal,
  handleCloseErrorModal,
}) => {
  return (
    <Dialog open={openErrorModal} onClose={handleCloseErrorModal}>
      <DialogContent
        sx={{
          textAlign: "center",
          padding: "0",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#E85E6C",
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
           <CloseIcon
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
          Ooops!
        </Typography>


        <Typography variant="body1" sx={{ marginBottom: "1.5rem" }}>
          {message}
        </Typography>

        <MuiButton
          onClick={handleCloseErrorModal}
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
          Try Again
        </MuiButton>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;
