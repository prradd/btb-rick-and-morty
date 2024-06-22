'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticate } from '@/services/AuthService';
import { Button, TextField, Container, Box, Typography } from '@mui/material';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const user = await authenticate(username, password);
    if (user) {
      router.push('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <TextField
          label="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
