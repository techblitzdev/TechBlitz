'use client';
import { useQueryClient } from '@tanstack/react-query';

export const refreshAt = (hours: number, minutes: number, seconds: number) => {
  const queryClient = useQueryClient();

  const now = new Date();
  const then = new Date();

  if (
    now.getHours() > hours ||
    (now.getHours() == hours && now.getMinutes() > minutes) ||
    (now.getHours() == hours &&
      now.getMinutes() == minutes &&
      now.getSeconds() >= seconds)
  ) {
    then.setDate(now.getDate() + 1);
  }
  then.setHours(hours);
  then.setMinutes(minutes);
  then.setSeconds(seconds);

  const timeout = then.getTime() - now.getTime();
  setTimeout(function () {
    // clear all of the cache
    queryClient.refetchQueries();
  }, timeout);
};
