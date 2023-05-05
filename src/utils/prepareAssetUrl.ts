import { AssetFile } from 'contentful';

const prepareAssetUrl = (url: string | AssetFile) => `https:${url}`;

export default prepareAssetUrl;
