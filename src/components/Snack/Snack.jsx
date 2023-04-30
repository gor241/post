import { Alert, Snackbar } from "@mui/material";

const Snack = ({ isOpen,text,severity, handleClose = Function.prototype }) => {
  return (
    <Snackbar open={isOpen} onClose={handleClose} autoHideDuration={2000}>
      <Alert severity={severity}>{text}</Alert>
    </Snackbar>
  );
};

export default Snack;