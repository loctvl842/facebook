import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function useSearchUsers({ userId, flag }) {
  const [searchInput, setSearchInput] = useState('');
  const [users, setUsers] = useState([]);
  const [moreUsers, setMoreUsers] = useState([]);
  const typingTimoutRef = useRef(null);

  useEffect(() => {
    if (typingTimoutRef.current) {
      clearTimeout(typingTimoutRef.current);
    }
    const source = axios.CancelToken.source();
    if (flag === 'search-chat-user') {
      typingTimoutRef.current = setTimeout(async () => {
        try {
          // find room
          const roomRes = await axios.get(
            `/rooms/search?userId=${userId}&searchText=${searchInput}`,
            {
              cancelToken: source.token,
            },
          );
          setUsers(roomRes.data);

          // find more people that is not friend
          const friendRes = await axios.get(
            `/users/search/${JSON.stringify(searchInput)}`,
            { cancelToken: source.token },
          );

          friendRes.data = friendRes.data.filter((user) => {
            const containFriend = (user) => {
              let n = roomRes.data.length;
              for (let i = 0; i < n; i++) {
                // only check room has friend only
                // (do not check group)
                if (
                  roomRes.data[i].members &&
                  roomRes.data[i].members.length === 1 &&
                  roomRes.data[i].members[0]._id.toString() === user._id
                ) {
                  return false;
                }
              }
              return true;
            };
            return containFriend(user);
          });
          // map all friend searched to a fake room
          friendRes.data = friendRes.data.map((friend) => {
            return {
              members: [
                {
                  username: friend.username,
                  img: friend.profilePicture,
                  _id: friend._id,
                },
              ],
              img: [friend.profilePicture],
              name: friend.username,
            };
          });
          setMoreUsers(friendRes.data);
        } catch (err) {
          if (axios.isCancel(err)) {
            console.log('useSearchUsers: successfully aborted');
          } else {
            console.log(err);
          }
        }
      }, 300);
    } else {
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
    }
    return () => {
      source.cancel();
    };
  }, [searchInput]);
  return { searchInput, setSearchInput, users, moreUsers };
}
