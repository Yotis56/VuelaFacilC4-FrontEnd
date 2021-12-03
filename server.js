const express = require('express');
const path = require('path');
const app = express();
// Serve only the static files from the disst directory
app.use(express.static('./dist/VuelaFacilC4-Frontend'));
app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/VuelaFacilC4-Frontend/' }),
);
// Start the app by listening on the defaultHeroku port
app.listen(process.env.PORT || 8080);