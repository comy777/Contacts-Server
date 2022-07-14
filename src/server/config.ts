import express from 'express';
import path from 'path';
import dbConection from '../database/config';
import contactRouter from '../router/contacts';

class Server {
	public app: express.Application;
	public port: number;
	public path: {
		contacts: string;
	};
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 1337;
		this.path = {
			contacts: '/contacts'
		};

		//Database
		this.db();

		//middlewares
		this.middlewares();

		//routes
		this.routes();
	}

	public start() {
		this.app.listen(this.port, () => {
			console.log(`Server port: ${this.port}`);
		});
	}

	public db = async () => {
		await dbConection();
	};

	private publicFolder() {
		const publicPath = path.resolve(__dirname, '../public');
		this.app.use(express.static(publicPath));
	}

	private middlewares() {
		this.app.use(express.json());
		this.publicFolder();
	}

	private routes = () => {
		this.app.use(this.path.contacts, contactRouter);
	};
}

export default Server;
