import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';

export default function PaginaInicial() {
  const [username, setUsername] = useState('kaio-eduardo-adorno');
  const [image, setImage] = useState(`https://github.com/${username}.png`);
  const [userNotFound, setUserNotFound] = useState(false);
  const router = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary['020'],
          backgroundImage: 'url(https://images3.alphacoders.com/641/thumb-1920-641193.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(event) => {
              event.preventDefault();
              if (!userNotFound) {
                router.push(`/chat?username=${username}`);
              }
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Text variant="heading2" styleSheet={{
              color: appConfig.theme.colors.neutrals['000'],
              fontFamily: 'fleshandblood',
              fontSize: '24px',
              fontWeight: 600,
            }}>Welcome good hunter!</Text>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', fontFamily: 'liberation-serif', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            {userNotFound ? (
              <Text variant="body4" styleSheet={{ marginBottom: '1px', fontFamily: 'liberation-serif', color: appConfig.theme.colors.primary[300] }}>
                *Nome de usuario inválido!
              </Text>
            ) : null}
            <TextField
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setImage(`https://github.com/${event.target.value}.png`);
                setUserNotFound(false);
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={image}
              onError={() => {
                setImage('https://imgshare.io/images/2022/01/27/user-not-found.jpg');
                setUserNotFound(true);
              }}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}