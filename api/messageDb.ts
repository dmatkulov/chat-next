import {promises as fs} from 'fs';
import {Message, MessageApi} from './types';


const fileName = './db.json';
let data: MessageApi[] = [];

const messageDb = {
  async init() {
    try {
      const messageContents = await fs.readFile(fileName);
      data = JSON.parse(messageContents.toString());
    } catch (e) {
      console.error('Error, ', e);
      data = [];
    }
  },
  async getItem() {
    return data;
  },
  async addItem(item: Message) {
    const id = crypto.randomUUID();
    const datetime = new Date().toISOString();
    
    const newMessage = {id, datetime, ...item};
    data.push(newMessage);
    await this.save();
    
    return newMessage;
  },
  async save() {
    return fs.writeFile(fileName, JSON.stringify(data));
  }
};

export default messageDb;