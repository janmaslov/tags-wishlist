# Xen Wishlist

A small wishlist website for media on Xen. It was made to experiment with [Bun](https://bun.sh) and [Htmx](https://htmx.org).

# Quick Start

Before running it, install the project's dependencies. Open a terminal in the project's root folder and run:
```
npm i
```

## Locally

```
npm start
```
OR
```
bun start
```
Note: This project requires Bun instead of node.js to run. Some crucial functionality is not provided when running it with node.js, so it will likely crash.

## Locally, via Docker

To run the project locally in a Docker container, open a terminal in the project's root folder and run:
```
npm run build-container
npm run run-container
```
OR
```
bun run build-container
bun run run-container
```
This should first build the Docker container and register it in your local registry. Afterwards it will run the container, allowing it to create the SQLite database file in the project's root folder.

# Project structure

The `src` folder contains most of the source code. It contains the following:
- `index.ts`<br>The program's entry point. Bootstraps the server and defines all routes, with minimal logic, that call handlers.
- `types.ts`<br>Contains TypeScript type definitions for objects used throughout the project
- `db/`<br>SQLite database migration logic and provides the database to other parts of the project
- `handlers/`<br>The logic behind the routes defined in `index.ts`
- `utils/`<br>Random utility functions
- `views/`<br>Pages and components the project consists of

Additionally, some relevant parts are located in the `public` folder:
- `htmx@*.min.js`<br>The frontend library used. Bundled with its WebSockets extension
- `main.js`<br>Contains some frontend-specific utility functions
- `main.css`<br>Contains the visual styling for the project's pages and components

# Routes

- `GET /`
	- Shows the main index page if user is authenticated
	- Redirects to `/sign-in` if the user isn't authenticated
- `GET /refreshlist`
	- Establishes a WebSocket connection to send updates when the list is updated
- `GET /refresharchived`
	- Establishes a WebSocket connection to send updates when the archived list is updated
- `GET /sign-in`
	- Shows the sign-in page
- `POST /sign-in`
	- Calls `authenticateWithJellyfin` to contact the Jellyfin server with the login data the user provided
		- If successful, it will set three cookies (`wishlistauth` being the most important) and redirects to `/` to verify the authentication
		- If unsuccessful, it will redirect to `/sign-in`
- `GET /sign-out`
	- Removes the `wishlistauth` cookie and redirects to `/` to verify the successfully lost authentication
- `GET /wishlist/add`
	- Htmx-specific. Only sends the add/edit modal component in an empty state (in order to add a new wishlist item)
- `POST /wishlist/add`
	- Calls `getOrCreateUser` to get or create an already authenticated user in the wishlist's database, so we have the Jellyfin user Id and name saved to reference in wishlist items
	- Calls `addWishlistItem` to create a new withlist item in the database
	- Sends update events to all currently connected WebSockets
- `GET /wishlist/edit/:itemId`
	- Calls `getWishlistItem` to try to find the wishlist item with the given Id in the database
		- No matter whether an item is found or not, it will send the add/edit modal component. If an item was found, the fields in the modal will be pre-populated
- `POST /wishlist/edit`
	- Calls `getOrCreateUser` to get or create an already authenticated user in the wishlist's database, so we have the Jellyfin user Id and name saved to reference in wishlist items
		- We expect a user to have already been created at this point, since users aren't expected to be able to edit wishlist items belonging to other users
	- Calls `editWishlistItem` to edit the provided item in the database
		- Note: Because we send all the data entered in the add/edit modal, and the database doesn't intelligently only update fields that weren't changed, this function will to a comparison of what's already in the database and the new data
	- Sends update events to all currently connected WebSockets
- `POST /wishlist/delete/:itemId`
	- Calls `getUser` to verify if the requesting user exists, and to later verify whether the item requested for deletion belongs to the user
	- Calls `deleteWishlistItem` to wipe the provided item from the database
		- This will only delete item an item with the matching Id provided and if the user matches with the current one, or the user's Id matches the admin's Id
	- Sends update events to all currently connected WebSockets

# Technical considerations

The goal was to create an easy to use wishlist application, using technologies I've not used before so I can get a feel for them. As a JavaScript runtime, [Bun](https://bun.sh) doesn't differentiate itself that much from node.js, but it runs TypeScript natively and has a bunch of quality of life improvements over node.js. Like the built-in SQLite database. [Htmx](https://htmx.org) is very different from traditional frontend frameworks like React. It goes somewhat "back to the roots" by practically requiring the UI's HTML to be rendered on the server side, but it makes making the UI feel interactive easier than using plain JavaScript without a framework at all.

## Backend

I chose Elysia as the server framework because it appeared as the most stable one, being made specifically for Bun. In order to preserve its full TypeScript typing support, it turned out that it has to live with a fatal flaw: It's not possible yet to split routes across other files while keeping all typing intact. Unfortunately, this forced me to put all the routes into `index.ts` in order to get Elysia's WebSockets plugin to work. With the routes split across multiple files (to make the server side easier to understand and more modular) the TypeScript typings for the WebSockets and cookies plugins weren't coming through.

Aside from the usual SQL-headaches like migrations, the SQLite database built into Bun functions well with [Kysely](https://kysely.dev/), a generic query builder that can be used with [kysely-bun-worker](https://www.npmjs.com/package/kysely-bun-worker) to make SQL queries happen. SQLite is more than enough in case of this project, since the wishlist won't be dealing with billions of rows anytime soon. It's plenty fast.

## Frontend

Htmx turned out to be quite nice, but I can't imagine it for giant websites with millions of visitors a day, and also not for very complex interfaces. The main problem with the first is that more load is placed on the server, which isn't desirable when scaling to such high numbers of visitors. The problem with the second is that maintainability of the UI code becomes worse as complexity grows, because Htmx expects HTML to be returned by APIs and replaces elements currently visible with new ones as the user interacts with the page. This means that the server must be able to render components (such as the wishlist in this case) in context (when loading the index page) and also on its own (when the list needs to be replaced after a change happens).

I used [kitajs/html](https://www.npmjs.com/package/@kitajs/html) to partly find a way around that. It allows components and pages to exist as JSX code, which are essentially functions. This approach allowed me to render components both in-context and on their own when needed. It's not a terrible solution, but to recycle components as much as possible, the components must be designed well from a code perspective.