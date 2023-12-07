# Reactive Vanilla Javascript

## Overview

I planned to focus on the scalability and efficiency with a modern approach to vanilla JS.

No third party packages were used except for tests.

## Client

Instead of an imperative way with `document` and `querySelector` I decided to go with state-based UI component similar to React. It is lighter, faster and more readable (especially when everyone is using React and JSX now).

Sorting is done by clicking the required column header. When a new column is sorted for the first time it defaults to ascend direction. Click again and it toggles direction. Default sorting on initial render is set to `users.name` ascending.

Everything is wrapped with self-invoking function to prevent JavaScript leak to the browser.

## API

The whole sorting is moved to the server. In real life scenario with more data, the approach will be similar. The database querying and sorting will be on the backend. Hence, frontend will only display data. I wanted to achieve the production approach and quality here.

I was aiming for a SOLID and DRY code that is why I split for many functions and additional helper methods. These included replacing non-Latin letters in strings and parsing US-style dates to ISO for sorting.

## Tests

I decided to go with end to end tests with puppeteer. Again, as in real life, I wanted to provide my data and check in on the client-side. Since we do not have the database here and we cannot create a test database, I decided to create new users file.

My approach was to change the file name for testing environment and use the actual one for production. I decided not to use `dotenv` package and add env variables in scripts in `package.json`.

I created some basic tests to find elements on the page. Sorting tests are done by parametrized tests, checking all the rows and all the columns for descending and ascending direction.

## Going further

There are still some possible improvements to do. To achieve better performance, the server should paginate results and display around 10 to 20 records per page.

Currently, the solution has only end to end tests. It will be beneficial to add unit tests to check API's methods.

The table and header are responsive with basic aria but they could be improved as well. There are two possibilities to consider, one will be to add `overflow-x` and scroll or rearrange the table's cells differently.

## Usage

#### Install packages:

npm i

#### Start client and server:

npm run start

#### Start tests:

npm run test

#### Start client with server and tests:

npm run e2e
