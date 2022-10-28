import React from "react";
import { PropsToastr } from "../TopNavBar/model";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export function Toastr(props: PropsToastr) {
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Snackbar
      open={props.isOpen}
      autoHideDuration={props.duration}
      onClose={props.close}
    >
      <Alert onClose={props.close} severity="success" sx={{ width: "100%" }}>
        Para Desconectar acesse sua metamask
      </Alert>
    </Snackbar>
  );
}
