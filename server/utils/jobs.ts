import { ToadScheduler, AsyncTask, SimpleIntervalJob } from 'toad-scheduler';
import { GuestController } from '../src/routers/guest/guestApi';

const truncateGuestTableTask = new AsyncTask(
	'truncate Guest Table',
	async () => {
		console.log('**Truncate Guest table job starting**');
		const deletedRows = await GuestController().truncateTable();
		console.log(`Guest table truncated. Rows deleted: ${deletedRows}`);
	},
	() => {
		console.log('Server could not truncate Guest table.');
	}
);
export const truncateGuestTableJob = new SimpleIntervalJob({ days: 7 }, truncateGuestTableTask, {
	preventOverrun: true,
});

const scheduler = new ToadScheduler();

export default scheduler;
