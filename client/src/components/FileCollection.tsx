import React, { FC } from "react";
import { AppFile } from "../types/AppFile";

type IProps = {
  files: AppFile[];
  filterText: string;
};

export const FileCollection: FC<IProps> = ({ files, filterText }) => {
  console.log();
  return (
    <>
      <ul className="collection">
        {files.length === 0 ? (
          <FileEntry />
        ) : (
          files
            .filter(
              f =>
                f.name.toLowerCase().includes(filterText.toLowerCase()) ||
                f.format.toLowerCase().includes(filterText.toLowerCase())
            )
            .map((file: AppFile) => <FileEntry file={file} key={file.id} />)
        )}
      </ul>
    </>
  );
};

type IFProps = {
  file?: AppFile;
};

export const FileEntry: FC<IFProps> = ({ file }) => {
  return (
    <li className="collection-item avatar">
      {/* <img src={require("../images/user_1.jpg")} alt="" className="circle" /> */}
      <i className="material-icons circle indigo lighten-1">folder</i>
      <span className="title">{file ? file.name : "Add your first file"}</span>
      <p>
        {file ? file.size : 0}kb {file ? file.format : "pdf"}
      </p>
      <a href="#!" className="secondary-content">
        <i className="material-icons">more_vert</i>
      </a>
    </li>
  );
};
