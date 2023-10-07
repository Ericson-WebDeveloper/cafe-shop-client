
export const RedirectPage = (isAdmin: boolean): string => {
  if(isAdmin) {
    return '/backend';
  } else {
    return '/';
  }
}