import React, { FC, useState, ChangeEvent } from "react";
import { Ticket } from "../types/Ticket";
import { FloatingButton } from "./FloatingButton";
import { HorizontalCard } from "./HorizontalCard";
import { FilterBar } from "./FilterBar";

type TicketListProps = {
  tickets: Ticket[];
};

export const TicketList: FC<TicketListProps> = ({ tickets }) => {
  const archiveTicket = () => {};
  const validateTicket = () => {};
  const [filterText, setFilterText] = useState<string>("");

  const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFilterText(e.target.value);
  };

  // const useFilter = (init: string) => {
  //   const [filterText, setFilterText] = useState<string>(init);
  //   // const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (
  //   //   e: ChangeEvent<HTMLInputElement>
  //   // ) => {
  //   //   setFilterText(e.target.value);
  //   // };
  //   return {
  //     filterText,
  //     setFilterText,
  //     bind: {
  //       filterText,
  //       handleChange: (e: ChangeEvent<HTMLInputElement>) => {
  //         setFilterText(e.target.value);
  //       }
  //     }
  //   };
  // };
  // const [filterText, handleChange] = useFilter("");
  // const [filterText, handleChange] = useFilter("");
  return (
    <>
      <div className="row valign-wrapper">
        <h3>Tickets</h3>
        <FloatingButton color=" blue-grey lighten-4" size="small" />
        <FilterBar filterText={filterText} handleChange={handleChange} />
      </div>
      <div className="col s12 grey">
        <ul>
          {tickets
            .filter(t => t.title.includes(filterText))
            .map((t: Ticket) => (
              <li key={t.id}>
                <HorizontalCard
                  title={t.title}
                  remainingDays={t.plannedEnding}
                  validateTicket={validateTicket}
                  archiveTicket={archiveTicket}
                />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};
