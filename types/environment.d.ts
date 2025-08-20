declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV?: string;
      MONGODB_URI?: string;
      JWT_SECRET?: string;
      JWT_EXPIRE?: string;
      JWT_COOKIE_EXPIRE?: string;
      GOOGLE_CLIENT_ID?: string;
      GOOGLE_CLIENT_SECRET?: string;
      GOOGLE_CALLBACK_URL?: string;
    }
  }
}

export {};