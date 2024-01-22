import dayjs from 'dayjs';

export const formatMessageDate = (dateString: string) => {
  const currentDate = dayjs();
  const messageDate = dayjs(dateString);
  
  if (currentDate.isSame(messageDate, 'day')) {
    return messageDate.format('HH:mm');
  }
  
  if (currentDate.subtract(1, 'day').isSame(messageDate, 'day')) {
    return 'Вчера';
  }
  
  if (currentDate.isSame(messageDate, 'year')) {
    return messageDate.format('DD MMMM');
  }
  
  return messageDate.format('DD.MM.YYYY');
};