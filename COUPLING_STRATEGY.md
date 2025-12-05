# Coupling Strategy: Librarian + Universal Protocol OS

## Overview

This document outlines the strategy for coupling the **Protocol OS Librarian** with the **Universal Protocol OS Handshake** system. The goal is to replace the Librarian's embedded Protocol OS (Tab 2 "Synch") with the newer, standalone Universal Protocol OS while maintaining the Librarian's ability to consume authentication data.

---

## Source Repositories

### 1. Protocol OS Librarian (Base Application)
- **Repo:** `https://github.com/intent-tensor-theory/0.0_git_protocol_OS_librarian_mode`
- **Purpose:** Self-contained app with 4 tabs: Conversation, Synch (Protocol OS), Train, Human
- **Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Glass UI
- **Current Protocol OS:** Embedded in `/src/components/protocol/`

### 2. Universal Protocol OS Handshake (Replacement Component)
- **Repo:** `https://github.com/intent-tensor-theory/0.0_git_universal_protocol_os_handshake`
- **Purpose:** Standalone Protocol OS with enhanced features and flexible database support
- **Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Glass UI (same stack)
- **Architecture:** Ghostless Coding Architecture (numbered folder naming)

---

## Why This Coupling?

The Librarian has an older Protocol OS form in Tab 2 "Synch". The intent-tensor-theory team built a better standalone version but hasn't released an updated Librarian with it yet. We're doing that integration ourselves:

- **Same hierarchy concept:** Platform > Resource > Handshake
- **Same tech stack:** Direct compatibility
- **Better features:** 5 database providers, richer data model, better UX
- **Clean approach:** Delete old, bring in new wholesale (no frankensteining)

---

## Data Structure Comparison

### Old Protocol OS (Librarian Embedded)

```typescript
interface Platform {
  id: string;
  serial: string;
  baseName: string;
  url?: string;
  description?: string;
  documentationUrl?: string;
  authNotes?: string;
  resources: Resource[];
}

interface Resource {
  id: string;
  serial: string;
  baseName: string;
  url?: string;
  description?: string;
  documentationUrl?: string;
  notes?: string;
  handshakes: Handshake[];
}

interface Handshake {
  id: string;
  serial: string;
  baseName: string;
  protocol: string;
  config: Record<string, string>;    // Simple key-value
  input: { model: string; dynamicText: string };
  output?: { status: number; method: string; executedAt: string };
}
```

### New Protocol OS (Universal Handshake)

```typescript
interface Platform {
  id: string;
  serial: string;                    // Format: PLAT-MASTER-XXXX
  name: string;                      // Was: baseName
  url: string;
  description: string;
  doc_url: string;                   // Was: documentationUrl
  auth_notes: string;                // Was: authNotes
  contributors: ApiResource[];       // Was: resources
  isMaster: boolean;                 // NEW: Visual highlighting flag
}

interface ApiResource {
  id: string;
  serial: string;                    // Format: RES-XXXX
  title: string;                     // Was: baseName
  url: string;
  description: string;
  doc_url: string;
  notes: string;
  handshakes: Handshake[];
}

interface Handshake {
  id: string;
  serial: string;                    // Format: HS-XXXX (full chain: PLAT-XXXX-RES-XXXX-HS-XXXX)
  endpointName: string;              // Was: baseName
  authentication: Authentication;    // NEW: Dedicated auth object
  curlRequests: CurlRequest[];       // NEW: Multiple requests per handshake
  schemaModels: SchemaModel[];       // NEW: Schema definitions
  promotedActions: PromotedAction[]; // NEW: Quick actions
  status: HandshakeStatus;           // NEW: unconfigured|configured|healthy|failed|processing
}
```

### Key Differences
| Aspect | Old | New |
|--------|-----|-----|
| Naming | `baseName` | `name`/`title`/`endpointName` |
| Children | `resources` | `contributors` |
| Auth | Flat `config` object | Dedicated `Authentication` type |
| Requests | Single `input`/`output` | `CurlRequest[]` array |
| Status | Derived from `output.status` | Explicit `HandshakeStatus` enum |
| Serials | Simple format | Chained format (PLAT-RES-HS) |

---

## Current Librarian Architecture

