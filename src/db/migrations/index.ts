import { Migration } from "kysely";
import { down as down000, up as up000 } from "./000-create-base-tables";

export const migrations: Migration[] = [
	{up: up000, down: down000}
];