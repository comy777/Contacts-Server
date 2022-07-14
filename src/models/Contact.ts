import { Schema, model } from 'mongoose';

const ContactSchema = new Schema({
	name: {
		type: String,
		required: [ true, 'El nombre del contacto es requerido' ]
	},
	phone: {
		type: Number,
		required: [ true, 'El numero de telefono es requerido' ]
	},
	date: {
		type: Date,
		required: [ true, 'La fecha de nacimiento es requerida' ]
	},
	address: {
		type: String,
		required: [ true, 'La direccion es requerida' ]
	},
	email: {
		type: String,
		unique: true,
		required: [ true, 'El correo electronico es requerido' ]
	}
});

export default model('contact', ContactSchema);
