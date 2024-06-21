import ProtectedPage from './protected/page';
import SearchComponent from '../components/search';

export default function Home() {
  return (
    <ProtectedPage>
      <SearchComponent />
    </ProtectedPage>
  );
}
