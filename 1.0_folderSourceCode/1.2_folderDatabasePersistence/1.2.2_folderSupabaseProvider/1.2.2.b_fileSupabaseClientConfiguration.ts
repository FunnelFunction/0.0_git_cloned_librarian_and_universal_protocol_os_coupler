// ============================================
// PROTOCOL OS - SUPABASE CLIENT CONFIGURATION
// ============================================
// Address: 1.2.2.b
// Purpose: Supabase client factory and configuration
// STATUS: STUBBED - Install @supabase/supabase-js to enable
// ============================================

/**
 * Supabase client instance type (stubbed)
 */
export type SupabaseClientInstance = unknown;

/**
 * Supabase client options
 */
export interface SupabaseClientOptions {
  schema?: string;
  autoRefreshToken?: boolean;
  persistSession?: boolean;
  storageKey?: string;
  headers?: Record<string, string>;
}

/**
 * Create a configured Supabase client
 * STUBBED - Install @supabase/supabase-js to use this provider
 */
export function createSupabaseClient(
  _url: string,
  _apiKey: string,
  _options: SupabaseClientOptions = {}
): SupabaseClientInstance {
  throw new Error(
    'Supabase provider not installed. Run: npm install @supabase/supabase-js\n' +
    'Then uncomment the real implementation in this file.'
  );
}

/**
 * Database schema SQL for Supabase (preserved for reference)
 */
export const SUPABASE_SCHEMA_SQL = `-- See full schema in the original file`;

/**
 * Validate Supabase configuration
 */
export function validateSupabaseConfig(
  url?: string,
  apiKey?: string
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!url) errors.push('Supabase URL is required');
  if (!apiKey) errors.push('Supabase API key is required');
  return { valid: errors.length === 0, errors };
}
