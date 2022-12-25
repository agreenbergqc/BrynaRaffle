import { Request, Response } from "express";
import { STRIPE_PRIVATE_KEY } from "../../Constants";
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_PRIVATE_KEY, { apiVersion: '2022-11-15' });

export const createPaymentIntent = async (req: Request, resp: Response) => {
    const { amount } = req.body

    const paymentIntent = stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card'],
    });

    paymentIntent
        .then(resp.json)
        .catch(resp.status(400).json)


}