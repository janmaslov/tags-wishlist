import { version } from '../../../package.json';

export const Footer = () => {
	return (
		<footer class="container">
			<div>
				<p class="h6" title="Working to make a better tomorrow for all mankind.">&copy; 2024 - Black Mesa, Inc.</p>
				<p class="h6">{version}</p>
			</div>
		</footer>
	);
}