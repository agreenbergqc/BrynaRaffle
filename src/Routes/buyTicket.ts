import { Request, Response } from "express";
import { getDB } from "../DB/localDB";

export const buyTicket = async (req: Request, resp: Response) => {
    try {
        const db = await getDB();
        const { userId, ticketNumber, uid, email } = req.body;

        const foundTicket = db.find((
            { email: ticketEmail,
                userId: ticketUserId,
                uid: ticketUid,
                ticketNumber: dbTicketNumber,
                transactionId
            }) =>
            ticketEmail === email &&
            ticketUserId === userId &&
            uid === ticketUid &&
            dbTicketNumber === ticketNumber &&
            !transactionId
        )

        if (!foundTicket) {
            resp.status(400).json("TicketNotFound")
        }

        resp.json(foundTicket)
    } catch (e) {
        resp.status(500).json(e)
    }
}