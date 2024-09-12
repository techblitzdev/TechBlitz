/**
 * Method to get the URL to redirect the user to.
 * 
 * @param query 
 * @returns URL
 */
export const getRedirectUrl = (query: string) => {
  return new URL(`/login?${query}`, 'https://app.layowt.com').href
}