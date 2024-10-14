export const convertSecondsToTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return {
    minutes,
    seconds: remainingSeconds,
  };
};

export const formatSeconds = (seconds: number) => {
  if (seconds < 0) {
    return 'Invalid input';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  let result = '';

  if (minutes > 0) {
    result += `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }

  if (remainingSeconds > 0) {
    if (result) {
      result += ' ';
    }
    result += `${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
  }

  if (!result) {
    result = '0 seconds';
  }

  return result;
};
