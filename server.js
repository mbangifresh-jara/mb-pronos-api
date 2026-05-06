const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
app.use(cors());

app.get('/matches', async (req, res) => {
  try {
    const now = new Date();
    const in9 = new Date(Date.now() + 9*24*3600*1000);
    const fmt = d => d.toISOString().split('T')[0];
    const r = await fetch(
      `https://api.football-data.org/v4/matches?status=SCHEDULED&dateFrom=${fmt(now)}&dateTo=${fmt(in9)}`,
      { headers: { 'X-Auth-Token': '8dfb32a730f5488cad5fb3926cbdf2cd' } }
    );
    const d = await r.json();
    res.json(d);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/', (req, res) => res.json({ status: 'OK' }));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Running on ' + PORT));
