import express from 'express';
import { createPaymentIntent } from './Routes/Stripe/createPaymentIntent';
import { getAvailableRange } from './Routes/getAvailableRange';
import { getStripePublishableKey } from './Routes/Stripe/getStripePublishableKey';
import { getTicket } from './Routes/getTicket';
import { checkForReservedTickets } from './Routes/checkForReservedTickets';
import { chargePayment } from './Routes/Stripe/chargePayment';
import { removeTicket } from './Routes/removeTicket';


var cors = require('cors')



const app = express();

app.use(cors())
const port = 8080;
app.use(express.json());
app.use(express.static("public"));



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    return console.log(`http://localhost:${port}`);
});

app.get('/getAvailableRange', getAvailableRange)


app.post('/checkForReservedTickets', checkForReservedTickets);
app.post('/getTicket', getTicket);
app.post('/removeTicket', removeTicket);


app.post('/chargePayment', chargePayment);

app.get('/getStripePublishableKey', getStripePublishableKey)
app.post('/createPaymentIntent', createPaymentIntent)
