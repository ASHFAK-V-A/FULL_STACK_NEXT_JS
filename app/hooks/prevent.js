import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const usePreventReturnToVerifyOTP = () => {
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();      
      router.replace('/');
    };

    // Add an event listener for beforeunload (user clicking the back button)
    window.addEventListener('popstate', handleBeforeUnload);

    // Clean up the event listener when the component unmounts
 
  }, [router]);
};

export default usePreventReturnToVerifyOTP;
