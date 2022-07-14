"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchContact = exports.getContacts = exports.deleteContact = exports.updateContact = exports.saveContact = void 0;
const moment_1 = __importDefault(require("moment"));
const Contact_1 = __importDefault(require("../models/Contact"));
const saveContact = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, email } = req.body;
    const validateContactName = yield Contact_1.default.findOne({ name });
    if (validateContactName)
        return resp.send({ error: 'El contacto ya se encuentra registrado' });
    const validateContactPhone = yield Contact_1.default.findOne({ phone });
    if (validateContactPhone)
        return resp.send({ error: 'El contacto ya se encuentra registrado' });
    const validateContactEmail = yield Contact_1.default.findOne({ email });
    if (validateContactEmail)
        return resp.send({ error: 'El contacto ya se encuentra registrado' });
    const contact = new Contact_1.default(req.body);
    try {
        yield contact.save();
        return resp.send({ contact });
    }
    catch (error) {
        console.log(error);
        return resp.send({ error: 'Error del servidor' });
    }
});
exports.saveContact = saveContact;
const updateContact = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const validateContact = yield Contact_1.default.findById(id);
    if (!validateContact)
        return resp.send({ error: 'El contacto no se encuentra registrado' });
    try {
        const contact = yield Contact_1.default.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        return resp.send({ contact });
    }
    catch (error) {
        console.log(error);
        return resp.send({ error: 'Error del servidor' });
    }
});
exports.updateContact = updateContact;
const deleteContact = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const validateContact = yield Contact_1.default.findById(id);
    if (!validateContact)
        return resp.send({ error: 'El contacto no se encuentra registrado' });
    try {
        yield Contact_1.default.findByIdAndDelete(id);
        return resp.send({ msg: 'Contacto eliminado' });
    }
    catch (error) {
        console.log(error);
        return resp.send({ error: 'Error del servidor' });
    }
});
exports.deleteContact = deleteContact;
const getContacts = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield Contact_1.default.find();
    const contactsResult = contacts.map((item) => {
        return {
            _id: item._id,
            name: item.name,
            phone: item.phone,
            date: item.date,
            address: item.address,
            email: item.email,
            age: (0, moment_1.default)(item.date, 'YYYYMMDD').fromNow()
        };
    });
    return resp.send({ contacts: contactsResult });
});
exports.getContacts = getContacts;
const searchContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.params;
    const regex = new RegExp(search);
    let query = { name: regex };
    if (search.includes('@')) {
        query = { email: regex };
    }
    if (search.includes('123456789')) {
        query = { phone: search };
    }
    const contacts = yield Contact_1.default.find(query);
    return res.send({
        results: contacts
    });
});
exports.searchContact = searchContact;
