import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../features/users/usersSlice';
import { getPosts } from '../features/posts/postsSlice';

function App() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className='App'>
      <h1>Hej</h1>
    </div>
  );
}

export default App;
