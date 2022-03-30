import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function useSearchUsers() {
  const [searchInput, setSearchInput] = useState('');
  const [users, setUsers] = useState([]);
  const typingTimoutRef = useRef(null);

  useEffect(() => {
    if (typingTimoutRef.current) {
      clearTimeout(typingTimoutRef.current);
    }
    const source = axios.CancelToken.source();
    typingTimoutRef.current = setTimeout(async () => {
      try {
        const res = await axios.get(
          `/users/search/${JSON.stringify(searchInput)}`,
          { cancelToken: source.token },
        );
        setUsers(res.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('useSearchUsers: successfully aborted');
        } else {
          console.log(err);
        }
      }
    }, 300);
    return () => {
      source.cancel();
    };
  }, [searchInput]);
  return { searchInput, setSearchInput, users };
}
