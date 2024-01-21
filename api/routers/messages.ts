import {Router} from 'express';
import messageDb from '../messageDb';
import {Message, MessageApi} from '../types';

const messagesRouter = Router();

messagesRouter.get('/', async (req, res, next) => {
  try {
    const allMessages = await messageDb.getItem();
    let latest: MessageApi[] = [];
    
    const queryDate = req.query.datetime as string;
    
    if (queryDate !== undefined) {
      const date = new Date(queryDate);
      
      if (isNaN(date.getDate())) {
        return res.status(400).send({error: 'Invalid date format'});
      }
      const filteredByDate = allMessages.filter(message => {
        console.log(message.datetime);
        console.log('date, ', date);
        return new Date(message.datetime) > date;
      });
      latest = filteredByDate.slice(-30);
    } else {
      latest = allMessages.slice(-30);
    }
    
    res.send(latest);
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