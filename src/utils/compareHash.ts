const compareHash = (x?: string, y?: string) => {
  if (typeof x !== 'string' || typeof y !== 'string') return false;
  return x.toLowerCase() === y.toLowerCase();
};

export default compareHash;
