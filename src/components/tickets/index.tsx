import { getTicker } from "@/modules/market/ticker-service";
import { createContext, useEffect, useState } from 'react';

interface Ticket {
    tickets?: Array<any>
}

const TicketContext = createContext<Ticket>({});
const TicketsProvider = ({ children }: any) => {
    const [tickets, setTickets] = useState<any>(null);
    useEffect(()=>{
        async function requestTicket(){
            const response = await getTicker()
            setTickets(response)
        }
        requestTicket()
        
    }, [])
    return (
      <TicketContext.Provider value={{ tickets }}>
        {children}
      </TicketContext.Provider>
    );
  };
  
  export { TicketContext, TicketsProvider };