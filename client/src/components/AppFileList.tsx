import React, { FC } from "react";
import { AppFile } from "../types/AppFile";
import { FloatingButton } from "./FloatingButton";
import { FileCollection } from "./FileCollection";
import { DropZone } from "./DropZone";

type IProps = {
  files: AppFile[];
};

export const FileList: FC<IProps> = ({ files }) => {
  return (
    <>
      <div className="row valign-wrapper">
        <h3>Files</h3>
        <FloatingButton color=" blue-grey lighten-4" size="" />
      </div>
      <DropZone />
      <FileCollection files={files} />
    </>
  );
};
