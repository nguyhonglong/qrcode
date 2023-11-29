import mongoose from 'mongoose';

const drinkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    }
});

export const Drink = mongoose.model('Drink', drinkSchema);

const billSchema = new mongoose.Schema({
    billID: {
        type: String,
        required: true,
        unique: true
    },
    numCustomer: {
        type: Number,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    drinks: [{
        drink: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});

export const Bill = mongoose.model('Bill', billSchema);
