process.env.SERVER_PORT = '4002';
process.env.CORS_ALLOWED_LIST = `https://localhost:8080,http://localhost:8080,http://0.0.0.0:8080,https://0.0.0.0:8080,http://localhost:8081,https://localhost:8081,http://localhost:3000,http://localhost:3001,http://127.0.0.1:8080,http://127.0.0.1:8081,https://127.0.0.1:8080,https://127.0.0.1:8081,http://127.0.0.1:3000,https://127.0.0.1:3000`;
process.env.NEO4J_URI='neo4j+s://b299b13e.databases.neo4j.io'
process.env.NEO4J_USERNAME='neo4j'
process.env.NEO4J_PASSWORD='lYi6jvwF6_W-1RcV6iHq9AvzfwK7aBW2I1NUIgJY-Ew'
process.env.NEO4J_DATABASE='neo4j'
process.env.API_SERVICE_URL = 'http://localhost:4000/graphql';

const app = require('../src/app');
(async () => {
  try {
    await app();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();