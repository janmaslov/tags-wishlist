import { join, dirname } from "node:path";
import { mkdir } from "node:fs/promises";
import { Kysely, Migrator } from 'kysely';
import { UserTable, WishlistItemTable } from '../types';
import { CustomMigrationProvider } from "./CustomMigrationProvider";
import { migrations } from "./migrations";
import { BunWorkerDialect } from "kysely-bun-worker";

export interface Databases {
    items: WishlistItemTable,
    users: UserTable
}

console.log('db_path', Bun.env.DB_PATH);
const dbPath = Bun.env.NODE_ENV === 'production' ? Bun.env.DB_PATH ?? dirname(Bun.main) : join(dirname(Bun.main), '..', 'db.sqlite');
console.log('dbPath', dbPath);

const db = new Kysely<Databases>({
    dialect: new BunWorkerDialect({
		url: dbPath
	})
});

(async () => {
    async function migrateToLatest() {
        const migrationDb = new Kysely<Databases>({
            dialect: new BunWorkerDialect({
                url: dbPath
            })
        });

        const migrator = new Migrator({
            db: migrationDb,
            provider: new CustomMigrationProvider(migrations)
        });

        const { error, results } = await migrator.migrateToLatest();

        results?.forEach((it) => {
            if (it.status === 'Success') {
                console.log(`migration "${it.migrationName}" was executed successfully`);
            } else if (it.status === 'Error') {
                console.error(`failed to execute migration "${it.migrationName}"`);
            }
        });

        if (error) {
            console.error('failed to migrate');
            console.error(JSON.stringify(error, null, 4));
            process.exit(1);
        }
    }

    await migrateToLatest();
})();

export default db;