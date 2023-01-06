import app from './app.js'

const { PORT } = process.env || 3000;

app.listen(PORT, () => {
  console.log(`Connecting on Port ${PORT} ====>`);
});
