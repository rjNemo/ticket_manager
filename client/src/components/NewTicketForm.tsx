import React, { FC } from "react";

interface IProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  endingDate: string;
  setEndingDate: React.Dispatch<React.SetStateAction<string>>;
}

export const NewTicketForm: FC<IProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  endingDate,
  setEndingDate
}) => {
  return (
    <>
      <div className="row">
        <div className="input-field">
          <i className="material-icons prefix">note_add</i>
          <input
            id="title"
            type="text"
            className="validate"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <label htmlFor="title">Title</label>
        </div>

        <div className="input-field">
          <i className="material-icons prefix">mode_edit</i>
          <textarea
            id="description"
            className="materialize-textarea validate"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
          ></textarea>
          <label htmlFor="description">Description</label>
        </div>

        <div className="input-field">
          <i className="material-icons prefix">date_range</i>
          <input
            id="Due Date"
            type="text"
            className="datepicker"
            value={endingDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEndingDate(e.target.value)
            }
          />
          <label htmlFor="Due Date">Due Date</label>
        </div>

        <div className="input-field">
          <select id="project" className="browser-default">
            <option value="" disabled selected>
              Project
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>
      </div>
    </>
  );
};
