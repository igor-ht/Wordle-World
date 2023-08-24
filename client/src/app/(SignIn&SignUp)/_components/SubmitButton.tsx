export default function SubmitButton({ userLogged, text }: { userLogged: boolean; text: string }) {
	return (
		<button
			type="submit"
			className="btn-auth"
			disabled={userLogged}>
			{text}
		</button>
	);
}
