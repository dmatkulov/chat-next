import {Router} from 'express';
import messageDb from '../messageDb';
import {Message} from '../types';

const messagesRouter = Router();

messagesRouter.get('/', async (req, res, next) => {
  try {
    const messages = await messageDb.getItem();
    res.send(messages);
  } catch (e) {
    next(e);
  }
});

messagesRouter.post('/', async (req, res, next) => {
  try {
    const author = req.body.author;
    const message = req.body.message;
    
    if (!author || !message) {
      return res.status(422).send({error: 'Author or message must be present'});
    }
    
    const rawMessage: Message = {
      author: req.body.author,
      message: req.body.message,
    };
    
    const newMessage = await messageDb.addItem(rawMessage);
    res.send(newMessage);
    
  } catch (e) {
    next(e);
  }
});

export default messagesRouter;