import express from 'express';
import cors from 'cors';
import messagesRouter from './routers/messages';
import messageDb from './messageDb';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/messages', messagesRouter);

const run = async () => {
  await messageDb.init();
  
  app.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });
};

run().catch(console.error);