import { Request, Response } from 'express'
import { getDB } from '../DB/localDB'

export const getAvailableRange = async (req: Request, resp: Response) => {
    try {
        const remainingTickets = (await getDB())
            .filter(({ email }) => !email)
            .map(({ ticketNumber }) => ticketNumber)

        const returnVar = { min: Math.min(...remainingTickets), max: Math.max(...remainingTickets) }

        resp.json(returnVar)
    }
    catch (e) {
        resp.status(500).json(e)
    }
}