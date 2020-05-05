import React, { FC } from "react";
import { CloudUpload } from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const InputFile: FC = () => {
  return (
    <form action="/upload">
      <div className="file-field input-field">
        <UploadButton>
          <CloudUpload />
          <input
            type="file"
            multiple
            accept=".doc,.docx,.pdf,.md,.gdoc,.zip,image/*"
          />
        </UploadButton>
      </div>
    </form>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
  })
);

const UploadButton: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept=".doc,.docx,.pdf,.md,.gdoc,.zip,image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUpload />}
        >
          Upload files
        </Button>
      </label>
    </div>
  );
};

export default InputFile;
