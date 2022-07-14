import { Router } from 'express';
import { check } from 'express-validator';
import { saveContact, updateContact, deleteContact, getContacts, searchContact } from '../controllers/contact';
import { validate } from '../middlewares/validate';

const contactRouter = Router();

contactRouter.post(
	'/',
	[
		check('name', 'El nombre del contacto es requerido').notEmpty(),
		check('phone', 'El numero de telefono del contacto es requerido').notEmpty(),
		check('email', 'El correo electronico es requerido').isEmail(),
		check('address', 'La direccion es requerida').notEmpty(),
		check('date', 'La fecha de nacimiento es requerida').not().isDate(),
		validate
	],
	saveContact
);

contactRouter.put('/:id', [ check('id', 'El id del contacto es requerido').isMongoId(), validate ], updateContact);

contactRouter.delete('/:id', [ check('id', 'El id del contacto es requerido').isMongoId(), validate ], deleteContact);

contactRouter.get('/', getContacts);

contactRouter.post('/search/:search', searchContact);

export default contactRouter;
