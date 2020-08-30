/**
 *
 */

const path = require('path');
const envalid = require('envalid');
const express = require('express');
const compression = require('compression');

// https://github.com/af/envalid#envalidcleanenvenvironment-validators-options
const config = envalid.cleanEnv(process.env, {
  NODE_ENV: envalid.str({ choices: ['production', 'test', 'development'] }),
  PORT: envalid.port({ devDefault: 3000 }),
});

const app = express();

// this app most likely runs behind a CDN
// https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', true);

// https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression
app.use(compression());

// https://expressjs.com/en/starter/static-files.html
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res) => res.redirect('404.html'));

app.listen(config.PORT);