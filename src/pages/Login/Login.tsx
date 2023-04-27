import { useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'
import { loginByAmin } from '@/services/user.service'
import { useNavigate } from 'react-router-dom'

export default function SignInSide() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try{
      const user = await loginByAmin({
        username,
        password
      })
      sessionStorage.setItem('user', JSON.stringify(user))
      navigate('/')
    }
    catch(e){
      console.warn('err',e)
    }
  }

  return (
    <Container component='main' maxWidth='lg'>
      <Box
        sx={{
          marginTop: 8
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGFkbWlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography component='h1' variant='h5'>
                Đăng nhập
              </Typography>
              <Box component='form' noValidate onSubmit={(e) => handleSubmit(e)} sx={{ mt: 1 }}>
                <TextField
                  margin='normal' 
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  autoComplete='username'
                  autoFocus
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                  Đăng nhập
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
