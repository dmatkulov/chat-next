import React, {useState} from 'react';
import {Message} from '@/src/types';
import {Grid, InputAdornment, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {AccountCircle} from '@mui/icons-material';
import {LoadingButton} from '@mui/lab';

interface Props {
  isLoading: boolean;
  onSubmit: (message: Message) => void;
}

const ChatForm: React.FC<Props> = ({isLoading, onSubmit}) => {
  const [state, setState] = useState<Message>({
    author: '',
    message: ''
  });
  
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
    setState({
      author: '',
      message: ''
    })
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  return (
    <form onSubmit={handleSubmitForm}>
      <Grid
        item
        xs
        sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr' , gap: 4, backgroundColor: 'white', px: 2, py: 3, borderRadius: 3}}
        alignItems="end"
      >
        <Grid
        item
        xs
        >
          <TextField
            required
            type="text"
            id="author"
            name="author"
            label="Author"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="standard"
            value={state.author}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid
          item
          xs>
          <TextField
            required
            type="text"
            id="message"
            name="message"
            label="Type Something"
            variant="standard"
            value={state.message}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <LoadingButton
            loadingPosition="start"
            startIcon={<SendIcon/>}
            type="submit"
            variant="contained"
            loading={isLoading}
            disabled={isLoading}
            sx={{ borderRadius: 5 }}
            fullWidth
          >
            Send
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ChatForm;