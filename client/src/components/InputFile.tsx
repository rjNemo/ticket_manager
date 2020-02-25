import React, { FC } from "react";

type IProps = {};

export const InputFile: FC<IProps> = () => {
  return (
    <>
      <form action="/upload">
        <div className="file-field input-field">
          <div className="btn">
            <i className="material-icons ">cloud_upload</i>
            <input
              type="file"
              multiple
              accept=".doc,.docx,.pdf,.md,.gdoc,.zip,image/*"
            />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              placeholder="Upload one or more files"
            />
          </div>
        </div>
      </form>
    </>
  );
};
