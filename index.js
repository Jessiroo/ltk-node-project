const express = require('express');
const methodOverride = require('method-override');
const app = express();
const port = 8080;
const isLocal = true;

const indexRoutes = require('./routes/ltk/index');
const loanRoutes = require('./routes/ltk/loans');

app.use(express.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.urlencoded({ extended: true }));

app.use('/ping', indexRoutes);
app.use('/loans', loanRoutes);

app.get('/', (req, res) => {
    res.json({
		message: "✨ 👋🌏 ✨",
		stage: process.env.NODE_ENV,
	});
});

if (isLocal) {
	//local host
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
	});
} else {
	//for lambda export
	module.exports = app;
}