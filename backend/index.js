import express, { response } from "express";
import cors from 'cors';
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Bill, Drink } from "./models/billModel.js"


const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send("hehe")
})

app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT} `)
});

app.post('/api/bills', async (req, res) => {
    try {
        const { billID, numCustomer, customerName, storeName , drinks} = req.body;

        if (!billID || !numCustomer || !customerName || !storeName) {
            return res.status(400).send({
                message: 'Send all required fields: billID, numCustomer, customerName, storeName'
            });
        }

        const existingBill = await Bill.findOne({ billID });
        if (existingBill) {
            return res.status(409).send({
                message: 'A bill with the same billID already exists.'
            });
        }

        const newBill = {
            billID,
            numCustomer,
            customerName,
            storeName,
            drinks
        };

        const bill = await Bill.create(newBill);
        return res.status(201).send(bill);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

app.get('/api/bills', async (request, response) => {
    try {
        const bills = await Bill.find({});
        return response.status(200).json(bills);

    } catch (error) {
        console.log(error.message);
    }
});

app.get('/api/bills/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const bill = await Bill.findOne({ billID: id });
        if (!bill) {
            return response.status(404).json({ message: 'Bill not found' });
        }
        return response.status(200).json(bill);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ messege: error.message })
    }
});

app.put('/api/bills/:id', async (request, response) => {
    try {
        const { id } = request.params;
        if (
            !request.body.billID ||
            !request.body.numCustomer ||
            !request.body.customerName ||
            !request.body.storeName
        ) {
            return response.status(400).send({
                message: 'Send all required fields: billID, numCustomer, customerName, storeName'
            });
        }
        const updatedBill = {
            billID: request.body.billID,
            numCustomer: request.body.numCustomer,
            customerName: request.body.customerName,
            storeName: request.body.storeName,
            drinks: request.body.drinks
        };

        const bill = await Bill.findOneAndUpdate({ billID: id }, updatedBill, { new: true });
        if (!bill) {
            return response.status(404).json({ message: 'Bill not found' });
        }

        return response.status(200).send({ message: "Success" })


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ messege: error.message })
    }
});

app.get('/api/drinks', async (request, response) => {
    try {
        const drinks = await Drink.find({});
        return response.status(200).json(drinks);

    } catch (error) {
        console.log(error.message);
    }
})

app.post('/api/drinks', async (request, response) => {
    try {
        const {name, price} = request.body;

        if (!name || !price) {
            return response.status(400).send({
                message: 'Send all required fields: name, price'
            });
        }

        const existingDrink = await Bill.findOne({ name });
        if (existingDrink) {
            return response.status(409).send({
                message: 'A drink with the same billID already exists.'
            });
        }

        const newDrink = {
            name, price
        };

        const drink = await Drink.create(newDrink);
        return response.status(201).send(drink);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("connect to db success")
    })
    .catch((error) => {

    });
