import React, { FC } from "react";
import {
  Avatar,
  ListItemAvatar,
  List,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import WorkIcon from "@material-ui/icons/Work";
import AppFile from "../types/AppFile";

type IProps = {
  files: AppFile[];
  filterText: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const FileCollection: FC<IProps> = ({ files, filterText }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {files.length === 0 ? (
        <FileEntry />
      ) : (
        files
          .filter(
            (f) =>
              f.name.toLowerCase().includes(filterText.toLowerCase()) ||
              f.format.toLowerCase().includes(filterText.toLowerCase())
          )
          .map((file: AppFile) => <FileEntry file={file} key={file.id} />)
      )}
    </List>
  );
};

type IFProps = {
  file?: AppFile;
};

export const FileEntry: FC<IFProps> = ({ file }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <WorkIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={file ? file.name : "Add your first file"}
        secondary={`${file ? file.size : 0}kb ${file ? file.format : "pdf"}`}
      />
    </ListItem>
  );
};
export default FileCollection;
