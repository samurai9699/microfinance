import { useState, useEffect } from 'react';

export function usePushNotifications() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const subscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY
      });
      setSubscription(sub);
      return sub;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      throw error;
    }
  };

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      throw new Error('Notifications not supported');
    }

    const result = await Notification.requestPermission();
    setPermission(result);
    
    if (result === 'granted') {
      return subscribe();
    }
    
    throw new Error('Permission denied');
  };

  return {
    subscription,
    permission,
    requestPermission,
    subscribe,
    isSupported: 'Notification' in window && 'serviceWorker' in navigator
  };
}