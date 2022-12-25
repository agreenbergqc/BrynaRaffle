import { Request, Response } from 'express'
import { getDB } from '../DB/localDB'

export const getAvailableRange = async (req: Request, resp: Response) => {
    //this may just be a bd call or not, not sure yet. 
    const remainingTickets = (await getDB())
        .filter(({ email }) => !email)
        .map(({ ticketNumber }) => ticketNumber)

    const returnVar = { min: Math.min(...remainingTickets), max: Math.max(...remainingTickets) }

    resp.json(returnVar)
}