declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: number;
      DB_USER: string;
      ENV: "test" | "dev" | "prod";
      REACT_APP_GOOGLE_CLIENT_ID: string;
      REACT_APP_MONGODB_APP_ID: string;
      REACT_APP_MONGODB_AUTH_API_KEY: string;
      REACT_APP_GOOGLE_MAPS_API_KEY: string;
      REACT_APP_GOOGLE_MAPS_MAP_ID: string;
    }
  }
}

export {};
