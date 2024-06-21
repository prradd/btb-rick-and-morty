'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticate } from '@/services/AuthService';
import { Button, TextField, Container, Box } from '@mui/material';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const user = authenticate(username, password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
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
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          margin="normal"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
