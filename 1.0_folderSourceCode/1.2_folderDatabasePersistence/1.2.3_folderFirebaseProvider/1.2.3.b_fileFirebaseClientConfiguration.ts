// ============================================
// PROTOCOL OS - FIREBASE CLIENT CONFIGURATION
// ============================================
// Address: 1.2.3.b
// Purpose: Firebase app factory and configuration
// STATUS: STUBBED - Install firebase to enable
// ============================================

/**
 * Firebase app instance type (stubbed)
 */
export type FirebaseAppInstance = unknown;

/**
 * Firebase configuration options
 */
export interface FirebaseConfig {
  apiKey: string;
  projectId: string;
  authDomain?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

/**
 * Create a configured Firebase app
 * STUBBED - Install firebase to use this provider
 */
export function createFirebaseApp(_config: FirebaseConfig): FirebaseAppInstance {
  throw new Error(
    'Firebase provider not installed. Run: npm install firebase\n' +
    'Then uncomment the real implementation in this file.'
  );
}

/**
 * Firestore Security Rules (preserved for reference)
 */
export const FIRESTORE_SECURITY_RULES = `-- See full rules in the original file`;

/**
 * Firestore Indexes
 */
export const FIRESTORE_INDEXES = { indexes: [] };

/**
 * Validate Firebase configuration
 */
export function validateFirebaseConfig(config: Partial<FirebaseConfig>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (!config.apiKey) errors.push('Firebase API key is required');
  if (!config.projectId) errors.push('Firebase project ID is required');
  return { valid: errors.length === 0, errors };
}

/**
 * Get Firebase Emulator configuration
 */
export function getEmulatorConfig() {
  return { host: 'localhost', firestorePort: 8080, authPort: 9099 };
}
