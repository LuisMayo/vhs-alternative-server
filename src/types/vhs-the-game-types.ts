/** Login Endpoint
 * @link https?://api.vhsgame.com/metagame/THEEND_Game/Client/Login/?guid=59459062-35cb-4a8b-8b56-2b77ac286bfd
 */
export interface LoginRequest {
  /** Unkown value
   * @example 2023.04.26-14.39.40*/
  dbTimestamp?: string;
  /**Unknown, ID-like (nonce?) */
  idpk?: string;
  /**Unkown */
  platformToken?: string;
  /**Version ID @example 71 */
  version?: number;
}

/** The login response may embed html data in the body, it's not required to be a full JSON body.
 * This is used for code warnings apparently, not needed for us, so I'll detail only the JSON part
 */
export interface LoginResponse {
  data: LoginData;
  log: Log;
}

export interface LoginData {
  /** RS256 JSON Web Token.
   * @example See docs/sessionTicket.json
   */
  sessionTicketId?: string;
  /** User display name */
  displayName?: string;
  /**Unkown ID-like */
  playerAccountId?: string;
  showEula?: boolean;
  /**Unknown. @example 8884316303 */
  backendTitleId?: string;
  /**Unknown. Empty on test */
  storeUrl?: string;
  /**Unknown. Empty on test */
  warnDbTimestamp?: string;
}

export interface Log {
  logSuccessful?: boolean;
}

export interface DiscoverRequest {
  /** Some kind of ID to know what information we're requesting */
  bitsToDiscover?: DiscoverTypes;
  /** ID-like, not the same as the LoginRequest, not the same across requests (nonce?) */
  idpk?: string;
  journeyGuid?: string;
  /** @example 0 */
  movieTranscriptNumber?: number;
  /** True on first call */
  needCharXpLevelCosts?: boolean;
  /** True on first call */
  needMasteryLevelCosts?: boolean;
  /** True */
  needPlayerSettings?: boolean;
  /** JSON web token. The same as auth header, retorned by login endpoint */
  sessionTicketId?: string;
  /**Empty */
  storeGuid?: string;
  /** Your platform, steam on my case */
  storePlatform?: string;
  /** 71 */
  version?: number;
  /** 0? */
  weaponManifestNumber?: number;
  /** @example MR_EU_Central1 */
  matchmakingRegion: string
}

export enum DiscoverTypes {
  INITIAL_LOAD = 1472767,
  MATCHMAKING_INFO = 524288,
}

export interface MathmakingInfo {
  data?: Data;
  log?: Log;
}

export interface Data {
  DDT_DynamicBountyRewardsBit?: DDTDynamicBountyRewardsBit;
  playerSettingsData?: string;
  serverTime?: number;
}

export interface DDTDynamicBountyRewardsBit {
  MR_EU_Central1?: MREUCentral1;
  lastEarnedBounty?: number;
  quickQueueChar?: string;
}

export interface MREUCentral1 {
  bountiesByCharType?: BountiesByCharType;
}

export interface BountiesByCharType {
  CT_Anomaly?: number;
  CT_DollMaster?: number;
  CT_Eradicator?: number;
  CT_Toad?: number;
  CT_Werewolf?: number;
}

export interface Log {
  logSuccessful?: boolean;
}
