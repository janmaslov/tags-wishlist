import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('items')
		.addColumn('id', 'integer', (col) => col.primaryKey())
		.addColumn('status', 'integer', (col) => col.defaultTo(0).notNull())
		.addColumn('lastStatusChange', 'integer', (col) => col.notNull())
		.addColumn('type', 'integer', (col) => col.notNull())
		.addColumn('name', 'text', (col) => col.notNull().unique())
		.addColumn('poster', 'text')
		.addColumn('createdBy', 'text', (col) => col.notNull().references('users.jellyfinId'))
		.addColumn('createdAt', 'integer', (col) => col.notNull())
		.addColumn('year', 'integer', (col) => col.notNull())
		.addColumn('imdbId', 'text')
		.addColumn('tmdbId', 'text')
		.addColumn('tvdbId', 'text')
		.execute();

	await db.schema
		.createTable('users')
		.addColumn('id', 'integer', (col) => col.primaryKey())
		.addColumn('jellyfinId', 'text', (col) => col.notNull().unique())
		.addColumn('name', 'text', (col) => col.notNull().unique())
		.execute();

	await db.schema
		.createIndex('index-item-user-jellyfinid')
		.on('items')
		.column('createdBy')
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('items').execute();
	await db.schema.dropTable('users').execute();
	await db.schema.dropIndex('index-item-user-jellyfinid').execute();
}