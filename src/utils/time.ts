export const convertSecondsToTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return {
    minutes,
    seconds: remainingSeconds
  };
};

export const formatSeconds = (seconds: number, shortForm?: boolean) => {
  if (seconds < 0) {
    return 'Invalid input';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  let result = '';

  if (minutes > 0) {
    result += `${minutes}${
      shortForm ? 'm' : ` minute${minutes !== 1 ? 's' : ''}`
    }`;
  }

  if (remainingSeconds > 0) {
    if (result) {
      result += ' ';
    }
    result += `${remainingSeconds}s`;
  }

  if (!result) {
    result = '0s';
  }

  return result;
};
