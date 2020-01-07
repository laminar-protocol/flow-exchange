export default () => (next: any) => (action: any): any => {
  // check for errors on action or payload
  const { type } = action;
  const { error } = action || action.payload;
  if (error && error.message && error.stack) {
    console.error(type, error);
  }
  return next(action);
};
