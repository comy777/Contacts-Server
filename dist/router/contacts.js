"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const contact_1 = require("../controllers/contact");
const validate_1 = require("../middlewares/validate");
const contactRouter = (0, express_1.Router)();
contactRouter.post('/', [
    (0, express_validator_1.check)('name', 'El nombre del contacto es requerido').notEmpty(),
    (0, express_validator_1.check)('phone', 'El numero de telefono del contacto es requerido').notEmpty(),
    (0, express_validator_1.check)('email', 'El correo electronico es requerido').isEmail(),
    (0, express_validator_1.check)('address', 'La direccion es requerida').notEmpty(),
    (0, express_validator_1.check)('date', 'La fecha de nacimiento es requerida').not().isDate(),
    validate_1.validate
], contact_1.saveContact);
contactRouter.put('/:id', [(0, express_validator_1.check)('id', 'El id del contacto es requerido').isMongoId(), validate_1.validate], contact_1.updateContact);
contactRouter.delete('/:id', [(0, express_validator_1.check)('id', 'El id del contacto es requerido').isMongoId(), validate_1.validate], contact_1.deleteContact);
contactRouter.get('/', contact_1.getContacts);
contactRouter.post('/search/:search', contact_1.searchContact);
exports.default = contactRouter;
