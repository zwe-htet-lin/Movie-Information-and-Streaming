interface Config {
  apiBaseUrl: string;
  vidsrcUrl: string;
  tmdbUrl: string;
  tmdbApiKey: string;
  googleClientId: string;
  googleClientSecret: string;
}

export const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
  vidsrcUrl: process.env.NEXT_PUBLIC_VIDSRC_URL!,
  tmdbUrl: process.env.NEXT_PUBLIC_TMDB_URL!,
  tmdbApiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY!,
  googleClientId: process.env.GOOGLE_CLIENT_ID!,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,
};
