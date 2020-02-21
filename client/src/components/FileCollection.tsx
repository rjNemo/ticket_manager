import React, { FC } from "react";
import { AppFile } from "../types/AppFile";

type IProps = {
  files: AppFile[];
  filterText: string;
};

export const FileCollection: FC<IProps> = ({ files, filterText }) => {
  return (
    <>
      <ul className="collection">
        {files
          .filter(
            f =>
              f.name.toLowerCase().includes(filterText.toLowerCase()) ||
              f.format.toLowerCase().includes(filterText.toLowerCase())
          )
          .map((file: AppFile) => (
            <FileEntry file={file} key={file.id} />
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
    <li className="collection-item avatar">
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
