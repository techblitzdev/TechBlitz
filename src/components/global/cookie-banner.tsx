'use client';
import { useEffect, useState } from 'react';
import { usePostHog } from 'posthog-js/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

export function cookieConsentGiven() {
  if (!localStorage.getItem('cookie_consent')) {
    return 'undecided';
  }
  return localStorage.getItem('cookie_consent');
}

export default function Banner() {
  const [consentGiven, setConsentGiven] = useState('');
  const posthog = usePostHog();

  useEffect(() => {
    const consent = cookieConsentGiven();
    if (consent) {
      setConsentGiven(consent);
    }
  }, []);

  useEffect(() => {
    if (consentGiven !== '') {
      posthog.set_config({
        persistence: consentGiven === 'yes' ? 'localStorage+cookie' : 'memory',
      });
    }
  }, [consentGiven]);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie_consent', 'yes');
    setConsentGiven('yes');
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookie_consent', 'no');
    setConsentGiven('no');
  };

  return (
    <AnimatePresence>
      {consentGiven === 'undecided' && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 p-4 text-white bg-black-100 border border-black-50 shadow-lg z-50 rounded-lg"
        >
          <div className="flex flex-col items-start gap-4 mx-auto">
            <p className="text-white flex-1 text-sm">
              This site uses tracking software. You may opt in <br />
              or opt our of cookies.
            </p>
            <div className="flex gap-3 shrink-0">
              <Button
                variant="destructive"
                type="button"
                onClick={handleDeclineCookies}
              >
                Decline
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={handleAcceptCookies}
              >
                Accept cookies
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
