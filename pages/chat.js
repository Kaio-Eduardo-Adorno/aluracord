import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { useState, useEffect } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const listenNewMessages = (newMessage) => {
  return supabase
    .from('messages')
    .on('INSERT', (incomingMessage) => {
      newMessage(incomingMessage.new);
    })
    .subscribe();
};

export default function ChatPage() {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setMessageList(data);
      });

    listenNewMessages((newMessage) => {
      setMessageList((activeMessageList) => {
        return [newMessage, ...activeMessageList]
      });
    });

  }, [])

  const handleNewMessage = (newMessage) => {
    const messageInfo = {
      from: 'kaio-eduardo-adorno',
      content: newMessage,
    };

    supabase
      .from('messages')
      .insert([messageInfo])
      .then(() => {
      })

    setMessage('');
  }

  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary['020'],
        backgroundImage: `url(https://images3.alphacoders.com/641/thumb-1920-641193.jpg)`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'flex-end',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >

          <MessageList messages={messageList} />

          <Box
            as='form'
            styleSheet={{
              display: 'flex',
              alignItems: 'unsafe',
            }}
          >
            <TextField
              placeholder='Insira sua mensagem aqui...'
              type='textarea'
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleNewMessage(message)
                }
              }}
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px 0px 0px 5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                color: appConfig.theme.colors.neutrals[200],
              }}
            >
            </TextField>
          </Box>
        </Box>
      </Box>
    </Box >
  )
}

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href='/'
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  return (
    <Box
      tag='ul'
      styleSheet={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px',
      }}
    >
      {props['messages'].map((message) => {
        return (
          <Text
            key={message.id}
            tag='li'
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              }
            }}
          >
            <Box
              styleSheet={{
                display: 'flex',
                marginBottom: '8px',
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/${message.from}.png`}
              />
              <Text tag='strong'>
                {message.from}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '9px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag='span'
              >
                {`${new Date(message.created_at).toLocaleDateString('en-GB')} 
                às ${new Date(message.created_at).toLocaleTimeString('it-IT')}`}
              </Text>
            </Box>
            {message.content}
          </Text>
        )
      })}
    </Box>
  )
}