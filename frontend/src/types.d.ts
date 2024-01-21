export interface Message {
  author: string;
  message: string;
}

export interface MessageApi extends Message {
  id: string;
  datetime: string;
}