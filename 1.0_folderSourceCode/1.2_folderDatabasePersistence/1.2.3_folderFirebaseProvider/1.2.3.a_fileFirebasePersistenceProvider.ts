// STUBBED - Install firebase to enable
import { BaseDatabaseProvider } from '../1.2.b_fileDatabaseProviderInterface';

export class FirebasePersistenceProvider extends BaseDatabaseProvider {
  readonly providerType = 'firebase' as const;
  async initialize() { throw new Error('Firebase not installed'); return { success: false, error: 'Not installed' }; }
  async disconnect() { return { success: true }; }
  isConnected() { return false; }
  async getAllPlatforms() { throw new Error('Not installed'); }
  async getPlatformById() { throw new Error('Not installed'); }
  async savePlatform() { throw new Error('Not installed'); }
  async deletePlatform() { throw new Error('Not installed'); }
  async getAllResources() { throw new Error('Not installed'); }
  async getResourceById() { throw new Error('Not installed'); }
  async saveResource() { throw new Error('Not installed'); }
  async deleteResource() { throw new Error('Not installed'); }
  async getAllHandshakes() { throw new Error('Not installed'); }
  async getHandshakeById() { throw new Error('Not installed'); }
  async saveHandshake() { throw new Error('Not installed'); }
  async deleteHandshake() { throw new Error('Not installed'); }
  async getAllCurlRequests() { throw new Error('Not installed'); }
  async getCurlRequestById() { throw new Error('Not installed'); }
  async saveCurlRequest() { throw new Error('Not installed'); }
  async deleteCurlRequest() { throw new Error('Not installed'); }
  async getAllSchemaModels() { throw new Error('Not installed'); }
  async getSchemaModelById() { throw new Error('Not installed'); }
  async saveSchemaModel() { throw new Error('Not installed'); }
  async deleteSchemaModel() { throw new Error('Not installed'); }
  async getAllPromotedActions() { throw new Error('Not installed'); }
  async getPromotedActionById() { throw new Error('Not installed'); }
  async savePromotedAction() { throw new Error('Not installed'); }
  async deletePromotedAction() { throw new Error('Not installed'); }
  async saveExecutionLog() { throw new Error('Not installed'); }
  async getExecutionLogs() { throw new Error('Not installed'); }
}
