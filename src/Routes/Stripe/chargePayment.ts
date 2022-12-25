import { Request, Response } from "express";
import { STRIPE_PRIVATE_KEY } from "../../Constants";
import { getDB, setDB } from "../../DB/localDB";

const stripe = require('stripe')(STRIPE_PRIVATE_KEY);

export const chargePayment = async (req: Request, resp: Response) => {
    const { amount, token, ticketIds } = req.body;

    const myTickets = (await getDB()).filter(({ uid }) => (ticketIds as string[]).includes(uid))
    const otherTickets = (await getDB()).filter(({ uid }) => !(ticketIds as string[]).includes(uid))
    const validation = myTickets.length === otherTickets.length;

    stripe.charges.create({
        amount,
        currency: 'usd',
        source: token,
    }).then((charge: any) => {
        const { receipt_url, status, id } = charge;
        console.log("ticketIds", { ticketIds, myTickets, charge });

        setDB([...otherTickets, ...myTickets.map((ticket) => ({ ...ticket, receipt_url, transactionId: id, status: 'Paid' }))])
        resp.json(charge)
    }).catch((e) => { resp.status(500).json(e) });
}