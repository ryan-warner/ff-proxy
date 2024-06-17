# Install
Change directories to the root of the project and run the following commands:

Assumed dependencies:
- Node.js
- npm

Known to work on Node v18.20.2 and npm v10.5.0
```
npm install
npm run dev
```
Proxy server will run on port 3000. Endpoints are available at http://localhost:3000/

The client is configured to use local proxy server as-is. As long as both are running, the client should be able to make requests to the FF API as intended.
