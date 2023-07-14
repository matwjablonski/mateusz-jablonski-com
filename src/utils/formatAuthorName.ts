export const formatAuthorName = (author: string): string => {
  const notUrl = author.replace(/https?:\/\//, '');

  return notUrl.replace(/\/$/, '').replace(/\./g, '_');
}
