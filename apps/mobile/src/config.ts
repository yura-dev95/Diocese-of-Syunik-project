import { Platform } from 'react-native';

const apiUrl =
  Platform.OS === 'android'
    ? process.env.EXPO_PUBLIC_ANDROID_API_URL
    : process.env.EXPO_PUBLIC_API_URL;

export const API_URL = apiUrl ?? 'http://localhost:4000/api/v1';
export const ASSET_URL = process.env.EXPO_PUBLIC_ASSET_URL ?? 'http://localhost:5173';

export function toAbsoluteAssetUrl(url?: string | null) {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${ASSET_URL}${url.startsWith('/') ? url : `/${url}`}`;
}
