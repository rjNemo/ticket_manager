import React, { FC } from "react";

export const InputFile: FC = () => {
  return (
    <>
      <form action="/upload">
        <div className="file-field input-field">
          <div className="btn indigo lighten-1">
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
