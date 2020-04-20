import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorController from "./ErrorController";
import TicketPage from "../pages/TicketPage";
import TicketVM from "../VM/TicketVM";
import Ticket from "../types/Ticket";
import Preloader from "../components/Preloader";
import { useAuth0 } from "../authentication/auth0";
import { TicketService } from "../services";

const TicketController: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ticket, setTicket] = useState<Ticket>({} as Ticket);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    const getTicket = async (id: string): Promise<void> => {
      const token = await getTokenSilently();
      try {
        const Tickets = new TicketService(token);
        const response: Ticket = await Tickets.get(id);
        if (response !== undefined) {
          setTicket(response);
          setIsLoading(false);
        }
      } catch (ex) {
        setHasError(true);
        setError(ex);
      }
    };

    if (id !== undefined) {
      getTicket(id);
    } else {
      setHasError(true);
      setError("Bad Request");
    }
  }, [id]);

  if (hasError) {
    return <ErrorController error={error} />;
  }

  const viewModel = new TicketVM(ticket);
  return isLoading ? <Preloader /> : <TicketPage viewModel={viewModel} />;
};

export default TicketController;
