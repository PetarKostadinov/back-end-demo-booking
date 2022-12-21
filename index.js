const express = require('expres');
const hbs = require('expres-handlebars').create({
    extname: '.hbs'
});

const app = express();
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('static'));

app.listen(3000, () => console.log('listening on port 3000'));