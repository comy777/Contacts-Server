import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validate = (req: Request, resp: Response, next: Function) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return resp.send({ error: errors.array()[0].msg });
	}
	next();
};
