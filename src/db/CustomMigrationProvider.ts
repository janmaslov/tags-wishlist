import { Migration, MigrationProvider } from "kysely";

export class CustomMigrationProvider implements MigrationProvider {
	readonly migrations: Migration[];

	constructor(m: Migration[]){
	  this.migrations = m;
	}

	async getMigrations(): Promise<Record<string, Migration>>{
		return this.migrations.reduce((obj, val, index) => {
			obj[index.toString()] = val;
			return obj;
		}, {} as Record<string, Migration>);
	}
}