import { Request, Response } from "express";
import { STRIPE_PUBLISHABLE_KEY } from "../../Constants";

export const getStripePublishableKey = (req: Request, resp: Response) => {
    resp.json({ key: STRIPE_PUBLISHABLE_KEY })
}