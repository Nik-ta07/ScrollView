const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool, initializeDatabase } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// Initialize DB (ensure tables exist)
initializeDatabase().catch((err) => {
  console.error('Failed to initialize database', err);
  process.exit(1);
});

// Sample data
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://via.placeholder.com/150' }
];

let todos = [
  { 
    id: 1, 
    title: 'Learn React Native', 
    description: 'Complete the mobile development tutorial',
    completed: false,
    priority: 'high',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 2, 
    title: 'Build Todo App', 
    description: 'Create a functional todo application',
    completed: true,
    priority: 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 3, 
    title: 'Setup Backend API', 
    description: 'Configure Express.js server with REST endpoints',
    completed: false,
    priority: 'high',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running!' });
});

// DB health check
app.get('/api/health/db', async (req, res) => {
  try {
    const r = await pool.query('SELECT 1 as ok');
    res.json({ db: 'up', result: r.rows[0] });
  } catch (e) {
    res.status(500).json({ db: 'down', error: e?.message || 'DB error' });
  }
});

// Auth endpoints
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ error: 'email, name and password are required' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const insert = await pool.query(
      'INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING id, email, name, created_at',
      [email.toLowerCase(), name, hashed]
    );
    const user = insert.rows[0];
    res.status(201).json({ user });
  } catch (err) {
    if (err && err.code === '23505') {
      return res.status(409).json({ error: 'Email already registered' });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }
    const result = await pool.query('SELECT id, email, name, password_hash FROM users WHERE email=$1', [email.toLowerCase()]);
    if (result.rowCount === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = result.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Todos endpoints
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

app.post('/api/todos', (req, res) => {
  const { title, description, priority = 'medium' } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const newTodo = {
    id: todos.length + 1,
    title,
    description: description || '',
    completed: false,
    priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const { title, description, completed, priority } = req.body;
  
  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;
  if (priority !== undefined) todo.priority = priority;
  
  todo.updatedAt = new Date().toISOString();
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos.splice(todoIndex, 1);
  res.json({ message: 'Todo deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📱 API endpoints available at http://localhost:${PORT}/api`);
});
