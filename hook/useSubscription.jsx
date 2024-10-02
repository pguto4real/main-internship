import { useEffect, useState } from 'react';

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/connectFirebase';

function useSubscription(user) {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (!user) return;

    const subscriptionsRef = collection(db, 'users', user.uid, 'subscriptions');
    const q = query(subscriptionsRef, where('status', 'in', ['trialing', 'active']));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const subscriptions = snapshot.docs.filter(
        (subscription) =>
          subscription.data().status === 'active' || subscription.data().status === 'trialing'
      );

      if (subscriptions.length > 0) {
      
        setSubscription(subscriptions[0].data());
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [user]);

  return subscription;
}

export default useSubscription;