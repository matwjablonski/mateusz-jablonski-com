import { AssetFile } from 'contentful';

const prepareAssetUrl = (url: string): string => {
  if (url) {
    const newUrl = url.replace(/(ftp|http|https):\/\//g, '');

    return `https://${newUrl}`;
  }

  return '';
};

export default prepareAssetUrl;
