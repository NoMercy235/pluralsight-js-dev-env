import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', (req, res) => {
    res.json([
        { "id": 1, "firstName": "Bob", "lastName": "Smith", "email": "bob@gmail.com" },
        { "id": 1, "firstName": "Will", "lastName": "Turner", "email": "will@gmail.com" },
        { "id": 1, "firstName": "Jack", "lastName": "Sparrow", "email": "jack@gmail.com" }
    ])
});

app.listen(port, (err) => {
    if (err) {
        console.log(err); // eslint-disable-line no-console
    } else {
        open('http://localhost:' + port);
    }
});
