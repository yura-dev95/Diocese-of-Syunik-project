declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_API_URL?: string;
    EXPO_PUBLIC_ANDROID_API_URL?: string;
    EXPO_PUBLIC_ASSET_URL?: string;
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
};
