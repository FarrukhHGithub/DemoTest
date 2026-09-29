// models/Invoice.js
import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
 
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    }],
    status: {
        type: String,
        default: 'unpaid'
      },
    invoiceItems: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    total: Number,
    createdDate: {
        type: Date,
        default: Date.now
    },
    dueDate: Date
    
});

invoiceSchema.index({ patient: 1 });
invoiceSchema.index({ createdDate: -1 });

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
