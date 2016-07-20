"use strict"; // eslint-disable-line
const express = require('express');
const app = express();
const server = require('http').Server(app); // eslint-disable-line
const path = require('path');
// const imperio = require('./../../imperio/index.js')(server);
const imperio = require('imperio')(server);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(`${__dirname}/../client`)));
// app.use(express.static(path.join(`${__dirname}/../../imperio`)));
app.use(express.static(path.join(`${__dirname}/../node_modules/imperio`)));
app.set('view engine', 'ejs');

/* ------------------
 * --    Routes    --
 * ------------------ */

// App will serve up different pages for client & desktop
app.get('/', imperio.init(),
  (req, res) => {
    if (req.imperio.isDesktop) {
      res.sendFile(path.join(`${__dirname}/../client/browser.html`));
      // res.render(`../client/browser.html`);
    } else if (req.imperio.isMobile) {
      res.render(`${__dirname}/../client/rootmobile`, { error: null });
      // res.sendFile(path.join(`${__dirname}/../client/mobile.html`));
    }
  }
);
app.post('/', imperio.init(),
  (req, res) => {
    if (req.imperio.isMobile) {
      if (req.imperio.connected) {
        res.render(`${__dirname}/../client/tapmobile`, { error: null });
      } else {
        res.render(`${__dirname}/../client/rootmobile`, { error: null });
      }
    } else {
      res.status(404)
         .render(`${__dirname}/../client/browser.html`, { error: 'NO POST' });
    }
  }
);
// 404 error on invalid endpoint
app.get('*', (req, res) => {
  res.status(404)
     .render(`${__dirname}/../client/rootmobile`,
             { error: 'Please enter code to connect to browser' });
});

/* ------------------
 * --    Server    --
 * ------------------ */

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
