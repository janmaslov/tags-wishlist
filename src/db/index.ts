import { join, dirname } from "node:path"
import { Kysely, Migrator } from 'kysely';
import { Database } from "bun:sqlite";
import { UserTable, WishlistItemTable } from '../types';
import { CustomMigrationProvider } from "./CustomMigrationProvider";
import { migrations } from "./migrations";
import { BunWorkerDialect } from "kysely-bun-worker";

export interface Databases {
    items: WishlistItemTable,
    users: UserTable
}

const dbBasePath = Bun.env.NODE_ENV === 'production' ? dirname(Bun.main) : join(dirname(Bun.main), '..');
const dbPath = join(dbBasePath, 'db.sqlite');

const db = new Kysely<Databases>({
    dialect: new BunWorkerDialect({
		url: dbPath
	})
});

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
        console.error(error);
        process.exit(1);
    }
}

await migrateToLatest();

export default db;