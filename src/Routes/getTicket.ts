import { Request, Response } from "express";
import { getDB, setDB } from "../DB/localDB";

export const getTicket = async (req: Request, resp: Response) => {
    const { email = null, userId: uId = null } = req.body;
    const db = await getDB()

    if (!email || !uId) {
        resp.status(400).json('missing email or uId')
        return
    }

    // logic here will have to be update to include tickets that have timed out. 
    // this can also be phased out in favor of a DB query. 
    const unclaimedTicket = null// db.find(({ userId, email: dbEmail, transactionId }) => userId === uId && email === dbEmail && !transactionId)
    const availableTickets = db.filter(({ userId, email }) => (!userId && !email))
    const randomTicketIndex = Math.round(Math.random() * availableTickets.length - 1)

    const reservedTicket = unclaimedTicket || availableTickets[randomTicketIndex]

    const objectToWrite = { ...reservedTicket, userId: uId, email: email, reservedDateTime: Date.parse(Date()) }


    const newData = [...db]
    const indexToReplace = newData.findIndex(({ uid }) => uid === objectToWrite.uid)
    newData.splice(indexToReplace, 1, objectToWrite)

    setDB(newData)


    resp.json(objectToWrite)



}