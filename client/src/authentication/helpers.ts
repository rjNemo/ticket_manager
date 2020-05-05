/**
 * retrieve userId
 * @param user Auth0 user object
 */
export const getUID = (user: any) => {
  const { sub } = user;
  const uid = sub.split("|")[1];
  return uid;
};
