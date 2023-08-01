import { AssetFile } from 'contentful';

const prepareAssetUrl = (url: string): string => {
  if (url) {
    let newUrl = url;
    
    if (url.charAt(0) === '/' && url.charAt(1) === '/') {
      newUrl = newUrl.replace(/\/\//g, '')
    }

    newUrl = newUrl
      .replace(/(ftp|http|https):\/\//g, '');

    return `https://${newUrl}`;
  }

  return '';
};

export default prepareAssetUrl;
