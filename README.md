### Installation

First of all, you have to clone this repository by running:
<pre>git clone https://github.com/werfit/js_ask</pre>

Second of all, you need to run next command in the main directory
<pre>npm i</pre>
And then open `client` directory and run the same command.

## Backend

Config file needs to be created.
The application to run correctly you need to put first `default.json` file in `config`. There has to be next fields:
* `port` (It is the server port)
* `mode` (It can be either `production` or `development`)
* `logPath` (It is folder where application logs will be saved in production mode)
* `dbUsername`, `dbPassword`, `dbPort`, `dbHost`, `dbName` (Since PostgreSQL is used, you will need to enter your credentials and info about the db)
* `JWTSecretKey` (Your secret key for JWT authentication)
* `CORSWhiteList` (It is supposed to be an array of URLs which are allowed to connect to the server)

## Frontend

Open `client` directory and create `.env` file.

It has to contain:
* `REACT_APP_HOST_URL` (Which has to be your server URL)
* `REACT_APP_API_URL` (It is supposed to be default server URL to API)

## Running

All you need to do is open the main directory and run `npm run dev`.
(There is no option to run in production mode yet)