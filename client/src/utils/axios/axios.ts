import axios from 'axios';

export const axiosAuth = axios.create({
	headers: { 'Content-Type': 'application/json' },
});
