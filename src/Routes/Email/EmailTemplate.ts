import { TDataSet } from "../../DB/localDB"

export interface IEmailTemplateProps {
    amount: number
    tickets: TDataSet[]
    email: string;
    receipt_url: string;
}

export const EmailTemplate = (props: IEmailTemplateProps) => `
Thank you ${props.tickets[0].email} for donating $${props.amount / 100}. Your ticket number(s) are ${props.tickets.map(({ ticketNumber }) => ticketNumber).join(',')}.

Your reciept can be found at ${props.receipt_url}

`