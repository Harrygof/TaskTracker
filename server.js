import express from 'express';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;
const DATA_DIR = join(__dirname, 'data');
const DATA_FILE = join(DATA_DIR, 'tasks.json');

app.use(express.json());
app.use('/images', express.static(join(__dirname, 'data', 'picture')));
app.use(express.static(join(__dirname, 'dist')));

if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR);
if (!existsSync(DATA_FILE)) writeFileSync(DATA_FILE, JSON.stringify({ tasks: [], checkIns: [] }, null, 2));

app.get('/api/data', (req, res) => {
  res.json(JSON.parse(readFileSync(DATA_FILE, 'utf8')));
});

app.post('/api/data', (req, res) => {
  writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`TaskTracker: http://localhost:${PORT}`);
});
