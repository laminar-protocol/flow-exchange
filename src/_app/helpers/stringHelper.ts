export const truncate = (text: string, length: number) => {
  if (text.length <= length) return text;

  const separator = '…';

  const separatorLength = separator.length;
  const charactorsToShow = length - separatorLength;
  const frontChars = Math.ceil(charactorsToShow / 2);
  const backChars = Math.floor(charactorsToShow / 2);

  return text.substr(0, frontChars) + separator + text.substr(text.length - backChars);
};
