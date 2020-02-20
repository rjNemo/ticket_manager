import React, { FC } from "react";
import { AppFile } from "../types/AppFile";

type IProps = {
  files: AppFile[];
};

export const FileCollection: FC<IProps> = ({ files }) => {
  return (
    <>
      <ul className="collection">
        {files.map((f: AppFile) => (
          <FileEntry file={f} />
        ))}
      </ul>
    </>
  );
};

type IFProps = {
  file: AppFile;
};

export const FileEntry: FC<IFProps> = ({ file }) => {
  return (
    <li key={file.id} className="collection-item avatar">
      {/* <img src={require("../images/user_1.jpg")} alt="" className="circle" /> */}
      <i className="material-icons circle">folder</i>
      <span className="title">{file.name}</span>
      <p>
        {file.size}kb {file.format}
      </p>
      <a href="#!" className="secondary-content">
        <i className="material-icons">more_vert</i>
      </a>
    </li>
  );
};
