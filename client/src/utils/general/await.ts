export function awaitFunction<T>(time: number, cb: () => T): Promise<T> {
	return new Promise((resolve) => {
		setTimeout(() => {
			const result = cb();
			resolve(result);
		}, time);
	});
}
