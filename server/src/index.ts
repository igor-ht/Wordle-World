import { connectDataBase } from '../model/clientDB';
import { appServer } from './server';
import { serverPort, serverHost } from './serverConfig';

async function StartServer() {
	await connectDataBase();

	appServer.listen(serverPort, serverHost, () => {
		console.log(`AppServer listening on http://${serverHost}:${serverPort}`);
	});
}

StartServer();
