"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ContactSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del contacto es requerido']
    },
    phone: {
        type: Number,
        required: [true, 'El numero de telefono es requerido']
    },
    date: {
        type: Date,
        required: [true, 'La fecha de nacimiento es requerida']
    },
    address: {
        type: String,
        required: [true, 'La direccion es requerida']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo electronico es requerido']
    }
});
exports.default = (0, mongoose_1.model)('contact', ContactSchema);
