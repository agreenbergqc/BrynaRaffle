import { Request, Response } from "express";
import { getDB, setDB, TDataSet } from "../DB/localDB";

export const removeTicket = async (req: Request, resp: Response) => {
    try {
        const ticket = req.body.ticket as TDataSet;
        const allTickets = await getDB()
        const foundTicket = allTickets.find(({ uid, userId, transactionId }) => uid === ticket.uid && userId === ticket.userId && !transactionId)
        const otherTickets = allTickets.filter(({ uid }) => uid != ticket.uid)

        if (!foundTicket) {
            resp.status(500).json({ message: "Ticket not found." })
            return;
        }

        const newDB = [...otherTickets, { ...foundTicket, email: null, reservedDateTime: null, userId: null } as TDataSet]
        await (setDB(newDB));

        resp.status(204).send();
        return;
    }
    catch (e) { resp.status(500).json(e) }
}