import {
  AuthTokenResponse,
  OAuthResponse,
  Session,
  SupabaseClient,
} from "@supabase/supabase-js";

export enum AuthProvider {
  GOOGLE = "google",
}

export class AuthService {
  supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async getSession(): Promise<Session | null> {
    const {
      data: { session },
    } = await this.supabase.auth.getSession();
    return session;
  }

  async signInWithOAuth(
    provider: AuthProvider,
    redirectTo: string
  ): Promise<OAuthResponse> {
    return await this.supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: redirectTo,
      },
    });
  }

  async updateSessionAtCode(code: string): Promise<AuthTokenResponse> {
    return await this.supabase.auth.exchangeCodeForSession(code);
  }
}
