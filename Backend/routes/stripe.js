import express from 'express';
import stripePackage from 'stripe';
import { ENV } from '../config/env.js';

const router = express.Router();

const stripe = stripePackage(ENV.STRIPE_SECRET_KEY);

router.post("/checkout", async (req, res) => {
    try {
        const { products } = req.body;

        const lineItems = products.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.serviceName,
                },
                unit_amount: item.price * 100,
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: process.env.STRIPE_SUCCESS_URL || "https://www.avicenahealthcare.com/success",
            cancel_url: process.env.STRIPE_CANCEL_URL || "https://www.avicenahealthcare.com/cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
});

export default router;
