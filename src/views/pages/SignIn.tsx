import { basePath } from "../..";
import { Base } from "../Base";
import { SignIn as SignInIcon } from "../components/icons/SignIn";

export const SignIn = () => {
	return (
		<Base>
			<style>
				{`
					.row{
						margin-bottom: 1rem;
						justify-content: center;
					}
					p{
						text-align: center;
					}
				`}
			</style>
			<div class="container">
				<div class="container-title">
					<img src={`${basePath}/public/gonarch.png`} class="logo" />
					<h1>Xen Wunschliste</h1>
				</div>
				<form action={`${basePath}/sign-in`} method="POST">
					<div class="row">
						<div class="col-12">
							<p>Logge dich hier mit deinen Jellyfin-Zugangsdaten ein, um die Wunschliste bearbeiten zu können.</p>
						</div>
					</div>
					<div class="row">
						<div class="col-12 col-md-6 col-lg-4">
							<div class="form-group">
								<label for="username">Beutzername</label>
								<input type="text" id="username" name="username" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-12 col-md-6 col-lg-4">
							<div class="form-group">
								<label for="password">Passwort</label>
								<input type="password" id="password" name="password" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-12 col-md-6 col-lg-4">
							<button type="submit" class="btn-primary"><SignInIcon /> Einloggen</button>
						</div>
					</div>
				</form>
			</div>
		</Base>
	);
}