### Hook Composition
```
useLibrarian (master hook)
├── useAuth
├── useConversations
├── useProtocolOS  ← THE INTEGRATION POINT
└── useTraining
```

### Protocol OS Integration Point
**File:** `/src/hooks/useProtocolOS.ts`
- Manages `platforms` state
- CRUD operations: `savePlatform`, `saveResource`, `saveHandshake`, etc.
- Persists via `platformStorage` (localStorage)

### Storage Service
**File:** `/src/services/storage.ts`
- Generic `StorageService<T>` class
- Currently localStorage only
- Instances: `conversationStorage`, `platformStorage`, `trainingStorage`, etc.

### Protocol OS Components
**Directory:** `/src/components/protocol/`
```
protocol/
├── forms/
│   ├── NestedFormBuilder.tsx    # Platform > Resource > Handshake wizard
│   ├── PlatformForm.tsx
│   └── ResourceForm.tsx
├── ConfigForm.tsx
├── ExecutionOutput.tsx
├── HandshakeCard.tsx
├── HandshakeEditor.tsx
├── PlatformCard.tsx
├── ProtocolDropdown.tsx
├── ProtocolOSPanel.tsx          # Main container for Tab 2
├── ProtocolSelector.tsx
├── RequestInput.tsx
└── ResourceCard.tsx
```

---

## New Protocol OS Architecture

### Ghostless Folder Structure
```
1.0_folderSourceCode/
├── 1.0.a_fileMain.tsx
├── 1.0.b_fileApp.tsx                              # Main app component
├── 1.2_folderDatabasePersistenceProviders/        # 5 database options
├── 1.3_folderProtocolRegistry/                    # 11+ protocol handlers
├── 1.4_folderPlatformResourceHandshakeTree/       # Core UI components
├── 1.5_folderSavedHandshakesLibrary/
├── 1.7_folderSharedUserInterfaceComponents/       # Glass UI components
└── 1.9_folderSharedTypeDefinitions/               # TypeScript interfaces
    ├── 1.9.a_filePlatformTypeDefinitions.ts
    ├── 1.9.b_fileResourceTypeDefinitions.ts
    ├── 1.9.c_fileHandshakeTypeDefinitions.ts
    ├── 1.9.d_fileAuthenticationTypeDefinitions.ts
    ├── 1.9.e_fileCurlRequestTypeDefinitions.ts
    ├── 1.9.f_fileSchemaModelTypeDefinitions.ts
    ├── 1.9.g_filePromotedActionTypeDefinitions.ts
    └── 1.9.h_fileExecutionResultTypeDefinitions.ts
```

### Database Providers (5 Options)
1. **LocalStorage** - Browser-based (default)
2. **Supabase** - PostgreSQL backend
3. **Firebase Firestore** - Google NoSQL
4. **PostgreSQL** - Traditional relational
5. **SQLite** - Embedded SQL

Toggle via configuration, add secrets, works universally.

### Supported Protocols (14)
1. Universal cURL
2. OAuth 2.0 PKCE
3. OAuth 2.0 Auth Code
4. OAuth 2.0 Implicit
5. OAuth 2.0 Client Credentials
6. REST API Key
7. HTTP Basic Auth
8. GraphQL
9. WebSocket
10. SOAP/XML
11. gRPC-Web
12. Server-Sent Events
13. GitHub Direct
14. Keyless Scraper

---

## Execution Plan

### Phase 1: Clone Librarian
```bash
# Clone the base Librarian into this repo
git clone https://github.com/intent-tensor-theory/0.0_git_protocol_OS_librarian_mode temp_librarian
# Copy contents (excluding .git) into this repo
```

### Phase 2: Delete Old Protocol OS
**Remove entirely:**
```
/src/components/protocol/           # All old UI components
/src/hooks/useProtocolOS.ts         # Old state management
```

**Keep but modify:**
```
/src/hooks/useLibrarian.ts          # Will need to import from new Protocol OS
/src/services/storage.ts            # May be replaced by new DB providers
```

