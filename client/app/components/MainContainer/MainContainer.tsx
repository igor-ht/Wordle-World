export default function MainContainer({ children }: { children: React.ReactNode }) {
	return (
		<main
			className="main-container"
			id="main-container">
			{children}
		</main>
	);
}
