import { Request, Response } from 'express';
import moment from 'moment';
import Contact from '../models/Contact';

export const saveContact = async (req: Request, resp: Response) => {
	const { name, phone, email } = req.body;
	const validateContactName = await Contact.findOne({ name });
	if (validateContactName) return resp.send({ error: 'El contacto ya se encuentra registrado' });
	const validateContactPhone = await Contact.findOne({ phone });
	if (validateContactPhone) return resp.send({ error: 'El contacto ya se encuentra registrado' });
	const validateContactEmail = await Contact.findOne({ email });
	if (validateContactEmail) return resp.send({ error: 'El contacto ya se encuentra registrado' });
	const contact = new Contact(req.body);
	try {
		await contact.save();
		return resp.send({ contact });
	} catch (error) {
		console.log(error);
		return resp.send({ error: 'Error del servidor' });
	}
};

export const updateContact = async (req: Request, resp: Response) => {
	const { id } = req.params;
	const validateContact = await Contact.findById(id);
	if (!validateContact) return resp.send({ error: 'El contacto no se encuentra registrado' });
	try {
		const contact = await Contact.findByIdAndUpdate({ _id: id }, req.body, { new: true });
		return resp.send({ contact });
	} catch (error) {
		console.log(error);
		return resp.send({ error: 'Error del servidor' });
	}
};

export const deleteContact = async (req: Request, resp: Response) => {
	const { id } = req.params;
	const validateContact = await Contact.findById(id);
	if (!validateContact) return resp.send({ error: 'El contacto no se encuentra registrado' });
	try {
		await Contact.findByIdAndDelete(id);
		return resp.send({ msg: 'Contacto eliminado' });
	} catch (error) {
		console.log(error);
		return resp.send({ error: 'Error del servidor' });
	}
};

export const getContacts = async (req: Request, resp: Response) => {
	const contacts = await Contact.find();
	const contactsResult = contacts.map((item) => {
		return {
			_id: item._id,
			name: item.name,
			phone: item.phone,
			date: item.date,
			address: item.address,
			email: item.email,
			age: moment(item.date, 'YYYYMMDD').fromNow()
		};
	});
	return resp.send({ contacts: contactsResult });
};

export const searchContact = async (req: Request, res: Response) => {
	const { search } = req.params;
	const regex = new RegExp(search);
	let query: any = { name: regex };
	if (search.includes('@')) {
		query = { email: regex };
	}
	if (search.includes('123456789')) {
		query = { phone: search };
	}
	const contacts = await Contact.find(query);
	return res.send({
		results: contacts
	});
};
