import React, { FC } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

interface IProps {
  picture: string;
  alt: string;
}

// export const Avatar: FC<IProps> = () => {
//   return (
//     <>
//       <img
//         className="circle"
//         src={picture}
//         height="100vh"
//         width="100vh"
//         alt="user avatar"
//       />
//     </>
//   );
// };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1)
      }
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3)
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10)
    }
  })
);

export const UserAvatar: FC<IProps> = ({ picture, alt }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt={alt} src={picture} className={classes.large} />
    </div>
  );
};
