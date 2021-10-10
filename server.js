const Express = require('express');

const app = Express();
app.use(Express.json());

app.listen(5000, () => {
    console.log('Escuchando el puerto 5000');
});
