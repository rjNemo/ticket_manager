import React, { FC } from "react";
import { useRouteMatch } from "react-router-dom";
import { TabRouterHeader } from "./TabRouterHeader";
import { NewTicketForm } from "./NewTicketForm";

interface IProps {
  tabNames: string[];
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  endingDate: string;
  setEndingDate: React.Dispatch<React.SetStateAction<string>>;
}

export const NewTicketTabRouter: FC<IProps> = ({
  tabNames,
  description,
  setDescription,
  title,
  setTitle,
  endingDate,
  setEndingDate
}) => {
  const { url } = useRouteMatch();
  return (
    <>
      <div className="row">
        <TabRouterHeader tabNames={tabNames} />

        <NewTicketForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          endingDate={endingDate}
          setEndingDate={setEndingDate}
        />
      </div>
    </>
  );
};
