import { connectDataBase, prisma } from '../model/clientDB';
import scheduler, { truncateGuestTableJob } from '../utils/jobs';
import { appServer } from './server';
import { serverPort, serverHost } from './serverConfig';

async function StartServer() {
	await connectDataBase();

	appServer.listen(serverPort, serverHost, () => {
		console.log(`AppServer listening on http://${serverHost}:${serverPort}`);
	});

	// truncate guest table every 7 days
	scheduler.addSimpleIntervalJob(truncateGuestTableJob);
}

StartServer()
	.catch((error) => console.log(error))
	.finally(() => prisma?.$disconnect());
