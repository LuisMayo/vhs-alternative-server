import {
  CTEvilUISlots,
  CharacterLoadoutsCTEvil,
  CharacterLoadoutsCTTeen,
  Monsters,
  PlayerAccountSlots,
  Teens,
} from "./save-game";

export const EMPTY_SUCCESFUL_RESPONSE = { log: { logSuccessful: true } };

export interface VHSResponse<T> {
  data: T;
  log: LogResponse;
}

/** Login Endpoint.
 * This endpoint is authenticated using a JWT token issued by Epic. Token structure is below
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

/**Token structure for the Login Request
 * @link https://dev.epicgames.com/docs/epic-account-services/auth/auth-interface
 */
export interface LoginRequestToken {
  aud?: string;
  sub?: string;
  pfsid?: string;
  act?: LoginRequestTokenAct;
  pfdid?: string;
  iss?: string;
  exp?: number;
  tokenType?: string;
  iat?: number;
  pfpid?: string;
}

export interface LoginRequestTokenAct {
  pltfm?: string;
  eaid?: string;
  eat?: string;
}

/** The login response may embed html data in the body, it's not required to be a full JSON body.
 * This is used for code warnings apparently, not needed for us, so I'll detail only the JSON part
 */
export type LoginResponse = VHSResponse<LoginData>;

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

export interface DiscoverRequest {
  /** Account ID we need to get info from. Empty if the logged user one */
  accountIdToDiscover?: string;
  /** Some kind of ID to know what information we're requesting */
  bitsToDiscover: DiscoverTypes;
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
  matchmakingRegion: string;
}

export enum DiscoverTypes {
  INITIAL_LOAD = 1472767,
  MATCHMAKING_INFO = 524288,
}

export type MathmakingInfoResponse = VHSResponse<MatchmakingData>;

export interface MatchmakingData {
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

export interface LogResponse {
  logSuccessful?: boolean;
}

export interface SetCharacterLoadoutRequest {
  characterType: string;
  idpk: string;
  loadoutChanges: { [x: string]: string };
  returnChangesOnly: boolean;
  sessionTicketId: string;
  version: number;
}

export type SetCharacterLoadoutResponse =
  VHSResponse<SetCharacterLoadoutResponseData>;

export interface SetCharacterLoadoutResponseData {
  changedSlotNames: string[];
  characterLoadout: CharacterLoadoutsCTEvil | CharacterLoadoutsCTTeen;
}

export interface SetWeaponLoadoutsForCharacterRequest {
  characterType: Teens | Monsters;
  idpk: string;
  sessionTicketId: string;
  version: number;
  // TODO, extract weapons into enum in savegame typings
  weaponChanges: { [x: string]: { [x: string]: string } };
}

export type SetWeaponLoadoutsForCharacterResponse =
  VHSResponse<SetWeaponLoadoutsForCharacterResponseData>;

export type CharacterWeaponLoadout = {
  // TODO, extract weapons into enum in savegame typings
  [x: string]: {
    perk?: {
      [x: string]: string;
    };
    skin?: {
      [x: string]: string;
    };
    unlockLevel: number;
  };
};

export type SetWeaponLoadoutsForCharacterResponseData = {
  [x in Teens | Monsters]?: CharacterWeaponLoadout;
};

export type UploadPlayerSettingsRequest = {
  idpk: string;
  playerSettingsData: string;
  sessionTicketId: string;
  version: number;
};

export type UploadPlayerSettingsResponse =
  VHSResponse<UploadPlayerSettingsResponseData>;

export type UploadPlayerSettingsResponseData = {
  uploadSuccessful: boolean;
};

export type SlotChangesRequest = {
  sessionTicketId: string;
  slotChanges: PlayerAccountSlots;
  version: number;
  idpk: string;
};

export type SlotChangesResponseData = {
  playerSlots: PlayerAccountSlots;
  changedSlotNames: { [x: string]: boolean }[];
};

export type SlotChangesResponse = VHSResponse<SlotChangesResponseData>;
