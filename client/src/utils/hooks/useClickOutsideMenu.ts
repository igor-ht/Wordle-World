import { useEffect } from 'react';

export function useClickOutsideMenu(ref: React.RefObject<HTMLElement>, callback: () => void) {
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) callback();
			if (e.target instanceof HTMLLIElement && ref.current?.contains(e.target)) callback();
		};

		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	});
}
