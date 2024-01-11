import { Footer } from "./components/Footer";

export const Base = (props: Html.PropsWithChildren) => {
	return (
		<>
			{'<!doctype html>'}
			<html lang="de">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<title>Xen Wishlist</title>
					<link rel="stylesheet" href="/public/main.css" />
					<style>
						{`@font-face {
							font-family: 'Inter';
							font-style: normal;
							font-weight: 400;
							font-display: swap;
							src: url(/public/fonts/inter-regular.woff2) format('woff2');
							unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
						}`}
						{`@font-face {
							font-family: 'Inter';
							font-style: normal;
							font-weight: 700;
							font-display: swap;
							src: url(/public/fonts/inter-bold.woff2) format('woff2');
							unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
						}`}
					</style>
					<script src="/public/htmx@1.9.10.min.js"></script>
					<meta name="description" content="" />

					<meta property="og:title" content="" />
					<meta property="og:type" content="" />
					<meta property="og:url" content="" />
					<meta property="og:image" content="" />

					<link rel="icon" href="/public/favicon.ico" sizes="any" />
					<link rel="apple-touch-icon" href="/public/apple-touch-icon.png" />

					<link rel="manifest" href="/public/site.webmanifest" />
					<meta name="theme-color" content="#222222" />
				</head>

				<body>
					{props.children && props.children}
					<Footer />

					<script src="/public/main.js"></script>
					<script>
						const userId = '';
					</script>
				</body>
			</html>
		</>
	);
}