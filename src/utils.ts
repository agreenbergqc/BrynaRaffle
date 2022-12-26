import { getDB } from "./DB/localDB"

export const getTickets = async (ticketIds: string[], userUid: string) => {
    const allTickets = await getDB();
    return allTickets.filter(({ userId, uid, transactionId }) => ticketIds.includes(uid) && userId === userUid && transactionId === null)
}

export const getTicketSum = async (ticketIds: string[], userUid: string) => {
    const allTickets = await getDB();
    const myTickets = allTickets.filter(({ userId, uid, transactionId }) => ticketIds.includes(uid) && userId === userUid && transactionId === null)

    return myTickets.reduce((sum, { ticketNumber }) => sum + ticketNumber, 0)
}