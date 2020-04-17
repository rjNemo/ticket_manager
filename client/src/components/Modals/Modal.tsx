import React, { FC } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  makeStyles,
  Theme,
  createStyles,
  DialogActions,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

interface IProps {
  handleClose: () => void;
  show: boolean;
  action: string;
  handleAction: (e: React.FormEvent) => Promise<void>;
  name: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })
);

export const Modal: FC<IProps> = ({
  handleClose,
  show,
  action,
  handleAction,
  children,
  name,
}) => {
  const classes = useStyles();

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{name}</Typography>
        {handleClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAction} color="primary">
          {action}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
