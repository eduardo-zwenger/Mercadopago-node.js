import { MERCADOPAGO_API_KEY } from '../config.js';
import mercadopago from "mercadopago";




export const createOrder = async (req, res) => {

        mercadopago.configure({
            access_token: MERCADOPAGO_API_KEY,
        });

    const result = await mercadopago.preferences.create({
        items: [
        {
            title: "Laptop Lenovo",
            unit_price: 1000,
            currency_id: "ARS",
            quantity: 1,
        },
        ],
        back_urls: {
            success: "http://localhost:3000/success",
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/pending",
        },
        notification_url: "https://cd87-152-169-31-81.sa.ngrok.io/webhook",
    });


    console.log(result);

    res.send(result.body);
};

export const receiveWebhook = async (req, res) => {
    const payment = req.query

    try {
        if(payment.type === "payment"){
            const data = await mercadopago.payment.findById(payment['data.id']);
            console.log(data);
            // store in bbdd
        }
        res.sendStatus(204);
    } catch (error) {
        return res.sendStatus(500).json({error: error.message});
    }
}