### Phase 3: Clone New Protocol OS
**Bring in wholesale (keep Ghostless naming):**
```
/1.0_folderSourceCode/1.2_folderDatabasePersistenceProviders/
/1.0_folderSourceCode/1.3_folderProtocolRegistry/
/1.0_folderSourceCode/1.4_folderPlatformResourceHandshakeTree/
/1.0_folderSourceCode/1.5_folderSavedHandshakesLibrary/
/1.0_folderSourceCode/1.7_folderSharedUserInterfaceComponents/
/1.0_folderSourceCode/1.9_folderSharedTypeDefinitions/
```

### Phase 4: Rewire Integration

#### 4.1 Update useLibrarian Hook
```typescript
// Before: imports useProtocolOS from old location
import { useProtocolOS } from './useProtocolOS';

// After: imports from new Protocol OS or creates bridge
import { usePlatforms } from '../1.0_folderSourceCode/...';
```

#### 4.2 Mount New Protocol OS in Tab 2
```typescript
// In popup/tab component, replace:
<ProtocolOSPanel ... />

// With new Protocol OS App component (may need wrapper)
<UniversalProtocolOS ... />
```

#### 4.3 Create Auth Bridge
The Librarian needs to read authentication data from handshakes. Create adapter if needed:

```typescript
// Bridge function to extract auth from new structure
function getAuthFromHandshake(handshake: NewHandshake): AuthConfig {
  return {
    // Map new Authentication object to what Librarian expects
    protocol: handshake.authentication.type,
    credentials: handshake.authentication.credentials,
    // etc.
  };
}
```

### Phase 5: Adopt Database Provider Pattern
**Optional but recommended:** Migrate Librarian's other storage to use the same provider system:
- `conversationStorage` → DB provider
- `trainingStorage` → DB provider
- `contactStorage` → DB provider

This gives the entire Librarian the "toggle database + add secrets" capability.

---

## File Mapping Reference

| Old (Librarian) | New (Universal Protocol OS) | Notes |
|-----------------|----------------------------|-------|
| `/src/components/protocol/ProtocolOSPanel.tsx` | `/1.0_folderSourceCode/1.0.b_fileApp.tsx` | Main container |
| `/src/components/protocol/PlatformCard.tsx` | `/1.0_folderSourceCode/1.4_.../PlatformCard` | Platform display |
| `/src/components/protocol/ResourceCard.tsx` | `/1.0_folderSourceCode/1.4_.../ResourceCard` | Resource display |
| `/src/components/protocol/HandshakeCard.tsx` | `/1.0_folderSourceCode/1.4_.../HandshakeCard` | Handshake display |
| `/src/components/protocol/HandshakeEditor.tsx` | `/1.0_folderSourceCode/1.4_.../HandshakeEditor` | Handshake form |
| `/src/hooks/useProtocolOS.ts` | New Protocol OS internal state | State management |
| `/src/services/storage.ts` | `/1.0_folderSourceCode/1.2_folderDatabasePersistenceProviders/` | Persistence layer |

---

## Success Criteria

1. **Tab 2 "Synch" renders new Protocol OS** - Same popup location, new UI
2. **CRUD operations work** - Create/edit/delete platforms, resources, handshakes
3. **Database toggle works** - Can switch providers via config
4. **Librarian reads auth** - Conversation/RAG can access handshake credentials
5. **No old Protocol OS remnants** - Clean removal, no dead code

---

## Risk Considerations

### Import Path Chaos
The Ghostless naming convention differs from standard `/src/` structure. Options:
- Keep both conventions (Ghostless for Protocol OS, standard for Librarian)
- Configure path aliases in `vite.config.ts` / `tsconfig.json`

### Shared UI Components
Both repos use Glass UI components. May have naming conflicts:
- Old: `/src/components/ui/GlassPane.tsx`
- New: `/1.0_folderSourceCode/1.7_folderSharedUserInterfaceComponents/...`

Resolution: Use new Protocol OS's UI components, delete duplicates from Librarian.

### Type Conflicts
Both define `Platform`, `Resource`, `Handshake` types. Ensure old types are fully removed to avoid conflicts.

---

## Next Steps

When ready to implement:
1. Create implementation branch
2. Execute phases 1-5 in order
3. Test each phase before proceeding
4. Document any deviations from this plan

---

*Document created during research session. No code changes made.*
