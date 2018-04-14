const express = require('express');
const app     = express();
const PORT    = process.env.PORT || 3001;

app.use(express.static('public'));

app.listen(PORT, () => console.log('Pantry running on Port', PORT));
