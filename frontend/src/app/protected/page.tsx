'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Container } from '@mui/material';
import { User } from '@/types/User';
import SearchComponent from '@/components/search';
import searchOptions from './config/searchConfig';

function ProtectedPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <Container>
      {user && <Button onClick={handleLogout}>Logout</Button>}
      {Object.entries(searchOptions).map(([key, option]) => {
        if (option.adminOnly && user.role !== 'admin') {
          return null;
        }
        return (
          <div key={key}>
            <h2>{option.label}</h2>
            <SearchComponent
              fetchData={option.fetchData}
              getSuggestionLabel={option.getSuggestionLabel}
              placeholder={option.placeholder}
              columns={option.columns}
            />
          </div>
        );
      })}
    </Container>
  );
}

export default ProtectedPage;
