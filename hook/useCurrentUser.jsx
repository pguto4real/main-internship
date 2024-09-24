// hooks/useCurrentUser.js

import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '../firebase/connectFirebase';


// Custom hook to get current user
const useCurrentUser = () => {
  const [user, loading, error] = useAuthState(firebaseAuth);

  return { user, loading, error };
};

export default useCurrentUser;