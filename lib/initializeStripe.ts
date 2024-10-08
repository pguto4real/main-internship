import {
    createCheckoutSession,
    getStripePayments,
    StripePayments
  } from '@stripe/firestore-stripe-payments'
  import { getFunctions, httpsCallable } from '@firebase/functions'
  import app, { db } from '../firebase/connectFirebase'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
  
  const payments = getStripePayments(app, {
    productsCollection: 'products',
    customersCollection: 'customers',
  })
  
  const loadCheckout = async (priceId:string,userEmail:string) => {
    console.log(userEmail)
    try {
      const checkoutSessionsRef = collection(db, 'users', userEmail, 'checkout_sessions');
      const docRef = await addDoc(checkoutSessionsRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      // Wait for the CheckoutSession to get attached by the extension
      onSnapshot(docRef, (snap) => {
        // Check if snap.data() is defined
        const data = snap.data();
      
        if (data) {
          // Destructure safely when data is available
          const { error, url } = data;
      
          // Check for error and handle it
          if (error) {
            alert(`An error occurred: ${error.message}`);
          }
      
          // Check for URL and handle redirection
          if (url) {
            // Redirect to the Stripe Checkout URL
            window.location.assign(url);
          }
        } else {
          console.log("No data available in the snapshot.");
        }
      });
    } catch (error) {
      console.error("Error creating checkout session: ", error);
      alert("An error occurred while creating the checkout session.");
    }
  }
  
  const goToBillingPortal = async () => {
    const instance = getFunctions(app, 'us-central1')
    const functionRef = httpsCallable(
      instance,
      'ext-firestore-stripe-payments-createPortalLink'
    )
  
    await functionRef({
      returnUrl: `${window.location.origin}/account`,
    })
      .then(({ data }: any) => window.location.assign(data.url))
      .catch((error) => console.log(error.message))
  }
  
  export { loadCheckout, goToBillingPortal }
  export default payments