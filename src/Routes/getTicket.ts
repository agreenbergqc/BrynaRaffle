import { Request, Response } from "express";
import { getDB, setDB } from "../DB/localDB";

export const getTicket = async (req: Request, resp: Response) => {
    try {
        const { email = null, userId: uId = null } = req.body;
        const db = await getDB()

        if (!email || !uId) {
            resp.status(400).json('missing email or uId')
            return
        }

        const availableTickets = db.filter(({ userId, email }) => (!userId && !email))
        const randomTicketIndex = Math.round(Math.random() * availableTickets.length)

        if (!availableTickets[randomTicketIndex].uid) {
            resp.status(500).json({ message: "error getting ticket, please try again" })
            return;
        }

        const reservedTicket = availableTickets[randomTicketIndex]

        const objectToWrite = { ...reservedTicket, userId: uId, email: email, reservedDateTime: Date.parse(Date()) }

        const newData = [...db]
        const indexToReplace = newData.findIndex(({ uid }) => uid === objectToWrite.uid)
        newData.splice(indexToReplace, 1, objectToWrite)

        setDB(newData)

        resp.json(objectToWrite)
    }
    catch (e) {
        resp.status(500).json(e)
    }


}