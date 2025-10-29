const { Pool } = require('pg');
require('dotenv').config();

// Support DATABASE_URL, PG* vars, or DB_* vars
const buildConnFromPieces = () => {
  const user = process.env.PGUSER || process.env.DB_USER || 'postgres';
  const pass = encodeURIComponent(process.env.PGPASSWORD || process.env.DB_PASSWORD || '');
  const host = process.env.PGHOST || process.env.DB_HOST || 'localhost';
  const port = process.env.PGPORT || process.env.DB_PORT || '5432';
  const db   = process.env.PGDATABASE || process.env.DB_NAME || 'scrollview';
  return `postgres://${user}:${pass}@${host}:${port}/${db}`;
};

const connectionString = process.env.DATABASE_URL || buildConnFromPieces();

const pool = new Pool({ connectionString });

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
}

module.exports = {
  pool,
  initializeDatabase,
};


