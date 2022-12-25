import { Request, Response } from "express";
import { getDB } from "../DB/localDB";


export const checkForReservedTickets = async (req: Request, resp: Response) => {
    try {
        const data = await getDB()
        const { userId, email } = req.body
        const results = data
            .filter(({ userId: _userID, email: _email }) => userId === _userID && email === _email)
            .sort((a, b) => a.reservedDateTime < b.reservedDateTime ? -1 : 0)
        resp.json(results)
    }
    catch (e) {
        resp.status(500).json(e)
    }
} 