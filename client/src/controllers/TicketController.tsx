import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TicketPage } from "../pages/TicketPage";
import { ErrorController } from "./ErrorController";
import { HttpResponse } from "../types/HttpResponse";
import { Preloader } from "../components/Preloader";
import { get } from "../utils/http";
import { Constants } from "../utils/Constants";
import { Ticket } from "../types/Ticket";
import { TicketVM } from "../VM/TicketVM";

export const TicketController: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ticket, setTicket] = useState<Ticket>({} as Ticket);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  async function httpGetTicket(id: string): Promise<void> {
    try {
      const response: HttpResponse<Ticket> = await get<Ticket>(
        `${Constants.ticketsURI}/${id}`
      );
      if (response.parsedBody !== undefined) {
        setTicket(response.parsedBody);
        setIsLoading(false);
      }
    } catch (ex) {
      console.error(ex);
      setHasError(true);
      setError(ex);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      httpGetTicket(id);
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
