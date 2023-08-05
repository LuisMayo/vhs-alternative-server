import { VHSResponse } from "./vhs-the-game-types";

export interface SaveGameResponse extends VHSResponse<SaveData> {
  /**Own field, not returned by orginal API */
  userId: string;
}

interface SaveData {
  /** Information about the player general progression*/
  DDT_AllPlayerAccountPointsBit?: DDTAllPlayerAccountPointsBit;
  DDT_AllPlayerSlotsBit?: DDTAllPlayerSlotsBit;
  /**Character-related info */
  DDT_AllLoadoutsBit?: DDTAllLoadoutsBit;
  DDT_AllWeaponsBit?: DDTAllWeaponsBit;
  DDT_AllInventoryItemsBit?: DDTAllInventoryItemsBit[];
  DDT_AllUnclaimedChestsBit?: any[];
  DDT_AllSceneEnactmentStatesBit?: DDTAllSceneEnactmentStatesBit;
  DDT_JourneyDataBit?: DDTJourneyDataBit;
  DDT_AccountStatsBit?: DDTAccountStatsBit;
  DDT_GuideSystemBit?: any[];
  DDT_AllStoreItemsBit?: DDTAllStoreItemsBit;
  DDT_AllFriendListsBit?: { [playerId: string]: DDTAllFriendListsBit };
  DDT_SeasonalEventBit?: DDTSeasonalEventBit;
  DDT_ServerNotificationBit?: DDTServerNotificationBit;
  DDT_CommunityGoalsBit?: any[];
  /**JSON-encoded string  When parsed it will reveal a PlayerSettingsData object*/
  playerSettingsData?: PlayerSettingsData;
  serverTime?: number;
}

export interface PlayerSettingsData {
  mAutomaticRegion?: boolean;
  mMatchmakingRegion?: string;
  mLanguage?: string;
  mSelectedGameMode?: string;
  mbShowReticle?: boolean;
  mbShowScoreFeed?: boolean;
  mbShowGameHUD?: boolean;
  mbHintsToggle?: number;
  mDangerSenseType?: number;
  mDangerSenseSize?: number;
  mDangerSenseColor?: number;
  mGraphicsColorBlindMode?: string;
  mGraphicsColorBlindIntensity?: number;
  mbAudioGameAudioMuteOnUnfocused?: boolean;
  mbVoiceChatEnabled?: boolean;
  mVoiceChatMode?: string;
  mVoiceChatChannel?: string;
  mbVoiceChatMuteOnUnfocused?: boolean;
  mbMouseInvertY?: boolean;
  mbKbdSprintToggle?: boolean;
  mbKbdCrouchToggle?: boolean;
  mKeyToGameActions?: MKeyToGameActions;
  mbControllerInvertY?: boolean;
  mbControllerSprintToggle?: boolean;
  mbControllerCrouchToggle?: boolean;
  mbShowSocialNotifications?: boolean;
  mbNotifyFriendsWhenPlaying?: boolean;
  mbAutoMutePlayersNotInParty?: boolean;
  mbHideDisplayName?: boolean;
  mbHideOtherPlayerNames?: boolean;
  mbMatchmakingDelay?: boolean;
  mbAutoMutePrevMutedPlayers?: boolean;
  mStoredMatchmakingType?: string;
  mLastStoredCharacterType?: string;
  mStoredTeenCharacterType?: string;
  mStoredEvilCharacterType?: string;
  mStoredHintHistory?: any[];
  mStoredGuideHistory?: any[];
  mLastSeenHint?: string;
  mTipsHistory?: MTipsHistory[];
  mNewsAnnouncements?: string[];
  mbShowBetaAnnouncement?: boolean;
  mbShowAnnouncement1?: boolean;
  mbShowAnnouncement2?: boolean;
  mHighestSeasonAnnouncement?: number;
}

export interface MKeyToGameActions {
  C?: C;
  MiddleMouseButton?: C;
  ThumbMouseButton2?: C;
  ThumbMouseButton?: C;
  LeftControl?: C;
  None?: C;
  Gamepad_DPad_Right?: C;
}

export interface C {
  mActions?: string[];
}

export interface MTipsHistory {
  tipText?: string;
  tipType?: string;
  triggerCount?: number;
  maxTriggerCount?: number;
  triggerFrequency?: number;
  requestCount?: number;
  timeToShow?: number;
  delay?: number;
  iconTexture?: string;
  tipVisiblityLevel?: string;
  tipCondition?: string;
}

interface DDTAccountStatsBit {
  CT_Punk?: DDTAccountStatsBitTeen;
  CT_Cheerleader?: DDTAccountStatsBitTeen;
  CT_Jock?: DDTAccountStatsBitTeen;
  CT_Outsider?: DDTAccountStatsBitTeen;
  CT_Virgin?: DDTAccountStatsBitCTVirgin;
  CT_Nerd?: DDTAccountStatsBitTeen;
  CT_Toad?: { [key: string]: number };
  CT_Werewolf?: { [key: string]: number };
  CT_DollMaster?: { [key: string]: number };
  CT_Eradicator?: { [key: string]: number };
  CT_Anomaly?: { [key: string]: number };
  WT_RayGun?: Wt;
  WT_Flamethrower?: Wt;
  WT_DemonSword?: Wt;
  WT_Cross?: DDTAccountStatsBitWTCross;
  WT_RCCopter?: Wt;
  WT_Parchment?: Wt;
  WT_Molotov?: Wt;
  WT_HolySlingshot?: Wt;
  WT_StaticShield?: Wt;
  WT_Talisman?: Wt;
  WT_FlameMine?: Wt;
  WT_HolyStaff?: Wt;
  FACILITY?: Facility;
  HIGHSCHOOL?: Gameshow;
  HOTEL?: Gameshow;
  GAMESHOW?: Gameshow;
  ARCTICBASE?: Arcticbase;
  PAST_Stats_AccountCreatedDate?: string;
}

interface Arcticbase {
  forCharType?: ARCTICBASEForCharType;
}

interface ARCTICBASEForCharType {
  CT_Virgin?: ForCharTypeCTPunk;
  CT_Anomaly?: ForCharTypeCTPunk;
  CT_Outsider?: CTOutsider;
  CT_Punk?: ForCharTypeCTPunk;
}

interface ForCharTypeCTPunk {
  PAST_Stats_MapMatchesPlayed?: number;
}

interface CTOutsider {
  PAST_Stats_MapMatchesPlayed?: number;
  PAST_Stats_MapMatchesSurvived?: number;
}

interface ForCharTypeCTDollMaster {
  PAST_Stats_StrikesOnMonster?: number;
  PAST_Stats_MatchesPlayed?: number;
  PAST_Stats_MatchesSurvived?: number;
  PAST_Stats_WoundsOnMonster?: number;
  PAST_Stats_StunsOnMonster?: number;
  PAST_Stats_WinningStrikes?: number;
}

interface CTJockForCharType {
  CT_Eradicator?: ForCharTypeCTDollMaster;
  CT_Werewolf?: ForCharTypeCTDollMaster;
  CT_Toad?: ForCharTypeCTDollMaster;
  CT_DollMaster?: ForCharTypeCTDollMaster;
  CT_Anomaly?: ForCharTypeCTDollMaster;
}

interface DDTAccountStatsBitTeen {
  forCharType?: CTPunkForCharType;
  PAST_Stats_TimePlayed?: number;
  PAST_Stats_TimeHealingTeens?: number;
  PAST_Stats_TimePickingUpTeens?: number;
  PAST_Stats_TimeUsingMedKits?: number;
  PAST_Stats_ClaimedShards?: number;
  PAST_Stats_ResurrectedTeen?: number;
  PAST_Stats_PopDrank?: number;
  PAST_Stats_CandyEaten?: number;
  PAST_Stats_NoiseMakerTrigger?: number;
  PAST_Stats_VendingMachinesSearched?: number;
  PAST_Stats_TrashCansSearched?: number;
  PAST_Stats_ChestsSearched?: number;
  PAST_Stats_TimesEscaped?: number;
  PAST_Stats_TimesChased?: number;
  PAST_Stats_TotalTimeChased?: number;
  PAST_Stats_LongestTimeChased?: number;
  PAST_Stats_TimesDowned?: number;
  PAST_Stats_TimesDied?: number;
  PAST_Stats_TimesBeingRevived?: number;
  PAST_Stats_OrbsCollected?: number;
  PAST_Stats_MinigamesPerfect?: number;
  PAST_Stats_MinigamesOkay?: number;
  PAST_Stats_MinigamesStarted?: number;
  PAST_Stats_HighestRank?: number;
}

interface CTPunkForCharType {
  CT_Werewolf?: ForCharTypeCTDollMaster;
  CT_DollMaster?: ForCharTypeCTDollMasterClass;
  CT_Toad?: ForCharTypeCTDollMaster;
  CT_Eradicator?: ForCharTypeCTDollMaster;
}

interface ForCharTypeCTDollMasterClass {
  PAST_Stats_StrikesOnMonster?: number;
  PAST_Stats_MatchesPlayed?: number;
  PAST_Stats_StunsOnMonster?: number;
}

interface DDTAccountStatsBitCTVirgin {
  forCharType?: CTVirginForCharType;
  PAST_Stats_TimePlayed?: number;
  PAST_Stats_TimeHealingTeens?: number;
  PAST_Stats_TimePickingUpTeens?: number;
  PAST_Stats_TimeUsingMedKits?: number;
  PAST_Stats_ClaimedShards?: number;
  PAST_Stats_ResurrectedTeen?: number;
  PAST_Stats_PopDrank?: number;
  PAST_Stats_CandyEaten?: number;
  PAST_Stats_NoiseMakerTrigger?: number;
  PAST_Stats_VendingMachinesSearched?: number;
  PAST_Stats_TrashCansSearched?: number;
  PAST_Stats_ChestsSearched?: number;
  PAST_Stats_TimesEscaped?: number;
  PAST_Stats_TimesChased?: number;
  PAST_Stats_TotalTimeChased?: number;
  PAST_Stats_LongestTimeChased?: number;
  PAST_Stats_TimesDowned?: number;
  PAST_Stats_TimesDied?: number;
  PAST_Stats_TimesBeingRevived?: number;
  PAST_Stats_OrbsCollected?: number;
  PAST_Stats_MinigamesPerfect?: number;
  PAST_Stats_MinigamesOkay?: number;
  PAST_Stats_MinigamesStarted?: number;
  PAST_Stats_HighestRank?: number;
}

interface CTVirginForCharType {
  CT_Werewolf?: ForCharTypeCTDollMaster;
  CT_Eradicator?: ForCharTypeCTEradicator;
  CT_Toad?: ForCharTypeCTDollMaster;
  CT_DollMaster?: ForCharTypeCTDollMaster;
}

interface ForCharTypeCTEradicator {
  PAST_Stats_StrikesOnMonster?: number;
  PAST_Stats_MatchesPlayed?: number;
}

interface Facility {
  forCharType?: FACILITYForCharType;
}

interface FACILITYForCharType {
  CT_Punk?: ForCharTypeCTPunk;
  CT_Toad?: CTOutsider;
  CT_DollMaster?: CTOutsider;
  CT_Werewolf?: CTOutsider;
  CT_Eradicator?: CTOutsider;
  CT_Cheerleader?: CTOutsider;
  CT_Jock?: CTOutsider;
  CT_Outsider?: CTOutsider;
  CT_Virgin?: CTOutsider;
  CT_Nerd?: CTOutsider;
}

interface Gameshow {
  forCharType?: { [key: string]: CTOutsider };
}

interface DDTAccountStatsBitWTCross {
  PAST_Stats_WeaponDamageTimeApplied?: number;
  PAST_Stats_WeaponStrikes?: number;
  PAST_Stats_WeaponWounds?: number;
  PAST_Stats_WeaponNumCrafted?: number;
}

interface Wt {
  PAST_Stats_WeaponDamageTimeApplied?: number;
  PAST_Stats_WeaponShotsFired?: number;
  PAST_Stats_WeaponStrikes?: number;
  PAST_Stats_WeaponStuns?: number;
  PAST_Stats_WeaponWounds?: number;
  PAST_Stats_WeaponNumCrafted?: number;
  PAST_Stats_WeaponChargingTime?: number;
  PAST_Stats_WeaponActiveTime?: number;
}

interface DDTAllFriendListsBit {
  epuid?: string;
  steamid?: string;
  displayName?: string;
  portrait?: string;
  masteryLevel?: number;
  state?: State;
  lastTimePlayed?: number;
  matchId?: string;
}

enum State {
  Alive = "alive",
  Died = "died",
  Disconnected = "disconnected",
}

interface DDTAllInventoryItemsBit {
  item?: string;
  ctf?: Ctf;
  count?: number;
}

enum Ctf {
  Empty = "",
  The000000000000000000000000001000000 = "000000000000000000000000001000000",
  The000000000000000000000000100000000 = "000000000000000000000000100000000",
  The000000000000000000000001000000000 = "000000000000000000000001000000000",
  The000000000000000000000100000000000 = "000000000000000000000100000000000",
  The000000000000000000010000000000000 = "000000000000000000010000000000000",
  The000000000000000001000000000000000 = "000000000000000001000000000000000",
  The000000000000000010000000000000000 = "000000000000000010000000000000000",
  The000000000001000000 = "000000000001000000",
  The000000010000000000 = "000000010000000000",
  The000100000000000000 = "000100000000000000",
}

interface DDTAllLoadoutsBit {
  /**Experience, level, matchmaking info and equipment */
  characterLoadouts: { [key in Monsters]: CharacterLoadoutsCTEvil } & { [key in Teens]: CharacterLoadoutsCTTeen };
  /**Unkown. But it seems to be constant across savegames? */
  teenAffinities: TeenAffinities;
  /**For each level how much exp it costs to level UP */
  charXpLevelCosts: { [key: number]: number };
}

export enum Monsters {
  DollMaster = "CT_DollMaster",
  WART = "CT_Toad",
  Werewolf = "CT_Werewolf",
  Deathwire = "CT_Eradicator",
  Anomlay = "CT_Anomaly"
}

export enum Teens {
  Gloria = "CT_Cheerleader",
  Brett = "CT_Jock",
  Jess = "CT_Outsider",
  Leo = "CT_Punk",
  Faith = "CT_Virgin",
  Reggie = "CT_Nerd",
}


export interface CharacterLoadoutsCTEvil {
  /**Points, level, etc. And Mathmaking Rank */
  points: EvilPoints;
  /**Equipment */
  uiSlots: CTEvilUISlots;
}

interface BasePoints {
  PNT_AuraPoints?: number;
  PNT_ExperiencePoints?: number;
  PNT_Level?: number;
  PNT_PerkPoints?: number;
  PNT_PerkSlots?: number;
  PNT_StarPower?: number;
  PNT_AffinitySlots?: number;
}

interface EvilPoints extends BasePoints {
  PNT_EvilMatchMakingRating?: number;
  PNT_EvilGamesPlayedThisSeason?: number;
}

export interface CTEvilUISlots {
  UIS_EvilFeast?: string;
  UIS_EvilRage?: string;
  UIS_EvilScream?: string;
  UIS_EvilSkin?: string;
  UIS_EvilSpectral?: string;
  UIS_EvilSticker1?: string;
  UIS_EvilSticker2?: string;
  UIS_EvilSticker3?: string;
  UIS_EvilSticker4?: string;
  UIS_EvilPerk1?: string;
  UIS_EvilAccessoryRoot?: string;
  UIS_EvilAccessoryUpper?: string;
  UIS_EvilAccessoryMid?: string;
  UIS_EvilAccessoryLower?: string;
  UIS_EvilEmote1?: string;
  UIS_EvilEmote2?: string;
  UIS_EvilEmote3?: string;
  UIS_EvilEmote4?: string;
  UIS_EvilEmote5?: string;
  UIS_EvilEmote6?: string;
  UIS_EvilSticker5?: string;
  UIS_EvilSticker6?: string;
  UIS_EvilPerk2?: string;
  UIS_EvilPerk3?: string;
  UIS_EvilPerk4?: string;
  UIS_EvilPerk5?: string;
}

export interface CharacterLoadoutsCTTeen {
  /**Points, level, perk slots... */
  points: BasePoints;
  /** Equipment */
  uiSlots: CTTeenUISlots;
}

export interface CTTeenUISlots {
  UIS_TeenClothingBottom?: string;
  UIS_TeenClothingFace?: string;
  UIS_TeenClothingFeet?: string;
  UIS_TeenClothingHands?: string;
  UIS_TeenClothingHead?: string;
  UIS_TeenClothingOuter?: string;
  UIS_TeenClothingRoot?: string;
  UIS_TeenClothingSocks?: string;
  UIS_TeenClothingTop?: string;
  UIS_TeenEmote1?: string;
  UIS_TeenEmote2?: string;
  UIS_TeenEmote3?: string;
  UIS_TeenEmote4?: string;
  UIS_TeenSpectral?: string;
  UIS_TeenSticker1?: string;
  UIS_TeenSticker2?: string;
  UIS_TeenPerk1?: string;
  UIS_TeenSticker3?: string;
  UIS_TeenSticker4?: string;
  UIS_TeenSticker5?: string;
  UIS_TeenSticker6?: string;
  UIS_TeenPerk2?: string;
  UIS_TeenPerk3?: string;
  UIS_TeenEmote5?: string;
  UIS_TeenEmote6?: string;
  UIS_TeenPerk4?: string;
  UIS_TeenCostume?: string;
  UIS_TeenClothingHair?: string;
  UIS_TeenClothingEyes?: string;
  UIS_TeenPerk5?: string;
}

interface TeenAffinities {
  CT_Virgin?: TeenAffinitiesCTVirgin;
  CT_Jock?: CTJock;
  CT_Punk?: TeenAffinitiesCTPunk;
  CT_Cheerleader?: CTCheerleader;
  CT_Outsider?: TeenAffinitiesCTOutsider;
  CT_Nerd?: CTNerd;
  CT_Wizard?: CTWizard;
}

interface CTCheerleader {
  PAT_Support?: number;
}

interface CTJock {
  PAT_Toughness?: number;
}

interface CTNerd {
  PAT_Expertise?: number;
}

interface TeenAffinitiesCTOutsider {
  PAT_Stealth?: number;
}

interface TeenAffinitiesCTPunk {
  PAT_Savvy?: number;
}

interface TeenAffinitiesCTVirgin {
  PAT_Recovery?: number;
}

interface CTWizard {
  PAT_Expertise?: number;
  PAT_Toughness?: number;
}

interface DDTAllPlayerAccountPointsBit {
  playerAccountPoints?: { [key in PlayerAccountPoints]: number };
  masteryLevelCosts?: { [key: `${number}`]: number };
}

enum PlayerAccountPoints {
  PNT_BurnStigmaExperience = "PNT_BurnStigmaExperience",
  PNT_BurnStigmaLevel = "PNT_BurnStigmaLevel",
  PNT_CurrentSeason = "PNT_CurrentSeason",
  PNT_EvilPrizePoints = "PNT_EvilPrizePoints",
  PNT_FanPoints = "PNT_FanPoints",
  PNT_HardCurrency = "PNT_HardCurrency",
  PNT_HolyStigmaExperience = "PNT_HolyStigmaExperience",
  PNT_HolyStigmaLevel = "PNT_HolyStigmaLevel",
  PNT_MasteryLevel = "PNT_MasteryLevel",
  PNT_MasteryPoints = "PNT_MasteryPoints",
  PNT_OccultStigmaExperience = "PNT_OccultStigmaExperience",
  PNT_OccultStigmaLevel = "PNT_OccultStigmaLevel",
  PNT_ShockStigmaExperience = "PNT_ShockStigmaExperience",
  PNT_ShockStigmaLevel = "PNT_ShockStigmaLevel",
  PNT_TeenGamesPlayedThisSeason = "PNT_TeenGamesPlayedThisSeason",
  PNT_TeenPrizePoints = "PNT_TeenPrizePoints",
}

interface DDTAllPlayerSlotsBit {
  playerAccountSlots?: PlayerAccountSlots;
}

interface PlayerAccountSlots {
  PS_PlayerAccountPortrait?: string;
  /** Current selected prize for public monster matches */
  PS_PrizeEvil?: string;
  /** Current selected prize for private monster matches */
  PS_PrizeTeen?: string;
}

interface DDTAllSceneEnactmentStatesBit {
  activeSetIdsByCharacterType?: ActiveSetIDSByCharacterType;
  activeNonClassicSetIdsByFactionType?: ActiveNonClassicSetIDSByFactionType;
  inProgressMoviesByMovieId?: InProgressMoviesByMovieID;
  completedMoviesByMovieId?: CompletedMoviesByMovieID;
  unrentedMoviesByMovieId?: UnrentedMoviesByMovieID;
  movieTranscriptNumber?: number;
}

interface ActiveNonClassicSetIDSByFactionType {
  teen?: string;
  evil?: string;
}

interface ActiveSetIDSByCharacterType {
  CT_Cheerleader?: string;
  CT_DollMaster?: string;
  CT_Jock?: string;
  CT_Outsider?: string;
  CT_Punk?: string;
  CT_Toad?: string;
  CT_Virgin?: string;
  CT_Werewolf?: string;
  CT_Eradicator?: string;
  CT_Nerd?: string;
  CT_Anomaly?: string;
}

interface CompletedMoviesByMovieID {
  DD_MV_MS_TOAD_01_STD?: DDMvMSToad01_Std;
  DD_MV_MS_WEREWOLF_01_STD?: DDMvMSWerewolf01_Std;
  DD_MV_MS_DOLLMASTER_01_STD?: DDMvMSDollmaster01_Std;
  DD_MV_MS_WEREWOLF_02_STD?: DDMvMSWerewolf02_Std;
  DD_MV_MS_TOAD_02_STD?: DDMvMSToad02_Std;
  DD_MV_MS_DOLLMASTER_02_STD?: DDMvMSDollmaster02_Std;
  DD_MV_MS_TOAD_03_STD?: DDMvMSToad03_Std;
  DD_MV_MS_ERADICATOR_01_STD?: DDMvMSEradicator01_Std;
  DD_MV_MS_ERADICATOR_02_STD?: DDMvMSEradicator02_Std;
  DD_MV_MS_WEREWOLF_03_STD?: DDMvMSWerewolf03_Std;
  DD_MV_MS_DOLLMASTER_03_STD?: DDMvMSDollmaster03_Std;
  DD_MV_TN_PUNK_01_STD?: DDMvTnPunk01_Std;
  DD_MV_MS_TOAD_01_EXT?: DDMvMSToad01_EXT;
  DD_MV_TN_CHEERLEADER_01_STD?: DDMvTnCheerleader01_Std;
  DD_MV_TN_JOCK_01_STD?: DDMvTnJock01_Std;
  DD_MV_LTD_CAT_2022_FALL_HALLOWEEN_1_STD?: DDMvLtdCat2022_FallHalloween1_Std;
  DD_MV_LTD_TWO_FEET_UNDER_STD?: DDMvLtdTwoFeetUnderStd;
  DD_MV_MS_ERADICATOR_03_STD?: DDMvMSEradicator03_Std;
  DD_MV_MS_ERADICATOR_01_EXT?: DDMvMSEradicator01_EXT;
  DD_MV_TN_OUTSIDER_01_STD?: DDMvTnOutsider01_Std;
  DD_MV_TN_VIRGIN_01_STD?: DDMvTnVirgin01_Std;
  DD_MV_MS_ERADICATOR_02_EXT?: DDMvMSEradicator02_EXT;
  DD_MV_LTD_SPECTRECOLLECTOR_STD?: DDMvLtdSpectrecollectorStd;
  DD_MV_TN_NERD_01_STD?: DDMvTnNerd01_Std;
  DD_MV_MS_WEREWOLF_01_EXT?: DDMvMSWerewolf01_EXT;
  DD_MV_LTD_2023_VALENTINES_MY_FUREVER_LOVE_STD?: DDMvLtd2023_ValentinesMyFureverLoveStd;
  DD_MV_TN_CHEERLEADER_02_STD?: DDMvTnCheerleader02_Std;
  DD_MV_TN_JOCK_02_STD?: DDMvTnJock02_Std;
  DD_MV_TN_OUTSIDER_02_STD?: DDMvTnOutsider02_Std;
  DD_MV_LTD_EVILNEVERDIES_STD?: DDMvLtdEvilneverdiesStd;
}

interface DDMvLtd2023_ValentinesMyFureverLoveStd {
  movieData?: MovieData;
  scenesBySceneId?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDScenesBySceneID;
}

interface MovieData {
  isClassic?: boolean;
  isTemporary?: boolean;
  visibleStartDate?: number;
  unlockDate?: number;
  lockDate?: number;
  visibleEndDate?: number;
  setId?: string;
  setIndex?: number;
  cTF?: string;
  displayName?: string;
  description?: string;
  itemIcon?: string;
  watchedRewards?: string;
  completionRewards?: string;
  prerequisites?: string;
  becomePermanentPrerequisites?: string;
  hbct_Collection?: HbctCollection;
  timeWatched?: Time;
  timeCompleted?: Time;
  currentStarLevel?: number;
}

enum HbctCollection {
  Hbc01 = "HBC01",
  Hbc2023_Valentines = "HBC_2023_VALENTINES",
  HbcCat2022_Fall = "HBC_CAT_2022_FALL",
  HbcCharAnomaly = "HBC_CHAR_ANOMALY",
  HbcCharEradicator = "HBC_CHAR_ERADICATOR",
  HbcCharNerd = "HBC_CHAR_NERD",
  HbcMOVCyberwulf = "HBC_MOV_CYBERWULF",
  HbcMOVTeamwolf = "HBC_MOV_TEAMWOLF",
  HbcMOVWartx = "HBC_MOV_WARTX",
}

interface Time {
  $date?: DateClass;
}

interface DateClass {
  $numberLong?: string;
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDScenesBySceneID {
  DD_MV_LTD_2023_VALENTINES_MY_FUREVER_LOVE_STD_S01?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01Class;
  DD_MV_LTD_2023_VALENTINES_MY_FUREVER_LOVE_STD_S02?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02Class;
  DD_MV_LTD_2023_VALENTINES_MY_FUREVER_LOVE_STD_S03?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03Class;
  DD_MV_LTD_2023_VALENTINES_MY_FUREVER_LOVE_STD_S04?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS04Class;
  DD_MV_LTD_2023_VALENTINES_MY_FUREVER_LOVE_STD_S05?: DDMvLtdStdS05;
  DD_MV_LTD_2023_VALENTINES_MY_FUREVER_LOVE_STD_S06?: DDMvLtd2023_ValentinesMyFureverLoveStdS06;
  DD_MV_LTD_2023_VALENTINES_MY_FUREVER_LOVE_STD_S07?: DDMvLtd2023_ValentinesMyFureverLoveStdS07;
  DD_MV_LTD_2023_VALENTINES_MY_FUREVER_LOVE_STD_S08?: DDMvLtd2023_ValentinesMyFureverLoveStdS08;
  DD_MV_LTD_2023_VALENTINES_MY_FUREVER_LOVE_STD_S09?: DDMvLtd2023_ValentinesMyFureverLoveStdS09;
  DD_MV_LTD_2023_VALENTINES_MY_FUREVER_LOVE_STD_S10?: DDMvLtd2023_ValentinesMyFureverLoveStdS10;
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01ProgressionEvents {
  MET_CNT_PlayerHealAssists?: METCNTPingMonsterClass;
}

interface METCNTPingMonsterClass {
  currentCount?: number;
  goalCount?: number;
  goalValue?: number;
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents {
  MET_PlayingAsVirgin?: number;
}

interface SceneData {
  displayName?: string;
  description?: string;
  itemIcon?: ItemIcon;
  ctf?: string;
  maxStarLevel?: number;
  currentStarLevel?: number;
}

enum ItemIcon {
  PlaceholderNoicon = "placeholder_noicon",
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02ProgressionEvents {
  MET_CNT_ObjectsSearched?: METCNTPingMonsterClass;
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents {
  MET_PlayingAsPunk?: number;
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03ProgressionEvents {
  MET_CNT_VendingMachineHitByEvil?: METCNTPingMonsterClass;
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents {
  MET_PlayingAsAnyEvil?: number;
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS04Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS04ProgressionEvents {
  MET_CNT_ScreamAffectsMany?: METCNTPingMonsterClass;
}

interface DDMvLtdStdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05ProgressionEvents {
  MET_CNT_HitWithWeapon?: METCNTPingMonsterClass;
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents {
  MET_PlayingAsAnyTeen?: number;
}

interface DDMvLtd2023_ValentinesMyFureverLoveStdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS06ProgressionEvents {
  MET_CNT_PingMonster?: METCNTPingMonsterClass;
}

interface DDMvLtd2023_ValentinesMyFureverLoveStdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS07ProgressionEvents {
  MET_CNT_MsecsEvilChasing?: METCNTPingMonsterClass;
}

interface DDMvLtd2023_ValentinesMyFureverLoveStdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS08ProgressionEvents {
  MET_CNT_DisarmKnockdowns?: METCNTPingMonsterClass;
}

interface DDMvLtd2023_ValentinesMyFureverLoveStdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09ProgressionEvents {
  MET_CNT_MsecsTeenInTensionTrack?: METCNTPingMonsterClass;
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents {
  MET_PlayingAsCheerleader?: number;
}

interface DDMvLtd2023_ValentinesMyFureverLoveStdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS10ProgressionEvents {
  MET_CNT_HitTeenWhenEnraged?: METCNTPingMonsterClass;
}

interface DDMvLtdCat2022_FallHalloween1_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDScenesBySceneID;
}

interface DDMVLTDCAT2022_FALLHALLOWEEN1_STDScenesBySceneID {
  DD_MV_LTD_CAT_2022_FALL_HALLOWEEN_1_STD_S01?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS01Class;
  DD_MV_LTD_CAT_2022_FALL_HALLOWEEN_1_STD_S02?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS02Class;
  DD_MV_LTD_CAT_2022_FALL_HALLOWEEN_1_STD_S03?: DDMvLtdCat2022_FallHalloween1_StdS03;
  DD_MV_LTD_CAT_2022_FALL_HALLOWEEN_1_STD_S04?: DDMvLtdStdS04;
  DD_MV_LTD_CAT_2022_FALL_HALLOWEEN_1_STD_S05?: DDMvLtdCat2022_FallHalloween1_StdS05;
  DD_MV_LTD_CAT_2022_FALL_HALLOWEEN_1_STD_S06?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS04Class;
  DD_MV_LTD_CAT_2022_FALL_HALLOWEEN_1_STD_S07?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03Class;
  DD_MV_LTD_CAT_2022_FALL_HALLOWEEN_1_STD_S08?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS08Class;
  DD_MV_LTD_CAT_2022_FALL_HALLOWEEN_1_STD_S09?: DDMvLtdCat2022_FallHalloween1_StdS09;
  DD_MV_LTD_CAT_2022_FALL_HALLOWEEN_1_STD_S10?: DDMvLtdCat2022_FallHalloween1_StdS10;
}

interface DDMVLTDCAT2022_FALLHALLOWEEN1_STDS01Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDCAT2022_FALLHALLOWEEN1_STDS01ProgressionEvents {
  MET_CNT_VendingMachineSearched?: METCNTPingMonsterClass;
}

interface DDMVLTDCAT2022_FALLHALLOWEEN1_STDS02Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDCAT2022_FALLHALLOWEEN1_STDS02ProgressionEvents {
  MET_CNT_PillsUsed?: METCNTPingMonsterClass;
}

interface DDMvLtdCat2022_FallHalloween1_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDCAT2022_FALLHALLOWEEN1_STDS03ProgressionEvents {
  MET_CNT_Knockdowns?: METCNTPingMonsterClass;
  MET_MatchCompleted?: METCNTPingMonsterClass;
}

interface DDMvLtdStdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDCAT2022_FALLHALLOWEEN1_STDS04ProgressionEvents {
  MET_CNT_BecomeEnraged?: METCNTPingMonsterClass;
}

interface DDMvLtdCat2022_FallHalloween1_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDCAT2022_FALLHALLOWEEN1_STDS05ProgressionEvents {
  MET_CNT_WeaponsCrafted?: METCNTPingMonsterClass;
  MET_MatchCompleted?: METCNTPingMonsterClass;
}

interface DDMVLTDCAT2022_FALLHALLOWEEN1_STDS08Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDCAT2022_FALLHALLOWEEN1_STDS08ProgressionEvents {
  MET_CNT_HitTeenShortlyAfterReturn?: METCNTPingMonsterClass;
}

interface DDMvLtdCat2022_FallHalloween1_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDCAT2022_FALLHALLOWEEN1_STDS09ProgressionEvents {
  MET_CNT_GaveSmokeBomb?: METCNTPingMonsterClass;
}

interface DDMvLtdCat2022_FallHalloween1_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDCAT2022_FALLHALLOWEEN1_STDS10ProgressionEvents {
  MET_CNT_SmokeBombUsed?: METCNTPingMonsterClass;
}

interface DDMvLtdEvilneverdiesStd {
  movieData?: MovieData;
  scenesBySceneId?: DDMVLTDEVILNEVERDIESSTDScenesBySceneID;
}

interface DDMVLTDEVILNEVERDIESSTDScenesBySceneID {
  DD_MV_LTD_EVILNEVERDIES_STD_S01?: DDMVLTDEVILNEVERDIESSTDS01Class;
  DD_MV_LTD_EVILNEVERDIES_STD_S02?: DDMvLtdStdS02;
  DD_MV_LTD_EVILNEVERDIES_STD_S03?: DDMVLTDEVILNEVERDIESSTDS03Class;
  DD_MV_LTD_EVILNEVERDIES_STD_S04?: DDMvLtdStdS04;
  DD_MV_LTD_EVILNEVERDIES_STD_S05?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS04Class;
  DD_MV_LTD_EVILNEVERDIES_STD_S06?: DDMVLTDEVILNEVERDIESSTDS06Class;
  DD_MV_LTD_EVILNEVERDIES_STD_S07?: DDMvLtdEvilneverdiesStdS07;
  DD_MV_LTD_EVILNEVERDIES_STD_S08?: DDMvLtdEvilneverdiesStdS08;
  DD_MV_LTD_EVILNEVERDIES_STD_S09?: DDMvLtdEvilneverdiesStdS09;
  DD_MV_LTD_EVILNEVERDIES_STD_S10?: DDMvLtdEvilneverdiesStdS10;
}

interface DDMVLTDEVILNEVERDIESSTDS01Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents {
  MET_MatchCompleted?: METCNTPingMonsterClass;
}

interface DDMvLtdStdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESSTDS02ProgressionEvents {
  MET_CNT_TeensHit?: METCNTPingMonsterClass;
}

interface DDMVLTDEVILNEVERDIESSTDS03Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESSTDS03ProgressionEvents {
  MET_CNT_MsecsFeasting?: METCNTPingMonsterClass;
}

interface DDMVLTDEVILNEVERDIESSTDS06Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESSTDS06ProgressionEvents {
  MET_CNT_EvilEnteredChase?: METCNTPingMonsterClass;
}

interface DDMvLtdEvilneverdiesStdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESSTDS07ProgressionEvents {
  MET_CNT_DarkShardsClaimed?: METCNTPingMonsterClass;
}

interface DDMvLtdEvilneverdiesStdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESSTDS08ProgressionEvents {
  MET_CNT_PrizesUsed?: METCNTPingMonsterClass;
}

interface DDMvLtdEvilneverdiesStdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESSTDS09ProgressionEvents {
  MET_CNT_HitTeenWhileDarkShardRevealed?: METCNTPingMonsterClass;
}

interface DDMvLtdEvilneverdiesStdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESSTDS10ProgressionEvents {
  MET_CNT_HowlUses?: METCNTPingMonsterClass;
  MET_CNT_ToadLeapUses?: METCNTPingMonsterClass;
  MET_CNT_DollSummonUses?: METCNTPingMonsterClass;
}

interface DDMvLtdSpectrecollectorStd {
  movieData?: MovieData;
  scenesBySceneId?: DDMVLTDSPECTRECOLLECTORSTDScenesBySceneID;
}

interface DDMVLTDSPECTRECOLLECTORSTDScenesBySceneID {
  DD_MV_LTD_SPECTRECOLLECTOR_STD_S01?: DDMvLtdSpectrecollectorStdS01;
  DD_MV_LTD_SPECTRECOLLECTOR_STD_S02?: DDMvLtdSpectrecollectorStdS02;
  DD_MV_LTD_SPECTRECOLLECTOR_STD_S03?: DDMVLTDSPECTRECOLLECTORSTDS03Class;
  DD_MV_LTD_SPECTRECOLLECTOR_STD_S04?: DDMvLtdSpectrecollectorStdS04;
  DD_MV_LTD_SPECTRECOLLECTOR_STD_S05?: DDMvLtdSpectrecollectorStdS05;
  DD_MV_LTD_SPECTRECOLLECTOR_STD_S06?: DDMvLtdSpectrecollectorStdS06;
  DD_MV_LTD_SPECTRECOLLECTOR_STD_S07?: DDMvLtdSpectrecollectorStdS07;
  DD_MV_LTD_SPECTRECOLLECTOR_STD_S08?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS02Class;
  DD_MV_LTD_SPECTRECOLLECTOR_STD_S09?: DDMvLtdSpectrecollectorStdS09;
  DD_MV_LTD_SPECTRECOLLECTOR_STD_S10?: DDMVLTDSPECTRECOLLECTORSTDS10Class;
  DD_MV_LTD_SPECTRECOLLECTOR_STD_S11?: DDMvLtdSpectrecollectorStdS11;
  DD_MV_LTD_SPECTRECOLLECTOR_STD_S12?: DDMVLTDSPECTRECOLLECTORSTDS12Class;
  DD_MV_LTD_SPECTRECOLLECTOR_STD_S13?: DDMVLTDSPECTRECOLLECTORSTDS13Class;
  DD_MV_LTD_SPECTRECOLLECTOR_STD_S14?: DDMVLTDSPECTRECOLLECTORSTDS14Class;
}

interface DDMvLtdSpectrecollectorStdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMvLtdSpectrecollectorStdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTORSTDS02ProgressionEvents {
  MET_CNT_CraftMinigamesSuccess?: METCNTPingMonsterClass;
}

interface DDMVLTDSPECTRECOLLECTORSTDS03Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTORSTDS03ProgressionEvents {
  MET_CNT_MsecsHealingOthers?: METCNTPingMonsterClass;
}

interface DDMvLtdSpectrecollectorStdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTORSTDS04ProgressionEvents {
  MET_CNT_CraftHoly?: METCNTPingMonsterClass;
  MET_CNT_HitWithHoly?: METCNTPingMonsterClass;
}

interface DDMvLtdSpectrecollectorStdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTORSTDS05ProgressionEvents {
  MET_CNT_CraftBurn?: METCNTPingMonsterClass;
  MET_CNT_HitWithBurn?: METCNTPingMonsterClass;
}

interface DDMvLtdSpectrecollectorStdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTORSTDS06ProgressionEvents {
  MET_CNT_CraftShock?: METCNTPingMonsterClass;
  MET_CNT_HitWithShock?: METCNTPingMonsterClass;
}

interface DDMvLtdSpectrecollectorStdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTORSTDS07ProgressionEvents {
  MET_CNT_CraftOccult?: METCNTPingMonsterClass;
  MET_CNT_HitWithOccult?: METCNTPingMonsterClass;
}

interface DDMvLtdSpectrecollectorStdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTORSTDS09ProgressionEvents {
  MET_CNT_AdrenalineUsed?: METCNTPingMonsterClass;
}

interface DDMVLTDSPECTRECOLLECTORSTDS10Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTORSTDS10ProgressionEvents {
  MET_CNT_NoisemakerActivated?: METCNTPingMonsterClass;
}

interface DDMvLtdSpectrecollectorStdS11 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS11ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTORSTDS11ProgressionEvents {
  MET_CNT_MsecsHealingSelf?: METCNTPingMonsterClass;
}

interface DDMVLTDSPECTRECOLLECTORSTDS12Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTORSTDS13Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTORSTDS14Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS14ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTORSTDS14ProgressionEvents {
  MET_CNT_MsecsChased?: METCNTPingMonsterClass;
}

interface DDMvLtdTwoFeetUnderStd {
  movieData?: MovieData;
  scenesBySceneId?: DDMVLTDTWOFEETUNDERSTDScenesBySceneID;
}

interface DDMVLTDTWOFEETUNDERSTDScenesBySceneID {
  DD_MV_LTD_TWO_FEET_UNDER_STD_S01?: DDMvLtdT;
  DD_MV_LTD_TWO_FEET_UNDER_STD_S02?: DDMvLtdTwoFeetUnderStdS02;
  DD_MV_LTD_TWO_FEET_UNDER_STD_S03?: DDMVLTDSPECTRECOLLECTORSTDS14Class;
  DD_MV_LTD_TWO_FEET_UNDER_STD_S04?: DDMVLTDSPECTRECOLLECTORSTDS10Class;
  DD_MV_LTD_TWO_FEET_UNDER_STD_S05?: DDMvLtdTwoFeetUnderStdS05;
  DD_MV_LTD_TWO_FEET_UNDER_STD_S06?: DDMvLtdTwoFeetUnderStdS06;
  DD_MV_LTD_TWO_FEET_UNDER_STD_S07?: DDMVLTDTWOFEETUNDERSTDS07Class;
  DD_MV_LTD_TWO_FEET_UNDER_STD_S08?: DDMVLTDTWOFEETUNDERSTDS08Class;
  DD_MV_LTD_TWO_FEET_UNDER_STD_S09?: DDMVLTDEVILNEVERDIESSTDS03Class;
  DD_MV_LTD_TWO_FEET_UNDER_STD_S10?: DDMVLTDEVILNEVERDIESSTDS06Class;
  DD_MV_LTD_TWO_FEET_UNDER_STD_S11?: DDMVLTDTWOFEETUNDERSTDS11Class;
  DD_MV_LTD_TWO_FEET_UNDER_STD_S12?: DDMVLTDSPECTRECOLLECTORSTDS13Class;
  DD_MV_LTD_TWO_FEET_UNDER_STD_S13?: DDMVLTDEVILNEVERDIESSTDS01Class;
  DD_MV_LTD_TWO_FEET_UNDER_STD_S14?: DDMVLTDSPECTRECOLLECTORSTDS12Class;
}

interface DDMvLtdT {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDTWOFEETUNDERSTDS01ProgressionEvents {
  MET_CNT_WoundedEvil?: METCNTPingMonsterClass;
}

interface DDMvLtdTwoFeetUnderStdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDTWOFEETUNDERSTDS02ProgressionEvents {
  MET_CNT_PlayerRevives?: METCNTPingMonsterClass;
}

interface DDMvLtdTwoFeetUnderStdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDTWOFEETUNDERSTDS05ProgressionEvents {
  MET_CNT_WeaponsCrafted?: METCNTPingMonsterClass;
}

interface DDMvLtdTwoFeetUnderStdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS06RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDTWOFEETUNDERSTDS06RequiredEvents { }

interface DDMVLTDTWOFEETUNDERSTDS07Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDTWOFEETUNDERSTDS07RequiredEvents {
  MET_PlayingAsWerewolf?: number;
}

interface DDMVLTDTWOFEETUNDERSTDS08Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDTWOFEETUNDERSTDS08ProgressionEvents {
  MET_CNT_SenseAttack?: METCNTPingMonsterClass;
}

interface DDMVLTDTWOFEETUNDERSTDS11Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS11ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDTWOFEETUNDERSTDS11ProgressionEvents {
  MET_CNT_Knockdowns?: METCNTPingMonsterClass;
}

interface DDMvMSDollmaster01_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSDOLLMASTER01_STDScenesBySceneID;
}

interface DDMVMSDOLLMASTER01_STDScenesBySceneID {
  DD_MV_MS_DOLLMASTER_01_STD_S01?: DDMvMSDollmaster01___S01;
  DD_MV_MS_DOLLMASTER_01_STD_S02?: DDMvMSDollmaster01_StdS02;
  DD_MV_MS_DOLLMASTER_01_STD_S03?: DDMvMSDollmaster01_StdS03;
  DD_MV_MS_DOLLMASTER_01_STD_S04?: DDMvMSDollmaster01_StdS04;
  DD_MV_MS_DOLLMASTER_01_STD_S05?: DDMvMSDollmaster01_StdS05;
  DD_MV_MS_DOLLMASTER_01_STD_S06?: DDMvMSDollmaster01_StdS06;
  DD_MV_MS_DOLLMASTER_01_STD_S07?: DDMvMSDollmaster01_StdS07;
  DD_MV_MS_DOLLMASTER_01_STD_S08?: DDMvMSDollmaster01_StdS08;
  DD_MV_MS_DOLLMASTER_01_STD_S09?: DDMvMSDollmaster01_StdS09;
  DD_MV_MS_DOLLMASTER_01_STD_S10?: DDMvMSDollmaster01_StdS10;
}

interface DDMvMSDollmaster01___S01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER01_STDS01RequiredEvents {
  MET_PlayingAsDollMaster?: number;
}

interface DDMvMSDollmaster01_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster01_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER01_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER01_STDS03ProgressionEvents {
  MET_CNT_DollTrapUses?: METCNTPingMonsterClass;
}

interface DDMvMSDollmaster01_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER01_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER01_STDS04ProgressionEvents {
  MET_CNT_DollSummonUses?: METCNTPingMonsterClass;
}

interface DDMvMSDollmaster01_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER01_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER01_STDS05ProgressionEvents {
  MET_CNT_DollTeleportUses?: METCNTPingMonsterClass;
}

interface DDMvMSDollmaster01_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster01_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster01_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS11ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster01_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster01_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster02_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSDOLLMASTER02_STDScenesBySceneID;
}

interface DDMVMSDOLLMASTER02_STDScenesBySceneID {
  DD_MV_MS_DOLLMASTER_02_STD_S01?: DDMvMSDollmaster02_StdS01;
  DD_MV_MS_DOLLMASTER_02_STD_S02?: DDMvMSDollmaster02_StdS02;
  DD_MV_MS_DOLLMASTER_02_STD_S03?: DDMvMSDollmaster02_StdS03;
  DD_MV_MS_DOLLMASTER_02_STD_S04?: DDMvMSDollmaster02_StdS04;
  DD_MV_MS_DOLLMASTER_02_STD_S05?: DDMvMSDollmaster02_StdS05;
  DD_MV_MS_DOLLMASTER_02_STD_S06?: DDMvMSDollmaster02_StdS06;
  DD_MV_MS_DOLLMASTER_02_STD_S07?: DDMvMSDollmaster02_StdS07;
  DD_MV_MS_DOLLMASTER_02_STD_S08?: DDMvMSDollmaster02_StdS08;
  DD_MV_MS_DOLLMASTER_02_STD_S09?: DDMvMSDollmaster02_StdS09;
  DD_MV_MS_DOLLMASTER_02_STD_S10?: DDMvMSDollmaster02_StdS10;
}

interface DDMvMSDollmaster02_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER02_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER02_STDS01RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_OneRankOnePerk?: number;
}

interface DDMvMSDollmaster02_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER02_STDS02RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER01_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER02_STDS02RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_REQ_Perk_DollMaster_Trap_ImprovedDetect?: number;
}

interface DDMvMSDollmaster02_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER02_STDS03ProgressionEvents {
  MET_REQ_FinalScore?: METCNTPingMonsterClass;
}

interface DDMvMSDollmaster02_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER02_STDS04ProgressionEvents {
  MET_EffigyStart_Any?: METCNTPingMonsterClass;
}

interface DDMvMSDollmaster02_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster02_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER02_STDS06ProgressionEvents {
  MET_CNT_DollTrapTriggers?: METCNTPingMonsterClass;
}

interface DDMvMSDollmaster02_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER02_STDS07ProgressionEvents {
  MET_CNT_DollSummonHits?: METCNTPingMonsterClass;
}

interface DDMvMSDollmaster02_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER02_STDS08ProgressionEvents {
  MET_CNT_DollTeleportEscape?: METCNTPingMonsterClass;
}

interface DDMvMSDollmaster02_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER02_STDS09ProgressionEvents {
  MET_MapVote_Any?: METCNTPingMonsterClass;
}

interface DDMvMSDollmaster02_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster03_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSDOLLMASTER03_STDScenesBySceneID;
}

interface DDMVMSDOLLMASTER03_STDScenesBySceneID {
  DD_MV_MS_DOLLMASTER_03_STD_S01?: DDMvMSDollmaster03_StdS01;
  DD_MV_MS_DOLLMASTER_03_STD_S02?: DDMvMSDollmaster03_StdS02;
  DD_MV_MS_DOLLMASTER_03_STD_S03?: DDMvMSDollmaster03_StdS03;
  DD_MV_MS_DOLLMASTER_03_STD_S04?: DDMvMSDollmaster03_StdS04;
  DD_MV_MS_DOLLMASTER_03_STD_S05?: DDMvMSDollmaster03_StdS05;
  DD_MV_MS_DOLLMASTER_03_STD_S06?: DDMvMSDollmaster03_StdS06;
  DD_MV_MS_DOLLMASTER_03_STD_S07?: DDMvMSDollmaster03_StdS07;
  DD_MV_MS_DOLLMASTER_03_STD_S08?: DDMvMSDollmaster03_StdS08;
  DD_MV_MS_DOLLMASTER_03_STD_S09?: DDMvMSDollmaster03_StdS09;
  DD_MV_MS_DOLLMASTER_03_STD_S10?: DDMvMSDollmaster03_StdS10;
}

interface DDMvMSDollmaster03_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_STDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER03_STDS01ProgressionEvents {
  MET_REQ_TormentScore?: METCNTPingMonsterClass;
}

interface DDMvMSDollmaster03_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER03_STDS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER03_STDS02RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_TwoRankOnePerks?: number;
}

interface DDMvMSDollmaster03_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER03_STDS03RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER03_STDS03RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_REQ_Perk_DollMaster_Summon_LongDuration?: number;
}

interface DDMvMSDollmaster03_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER03_STDS04RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER03_STDS04RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_REQ_Perk_DollMaster_Teleport_NoTargeting?: number;
}

interface DDMvMSDollmaster03_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER03_STDS05ProgressionEvents {
  MET_CNT_DollTrapAttackAfterTrigger?: METCNTPingMonsterClass;
}

interface DDMvMSDollmaster03_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_STDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER03_STDS06ProgressionEvents {
  MET_CNT_CommonPrizesUsed?: METCNTPingMonsterClass;
}

interface DDMvMSDollmaster03_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER03_STDS07ProgressionEvents {
  MET_PointBoost_Any?: METCNTPingMonsterClass;
}

interface DDMvMSDollmaster03_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster03_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_STDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER03_STDS09ProgressionEvents {
  MET_CNT_HitRevealedTeen?: METCNTPingMonsterClass;
}

interface DDMvMSDollmaster03_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER03_STDS10ProgressionEvents {
  MET_REQ_HitTeensInMatch?: METCNTPingMonsterClass;
}

interface DDMvMSEradicator01_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSERADICATOR01_EXTScenesBySceneID;
}

interface DDMVMSERADICATOR01_EXTScenesBySceneID {
  DD_MV_MS_ERADICATOR_01_EXT_S01?: DDMvMSEradicator01___S01;
  DD_MV_MS_ERADICATOR_01_EXT_S02?: DDMvMSEradicator01_EXTS02;
  DD_MV_MS_ERADICATOR_01_EXT_S03?: DDMvMSEradicator01_EXTS03;
  DD_MV_MS_ERADICATOR_01_EXT_S04?: DDMvMSEradicator01_EXTS04;
  DD_MV_MS_ERADICATOR_01_EXT_S05?: DDMvMSEradicator01_EXTS05;
}

interface DDMvMSEradicator01___S01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR01_EXTS01RequiredEvents {
  MET_PlayingAsEradicator?: number;
}

interface DDMvMSEradicator01_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR01_EXTS02RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_REQ_Perk_PickupDrop?: number;
}

interface DDMvMSEradicator01_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS03RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR01_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR01_EXTS03ProgressionEvents {
  MET_CNT_EradicatorModeSwapUses?: METCNTPingMonsterClass;
}

interface DDMVMSERADICATOR01_EXTS03RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_REQ_Perk_Eradicator_ModeSwap_FastCharge?: number;
}

interface DDMvMSEradicator01_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_STDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator01_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR01_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR01_EXTS05ProgressionEvents {
  MET_CNT_EradicatorSurgeElectrocutedAttack?: METCNTPingMonsterClass;
}

interface DDMvMSEradicator01_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSERADICATOR01_STDScenesBySceneID;
}

interface DDMVMSERADICATOR01_STDScenesBySceneID {
  DD_MV_MS_ERADICATOR_01_STD_S01?: DDMvMSEradicator01___S01;
  DD_MV_MS_ERADICATOR_01_STD_S02?: DDMvMSEradicator01_StdS02;
  DD_MV_MS_ERADICATOR_01_STD_S03?: DDMvMSEradicator01_StdS03;
  DD_MV_MS_ERADICATOR_01_STD_S04?: DDMvMSEradicator01_StdS04;
  DD_MV_MS_ERADICATOR_01_STD_S05?: DDMvMSEradicator01_StdS05;
  DD_MV_MS_ERADICATOR_01_STD_S06?: DDMvMSEradicator01_StdS06;
  DD_MV_MS_ERADICATOR_01_STD_S07?: DDMVMSERADICATOR01_STDS07Class;
  DD_MV_MS_ERADICATOR_01_STD_S08?: DDMvMSEradicator01_StdS08;
  DD_MV_MS_ERADICATOR_01_STD_S09?: DDMvMSEradicator01_StdS09;
  DD_MV_MS_ERADICATOR_01_STD_S10?: DDMVMSERADICATOR01_STDS10Class;
}

interface DDMvMSEradicator01_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator01_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR01_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR01_STDS03ProgressionEvents {
  MET_CNT_EradicatorSurgeUses?: METCNTPingMonsterClass;
}

interface DDMvMSEradicator01_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR01_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR01_STDS04ProgressionEvents {
  MET_CNT_EradicatorScannerBeamUses?: METCNTPingMonsterClass;
}

interface DDMvMSEradicator01_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR01_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator01_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR01_STDS07Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator01_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS11ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator01_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR01_STDS10Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator02_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSERADICATOR02_EXTScenesBySceneID;
}

interface DDMVMSERADICATOR02_EXTScenesBySceneID {
  DD_MV_MS_ERADICATOR_02_EXT_S01?: DDMvMSEradicator02_EXTS01;
  DD_MV_MS_ERADICATOR_02_EXT_S02?: DDMvMSEradicator02_EXTS02;
  DD_MV_MS_ERADICATOR_02_EXT_S03?: DDMvMSEradicator02_EXTS03;
  DD_MV_MS_ERADICATOR_02_EXT_S04?: DDMVMSERADICATOR01_STDS10Class;
  DD_MV_MS_ERADICATOR_02_EXT_S05?: DDMVMSERADICATOR01_STDS07Class;
}

interface DDMvMSEradicator02_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR02_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR02_EXTS01RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_OneRankTwoPerk?: number;
}

interface DDMvMSEradicator02_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR02_EXTS02RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS11ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR02_EXTS02RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_REQ_Perk_KillInhibit?: number;
}

interface DDMvMSEradicator02_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR02_EXTS03RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR02_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR02_EXTS03ProgressionEvents {
  MET_CNT_EradicatorSurgeElectrocuted?: METCNTPingMonsterClass;
}

interface DDMVMSERADICATOR02_EXTS03RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_REQ_Perk_Eradicator_ElectricSurge_Inhibit?: number;
}

interface DDMvMSEradicator02_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSERADICATOR02_STDScenesBySceneID;
}

interface DDMVMSERADICATOR02_STDScenesBySceneID {
  DD_MV_MS_ERADICATOR_02_STD_S01?: DDMvMSEradicator02_StdS01;
  DD_MV_MS_ERADICATOR_02_STD_S02?: DDMvMSEradicator02_StdS02;
  DD_MV_MS_ERADICATOR_02_STD_S03?: DDMvMSEradicator02_StdS03;
  DD_MV_MS_ERADICATOR_02_STD_S04?: DDMvMSEradicator02_StdS04;
  DD_MV_MS_ERADICATOR_02_STD_S05?: DDMvMSEradicator02_StdS05;
  DD_MV_MS_ERADICATOR_02_STD_S06?: DDMvMSEradicator02_StdS06;
  DD_MV_MS_ERADICATOR_02_STD_S07?: DDMvMSEradicator02_StdS07;
  DD_MV_MS_ERADICATOR_02_STD_S08?: DDMvMSEradicator02_StdS08;
  DD_MV_MS_ERADICATOR_02_STD_S09?: DDMvMSEradicator02_StdS09;
  DD_MV_MS_ERADICATOR_02_STD_S10?: DDMvMSEradicator02_StdS10;
}

interface DDMvMSEradicator02_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR02_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR02_STDS01RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_OneRankOnePerk?: number;
}

interface DDMvMSEradicator02_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR02_STDS02RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR01_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR02_STDS02RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_REQ_Perk_Eradicator_ModeSwap_SpeedBoost?: number;
}

interface DDMvMSEradicator02_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator02_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator02_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator02_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR02_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator02_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR02_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR02_STDS07ProgressionEvents {
  MET_CNT_EradicatorScannerBeamExposed?: METCNTPingMonsterClass;
}

interface DDMvMSEradicator02_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR02_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR02_STDS08ProgressionEvents {
  MET_CNT_EradicatorModeSwapAttack?: METCNTPingMonsterClass;
}

interface DDMvMSEradicator02_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR02_STDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR02_STDS09ProgressionEvents {
  MET_CNT_HitTeenShortlyAfterTransform?: METCNTPingMonsterClass;
}

interface DDMvMSEradicator02_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator03_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSERADICATOR03_STDScenesBySceneID;
}

interface DDMVMSERADICATOR03_STDScenesBySceneID {
  DD_MV_MS_ERADICATOR_03_STD_S01?: DDMvMSEradicator03__;
  DD_MV_MS_ERADICATOR_03_STD_S02?: DDMvMSEradicator03_StdS02;
  DD_MV_MS_ERADICATOR_03_STD_S03?: DDMvMSEradicator03_StdS03;
  DD_MV_MS_ERADICATOR_03_STD_S04?: DDMvMSEradicator03_StdS04;
  DD_MV_MS_ERADICATOR_03_STD_S05?: DDMvMSEradicator03_StdS05;
  DD_MV_MS_ERADICATOR_03_STD_S06?: DDMvMSEradicator03_StdS06;
  DD_MV_MS_ERADICATOR_03_STD_S07?: DDMvMSEradicator03_StdS07;
  DD_MV_MS_ERADICATOR_03_STD_S08?: DDMvMSEradicator03_StdS08;
  DD_MV_MS_ERADICATOR_03_STD_S09?: DDMvMSEradicator03_StdS09;
  DD_MV_MS_ERADICATOR_03_STD_S10?: DDMvMSEradicator03_StdS10;
}

interface DDMvMSEradicator03__ {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR03_STDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR03_STDS01ProgressionEvents {
  MET_REQ_DominanceScore?: METCNTPingMonsterClass;
}

interface DDMvMSEradicator03_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR03_STDS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR03_STDS02RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_TwoRankOnePerks?: number;
}

interface DDMvMSEradicator03_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR03_STDS03RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR01_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR03_STDS03RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_REQ_Perk_Eradicator_ElectricSurge_Expose?: number;
}

interface DDMvMSEradicator03_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR03_STDS04RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR01_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR03_STDS04RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_REQ_Perk_Eradicator_ScannerBeam_Armed?: number;
}

interface DDMvMSEradicator03_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR03_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR03_STDS05ProgressionEvents {
  MET_CNT_RarePrizesUsed?: METCNTPingMonsterClass;
}

interface DDMvMSEradicator03_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR03_STDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR03_STDS06ProgressionEvents {
  MET_PickupStarve_Any?: METCNTPingMonsterClass;
}

interface DDMvMSEradicator03_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR03_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR03_STDS07ProgressionEvents {
  MET_CNT_HitTeenShortlyAfterFailedStation?: METCNTPingMonsterClass;
}

interface DDMvMSEradicator03_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR03_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR03_STDS08ProgressionEvents {
  MET_CNT_EffigyRecharges?: METCNTPingMonsterClass;
}

interface DDMvMSEradicator03_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator03_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad01_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSTOAD01_EXTScenesBySceneID;
}

interface DDMVMSTOAD01_EXTScenesBySceneID {
  DD_MV_MS_TOAD_01_EXT_S01?: DDMvMSToad01___S01;
  DD_MV_MS_TOAD_01_EXT_S02?: DDMvMSToad01_EXTS02;
  DD_MV_MS_TOAD_01_EXT_S03?: DDMvMSToad01_EXTS03;
  DD_MV_MS_TOAD_01_EXT_S04?: DDMvMSToad01_EXTS04;
  DD_MV_MS_TOAD_01_EXT_S05?: DDMvMSToad01_EXTS05;
}

interface DDMvMSToad01___S01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD01_EXTS01RequiredEvents {
  MET_PlayingAsToad?: number;
}

interface DDMvMSToad01_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD01_EXTS02RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_REQ_Perk_Gluttony?: number;
}

interface DDMvMSToad01_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS03RequiredEvents;
  progressionEvents?: DDMVMSTOAD01_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD01_EXTS03ProgressionEvents {
  MET_CNT_ToadLeapUses?: METCNTPingMonsterClass;
}

interface DDMVMSTOAD01_EXTS03RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_REQ_Perk_Toad_Leap_FastSpeed?: number;
}

interface DDMvMSToad01_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR03_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad01_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad01_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSTOAD01_STDScenesBySceneID;
}

interface DDMVMSTOAD01_STDScenesBySceneID {
  DD_MV_MS_TOAD_01_STD_S01?: DDMvMSToad01___S01;
  DD_MV_MS_TOAD_01_STD_S02?: DDMvMSToad01_StdS02;
  DD_MV_MS_TOAD_01_STD_S03?: DDMvMSToad01_StdS03;
  DD_MV_MS_TOAD_01_STD_S04?: DDMvMSToad01_StdS04;
  DD_MV_MS_TOAD_01_STD_S05?: DDMvMSToad01_StdS05;
  DD_MV_MS_TOAD_01_STD_S06?: DDMvMSToad01_StdS06;
  DD_MV_MS_TOAD_01_STD_S07?: DDMvMSToad01_StdS07;
  DD_MV_MS_TOAD_01_STD_S08?: DDMvMSToad01_StdS08;
  DD_MV_MS_TOAD_01_STD_S09?: DDMvMSToad01_StdS09;
  DD_MV_MS_TOAD_01_STD_S10?: DDMvMSToad01_StdS10;
}

interface DDMvMSToad01_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad01_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSTOAD01_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad01_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSTOAD01_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD01_STDS04ProgressionEvents {
  MET_CNT_AcidArmorUses?: METCNTPingMonsterClass;
}

interface DDMvMSToad01_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSTOAD01_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD01_STDS05ProgressionEvents {
  MET_CNT_EcholocationUses?: METCNTPingMonsterClass;
}

interface DDMvMSToad01_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad01_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad01_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS11ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad01_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad01_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad02_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSTOAD02_STDScenesBySceneID;
}

interface DDMVMSTOAD02_STDScenesBySceneID {
  DD_MV_MS_TOAD_02_STD_S01?: DDMvMSToad02_StdS01;
  DD_MV_MS_TOAD_02_STD_S02?: DDMvMSToad02_StdS02;
  DD_MV_MS_TOAD_02_STD_S03?: DDMvMSToad02_StdS03;
  DD_MV_MS_TOAD_02_STD_S04?: DDMvMSToad02_StdS04;
  DD_MV_MS_TOAD_02_STD_S05?: DDMvMSToad02_StdS05;
  DD_MV_MS_TOAD_02_STD_S06?: DDMvMSToad02__;
  DD_MV_MS_TOAD_02_STD_S07?: DDMvMSToad02_StdS07;
  DD_MV_MS_TOAD_02_STD_S08?: DDMvMSToad02_StdS08;
  DD_MV_MS_TOAD_02_STD_S09?: DDMvMSToad02_StdS09;
  DD_MV_MS_TOAD_02_STD_S10?: DDMvMSToad02_StdS10;
}

interface DDMvMSToad02_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD02_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD02_STDS01RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_OneRankOnePerk?: number;
}

interface DDMvMSToad02_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD02_STDS02RequiredEvents;
  progressionEvents?: DDMVMSTOAD01_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD02_STDS02RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_REQ_Perk_Toad_Leap_ImprovedStagger?: number;
}

interface DDMvMSToad02_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad02_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad02_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad02__ {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSTOAD02_STDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD02_STDS06ProgressionEvents {
  MET_CNT_ToadLeapStaggers?: METCNTPingMonsterClass;
}

interface DDMvMSToad02_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSTOAD02_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD02_STDS07ProgressionEvents {
  MET_CNT_AcidArmorAbsorb?: METCNTPingMonsterClass;
}

interface DDMvMSToad02_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSTOAD02_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD02_STDS08ProgressionEvents {
  MET_CNT_EcholocationClose?: METCNTPingMonsterClass;
}

interface DDMvMSToad02_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR03_STDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad02_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_STDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad03_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSTOAD03_STDScenesBySceneID;
}

interface DDMVMSTOAD03_STDScenesBySceneID {
  DD_MV_MS_TOAD_03_STD_S01?: DDMvMSToad03_StdS01;
  DD_MV_MS_TOAD_03_STD_S02?: DDMvMSToad03_StdS02;
  DD_MV_MS_TOAD_03_STD_S03?: DDMvMSToad03_StdS03;
  DD_MV_MS_TOAD_03_STD_S04?: DDMvMSToad03_StdS04;
  DD_MV_MS_TOAD_03_STD_S05?: DDMvMSToad03_StdS05;
  DD_MV_MS_TOAD_03_STD_S06?: DDMvMSToad03_StdS06;
  DD_MV_MS_TOAD_03_STD_S07?: DDMvMSToad03_StdS07;
  DD_MV_MS_TOAD_03_STD_S08?: DDMvMSToad03_StdS08;
  DD_MV_MS_TOAD_03_STD_S09?: DDMvMSToad03_StdS09;
  DD_MV_MS_TOAD_03_STD_S10?: DDMvMSToad03_StdS10;
}

interface DDMvMSToad03_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSTOAD03_STDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD03_STDS01ProgressionEvents {
  MET_REQ_PursuitScore?: METCNTPingMonsterClass;
}

interface DDMvMSToad03_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD03_STDS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD03_STDS02RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_TwoRankOnePerks?: number;
}

interface DDMvMSToad03_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD03_STDS03RequiredEvents;
  progressionEvents?: DDMVMSTOAD02_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD03_STDS03RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_REQ_Perk_Toad_AcidArmor_FastCooldown?: number;
}

interface DDMvMSToad03_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD03_STDS04RequiredEvents;
  progressionEvents?: DDMVMSTOAD02_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD03_STDS04RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_REQ_Perk_Toad_Echolocation_EchoWeaponDetect?: number;
}

interface DDMvMSToad03_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSTOAD03_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD03_STDS05ProgressionEvents {
  MET_CNT_UncommonPrizesUsed?: METCNTPingMonsterClass;
}

interface DDMvMSToad03_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSTOAD03_STDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD03_STDS06ProgressionEvents {
  MET_CNT_ToadLeapAttack?: METCNTPingMonsterClass;
}

interface DDMvMSToad03_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad03_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSTOAD03_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD03_STDS08ProgressionEvents {
  MET_CNT_HitSubduedTeen?: METCNTPingMonsterClass;
}

interface DDMvMSToad03_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR03_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad03_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR02_STDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf01_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSWEREWOLF01_EXTScenesBySceneID;
}

interface DDMVMSWEREWOLF01_EXTScenesBySceneID {
  DD_MV_MS_WEREWOLF_01_EXT_S01?: DDMvMSWerewolf01___S01;
  DD_MV_MS_WEREWOLF_01_EXT_S02?: DDMvMSWerewolf01_EXTS02;
  DD_MV_MS_WEREWOLF_01_EXT_S03?: DDMvMSWerewolf01_EXTS03;
  DD_MV_MS_WEREWOLF_01_EXT_S04?: DDMvMSWerewolf01_EXTS04;
  DD_MV_MS_WEREWOLF_01_EXT_S05?: DDMvMSWerewolf01_EXTS05;
}

interface DDMvMSWerewolf01___S01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf01_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF01_EXTS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF01_EXTS02RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_REQ_Perk_Ferocity?: number;
}

interface DDMvMSWerewolf01_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF01_EXTS03RequiredEvents;
  progressionEvents?: DDMVMSWEREWOLF01_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF01_EXTS03ProgressionEvents {
  MET_CNT_HowlAttack?: METCNTPingMonsterClass;
}

interface DDMVMSWEREWOLF01_EXTS03RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_REQ_Perk_Werewolf_Howl_Stagger?: number;
}

interface DDMvMSWerewolf01_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf01_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf01_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSWEREWOLF01_STDScenesBySceneID;
}

interface DDMVMSWEREWOLF01_STDScenesBySceneID {
  DD_MV_MS_WEREWOLF_01_STD_S01?: DDMvMSWerewolf01___S01;
  DD_MV_MS_WEREWOLF_01_STD_S02?: DDMVLTDTWOFEETUNDERSTDS07Class;
  DD_MV_MS_WEREWOLF_01_STD_S03?: DDMvMSWerewolf01_StdS03;
  DD_MV_MS_WEREWOLF_01_STD_S04?: DDMvMSWerewolf01_StdS04;
  DD_MV_MS_WEREWOLF_01_STD_S05?: DDMvMSWerewolf01_StdS05;
  DD_MV_MS_WEREWOLF_01_STD_S06?: DDMvMSWerewolf01_StdS06;
  DD_MV_MS_WEREWOLF_01_STD_S07?: DDMvMSWerewolf01_StdS07;
  DD_MV_MS_WEREWOLF_01_STD_S08?: DDMvMSWerewolf01_StdS08;
  DD_MV_MS_WEREWOLF_01_STD_S09?: DDMvMSWerewolf0;
  DD_MV_MS_WEREWOLF_01_STD_S10?: DDMvMSWerewolf01_StdS10;
}

interface DDMvMSWerewolf01_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSWEREWOLF01_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF01_STDS03ProgressionEvents {
  MET_CNT_HowlUses?: METCNTPingMonsterClass;
}

interface DDMvMSWerewolf01_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSWEREWOLF01_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF01_STDS04ProgressionEvents {
  MET_CNT_SenseUses?: METCNTPingMonsterClass;
}

interface DDMvMSWerewolf01_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSWEREWOLF01_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF01_STDS05ProgressionEvents {
  MET_CNT_BerserkUses?: METCNTPingMonsterClass;
}

interface DDMvMSWerewolf01_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf01_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf01_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS11ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf0 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf01_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf02_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSWEREWOLF02_STDScenesBySceneID;
}

interface DDMVMSWEREWOLF02_STDScenesBySceneID {
  DD_MV_MS_WEREWOLF_02_STD_S01?: DDMvMSWerewolf02_StdS01;
  DD_MV_MS_WEREWOLF_02_STD_S02?: DDMvMSWerewolf02_StdS02;
  DD_MV_MS_WEREWOLF_02_STD_S03?: DDMvMSWerewolf02_StdS03;
  DD_MV_MS_WEREWOLF_02_STD_S04?: DDMvMSWerewolf02_StdS04;
  DD_MV_MS_WEREWOLF_02_STD_S05?: DDMvMSWerewolf02_StdS05;
  DD_MV_MS_WEREWOLF_02_STD_S06?: DDMvMSWerewolf02_StdS06;
  DD_MV_MS_WEREWOLF_02_STD_S07?: DDMVLTDTWOFEETUNDERSTDS08Class;
  DD_MV_MS_WEREWOLF_02_STD_S08?: DDMvMSWerewolf02_StdS08;
  DD_MV_MS_WEREWOLF_02_STD_S09?: DDMvMSWerewolf02_StdS09;
  DD_MV_MS_WEREWOLF_02_STD_S10?: DDMvMSWerewolf02_StdS10;
}

interface DDMvMSWerewolf02_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF02_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF02_STDS01RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_OneRankOnePerk?: number;
}

interface DDMvMSWerewolf02_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF02_STDS02RequiredEvents;
  progressionEvents?: DDMVMSWEREWOLF01_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF02_STDS02RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_REQ_Perk_Werewolf_Howl_FastCooldown?: number;
}

interface DDMvMSWerewolf02_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf02_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf02_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf02_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSWEREWOLF02_STDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF02_STDS06ProgressionEvents {
  MET_CNT_HowlCowers?: METCNTPingMonsterClass;
}

interface DDMvMSWerewolf02_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSWEREWOLF02_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF02_STDS08ProgressionEvents {
  MET_CNT_BerserkAttack?: METCNTPingMonsterClass;
}

interface DDMvMSWerewolf02_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSTOAD03_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf02_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf03_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSWEREWOLF03_STDScenesBySceneID;
}

interface DDMVMSWEREWOLF03_STDScenesBySceneID {
  DD_MV_MS_WEREWOLF_03_STD_S01?: DDMvMSWerewolf03_StdS01;
  DD_MV_MS_WEREWOLF_03_STD_S02?: DDMvMSWerewolf03_StdS02;
  DD_MV_MS_WEREWOLF_03_STD_S03?: DDMvMSWerewolf03_StdS03;
  DD_MV_MS_WEREWOLF_03_STD_S04?: DDMvMSWerewolf03_StdS04;
  DD_MV_MS_WEREWOLF_03_STD_S05?: DDMvMSWerewolf03_StdS05;
  DD_MV_MS_WEREWOLF_03_STD_S06?: DDMvMSWerewolf03_StdS06;
  DD_MV_MS_WEREWOLF_03_STD_S07?: DDMvMSWerewolf0;
  DD_MV_MS_WEREWOLF_03_STD_S08?: DDMvMSWerewolf03_StdS08;
  DD_MV_MS_WEREWOLF_03_STD_S09?: DDMvMSWerewolf03_StdS09;
  DD_MV_MS_WEREWOLF_03_STD_S10?: DDMvMSWerewolf03_StdS10;
}

interface DDMvMSWerewolf03_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSWEREWOLF03_STDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF03_STDS01ProgressionEvents {
  MET_REQ_BrutalityScore?: METCNTPingMonsterClass;
}

interface DDMvMSWerewolf03_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF03_STDS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF03_STDS02RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_TwoRankOnePerks?: number;
}

interface DDMvMSWerewolf03_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF03_STDS03RequiredEvents;
  progressionEvents?: DDMVMSWEREWOLF02_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF03_STDS03RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_REQ_Perk_Werewolf_Berserk_LongDuration?: number;
}

interface DDMvMSWerewolf03_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF03_STDS04RequiredEvents;
  progressionEvents?: DDMVMSWEREWOLF01_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF03_STDS04RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_REQ_Perk_Werewolf_Sense_ExtendRange?: number;
}

interface DDMvMSWerewolf03_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf03_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR03_STDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf03_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR02_STDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf03_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf03_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_STDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader01_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNCHEERLEADER01_STDScenesBySceneID;
}

interface DDMVTNCHEERLEADER01_STDScenesBySceneID {
  DD_MV_TN_CHEERLEADER_01_STD_S01?: DDMvTnCheerleader01_StdS01;
  DD_MV_TN_CHEERLEADER_01_STD_S02?: DDMvTnCheerleader01_StdS02;
  DD_MV_TN_CHEERLEADER_01_STD_S03?: DDMvTnCheerleader01_StdS03;
  DD_MV_TN_CHEERLEADER_01_STD_S04?: DDMvTnCheerleader01_StdS04;
  DD_MV_TN_CHEERLEADER_01_STD_S05?: DDMvTnCheerleader01_StdS05;
  DD_MV_TN_CHEERLEADER_01_STD_S06?: DDMvTnCheerleader01_StdS06;
  DD_MV_TN_CHEERLEADER_01_STD_S07?: DDMvTnCheerleader01_StdS07;
  DD_MV_TN_CHEERLEADER_01_STD_S08?: DDMvTnCheerleader01_StdS08;
  DD_MV_TN_CHEERLEADER_01_STD_S09?: DDMvTnCheerleader01_StdS09;
  DD_MV_TN_CHEERLEADER_01_STD_S10?: DDMvTnCheerleader01_StdS10;
}

interface DDMvTnCheerleader01_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader01_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader01_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader01_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER01_STDS04ProgressionEvents {
  MET_CNT_PickupsUsed?: METCNTPingMonsterClass;
}

interface DDMvTnCheerleader01_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader01_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader01_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER01_STDS07ProgressionEvents {
  MET_CNT_GavePills?: METCNTPingMonsterClass;
}

interface DDMvTnCheerleader01_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS11ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader01_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader01_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER01_STDS10ProgressionEvents {
  MET_CNT_GaveWalkie?: METCNTPingMonsterClass;
}

interface DDMvTnCheerleader02_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNCHEERLEADER02_STDScenesBySceneID;
}

interface DDMVTNCHEERLEADER02_STDScenesBySceneID {
  DD_MV_TN_CHEERLEADER_02_STD_S01?: DDMvTnCheerleader02_StdS01;
  DD_MV_TN_CHEERLEADER_02_STD_S02?: DDMvTnCheerleader02_StdS02;
  DD_MV_TN_CHEERLEADER_02_STD_S03?: DDMvTnCheerleader02_StdS03;
  DD_MV_TN_CHEERLEADER_02_STD_S04?: DDMvTnCheerleader02_StdS04;
  DD_MV_TN_CHEERLEADER_02_STD_S05?: DDMvTnCheerleader02_StdS05;
  DD_MV_TN_CHEERLEADER_02_STD_S06?: DDMvTnCheerleader02_StdS06;
  DD_MV_TN_CHEERLEADER_02_STD_S07?: DDMvTnCheerleader02_StdS07;
  DD_MV_TN_CHEERLEADER_02_STD_S08?: DDMvTnCheerleader02_StdS08;
  DD_MV_TN_CHEERLEADER_02_STD_S09?: DDMvTnCheerleader02_StdS09;
  DD_MV_TN_CHEERLEADER_02_STD_S10?: DDMvTnCheerleader02_StdS10;
  DD_MV_TN_CHEERLEADER_02_STD_S11?: DDMvTnCheerleader02_StdS11;
}

interface DDMvTnCheerleader02_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER02_STDS01ProgressionEvents {
  MET_CNT_CraftMinigamesPlayed?: METCNTPingMonsterClass;
}

interface DDMvTnCheerleader02_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER02_STDS02ProgressionEvents {
  MET_CNT_StunnedEvil?: METCNTPingMonsterClass;
}

interface DDMvTnCheerleader02_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader02_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER02_STDS04RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER02_STDS04RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_OneRankOneSupportPerk?: number;
}

interface DDMvTnCheerleader02_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER02_STDS05RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER02_STDS05ProgressionEvents {
  MET_CNT_HitWithCross?: METCNTPingMonsterClass;
}

interface DDMVTNCHEERLEADER02_STDS05RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_REQ_Perk_Cross_Any?: number;
}

interface DDMvTnCheerleader02_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader02_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER02_STDS07ProgressionEvents {
  MET_CNT_GaveAdrenaline?: METCNTPingMonsterClass;
}

interface DDMvTnCheerleader02_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader02_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader02_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER02_STDS10ProgressionEvents {
  MET_REQ_WeaponTypesCrafted?: METCNTPingMonsterClass;
}

interface DDMvTnCheerleader02_StdS11 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock01_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNJOCK01_STDScenesBySceneID;
}

interface DDMVTNJOCK01_STDScenesBySceneID {
  DD_MV_TN_JOCK_01_STD_S01?: DDMvTnJock01_StdS01;
  DD_MV_TN_JOCK_01_STD_S02?: DDMvTnJock01_StdS02;
  DD_MV_TN_JOCK_01_STD_S03?: DDMvTnJock01_StdS03;
  DD_MV_TN_JOCK_01_STD_S04?: DDMvTnJock01_StdS04;
  DD_MV_TN_JOCK_01_STD_S05?: DDMvTnJock01_StdS05;
  DD_MV_TN_JOCK_01_STD_S06?: DDMvTnJock01_StdS06;
  DD_MV_TN_JOCK_01_STD_S07?: DDMvTnJock01_StdS07;
  DD_MV_TN_JOCK_01_STD_S08?: DDMvTnJock01_StdS08;
  DD_MV_TN_JOCK_01_STD_S09?: DDMvTnJock01_StdS09;
  DD_MV_TN_JOCK_01_STD_S10?: DDMvTnJock01_StdS10;
}

interface DDMvTnJock01_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK01_STDS01RequiredEvents {
  MET_PlayingAsJock?: number;
}

interface DDMvTnJock01_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock01_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock01_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock01_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock01_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_STDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK01_STDS06ProgressionEvents {
  MET_CNT_HitWithHoly?: METCNTPingMonsterClass;
}

interface DDMvTnJock01_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK01_STDS07ProgressionEvents {
  MET_CNT_HitWithBurn?: METCNTPingMonsterClass;
}

interface DDMvTnJock01_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK01_STDS08ProgressionEvents {
  MET_CNT_HitWithShock?: METCNTPingMonsterClass;
}

interface DDMvTnJock01_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_STDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK01_STDS09ProgressionEvents {
  MET_CNT_HitWithOccult?: METCNTPingMonsterClass;
}

interface DDMvTnJock01_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK01_STDS10ProgressionEvents {
  MET_CNT_MsecsMedkitHealingSelf?: METCNTPingMonsterClass;
}

interface DDMvTnJock02_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNJOCK02_STDScenesBySceneID;
}

interface DDMVTNJOCK02_STDScenesBySceneID {
  DD_MV_TN_JOCK_02_STD_S01?: DDMvTnJock02_StdS01;
  DD_MV_TN_JOCK_02_STD_S02?: DDMvTnJock02_StdS02;
  DD_MV_TN_JOCK_02_STD_S03?: DDMvTnJock02_StdS03;
  DD_MV_TN_JOCK_02_STD_S04?: DDMvTnJock02_StdS04;
  DD_MV_TN_JOCK_02_STD_S05?: DDMvTnJock02_StdS05;
  DD_MV_TN_JOCK_02_STD_S06?: DDMvTnJock02_StdS06;
  DD_MV_TN_JOCK_02_STD_S07?: DDMvTnJock02_StdS07;
  DD_MV_TN_JOCK_02_STD_S08?: DDMvTnJock02_StdS08;
  DD_MV_TN_JOCK_02_STD_S09?: DDMvTnJock02_StdS09;
  DD_MV_TN_JOCK_02_STD_S10?: DDMvTnJock02_StdS10;
}

interface DDMvTnJock02_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock02_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock02_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock02_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK02_STDS04RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK02_STDS04RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_OneRankOneToughnessPerk?: number;
}

interface DDMvTnJock02_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK02_STDS05RequiredEvents;
  progressionEvents?: DDMVTNJOCK02_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK02_STDS05ProgressionEvents {
  MET_CNT_HitWithFlamethrower?: METCNTPingMonsterClass;
}

interface DDMVTNJOCK02_STDS05RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_REQ_Perk_Flamethrower_Any?: number;
}

interface DDMvTnJock02_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock02_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK02_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK02_STDS07ProgressionEvents {
  MET_CNT_CraftShock?: METCNTPingMonsterClass;
}

interface DDMvTnJock02_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock02_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock02_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd01_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNNERD01_STDScenesBySceneID;
}

interface DDMVTNNERD01_STDScenesBySceneID {
  DD_MV_TN_NERD_01_STD_S01?: DDMvTnNerd01_StdS01;
  DD_MV_TN_NERD_01_STD_S02?: DDMvTnNerd01_StdS02;
  DD_MV_TN_NERD_01_STD_S03?: DDMvTnNerd01_StdS03;
  DD_MV_TN_NERD_01_STD_S04?: DDMvTnNerd01_StdS04;
  DD_MV_TN_NERD_01_STD_S05?: DDMvTnNerd01_StdS05;
  DD_MV_TN_NERD_01_STD_S06?: DDMvTnNerd01_StdS06;
  DD_MV_TN_NERD_01_STD_S07?: DDMvTnNerd01_StdS07;
  DD_MV_TN_NERD_01_STD_S08?: DDMvTnNerd01_StdS08;
  DD_MV_TN_NERD_01_STD_S09?: DDMvTnNerd01_StdS09;
  DD_MV_TN_NERD_01_STD_S10?: DDMvTnNerd01_StdS10;
}

interface DDMvTnNerd01_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD01_STDS01RequiredEvents {
  MET_PlayingAsNerd?: number;
}

interface DDMvTnNerd01_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd01_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd01_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd01_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd01_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd01_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNNERD01_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD01_STDS07ProgressionEvents {
  MET_CNT_CraftHoly?: METCNTPingMonsterClass;
}

interface DDMvTnNerd01_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNNERD01_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD01_STDS08ProgressionEvents {
  MET_CNT_CraftBurn?: METCNTPingMonsterClass;
}

interface DDMvTnNerd01_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK02_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd01_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNNERD01_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD01_STDS10ProgressionEvents {
  MET_CNT_CraftOccult?: METCNTPingMonsterClass;
}

interface DDMvTnOutsider01_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNOUTSIDER01_STDScenesBySceneID;
}

interface DDMVTNOUTSIDER01_STDScenesBySceneID {
  DD_MV_TN_OUTSIDER_01_STD_S01?: DDMvTnOutsider01_StdS01;
  DD_MV_TN_OUTSIDER_01_STD_S02?: DDMvTnOutsider01_StdS02;
  DD_MV_TN_OUTSIDER_01_STD_S03?: DDMvTnOutsider01_StdS03;
  DD_MV_TN_OUTSIDER_01_STD_S04?: DDMvTnOutsider01_StdS04;
  DD_MV_TN_OUTSIDER_01_STD_S05?: DDMvTnOutsider01_StdS05;
  DD_MV_TN_OUTSIDER_01_STD_S06?: DDMvTnOutsider01_StdS06;
  DD_MV_TN_OUTSIDER_01_STD_S07?: DDMvTnOutsider01_StdS07;
  DD_MV_TN_OUTSIDER_01_STD_S08?: DDMvTnOutsider01_StdS08;
  DD_MV_TN_OUTSIDER_01_STD_S09?: DDMvTnOutsider01_StdS09;
  DD_MV_TN_OUTSIDER_01_STD_S10?: DDMvTnOutsider01_StdS10;
}

interface DDMvTnOutsider01_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER01_STDS01RequiredEvents {
  MET_PlayingAsOutsider?: number;
}

interface DDMvTnOutsider01_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider01_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider01_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider01_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider01_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider01_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNNERD01_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider01_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNNERD01_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider01_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK02_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider01_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNNERD01_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider02_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNOUTSIDER02_STDScenesBySceneID;
}

interface DDMVTNOUTSIDER02_STDScenesBySceneID {
  DD_MV_TN_OUTSIDER_02_STD_S01?: DDMvTnOutsider02_StdS01;
  DD_MV_TN_OUTSIDER_02_STD_S02?: DDMvTnOutsider02_StdS02;
  DD_MV_TN_OUTSIDER_02_STD_S03?: DDMvTnOutsider02_StdS03;
  DD_MV_TN_OUTSIDER_02_STD_S04?: DDMvTnOutsider02_StdS04;
  DD_MV_TN_OUTSIDER_02_STD_S05?: DDMvTnOutsider02_StdS05;
  DD_MV_TN_OUTSIDER_02_STD_S06?: DDMvTnOutsider02_StdS06;
  DD_MV_TN_OUTSIDER_02_STD_S07?: DDMvTnOutsider02_StdS07;
  DD_MV_TN_OUTSIDER_02_STD_S08?: DDMvTnOutsider02_StdS08;
  DD_MV_TN_OUTSIDER_02_STD_S09?: DDMvTnOutsider02_StdS09;
  DD_MV_TN_OUTSIDER_02_STD_S10?: DDMvTnOutsider02_StdS10;
}

interface DDMvTnOutsider02_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider02_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider02_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider02_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER02_STDS04RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER02_STDS04RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_OneRankOneStealthPerk?: number;
}

interface DDMvTnOutsider02_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER02_STDS05RequiredEvents;
  progressionEvents?: DDMVTNOUTSIDER02_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER02_STDS05ProgressionEvents {
  MET_CNT_HitWithDemonSword?: METCNTPingMonsterClass;
}

interface DDMVTNOUTSIDER02_STDS05RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_REQ_Perk_DemonSword_Any?: number;
}

interface DDMvTnOutsider02_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider02_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider02_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider02_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider02_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk01_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNPUNK01_STDScenesBySceneID;
}

interface DDMVTNPUNK01_STDScenesBySceneID {
  DD_MV_TN_PUNK_01_STD_S01?: DDMvTnPunk01_StdS01;
  DD_MV_TN_PUNK_01_STD_S02?: DDMvTnPunk01_StdS02;
  DD_MV_TN_PUNK_01_STD_S03?: DDMvTnPunk01_StdS03;
  DD_MV_TN_PUNK_01_STD_S04?: DDMvTnPunk01_StdS04;
  DD_MV_TN_PUNK_01_STD_S05?: DDMvTnPunk01_StdS05;
  DD_MV_TN_PUNK_01_STD_S06?: DDMvTnPunk01_StdS06;
  DD_MV_TN_PUNK_01_STD_S07?: DDMvTnPunk01_StdS07;
  DD_MV_TN_PUNK_01_STD_S08?: DDMvTnPunk01_StdS08;
  DD_MV_TN_PUNK_01_STD_S09?: DDMvTnPunk01_StdS09;
  DD_MV_TN_PUNK_01_STD_S10?: DDMvTnPunk01_StdS10;
}

interface DDMvTnPunk01_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk01_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk01_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk01_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk01_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk01_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk01_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVTNPUNK01_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK01_STDS07ProgressionEvents {
  MET_CNT_WastebasketSearched?: METCNTPingMonsterClass;
}

interface DDMvTnPunk01_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk01_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk01_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin01_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNVIRGIN01_STDScenesBySceneID;
}

interface DDMVTNVIRGIN01_STDScenesBySceneID {
  DD_MV_TN_VIRGIN_01_STD_S01?: DDMvTnVirgin01_StdS01;
  DD_MV_TN_VIRGIN_01_STD_S02?: DDMvTnVirgin01_StdS02;
  DD_MV_TN_VIRGIN_01_STD_S03?: DDMvTnVirgin01_StdS03;
  DD_MV_TN_VIRGIN_01_STD_S04?: DDMvTnVirgin01_StdS04;
  DD_MV_TN_VIRGIN_01_STD_S05?: DDMvTnVirgin01_StdS05;
  DD_MV_TN_VIRGIN_01_STD_S06?: DDMvTnVirgin01_StdS06;
  DD_MV_TN_VIRGIN_01_STD_S07?: DDMvTnVirgin01_StdS07;
  DD_MV_TN_VIRGIN_01_STD_S08?: DDMvTnVirgin01_StdS08;
  DD_MV_TN_VIRGIN_01_STD_S09?: DDMvTnVirgin01_StdS09;
  DD_MV_TN_VIRGIN_01_STD_S10?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01Class;
}

interface DDMvTnVirgin01_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin01_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin01_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin01_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin01_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin01_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin01_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin01_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin01_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS02ProgressionEvents;
  rewards?: string[];
}

interface InProgressMoviesByMovieID {
  DD_MV_MS_DOLLMASTER_01_EXT?: DDMvMSDollmaster01_EXT;
  DD_MV_TN_PUNK_02_STD?: DDMvTnPunk02_Std;
  DD_MV_MS_TOAD_02_EXT?: DDMvMSToad02_EXT;
  DD_MV_TN_VIRGIN_02_STD?: DDMvTnVirgin02_Std;
  DD_MV_MS_ERADICATOR_03_EXT?: DDMvMSEradicator03_EXT;
  DD_MV_TN_NERD_02_STD?: DDMvTnNerd02_Std;
  DD_MV_MS_WEREWOLF_02_EXT?: DDMvMSWerewolf02_EXT;
  DD_MV_TN_CHEERLEADER_03_STD?: DDMvTnCheerleader03_Std;
  DD_MV_LTD_2023_VALENTINES_ENT_EVIS_STD?: DDMvLtd2023_ValentinesEntEvisStd;
  DD_MV_LTD_MOV_WARTX_STD?: DDMvLtdMOVWartxStd;
  DD_MV_TN_JOCK_03_STD?: DDMvTnJock03_Std;
  DD_MV_LTD_MOV_CYBERWULF_STD?: DDMvLtdMOVCyberwulfStd;
  DD_MV_MS_ANOMALY_01_STD?: DDMvMSAnomaly01_Std;
  DD_MV_LTD_TEAM_WOLF_STD?: DDMvLtdTeamWolfStd;
  DD_MV_TN_OUTSIDER_03_STD?: DDMvTnOutsider03_Std;
}

interface DDMvLtd2023_ValentinesEntEvisStd {
  movieData?: MovieData;
  scenesBySceneId?: DDMVLTD2023_VALENTINESENTEVISSTDScenesBySceneID;
}

interface DDMVLTD2023_VALENTINESENTEVISSTDScenesBySceneID {
  DD_MV_LTD_2023_VALENTINES_ENT_EVIS_STD_S01?: DDMvLtd2023_ValentinesEntEvisStdS01;
  DD_MV_LTD_2023_VALENTINES_ENT_EVIS_STD_S02?: DDMvLtdStdS02;
  DD_MV_LTD_2023_VALENTINES_ENT_EVIS_STD_S03?: DDMvLtd2023_ValentinesEntEvisStdS03;
  DD_MV_LTD_2023_VALENTINES_ENT_EVIS_STD_S04?: DDMvLtd2023_ValentinesEntEvisStdS04;
  DD_MV_LTD_2023_VALENTINES_ENT_EVIS_STD_S05?: DDMVLTDEVILNEVERDIESSTDS06Class;
  DD_MV_LTD_2023_VALENTINES_ENT_EVIS_STD_S06?: DDMvLtd2023_ValentinesEntEvisStdS06;
  DD_MV_LTD_2023_VALENTINES_ENT_EVIS_STD_S07?: DDMvLtd2023_ValentinesEntEvisStdS07;
  DD_MV_LTD_2023_VALENTINES_ENT_EVIS_STD_S08?: DDMvLtd2023_ValentinesEntEvisStdS08;
  DD_MV_LTD_2023_VALENTINES_ENT_EVIS_STD_S09?: DDMvLtd2023_ValentinesEntEvisStdS09;
  DD_MV_LTD_2023_VALENTINES_ENT_EVIS_STD_S10?: DDMvLtd2023_ValentinesEntEvisStdS10;
}

interface DDMvLtd2023_ValentinesEntEvisStdS01 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESENTEVISSTDS01RequiredEvents;
}

interface DDMVLTD2023_VALENTINESENTEVISSTDS01RequiredEvents {
  MET_PlayingAsAnyEvil?: number;
  MET_NoEvilPerks?: number;
}

interface DDMvLtd2023_ValentinesEntEvisStdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESENTEVISSTDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTD2023_VALENTINESENTEVISSTDS03ProgressionEvents {
  MET_CNT_WeaponsCrafted?: METCNTPingMonsterClass;
  MET_CNT_CraftMinigamesPerfect?: METCNTPingMonsterClass;
}

interface DDMvLtd2023_ValentinesEntEvisStdS04 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTD2023_VALENTINESENTEVISSTDS04ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
}

interface DDMVLTD2023_VALENTINESENTEVISSTDS04ProgressionEvents {
  MET_CNT_HitWithShock?: METCNTPingMonsterClass;
  MET_CNT_RayGunShotsDamaged?: METCNTPingMonsterClass;
}

interface DDMvLtd2023_ValentinesEntEvisStdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMvLtd2023_ValentinesEntEvisStdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvLtd2023_ValentinesEntEvisStdS08 {
  sceneData?: SceneData;
  progressionEvents?: DDMVMSERADICATOR03_STDS06ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
}

interface DDMvLtd2023_ValentinesEntEvisStdS09 {
  sceneData?: SceneData;
  progressionEvents?: DDMVMSERADICATOR03_STDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
}

interface DDMvLtd2023_ValentinesEntEvisStdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMvLtdMOVCyberwulfStd {
  movieData?: MovieData;
  scenesBySceneId?: DDMVLTDMOVCYBERWULFSTDScenesBySceneID;
}

interface DDMVLTDMOVCYBERWULFSTDScenesBySceneID {
  DD_MV_LTD_MOV_CYBERWULF_STD_S01?: DDMvLtdMOVCyberwulfStdS01;
  DD_MV_LTD_MOV_CYBERWULF_STD_S02?: DDMvLtdStdS02;
  DD_MV_LTD_MOV_CYBERWULF_STD_S03?: DDMvLtdMOVCyberwulfStdS03;
  DD_MV_LTD_MOV_CYBERWULF_STD_S04?: DDMvLtdMOVCyberwulfStdS04;
  DD_MV_LTD_MOV_CYBERWULF_STD_S05?: DDMVLTDSPECTRECOLLECTORSTDS03Class;
  DD_MV_LTD_MOV_CYBERWULF_STD_S06?: DDMvLtdMOVCyberwulfStdS06;
  DD_MV_LTD_MOV_CYBERWULF_STD_S07?: DDMvLtdMOVCyberwulfStdS07;
  DD_MV_LTD_MOV_CYBERWULF_STD_S08?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS01Class;
  DD_MV_LTD_MOV_CYBERWULF_STD_S09?: DDMvLtdMOV;
  DD_MV_LTD_MOV_CYBERWULF_STD_S10?: DDMvLtdMOVCyberwulfStdS10;
}

interface DDMvLtdMOVCyberwulfStdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS06RequiredEvents;
  progressionEvents?: DDMVLTDMOVCYBERWULFSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDMOVCYBERWULFSTDS01ProgressionEvents {
  MET_MatchSurvived?: METCNTPingMonsterClass;
}

interface DDMvLtdMOVCyberwulfStdS03 {
  sceneData?: SceneData;
  progressionEvents?: DDMVMSERADICATOR02_STDS09ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
}

interface DDMvLtdMOVCyberwulfStdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDMOVCYBERWULFSTDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDMOVCYBERWULFSTDS04ProgressionEvents {
  MET_CNT_DarkShardsClaimedByTeens?: METCNTPingMonsterClass;
}

interface DDMvLtdMOVCyberwulfStdS06 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS02ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
}

interface DDMvLtdMOVCyberwulfStdS07 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDMOVCYBERWULFSTDS07ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
}

interface DDMVLTDMOVCYBERWULFSTDS07ProgressionEvents {
  MET_CNT_SenseUses?: METCNTPingMonsterClass;
  MET_CNT_SenseAttack?: METCNTPingMonsterClass;
}

interface DDMvLtdMOV {
  sceneData?: SceneData;
  progressionEvents?: DDMVMSTOAD03_STDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
}

interface DDMvLtdMOVCyberwulfStdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDMOVCYBERWULFSTDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDMOVCYBERWULFSTDS10ProgressionEvents {
  MET_CNT_GavePills?: METCNTPingMonsterClass;
  MET_CNT_GaveAdrenaline?: METCNTPingMonsterClass;
}

interface DDMvLtdMOVWartxStd {
  movieData?: MovieData;
  scenesBySceneId?: DDMVLTDMOVWARTXSTDScenesBySceneID;
}

interface DDMVLTDMOVWARTXSTDScenesBySceneID {
  DD_MV_LTD_MOV_WARTX_STD_S01?: DDMvLtdMOVWartxStdS01;
  DD_MV_LTD_MOV_WARTX_STD_S02?: DDMVLTDSPECTRECOLLECTORSTDS13Class;
  DD_MV_LTD_MOV_WARTX_STD_S03?: DDMvLtdMOVWartxStdS03;
  DD_MV_LTD_MOV_WARTX_STD_S04?: DDMvLtdMOVWartxStdS04;
  DD_MV_LTD_MOV_WARTX_STD_S05?: DDMvLtdStdS05;
  DD_MV_LTD_MOV_WARTX_STD_S06?: DDMVLTDTWOFEETUNDERSTDS11Class;
  DD_MV_LTD_MOV_WARTX_STD_S07?: DDMvLtdMOVWartxStdS07;
  DD_MV_LTD_MOV_WARTX_STD_S08?: DDMvLtdMOVWartxStdS08;
  DD_MV_LTD_MOV_WARTX_STD_S09?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS08Class;
  DD_MV_LTD_MOV_WARTX_STD_S10?: DDMvLtdMOV;
}

interface DDMvLtdMOVWartxStdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS06RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMvLtdMOVWartxStdS03 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDMOVWARTXSTDS03ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
}

interface DDMVLTDMOVWARTXSTDS03ProgressionEvents {
  MET_CNT_EcholocationUses?: METCNTPingMonsterClass;
  MET_CNT_EcholocationAttack?: METCNTPingMonsterClass;
}

interface DDMvLtdMOVWartxStdS04 {
  sceneData?: SceneData;
  progressionEvents?: DDMVMSDOLLMASTER03_STDS10ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
}

interface DDMvLtdMOVWartxStdS07 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDMOVWARTXSTDS07ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
}

interface DDMVLTDMOVWARTXSTDS07ProgressionEvents {
  MET_CNT_AvoidWithHidePoint?: METCNTPingMonsterClass;
}

interface DDMvLtdMOVWartxStdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDMOVWARTXSTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDMOVWARTXSTDS08ProgressionEvents {
  MET_CNT_WeaponsCrafted?: METCNTPingMonsterClass;
  MET_CNT_CraftMinigamesPlayed?: METCNTPingMonsterClass;
}

interface DDMvLtdTeamWolfStd {
  movieData?: MovieData;
  scenesBySceneId?: DDMVLTDTEAMWOLFSTDScenesBySceneID;
}

interface DDMVLTDTEAMWOLFSTDScenesBySceneID {
  DD_MV_LTD_TEAM_WOLF_STD_S01?: DDMvLtdTeamWolfStdS01;
  DD_MV_LTD_TEAM_WOLF_STD_S02?: DDMvLtdTeamWolfStdS02;
  DD_MV_LTD_TEAM_WOLF_STD_S03?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03Class;
  DD_MV_LTD_TEAM_WOLF_STD_S04?: DDMvLtdT;
  DD_MV_LTD_TEAM_WOLF_STD_S05?: DDMVLTDEVILNEVERDIESSTDS03Class;
  DD_MV_LTD_TEAM_WOLF_STD_S06?: DDMvLtdTeamWolfStdS06;
  DD_MV_LTD_TEAM_WOLF_STD_S07?: DDMVLTDTWOFEETUNDERSTDS11Class;
  DD_MV_LTD_TEAM_WOLF_STD_S08?: DDMvLtdTeamWolfStdS08;
  DD_MV_LTD_TEAM_WOLF_STD_S09?: DDMvLtdTeamWolfStdS09;
  DD_MV_LTD_TEAM_WOLF_STD_S10?: DDMVLTDSPECTRECOLLECTORSTDS12Class;
}

interface DDMvLtdTeamWolfStdS01 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDTEAMWOLFSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDTEAMWOLFSTDS01ProgressionEvents {
  MET_MatchCompleted?: METCNTPingMonsterClass;
  MET_REQ_FinalScoreWithBonus?: METCNTPingMonsterClass;
}

interface DDMvLtdTeamWolfStdS02 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDTEAMWOLFSTDS02ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
}

interface DDMVLTDTEAMWOLFSTDS02ProgressionEvents {
  MET_CNT_HowlUses?: METCNTPingMonsterClass;
  MET_CNT_HowlAttack?: METCNTPingMonsterClass;
}

interface DDMvLtdTeamWolfStdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDTEAMWOLFSTDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDTEAMWOLFSTDS06ProgressionEvents {
  MET_CNT_CraftWeaponInOneTry?: METCNTPingMonsterClass;
}

interface DDMvLtdTeamWolfStdS08 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDTEAMWOLFSTDS08ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
}

interface DDMVLTDTEAMWOLFSTDS08ProgressionEvents {
  MET_CNT_BecomeEnraged?: METCNTPingMonsterClass;
  MET_CNT_HitTeenWhenEnraged?: METCNTPingMonsterClass;
}

interface DDMvLtdTeamWolfStdS09 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDTEAMWOLFSTDS09ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
}

interface DDMVLTDTEAMWOLFSTDS09ProgressionEvents {
  MET_CNT_PickupsUsed?: METCNTPingMonsterClass;
  MET_CNT_VendingMachineSearched?: METCNTPingMonsterClass;
  MET_CNT_WastebasketSearched?: METCNTPingMonsterClass;
}

interface DDMvMSAnomaly01_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSANOMALY01_STDScenesBySceneID;
}

interface DDMVMSANOMALY01_STDScenesBySceneID {
  DD_MV_MS_ANOMALY_01_STD_S01?: DDMvMSAnomaly01_StdS01;
  DD_MV_MS_ANOMALY_01_STD_S02?: DDMvMSAnomaly01_StdS02;
  DD_MV_MS_ANOMALY_01_STD_S03?: DDMvMSAnomaly01_StdS03;
  DD_MV_MS_ANOMALY_01_STD_S04?: DDMvMSAnomaly01_StdS04;
  DD_MV_MS_ANOMALY_01_STD_S05?: DDMvMSAnomaly01_StdS05;
  DD_MV_MS_ANOMALY_01_STD_S06?: DDMvMSAnomaly01_StdS06;
  DD_MV_MS_ANOMALY_01_STD_S07?: DDMvMSAnomaly01_StdS07;
  DD_MV_MS_ANOMALY_01_STD_S08?: DDMvMSAnomaly01_StdS08;
  DD_MV_MS_ANOMALY_01_STD_S09?: DDMvMSAnomaly01_StdS09;
  DD_MV_MS_ANOMALY_01_STD_S10?: DDMvMSAnomaly01_StdS10;
}

interface DDMvMSAnomaly01_StdS01 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
}

interface DDMVMSANOMALY01_STDS01RequiredEvents {
  MET_PlayingAsAnomaly?: number;
}

interface DDMvMSAnomaly01_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSAnomaly01_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY01_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY01_STDS03ProgressionEvents {
  MET_CNT_AnomalyDisperseUses?: METCNTPingMonsterClass;
}

interface DDMvMSAnomaly01_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY01_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY01_STDS04ProgressionEvents {
  MET_CNT_AnomalyMimicryUses?: METCNTPingMonsterClass;
}

interface DDMvMSAnomaly01_StdS05 {
  sceneData?: SceneData;
  progressionEvents?: DDMVMSANOMALY01_STDS05ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
}

interface DDMVMSANOMALY01_STDS05ProgressionEvents {
  MET_CNT_AnomalyScourUses?: METCNTPingMonsterClass;
}

interface DDMvMSAnomaly01_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSAnomaly01_StdS07 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS03ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
}

interface DDMvMSAnomaly01_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS11ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSAnomaly01_StdS09 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS08ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
}

interface DDMvMSAnomaly01_StdS10 {
  sceneData?: SceneData;
  progressionEvents?: DDMVMSTOAD03_STDS08ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
}

interface DDMvMSDollmaster01_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSDOLLMASTER01_EXTScenesBySceneID;
}

interface DDMVMSDOLLMASTER01_EXTScenesBySceneID {
  DD_MV_MS_DOLLMASTER_01_EXT_S01?: DDMvMSDollmaster01___S01;
  DD_MV_MS_DOLLMASTER_01_EXT_S02?: DDMvMSDollmaster01_EXTS02;
  DD_MV_MS_DOLLMASTER_01_EXT_S03?: DDMvMSDollmaster01_EXTS03;
  DD_MV_MS_DOLLMASTER_01_EXT_S04?: DDMvMSDollmaster01_EXTS04;
  DD_MV_MS_DOLLMASTER_01_EXT_S05?: DDMvMSDollmaster01_EXTS05;
}

interface DDMvMSDollmaster01_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_EXTS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER01_EXTS02RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_REQ_Perk_Vigilance?: number;
}

interface DDMvMSDollmaster01_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_EXTS03RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER01_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER01_EXTS03ProgressionEvents {
  MET_CNT_DollTrapBundleKnockdown?: METCNTPingMonsterClass;
}

interface DDMVMSDOLLMASTER01_EXTS03RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_REQ_Perk_DollMaster_Trap_ExtraTraps?: number;
}

interface DDMvMSDollmaster01_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER01_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER01_EXTS04ProgressionEvents {
  MET_CNT_DollSummonKnockdowns?: METCNTPingMonsterClass;
}

interface DDMvMSDollmaster01_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR03_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator03_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSERADICATOR03_EXTScenesBySceneID;
}

interface DDMVMSERADICATOR03_EXTScenesBySceneID {
  DD_MV_MS_ERADICATOR_03_EXT_S01?: DDMvMSEradicator03_EXTS01;
  DD_MV_MS_ERADICATOR_03_EXT_S02?: DDMvMSEradicator03_EXTS02;
  DD_MV_MS_ERADICATOR_03_EXT_S03?: DDMvMSEradicator03_EXTS03;
  DD_MV_MS_ERADICATOR_03_EXT_S04?: DDMvMSEradicator03_EXTS04;
  DD_MV_MS_ERADICATOR_03_EXT_S05?: DDMvMSEradicator03__;
}

interface DDMvMSEradicator03_EXTS01 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDMOVCYBERWULFSTDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVMSERADICATOR03_EXTS01RequiredEvents;
}

interface DDMVMSERADICATOR03_EXTS01RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_TwoRankTwoPerks?: number;
}

interface DDMvMSEradicator03_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR03_EXTS02RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR03_EXTS02RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_REQ_Perk_ScreamRange?: number;
}

interface DDMvMSEradicator03_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR03_EXTS03RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR03_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR03_EXTS03ProgressionEvents {
  MET_CNT_EradicatorScannerBeamExposedMany?: METCNTPingMonsterClass;
}

interface DDMVMSERADICATOR03_EXTS03RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_REQ_Perk_Eradicator_ScannerBeam_WideArea?: number;
}

interface DDMvMSEradicator03_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSTOAD03_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad02_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSTOAD02_EXTScenesBySceneID;
}

interface DDMVMSTOAD02_EXTScenesBySceneID {
  DD_MV_MS_TOAD_02_EXT_S01?: DDMvMSToad02_EXTS01;
  DD_MV_MS_TOAD_02_EXT_S02?: DDMvMSToad02_EXTS02;
  DD_MV_MS_TOAD_02_EXT_S03?: DDMvMSToad02_EXTS03;
  DD_MV_MS_TOAD_02_EXT_S04?: DDMvMSToad02_EXTS04;
  DD_MV_MS_TOAD_02_EXT_S05?: DDMvMSToad02__;
}

interface DDMvMSToad02_EXTS01 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVMSTOAD02_EXTS01RequiredEvents;
}

interface DDMVMSTOAD02_EXTS01RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_OneRankTwoPerk?: number;
}

interface DDMvMSToad02_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD02_EXTS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD02_EXTS02RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_REQ_Perk_Lethality?: number;
}

interface DDMvMSToad02_EXTS03 {
  sceneData?: SceneData;
  progressionEvents?: DDMVMSTOAD02_EXTS03ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVMSTOAD02_EXTS03RequiredEvents;
}

interface DDMVMSTOAD02_EXTS03ProgressionEvents {
  MET_CNT_AcidArmorAttack?: METCNTPingMonsterClass;
}

interface DDMVMSTOAD02_EXTS03RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_REQ_Perk_Toad_AcidArmor_SpeedBonus?: number;
}

interface DDMvMSToad02_EXTS04 {
  sceneData?: SceneData;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS09ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
}

interface DDMvMSWerewolf02_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSWEREWOLF02_EXTScenesBySceneID;
}

interface DDMVMSWEREWOLF02_EXTScenesBySceneID {
  DD_MV_MS_WEREWOLF_02_EXT_S01?: DDMvMSWerewolf02_EXTS01;
  DD_MV_MS_WEREWOLF_02_EXT_S02?: DDMvMSWerewolf02_EXTS02;
  DD_MV_MS_WEREWOLF_02_EXT_S03?: DDMvMSWerewolf02_EXTS03;
  DD_MV_MS_WEREWOLF_02_EXT_S04?: DDMvMSWerewolf02_EXTS04;
  DD_MV_MS_WEREWOLF_02_EXT_S05?: DDMvMSWerewolf02_EXTS05;
}

interface DDMvMSWerewolf02_EXTS01 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVMSWEREWOLF02_EXTS01RequiredEvents;
}

interface DDMVMSWEREWOLF02_EXTS01RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_OneRankTwoPerk?: number;
}

interface DDMvMSWerewolf02_EXTS02 {
  sceneData?: SceneData;
  progressionEvents?: DDMVMSTOAD03_STDS08ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVMSWEREWOLF02_EXTS02RequiredEvents;
}

interface DDMVMSWEREWOLF02_EXTS02RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_REQ_Perk_ExtendSubdued?: number;
}

interface DDMvMSWerewolf02_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF02_EXTS03RequiredEvents;
  progressionEvents?: DDMVMSWEREWOLF01_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF02_EXTS03RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_REQ_Perk_Werewolf_Berserk_InstantRefresh?: number;
}

interface DDMvMSWerewolf02_EXTS04 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS09ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
}

interface DDMvMSWerewolf02_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSWEREWOLF02_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF02_EXTS05ProgressionEvents {
  MET_CNT_HowlAffectsMany?: METCNTPingMonsterClass;
}

interface DDMvTnCheerleader03_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNCHEERLEADER03_STDScenesBySceneID;
}

interface DDMVTNCHEERLEADER03_STDScenesBySceneID {
  DD_MV_TN_CHEERLEADER_03_STD_S01?: DDMvTnCheerleader03_StdS01;
  DD_MV_TN_CHEERLEADER_03_STD_S02?: DDMvTnCheerleader03_StdS02;
  DD_MV_TN_CHEERLEADER_03_STD_S03?: DDMvTnCheerleader03_StdS03;
  DD_MV_TN_CHEERLEADER_03_STD_S04?: DDMvTnCheerleader03_StdS04;
  DD_MV_TN_CHEERLEADER_03_STD_S05?: DDMvTnCheerleader03_StdS05;
  DD_MV_TN_CHEERLEADER_03_STD_S06?: DDMvTnCheerleader03_StdS06;
  DD_MV_TN_CHEERLEADER_03_STD_S07?: DDMvTnCheerleader03_StdS07;
  DD_MV_TN_CHEERLEADER_03_STD_S08?: DDMvTnCheerleader03_StdS08;
  DD_MV_TN_CHEERLEADER_03_STD_S09?: DDMvTnCheerleader03_StdS09;
  DD_MV_TN_CHEERLEADER_03_STD_S10?: DDMvTnCheerleader03_StdS10;
}

interface DDMvTnCheerleader03_StdS01 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDMOVCYBERWULFSTDS04ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
}

interface DDMvTnCheerleader03_StdS02 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS14ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
}

interface DDMvTnCheerleader03_StdS03 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNCHEERLEADER03_STDS03ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
}

interface DDMVTNCHEERLEADER03_STDS03ProgressionEvents {
  MET_REQ_CoopScore?: METCNTPingMonsterClass;
}

interface DDMvTnCheerleader03_StdS04 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNCHEERLEADER03_STDS04RequiredEvents;
}

interface DDMVTNCHEERLEADER03_STDS04RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_TwoRankOneSupportPerks?: number;
}

interface DDMvTnCheerleader03_StdS05 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNCHEERLEADER03_STDS05ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNCHEERLEADER03_STDS05RequiredEvents;
}

interface DDMVTNCHEERLEADER03_STDS05ProgressionEvents {
  MET_CNT_RayGunShotsDamaged?: METCNTPingMonsterClass;
}

interface DDMVTNCHEERLEADER03_STDS05RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_REQ_Perk_RayGun_Any?: number;
}

interface DDMvTnCheerleader03_StdS06 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNOUTSIDER02_STDS05ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNCHEERLEADER03_STDS06RequiredEvents;
}

interface DDMVTNCHEERLEADER03_STDS06RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_REQ_Perk_DemonSword_Any?: number;
}

interface DDMvTnCheerleader03_StdS07 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
}

interface DDMvTnCheerleader03_StdS08 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS02ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
}

interface DDMvTnCheerleader03_StdS09 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
}

interface DDMvTnCheerleader03_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock03_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNJOCK03_STDScenesBySceneID;
}

interface DDMVTNJOCK03_STDScenesBySceneID {
  DD_MV_TN_JOCK_03_STD_S01?: DDMvTnJock03_StdS01;
  DD_MV_TN_JOCK_03_STD_S02?: DDMvTnJock03_StdS02;
  DD_MV_TN_JOCK_03_STD_S03?: DDMvTnJock03_StdS03;
  DD_MV_TN_JOCK_03_STD_S04?: DDMvTnJock03_StdS04;
  DD_MV_TN_JOCK_03_STD_S05?: DDMvTnJock03_StdS05;
  DD_MV_TN_JOCK_03_STD_S06?: DDMvTnJock03_StdS06;
  DD_MV_TN_JOCK_03_STD_S07?: DDMvTnJock03_StdS07;
  DD_MV_TN_JOCK_03_STD_S08?: DDMvTnJock03_StdS08;
  DD_MV_TN_JOCK_03_STD_S09?: DDMvTnJock03_StdS09;
  DD_MV_TN_JOCK_03_STD_S10?: DDMvTnJock03_StdS10;
  DD_MV_TN_JOCK_03_STD_S11?: DDMvTnJock03_StdS11;
}

interface DDMvTnJock03_StdS01 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDMOVCYBERWULFSTDS04ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
}

interface DDMvTnJock03_StdS02 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS14ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
}

interface DDMvTnJock03_StdS03 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNJOCK03_STDS03ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
}

interface DDMVTNJOCK03_STDS03ProgressionEvents {
  MET_REQ_GritScore?: METCNTPingMonsterClass;
}

interface DDMvTnJock03_StdS04 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNJOCK03_STDS04RequiredEvents;
}

interface DDMVTNJOCK03_STDS04RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_TwoRankOneToughnessPerks?: number;
}

interface DDMvTnJock03_StdS05 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNJOCK03_STDS05ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNJOCK03_STDS05RequiredEvents;
}

interface DDMVTNJOCK03_STDS05ProgressionEvents {
  MET_CNT_MsecsDamageCross?: METCNTPingMonsterClass;
}

interface DDMVTNJOCK03_STDS05RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_REQ_Perk_Cross_Any?: number;
}

interface DDMvTnJock03_StdS06 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNJOCK03_STDS06ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNJOCK03_STDS06RequiredEvents;
}

interface DDMVTNJOCK03_STDS06ProgressionEvents {
  MET_CNT_CraftRayGun?: METCNTPingMonsterClass;
}

interface DDMVTNJOCK03_STDS06RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_REQ_Perk_RayGun_Any?: number;
}

interface DDMvTnJock03_StdS07 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
}

interface DDMvTnJock03_StdS08 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNJOCK03_STDS08ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
}

interface DDMVTNJOCK03_STDS08ProgressionEvents {
  MET_CNT_StunWithBurn?: METCNTPingMonsterClass;
}

interface DDMvTnJock03_StdS09 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
}

interface DDMvTnJock03_StdS10 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNJOCK03_STDS10ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
}

interface DDMVTNJOCK03_STDS10ProgressionEvents {
  MET_PickupStart_Any?: METCNTPingMonsterClass;
}

interface DDMvTnJock03_StdS11 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS02ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
}

interface DDMvTnNerd02_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNNERD02_STDScenesBySceneID;
}

interface DDMVTNNERD02_STDScenesBySceneID {
  DD_MV_TN_NERD_02_STD_S01?: DDMvTnNerd02_StdS01;
  DD_MV_TN_NERD_02_STD_S02?: DDMvTnNerd02_StdS02;
  DD_MV_TN_NERD_02_STD_S03?: DDMvTnNerd02_StdS03;
  DD_MV_TN_NERD_02_STD_S04?: DDMvTnNerd02_StdS04;
  DD_MV_TN_NERD_02_STD_S05?: DDMvTnNerd02_StdS05;
  DD_MV_TN_NERD_02_STD_S06?: DDMvTnNerd02_StdS06;
  DD_MV_TN_NERD_02_STD_S07?: DDMvTnNerd02_StdS07;
  DD_MV_TN_NERD_02_STD_S08?: DDMvTnNerd02_StdS08;
  DD_MV_TN_NERD_02_STD_S09?: DDMvTnNerd02_StdS09;
  DD_MV_TN_NERD_02_STD_S10?: DDMvTnNerd02_StdS10;
}

interface DDMvTnNerd02_StdS01 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
}

interface DDMvTnNerd02_StdS02 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS02ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
}

interface DDMvTnNerd02_StdS03 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS08ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
}

interface DDMvTnNerd02_StdS04 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNNERD02_STDS04RequiredEvents;
}

interface DDMVTNNERD02_STDS04RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_OneRankOneExpertisePerk?: number;
}

interface DDMvTnNerd02_StdS05 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNOUTSIDER02_STDS05ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNNERD02_STDS05RequiredEvents;
}

interface DDMVTNNERD02_STDS05RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_REQ_Perk_DemonSword_Any?: number;
}

interface DDMvTnNerd02_StdS06 {
  sceneData?: SceneData;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS03ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
}

interface DDMvTnNerd02_StdS07 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS10ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
}

interface DDMvTnNerd02_StdS08 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS10ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
}

interface DDMvTnNerd02_StdS09 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS09ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
}

interface DDMvTnNerd02_StdS10 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNPUNK01_STDS07ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
}

interface DDMvTnOutsider03_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNOUTSIDER03_STDScenesBySceneID;
}

interface DDMVTNOUTSIDER03_STDScenesBySceneID {
  DD_MV_TN_OUTSIDER_03_STD_S01?: DDMvTnOutsider03_StdS01;
  DD_MV_TN_OUTSIDER_03_STD_S02?: DDMvTnOutsider03_StdS02;
  DD_MV_TN_OUTSIDER_03_STD_S03?: DDMvTnOutsider03_StdS03;
  DD_MV_TN_OUTSIDER_03_STD_S04?: DDMvTnOutsider03_StdS04;
  DD_MV_TN_OUTSIDER_03_STD_S05?: DDMvTnOutsider03_StdS05;
  DD_MV_TN_OUTSIDER_03_STD_S06?: DDMvTnOutsider03_StdS06;
  DD_MV_TN_OUTSIDER_03_STD_S07?: DDMvTnOutsider03_StdS07;
  DD_MV_TN_OUTSIDER_03_STD_S08?: DDMvTnOutsider03_StdS08;
  DD_MV_TN_OUTSIDER_03_STD_S09?: DDMvTnOutsider03_StdS09;
  DD_MV_TN_OUTSIDER_03_STD_S10?: DDMvTnOutsider03_StdS10;
}

interface DDMvTnOutsider03_StdS01 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDMOVCYBERWULFSTDS04ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
}

interface DDMvTnOutsider03_StdS02 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS14ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
}

interface DDMvTnOutsider03_StdS03 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNJOCK03_STDS03ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
}

interface DDMvTnOutsider03_StdS04 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNOUTSIDER03_STDS04RequiredEvents;
}

interface DDMVTNOUTSIDER03_STDS04RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_TwoRankOneStealthPerks?: number;
}

interface DDMvTnOutsider03_StdS05 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNJOCK03_STDS06ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNOUTSIDER03_STDS05RequiredEvents;
}

interface DDMVTNOUTSIDER03_STDS05RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_REQ_Perk_RayGun_Any?: number;
}

interface DDMvTnOutsider03_StdS06 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNJOCK03_STDS05ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNOUTSIDER03_STDS06RequiredEvents;
}

interface DDMVTNOUTSIDER03_STDS06RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_REQ_Perk_Cross_Any?: number;
}

interface DDMvTnOutsider03_StdS07 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDTWOFEETUNDERSTDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
}

interface DDMvTnOutsider03_StdS08 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNOUTSIDER03_STDS08ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
}

interface DDMVTNOUTSIDER03_STDS08ProgressionEvents {
  MET_CNT_CraftMinigamesPerfect?: METCNTPingMonsterClass;
}

interface DDMvTnOutsider03_StdS09 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
}

interface DDMvTnOutsider03_StdS10 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNOUTSIDER03_STDS10ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
}

interface DDMVTNOUTSIDER03_STDS10ProgressionEvents {
  MET_SpawnStart_Any?: METCNTPingMonsterClass;
}

interface DDMvTnPunk02_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNPUNK02_STDScenesBySceneID;
}

interface DDMVTNPUNK02_STDScenesBySceneID {
  DD_MV_TN_PUNK_02_STD_S01?: DDMvTnPunk02_StdS01;
  DD_MV_TN_PUNK_02_STD_S02?: DDMvTnPunk02_StdS02;
  DD_MV_TN_PUNK_02_STD_S03?: DDMvTnPunk02_StdS03;
  DD_MV_TN_PUNK_02_STD_S04?: DDMvTnPunk02_StdS04;
  DD_MV_TN_PUNK_02_STD_S05?: DDMvTnPunk02_StdS05;
  DD_MV_TN_PUNK_02_STD_S06?: DDMvTnPunk02_StdS06;
  DD_MV_TN_PUNK_02_STD_S07?: DDMvTnPunk02_StdS07;
  DD_MV_TN_PUNK_02_STD_S08?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02Class;
  DD_MV_TN_PUNK_02_STD_S09?: DDMvTnPunk02_StdS09;
  DD_MV_TN_PUNK_02_STD_S10?: DDMvTnPunk02_StdS10;
}

interface DDMvTnPunk02_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk02_StdS02 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS02ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
}

interface DDMvTnPunk02_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk02_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK02_STDS04RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK02_STDS04RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_OneRankOneSavvyPerk?: number;
}

interface DDMvTnPunk02_StdS05 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNPUNK02_STDS05ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNPUNK02_STDS05RequiredEvents;
}

interface DDMVTNPUNK02_STDS05ProgressionEvents {
  MET_CNT_StunWithCross?: METCNTPingMonsterClass;
}

interface DDMVTNPUNK02_STDS05RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_REQ_Perk_Cross_Any?: number;
}

interface DDMvTnPunk02_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk02_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk02_StdS09 {
  sceneData?: SceneData;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS09ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
}

interface DDMvTnPunk02_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin02_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNVIRGIN02_STDScenesBySceneID;
}

interface DDMVTNVIRGIN02_STDScenesBySceneID {
  DD_MV_TN_VIRGIN_02_STD_S01?: DDMvTnVirgin02_StdS01;
  DD_MV_TN_VIRGIN_02_STD_S02?: DDMvTnVirgin02_StdS02;
  DD_MV_TN_VIRGIN_02_STD_S03?: DDMvTnVirgin02_StdS03;
  DD_MV_TN_VIRGIN_02_STD_S04?: DDMvTnVirgin02_StdS04;
  DD_MV_TN_VIRGIN_02_STD_S05?: DDMvTnVirgin02_StdS05;
  DD_MV_TN_VIRGIN_02_STD_S06?: DDMvTnVirgin02_StdS06;
  DD_MV_TN_VIRGIN_02_STD_S07?: DDMvTnVirgin02_StdS07;
  DD_MV_TN_VIRGIN_02_STD_S08?: DDMvTnVirgin02_StdS08;
  DD_MV_TN_VIRGIN_02_STD_S09?: DDMvTnVirgin02_StdS09;
  DD_MV_TN_VIRGIN_02_STD_S10?: DDMvTnVirgin02_StdS10;
}

interface DDMvTnVirgin02_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin02_StdS02 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNCHEERLEADER02_STDS02ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
}

interface DDMvTnVirgin02_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin02_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN02_STDS04RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESSTDS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN02_STDS04RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_OneRankOneRecoveryPerk?: number;
}

interface DDMvTnVirgin02_StdS05 {
  sceneData?: SceneData;
  progressionEvents?: DDMVTNVIRGIN02_STDS05ProgressionEvents;
  rewards?: string[];
  requiredEvents?: DDMVTNVIRGIN02_STDS05RequiredEvents;
}

interface DDMVTNVIRGIN02_STDS05ProgressionEvents {
  MET_CNT_HitWithRayGun?: METCNTPingMonsterClass;
}

interface DDMVTNVIRGIN02_STDS05RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_REQ_Perk_RayGun_Any?: number;
}

interface DDMvTnVirgin02_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_STDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin02_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin02_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORSTDS09ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin02_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin02_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVLTDCAT2022_FALLHALLOWEEN1_STDS01ProgressionEvents;
  rewards?: string[];
}

interface UnrentedMoviesByMovieID {
  DD_MV_LTD_EVILNEVERDIES_DIR?: DDMvLtdEvilneverdiesDir;
  DD_MV_LTD_EVILNEVERDIES_EXT?: DDMvLtdEvilneverdiesEXT;
  DD_MV_LTD_SPECTRECOLLECTOR_DIR?: DDMvLtdSpectrecollectorDir;
  DD_MV_LTD_SPECTRECOLLECTOR_EXT?: DDMvLtdSpectrecollectorEXT;
  DD_MV_MS_DOLLMASTER_01_DIR?: DDMvMSDollmaster01_Dir;
  DD_MV_MS_DOLLMASTER_02_DIR?: DDMvMSDollmaster02_Dir;
  DD_MV_MS_DOLLMASTER_02_EXT?: DDMvMSDollmaster02_EXT;
  DD_MV_MS_DOLLMASTER_03_DIR?: DDMvMSDollmaster03_Dir;
  DD_MV_MS_DOLLMASTER_03_EXT?: DDMvMSDollmaster03_EXT;
  DD_MV_MS_ERADICATOR_01_DIR?: DDMvMSEradicator01_Dir;
  DD_MV_MS_ERADICATOR_02_DIR?: DDMvMSEradicator02_Dir;
  DD_MV_MS_ERADICATOR_03_DIR?: DDMvMSEradicator03_Dir;
  DD_MV_MS_TOAD_01_DIR?: DDMvMSToad01_Dir;
  DD_MV_MS_TOAD_02_DIR?: DDMvMSToad02_Dir;
  DD_MV_MS_TOAD_03_DIR?: DDMvMSToad03_Dir;
  DD_MV_MS_TOAD_03_EXT?: DDMvMSToad03_EXT;
  DD_MV_MS_WEREWOLF_01_DIR?: DDMvMSWerewolf01_Dir;
  DD_MV_MS_WEREWOLF_02_DIR?: DDMvMSWerewolf02_Dir;
  DD_MV_MS_WEREWOLF_03_DIR?: DDMvMSWerewolf03_Dir;
  DD_MV_MS_WEREWOLF_03_EXT?: DDMvMSWerewolf03_EXT;
  DD_MV_TN_CHEERLEADER_01_DIR?: DDMvTnCheerleader01_Dir;
  DD_MV_TN_CHEERLEADER_01_EXT?: DDMvTnCheerleader01_EXT;
  DD_MV_TN_CHEERLEADER_02_DIR?: DDMvTnCheerleader02_Dir;
  DD_MV_TN_CHEERLEADER_02_EXT?: DDMvTnCheerleader02_EXT;
  DD_MV_TN_CHEERLEADER_03_DIR?: DDMvTnCheerleader03_Dir;
  DD_MV_TN_CHEERLEADER_03_EXT?: DDMvTnCheerleader03_EXT;
  DD_MV_TN_JOCK_01_DIR?: DDMvTnJock01_Dir;
  DD_MV_TN_JOCK_01_EXT?: DDMvTnJock01_EXT;
  DD_MV_TN_JOCK_02_DIR?: DDMvTnJock02_Dir;
  DD_MV_TN_JOCK_02_EXT?: DDMvTnJock02_EXT;
  DD_MV_TN_JOCK_03_DIR?: DDMvTnJock03_Dir;
  DD_MV_TN_JOCK_03_EXT?: DDMvTnJock03_EXT;
  DD_MV_TN_NERD_01_DIR?: DDMvTnNerd01_Dir;
  DD_MV_TN_NERD_01_EXT?: DDMvTnNerd01_EXT;
  DD_MV_TN_NERD_02_DIR?: DDMvTnNerd02_Dir;
  DD_MV_TN_NERD_02_EXT?: DDMvTnNerd02_EXT;
  DD_MV_TN_NERD_03_DIR?: DDMvTnNerd03_Dir;
  DD_MV_TN_NERD_03_EXT?: DDMvTnNerd03_EXT;
  DD_MV_TN_NERD_03_STD?: DDMvTnNerd03_Std;
  DD_MV_TN_OUTSIDER_01_DIR?: DDMvTnOutsider01_Dir;
  DD_MV_TN_OUTSIDER_01_EXT?: DDMvTnOutsider01_EXT;
  DD_MV_TN_OUTSIDER_02_DIR?: DDMvTnOutsider02_Dir;
  DD_MV_TN_OUTSIDER_02_EXT?: DDMvTnOutsider02_EXT;
  DD_MV_TN_OUTSIDER_03_DIR?: DDMvTnOutsider03_Dir;
  DD_MV_TN_OUTSIDER_03_EXT?: DDMvTnOutsider03_EXT;
  DD_MV_TN_PUNK_01_DIR?: DDMvTnPunk01_Dir;
  DD_MV_TN_PUNK_01_EXT?: DDMvTnPunk01_EXT;
  DD_MV_TN_PUNK_02_DIR?: DDMvTnPunk02_Dir;
  DD_MV_TN_PUNK_02_EXT?: DDMvTnPunk02_EXT;
  DD_MV_TN_PUNK_03_DIR?: DDMvTnPunk03_Dir;
  DD_MV_TN_PUNK_03_EXT?: DDMvTnPunk03_EXT;
  DD_MV_TN_PUNK_03_STD?: DDMvTnPunk03_Std;
  DD_MV_TN_VIRGIN_01_DIR?: DDMvTnVirgin01_Dir;
  DD_MV_TN_VIRGIN_01_EXT?: DDMvTnVirgin01_EXT;
  DD_MV_TN_VIRGIN_02_DIR?: DDMvTnVirgin02_Dir;
  DD_MV_TN_VIRGIN_02_EXT?: DDMvTnVirgin02_EXT;
  DD_MV_TN_VIRGIN_03_DIR?: DDMvTnVirgin03_Dir;
  DD_MV_TN_VIRGIN_03_EXT?: DDMvTnVirgin03_EXT;
  DD_MV_TN_VIRGIN_03_STD?: DDMvTnVirgin03_Std;
  DD_MV_MS_ANOMALY_01_DIR?: DDMvMSAnomaly01_Dir;
  DD_MV_MS_ANOMALY_01_EXT?: DDMvMSAnomaly01_EXT;
  DD_MV_MS_ANOMALY_02_DIR?: DDMvMSAnomaly02_Dir;
  DD_MV_MS_ANOMALY_02_EXT?: DDMvMSAnomaly02_EXT;
  DD_MV_MS_ANOMALY_02_STD?: DDMvMSAnomaly02_Std;
  DD_MV_MS_ANOMALY_03_DIR?: DDMvMSAnomaly03_Dir;
  DD_MV_MS_ANOMALY_03_EXT?: DDMvMSAnomaly03_EXT;
  DD_MV_MS_ANOMALY_03_STD?: DDMvMSAnomaly03_Std;
}

interface DDMvLtdEvilneverdiesDir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVLTDEVILNEVERDIESDIRScenesBySceneID;
}

interface DDMVLTDEVILNEVERDIESDIRScenesBySceneID {
  DD_MV_LTD_EVILNEVERDIES_DIR_S01?: DDMvLtdEvilneverdiesS01;
  DD_MV_LTD_EVILNEVERDIES_DIR_S02?: DDMvLtdEvilneverdiesDirS02;
  DD_MV_LTD_EVILNEVERDIES_DIR_S03?: DDMvLtdEvilneverdiesDirS03;
  DD_MV_LTD_EVILNEVERDIES_DIR_S04?: DDMvLtdEvilneverdiesDirS04;
  DD_MV_LTD_EVILNEVERDIES_DIR_S05?: DDMvLtdEvilneverdiesDirS05;
  DD_MV_LTD_EVILNEVERDIES_DIR_S06?: DDMvLtdEvilneverdiesDirS06;
}

interface DDMvLtdEvilneverdiesS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents {
  MET_MatchSurvived?: METCNTVanquishedEvilClass;
}

interface METCNTVanquishedEvilClass {
  goalValue?: number;
  goalCount?: number;
}

interface DDMvLtdEvilneverdiesDirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESDIRS02ProgressionEvents {
  MET_CNT_EffigyRecharges?: METCNTVanquishedEvilClass;
}

interface DDMvLtdEvilneverdiesDirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESDIRS03ProgressionEvents {
  MET_CNT_DisarmKnockdowns?: METCNTVanquishedEvilClass;
}

interface DDMvLtdEvilneverdiesDirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESDIRS04ProgressionEvents {
  MET_CNT_HitTeenShortlyAfterTransform?: METCNTVanquishedEvilClass;
  MET_CNT_HitTeenShortlyAfterFailedStation?: METCNTVanquishedEvilClass;
  MET_CNT_HitTeenShortlyAfterReturn?: METCNTVanquishedEvilClass;
}

interface DDMvLtdEvilneverdiesDirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESDIRS05ProgressionEvents {
  MET_REQ_FinalScore?: METCNTVanquishedEvilClass;
}

interface DDMvLtdEvilneverdiesDirS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESENTEVISSTDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents {
  MET_MatchCompleted?: METCNTVanquishedEvilClass;
}

interface DDMvLtdEvilneverdiesEXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVLTDEVILNEVERDIESEXTScenesBySceneID;
}

interface DDMVLTDEVILNEVERDIESEXTScenesBySceneID {
  DD_MV_LTD_EVILNEVERDIES_EXT_S01?: DDMvLtdEvilneverdiesS01;
  DD_MV_LTD_EVILNEVERDIES_EXT_S02?: DDMvLtdEvilneverdiesEXTS02;
  DD_MV_LTD_EVILNEVERDIES_EXT_S03?: DDMvLtdEvilneverdiesEXTS03;
  DD_MV_LTD_EVILNEVERDIES_EXT_S04?: DDMvLtdEvilneverdiesEXTS04;
  DD_MV_LTD_EVILNEVERDIES_EXT_S05?: DDMvLtdEvilneverdiesEXTS05;
  DD_MV_LTD_EVILNEVERDIES_EXT_S06?: DDMvLtdEvilneverdiesEXTS06;
}

interface DDMvLtdEvilneverdiesEXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESEXTS02ProgressionEvents {
  MET_CNT_Knockdowns?: METCNTVanquishedEvilClass;
}

interface DDMvLtdEvilneverdiesEXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESEXTS03ProgressionEvents {
  MET_REQ_HitTeensInMatch?: METCNTVanquishedEvilClass;
  MET_CNT_HitRevealedTeen?: METCNTVanquishedEvilClass;
  MET_CNT_HitSubduedTeen?: METCNTVanquishedEvilClass;
}

interface DDMvLtdEvilneverdiesEXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESEXTS04ProgressionEvents {
  MET_EffigyStart_Any?: METCNTVanquishedEvilClass;
}

interface DDMvLtdEvilneverdiesEXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESEXTS05ProgressionEvents {
  MET_CNT_HitTeenWhenEnraged?: METCNTVanquishedEvilClass;
}

interface DDMvLtdEvilneverdiesEXTS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS03RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDEVILNEVERDIESEXTS06ProgressionEvents {
  MET_PointBoost_Any?: METCNTVanquishedEvilClass;
}

interface DDMvLtdSpectrecollectorDir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVLTDSPECTRECOLLECTORDIRScenesBySceneID;
}

interface DDMVLTDSPECTRECOLLECTORDIRScenesBySceneID {
  DD_MV_LTD_SPECTRECOLLECTOR_DIR_S01?: DDMvLtdSpectrecollectorS01;
  DD_MV_LTD_SPECTRECOLLECTOR_DIR_S02?: DDMvLtdSpectrecollectorDirS02;
  DD_MV_LTD_SPECTRECOLLECTOR_DIR_S03?: DDMvLtdSpectrecollectorDirS03;
  DD_MV_LTD_SPECTRECOLLECTOR_DIR_S04?: DDMvLtdSpectrecollectorDirS04;
  DD_MV_LTD_SPECTRECOLLECTOR_DIR_S05?: DDMvLtdSpectrecollectorDirS05;
  DD_MV_LTD_SPECTRECOLLECTOR_DIR_S06?: DDMvLtdSpectrecollectorDirS06;
}

interface DDMvLtdSpectrecollectorS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMvLtdSpectrecollectorDirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTORDIRS02ProgressionEvents {
  MET_CNT_DarkShardsClaimedByTeens?: METCNTVanquishedEvilClass;
}

interface DDMvLtdSpectrecollectorDirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTORDIRS03ProgressionEvents {
  MET_CNT_VanquishedEvil?: METCNTVanquishedEvilClass;
}

interface DDMvLtdSpectrecollectorDirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTORDIRS04ProgressionEvents {
  MET_CNT_ResurrectUsed?: METCNTVanquishedEvilClass;
}

interface DDMvLtdSpectrecollectorDirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvLtdSpectrecollectorDirS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDSPECTRECOLLECTORDIRS06RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTORDIRS06RequiredEvents {
  MET_PlayingAsAnyTeen?: number;
  MET_NoTeenPerks?: number;
}

interface DDMvLtdSpectrecollectorEXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVLTDSPECTRECOLLECTOREXTScenesBySceneID;
}

interface DDMVLTDSPECTRECOLLECTOREXTScenesBySceneID {
  DD_MV_LTD_SPECTRECOLLECTOR_EXT_S01?: DDMvLtdSpectrecollectorS01;
  DD_MV_LTD_SPECTRECOLLECTOR_EXT_S02?: DDMvLtdSpectrecollectorEXTS02;
  DD_MV_LTD_SPECTRECOLLECTOR_EXT_S03?: DDMvLtdSpectrecollectorEXTS03;
  DD_MV_LTD_SPECTRECOLLECTOR_EXT_S04?: DDMvLtdSpectrecollectorEXTS04;
  DD_MV_LTD_SPECTRECOLLECTOR_EXT_S05?: DDMvLtdSpectrecollectorEXTS05;
  DD_MV_LTD_SPECTRECOLLECTOR_EXT_S06?: DDMvLtdSpectrecollectorEXTS06;
}

interface DDMvLtdSpectrecollectorEXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTOREXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTOREXTS02ProgressionEvents {
  MET_CNT_CraftMinigamesPerfect?: METCNTVanquishedEvilClass;
}

interface DDMvLtdSpectrecollectorEXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTOREXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTOREXTS03ProgressionEvents {
  MET_CNT_StunnedEvil?: METCNTVanquishedEvilClass;
  MET_CNT_WoundedEvil?: METCNTVanquishedEvilClass;
}

interface DDMvLtdSpectrecollectorEXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTOREXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTOREXTS04ProgressionEvents {
  MET_CNT_VendingMachineSearched?: METCNTVanquishedEvilClass;
  MET_CNT_WastebasketSearched?: METCNTVanquishedEvilClass;
  MET_CNT_LockboxSearched?: METCNTVanquishedEvilClass;
}

interface DDMvLtdSpectrecollectorEXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvLtdSpectrecollectorEXTS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS05RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTOREXTS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVLTDSPECTRECOLLECTOREXTS06ProgressionEvents {
  MET_CNT_GavePills?: METCNTVanquishedEvilClass;
}

interface DDMvMSAnomaly01_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSANOMALY01_DIRScenesBySceneID;
}

interface DDMVMSANOMALY01_DIRScenesBySceneID {
  DD_MV_MS_ANOMALY_01_DIR_S01?: DDMvMSAnomaly01_DirS01;
  DD_MV_MS_ANOMALY_01_DIR_S02?: DDMvMSAnomaly01_DirS02;
  DD_MV_MS_ANOMALY_01_DIR_S03?: DDMvMSAnomaly01_DirS03;
  DD_MV_MS_ANOMALY_01_DIR_S04?: DDMvMSAnomaly01_DirS04;
  DD_MV_MS_ANOMALY_01_DIR_S05?: DDMvMSAnomaly0;
}

interface DDMvMSAnomaly01_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY01_DIRS01RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_OneRankThreePerk?: number;
}

interface DDMvMSAnomaly01_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_DIRS02RequiredEvents;
  progressionEvents?: DDMVMSANOMALY01_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY01_DIRS02ProgressionEvents {
  MET_CNT_BecomeEnraged?: METCNTVanquishedEvilClass;
}

interface DDMVMSANOMALY01_DIRS02RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_REQ_Perk_FeastDrainEssence?: number;
}

interface DDMvMSAnomaly01_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_DIRS03RequiredEvents;
  progressionEvents?: DDMVMSANOMALY01_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY01_DIRS03ProgressionEvents {
  MET_CNT_AnomalyDisperseAttack?: METCNTVanquishedEvilClass;
}

interface DDMVMSANOMALY01_DIRS03RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_REQ_Perk_Anomaly_Disperse_03?: number;
}

interface DDMvMSAnomaly01_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY01_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY01_DIRS04ProgressionEvents {
  MET_SpawnStart_Any?: METCNTVanquishedEvilClass;
}

interface DDMvMSAnomaly0 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSAnomaly01_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSANOMALY01_EXTScenesBySceneID;
}

interface DDMVMSANOMALY01_EXTScenesBySceneID {
  DD_MV_MS_ANOMALY_01_EXT_S01?: DDMvMSAnomaly01_EXTS01;
  DD_MV_MS_ANOMALY_01_EXT_S02?: DDMvMSAnomaly01_EXTS02;
  DD_MV_MS_ANOMALY_01_EXT_S03?: DDMvMSAnomaly01_EXTS03;
  DD_MV_MS_ANOMALY_01_EXT_S04?: DDMvMSAnomaly01_EXTS04;
  DD_MV_MS_ANOMALY_01_EXT_S05?: DDMvMSAnomaly01_EXTS05;
}

interface DDMvMSAnomaly01_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSAnomaly01_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_DIRS02RequiredEvents;
  progressionEvents?: DDMVMSANOMALY01_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY01_EXTS02ProgressionEvents {
  MET_CNT_MsecsFeasting?: METCNTVanquishedEvilClass;
}

interface DDMvMSAnomaly01_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_EXTS03RequiredEvents;
  progressionEvents?: DDMVMSANOMALY01_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY01_EXTS03ProgressionEvents {
  MET_CNT_AnomalyDisperseEscape?: METCNTVanquishedEvilClass;
}

interface DDMVMSANOMALY01_EXTS03RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_REQ_Perk_Anomaly_Disperse_02?: number;
}

interface DDMvMSAnomaly01_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY01_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY01_EXTS04ProgressionEvents {
  MET_CNT_ScreamAffectsMany?: METCNTVanquishedEvilClass;
}

interface DDMvMSAnomaly01_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY01_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY01_EXTS05ProgressionEvents {
  MET_CNT_TeensHit?: METCNTVanquishedEvilClass;
}

interface DDMvMSAnomaly02_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSANOMALY02_DIRScenesBySceneID;
}

interface DDMVMSANOMALY02_DIRScenesBySceneID {
  DD_MV_MS_ANOMALY_02_DIR_S01?: DDMvMSAnomaly02_DirS01;
  DD_MV_MS_ANOMALY_02_DIR_S02?: DDMvMSAnomaly02_DirS02;
  DD_MV_MS_ANOMALY_02_DIR_S03?: DDMvMSAnomaly02_DirS03;
  DD_MV_MS_ANOMALY_02_DIR_S04?: DDMvMSAnomaly02_DirS04;
  DD_MV_MS_ANOMALY_02_DIR_S05?: DDMvMSAnomaly02__;
}

interface DDMvMSAnomaly02_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY02_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY02_DIRS01RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_TwoRankThreePerks?: number;
}

interface DDMvMSAnomaly02_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY02_DIRS02RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY02_DIRS02ProgressionEvents {
  MET_CNT_HitRevealedTeen?: METCNTVanquishedEvilClass;
}

interface DDMVMSANOMALY02_DIRS02RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_REQ_Perk_HealSense?: number;
}

interface DDMvMSAnomaly02_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY02_DIRS03RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY02_DIRS03ProgressionEvents {
  MET_CNT_AnomalyMimicryUses?: METCNTVanquishedEvilClass;
}

interface DDMVMSANOMALY02_DIRS03RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_REQ_Perk_Anomaly_Mimicry_03?: number;
}

interface DDMvMSAnomaly02_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY02_DIRS04ProgressionEvents {
  MET_CNT_HitTeenShortlyAfterTransform?: METCNTVanquishedEvilClass;
}

interface DDMvMSAnomaly02__ {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_DIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY02_DIRS05ProgressionEvents {
  MET_CNT_VendingMachineHitByEvil?: METCNTVanquishedEvilClass;
}

interface DDMvMSAnomaly02_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSANOMALY02_EXTScenesBySceneID;
}

interface DDMVMSANOMALY02_EXTScenesBySceneID {
  DD_MV_MS_ANOMALY_02_EXT_S01?: DDMvMSAnomaly02_EXTS01;
  DD_MV_MS_ANOMALY_02_EXT_S02?: DDMvMSAnomaly02_EXTS02;
  DD_MV_MS_ANOMALY_02_EXT_S03?: DDMvMSAnomaly02_EXTS03;
  DD_MV_MS_ANOMALY_02_EXT_S04?: DDMvMSAnomaly02_EXTS04;
  DD_MV_MS_ANOMALY_02_EXT_S05?: DDMvMSAnomaly02_EXTS05;
}

interface DDMvMSAnomaly02_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY02_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY02_EXTS01RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_OneRankTwoPerk?: number;
}

interface DDMvMSAnomaly02_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY02_DIRS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSAnomaly02_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY02_EXTS03RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY02_EXTS03ProgressionEvents {
  MET_CNT_AnomalyMimicryAttack?: METCNTVanquishedEvilClass;
}

interface DDMVMSANOMALY02_EXTS03RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_REQ_Perk_Anomaly_Mimicry_02?: number;
}

interface DDMvMSAnomaly02_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY02_EXTS04ProgressionEvents {
  MET_CNT_EvilEnteredChase?: METCNTVanquishedEvilClass;
}

interface DDMvMSAnomaly02_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY02_EXTS05ProgressionEvents {
  MET_CNT_RevengeHitTeen?: METCNTVanquishedEvilClass;
}

interface DDMvMSAnomaly02_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSANOMALY02_STDScenesBySceneID;
}

interface DDMVMSANOMALY02_STDScenesBySceneID {
  DD_MV_MS_ANOMALY_02_STD_S01?: DDMvMSAnomaly02_StdS01;
  DD_MV_MS_ANOMALY_02_STD_S02?: DDMvMSAnomaly02_StdS02;
  DD_MV_MS_ANOMALY_02_STD_S03?: DDMvMSAnomaly02_StdS03;
  DD_MV_MS_ANOMALY_02_STD_S04?: DDMvMSAnomaly02_StdS04;
  DD_MV_MS_ANOMALY_02_STD_S05?: DDMvMSAnomaly02_StdS05;
  DD_MV_MS_ANOMALY_02_STD_S06?: DDMvMSAnomaly02_StdS06;
  DD_MV_MS_ANOMALY_02_STD_S07?: DDMvMSAnomaly02__;
  DD_MV_MS_ANOMALY_02_STD_S08?: DDMvMSAnomaly02_StdS08;
  DD_MV_MS_ANOMALY_02_STD_S09?: DDMvMSAnomaly0;
  DD_MV_MS_ANOMALY_02_STD_S10?: DDMvMSAnomaly02_StdS10;
}

interface DDMvMSAnomaly02_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY02_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY02_STDS01RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_OneRankOnePerk?: number;
}

interface DDMvMSAnomaly02_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY02_STDS02RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_STDS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY02_STDS02ProgressionEvents {
  MET_CNT_AnomalyDisperseGooped?: METCNTVanquishedEvilClass;
}

interface DDMVMSANOMALY02_STDS02RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_REQ_Perk_Anomaly_Disperse_01?: number;
}

interface DDMvMSAnomaly02_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSAnomaly02_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSAnomaly02_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY01_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSAnomaly02_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSAnomaly02_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY02_STDS08ProgressionEvents {
  MET_CNT_AnomalyScourAttack?: METCNTVanquishedEvilClass;
}

interface DDMvMSAnomaly02_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSAnomaly03_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSANOMALY03_DIRScenesBySceneID;
}

interface DDMVMSANOMALY03_DIRScenesBySceneID {
  DD_MV_MS_ANOMALY_03_DIR_S01?: DDMvMSAnomaly03_DirS01;
  DD_MV_MS_ANOMALY_03_DIR_S02?: DDMvMSAnomaly03_DirS02;
  DD_MV_MS_ANOMALY_03_DIR_S03?: DDMvMSAnomaly03_DirS03;
  DD_MV_MS_ANOMALY_03_DIR_S04?: DDMvMSAnomaly03_DirS04;
  DD_MV_MS_ANOMALY_03_DIR_S05?: DDMvMSAnomaly03_DirS05;
}

interface DDMvMSAnomaly03_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY03_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY03_DIRS01RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_ThreeRankThreePerks?: number;
}

interface DDMvMSAnomaly03_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY03_DIRS02RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY03_DIRS02ProgressionEvents {
  MET_CNT_HitTeenShortlyAfterReturn?: METCNTVanquishedEvilClass;
}

interface DDMVMSANOMALY03_DIRS02RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_REQ_Perk_IncorporealMaster?: number;
}

interface DDMvMSAnomaly03_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY03_DIRS03RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_STDS08ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY03_DIRS03RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_REQ_Perk_Anomaly_Scour_03?: number;
}

interface DDMvMSAnomaly03_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY03_DIRS04ProgressionEvents {
  MET_CNT_HitTeenShortlyAfterFailedStation?: METCNTVanquishedEvilClass;
}

interface DDMvMSAnomaly03_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY03_DIRS05RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY03_DIRS05RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_NoEvilPerks?: number;
}

interface DDMvMSAnomaly03_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSANOMALY03_EXTScenesBySceneID;
}

interface DDMVMSANOMALY03_EXTScenesBySceneID {
  DD_MV_MS_ANOMALY_03_EXT_S01?: DDMvMSAnomaly03_EXTS01;
  DD_MV_MS_ANOMALY_03_EXT_S02?: DDMvMSAnomaly03_EXTS02;
  DD_MV_MS_ANOMALY_03_EXT_S03?: DDMvMSAnomaly03_EXTS03;
  DD_MV_MS_ANOMALY_03_EXT_S04?: DDMvMSAnomaly03_EXTS04;
  DD_MV_MS_ANOMALY_03_EXT_S05?: DDMvMSAnomaly03__;
}

interface DDMvMSAnomaly03_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY03_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY03_EXTS01RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_TwoRankTwoPerks?: number;
}

interface DDMvMSAnomaly03_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY03_DIRS02RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY03_EXTS02ProgressionEvents {
  MET_CNT_HitSubduedTeen?: METCNTVanquishedEvilClass;
}

interface DDMvMSAnomaly03_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY03_EXTS03RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY03_EXTS03ProgressionEvents {
  MET_CNT_AnomalyScourUses?: METCNTVanquishedEvilClass;
}

interface DDMVMSANOMALY03_EXTS03RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_REQ_Perk_Anomaly_Scour_02?: number;
}

interface DDMvMSAnomaly03_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY03_EXTS04ProgressionEvents {
  MET_REQ_HitTeensInMatch?: METCNTVanquishedEvilClass;
}

interface DDMvMSAnomaly03__ {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY03_EXTS05ProgressionEvents {
  MET_REQ_BrutalityScore?: METCNTVanquishedEvilClass;
}

interface DDMvMSAnomaly03_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSANOMALY03_STDScenesBySceneID;
}

interface DDMVMSANOMALY03_STDScenesBySceneID {
  DD_MV_MS_ANOMALY_03_STD_S01?: DDMvMSAnomaly03__;
  DD_MV_MS_ANOMALY_03_STD_S02?: DDMvMSAnomaly03_StdS02;
  DD_MV_MS_ANOMALY_03_STD_S03?: DDMvMSAnomaly03_StdS03;
  DD_MV_MS_ANOMALY_03_STD_S04?: DDMvMSAnomaly03_StdS04;
  DD_MV_MS_ANOMALY_03_STD_S05?: DDMvMSAnomaly03_StdS05;
  DD_MV_MS_ANOMALY_03_STD_S06?: DDMvMSAnomaly03_StdS06;
  DD_MV_MS_ANOMALY_03_STD_S07?: DDMvMSAnomaly03_StdS07;
  DD_MV_MS_ANOMALY_03_STD_S08?: DDMvMSAnomaly03_StdS08;
  DD_MV_MS_ANOMALY_03_STD_S09?: DDMvMSAnomaly03_StdS09;
  DD_MV_MS_ANOMALY_03_STD_S10?: DDMvMSAnomaly03_StdS10;
}

interface DDMvMSAnomaly03_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY03_STDS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY03_STDS02RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_TwoRankOnePerks?: number;
}

interface DDMvMSAnomaly03_StdS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY03_STDS03RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY03_STDS03RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_REQ_Perk_Anomaly_Mimicry_01?: number;
}

interface DDMvMSAnomaly03_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY03_STDS04RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_STDS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY03_STDS04ProgressionEvents {
  MET_CNT_AnomalyScourExpose?: METCNTVanquishedEvilClass;
}

interface DDMVMSANOMALY03_STDS04RequiredEvents {
  MET_PlayingAsAnomaly?: number;
  MET_REQ_Perk_Anomaly_Scour_01?: number;
}

interface DDMvMSAnomaly03_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY03_STDS05ProgressionEvents {
  MET_CNT_RarePrizesUsed?: METCNTVanquishedEvilClass;
}

interface DDMvMSAnomaly03_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_STDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY03_STDS06ProgressionEvents {
  MET_PickupStarve_Any?: METCNTVanquishedEvilClass;
}

interface DDMvMSAnomaly03_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSAnomaly03_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSAnomaly03_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSAnomaly03_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSANOMALY01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_STDS10ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSANOMALY03_STDS10ProgressionEvents {
  MET_CNT_HitTeenWhileDarkShardRevealed?: METCNTVanquishedEvilClass;
}

interface DDMvMSDollmaster01_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSDOLLMASTER01_DIRScenesBySceneID;
}

interface DDMVMSDOLLMASTER01_DIRScenesBySceneID {
  DD_MV_MS_DOLLMASTER_01_DIR_S01?: DDMvMSDollmaster01_DirS01;
  DD_MV_MS_DOLLMASTER_01_DIR_S02?: DDMvMSDollmaster01_DirS02;
  DD_MV_MS_DOLLMASTER_01_DIR_S03?: DDMvMSDollmaster01_DirS03;
  DD_MV_MS_DOLLMASTER_01_DIR_S04?: DDMvMSDollmaster01_DirS04;
  DD_MV_MS_DOLLMASTER_01_DIR_S05?: DDMvMSDollmaster01_DirS05;
}

interface DDMvMSDollmaster01_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER01_DIRS01RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_OneRankThreePerk?: number;
}

interface DDMvMSDollmaster01_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_EXTS02RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster01_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_DIRS03RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER01_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER01_DIRS03ProgressionEvents {
  MET_CNT_DollTrapAttackAfterTrigger?: METCNTVanquishedEvilClass;
}

interface DDMVMSDOLLMASTER01_DIRS03RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_REQ_Perk_DollMaster_Trap_TripPersist?: number;
}

interface DDMvMSDollmaster01_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster01_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY01_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster02_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSDOLLMASTER02_DIRScenesBySceneID;
}

interface DDMVMSDOLLMASTER02_DIRScenesBySceneID {
  DD_MV_MS_DOLLMASTER_02_DIR_S01?: DDMvMSDollmaster02_DirS01;
  DD_MV_MS_DOLLMASTER_02_DIR_S02?: DDMvMSDollmaster02_DirS02;
  DD_MV_MS_DOLLMASTER_02_DIR_S03?: DDMvMSDollmaster02_DirS03;
  DD_MV_MS_DOLLMASTER_02_DIR_S04?: DDMvMSDollmaster02_DirS04;
  DD_MV_MS_DOLLMASTER_02_DIR_S05?: DDMvMSDollmaster02___S05;
}

interface DDMvMSDollmaster02_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER02_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER02_DIRS01RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_TwoRankThreePerks?: number;
}

interface DDMvMSDollmaster02_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER02_DIRS02RequiredEvents;
  progressionEvents?: DDMVMSANOMALY01_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER02_DIRS02RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_REQ_Perk_HideSense?: number;
}

interface DDMvMSDollmaster02_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER02_DIRS03RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER02_DIRS03ProgressionEvents {
  MET_CNT_DollSummonLeapKnockdown?: METCNTVanquishedEvilClass;
}

interface DDMVMSDOLLMASTER02_DIRS03RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_REQ_Perk_DollMaster_Summon_ExtraJumps?: number;
}

interface DDMvMSDollmaster02_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster02___S05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster02_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSDOLLMASTER02_EXTScenesBySceneID;
}

interface DDMVMSDOLLMASTER02_EXTScenesBySceneID {
  DD_MV_MS_DOLLMASTER_02_EXT_S01?: DDMvMSDollmaster02_EXTS01;
  DD_MV_MS_DOLLMASTER_02_EXT_S02?: DDMvMSDollmaster02_EXTS02;
  DD_MV_MS_DOLLMASTER_02_EXT_S03?: DDMvMSDollmaster02_EXTS03;
  DD_MV_MS_DOLLMASTER_02_EXT_S04?: DDMvMSDollmaster02_EXTS04;
  DD_MV_MS_DOLLMASTER_02_EXT_S05?: DDMvMSDollmaster02___S05;
  DD_MV_MS_DOLLMASTER_02_EXT_S06?: DDMvMSDollmaster02_EXTS06;
}

interface DDMvMSDollmaster02_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER02_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER02_EXTS01RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_OneRankTwoPerk?: number;
}

interface DDMvMSDollmaster02_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER02_DIRS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster02_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER02_EXTS03RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER02_EXTS03ProgressionEvents {
  MET_CNT_DollSummonUses?: METCNTVanquishedEvilClass;
}

interface DDMVMSDOLLMASTER02_EXTS03RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_REQ_Perk_DollMaster_Summon_JumpRefresh?: number;
}

interface DDMvMSDollmaster02_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER02_EXTS04ProgressionEvents {
  MET_CNT_DarkShardsClaimed?: METCNTVanquishedEvilClass;
}

interface DDMvMSDollmaster02_EXTS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_EXTS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER02_EXTS06ProgressionEvents {
  MET_CNT_DollTeleportAttack?: METCNTVanquishedEvilClass;
}

interface DDMvMSDollmaster03_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSDOLLMASTER03_DIRScenesBySceneID;
}

interface DDMVMSDOLLMASTER03_DIRScenesBySceneID {
  DD_MV_MS_DOLLMASTER_03_DIR_S01?: DDMvMSDollmaster03_DirS01;
  DD_MV_MS_DOLLMASTER_03_DIR_S02?: DDMvMSDollmaster03_DirS02;
  DD_MV_MS_DOLLMASTER_03_DIR_S03?: DDMvMSDollmaster03_DirS03;
  DD_MV_MS_DOLLMASTER_03_DIR_S04?: DDMvMSDollmaster03_DirS04;
  DD_MV_MS_DOLLMASTER_03_DIR_S05?: DDMvMSDollmaster03_DirS05;
}

interface DDMvMSDollmaster03_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER03_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER03_DIRS01RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_ThreeRankThreePerks?: number;
}

interface DDMvMSDollmaster03_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER03_DIRS02RequiredEvents;
  progressionEvents?: DDMVMSANOMALY01_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER03_DIRS02RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_REQ_Perk_EvilPickupUseReveal?: number;
}

interface DDMvMSDollmaster03_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER03_DIRS03RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER03_DIRS03ProgressionEvents {
  MET_CNT_DollTeleportUses?: METCNTVanquishedEvilClass;
}

interface DDMVMSDOLLMASTER03_DIRS03RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_REQ_Perk_DollMaster_Teleport_HitRefresh?: number;
}

interface DDMvMSDollmaster03_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster03_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER03_DIRS05RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER03_DIRS05RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_NoEvilPerks?: number;
}

interface DDMvMSDollmaster03_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSDOLLMASTER03_EXTScenesBySceneID;
}

interface DDMVMSDOLLMASTER03_EXTScenesBySceneID {
  DD_MV_MS_DOLLMASTER_03_EXT_S01?: DDMvMSDollmaster03_EXTS01;
  DD_MV_MS_DOLLMASTER_03_EXT_S02?: DDMvMSDollmaster03_EXTS02;
  DD_MV_MS_DOLLMASTER_03_EXT_S03?: DDMvMSDollmaster03_EXTS03;
  DD_MV_MS_DOLLMASTER_03_EXT_S04?: DDMvMSDollmaster03_EXTS04;
  DD_MV_MS_DOLLMASTER_03_EXT_S05?: DDMvMSDollmaster03_EXTS05;
}

interface DDMvMSDollmaster03_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER03_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER03_EXTS01RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_TwoRankTwoPerks?: number;
}

interface DDMvMSDollmaster03_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER03_DIRS02RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_STDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster03_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER03_EXTS03RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER03_EXTS03RequiredEvents {
  MET_PlayingAsDollMaster?: number;
  MET_REQ_Perk_DollMaster_Teleport_DoubleTeleport?: number;
}

interface DDMvMSDollmaster03_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSDollmaster03_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSDOLLMASTER01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER03_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSDOLLMASTER03_EXTS05ProgressionEvents {
  MET_REQ_TormentScore?: METCNTVanquishedEvilClass;
}

interface DDMvMSEradicator01_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSERADICATOR01_DIRScenesBySceneID;
}

interface DDMVMSERADICATOR01_DIRScenesBySceneID {
  DD_MV_MS_ERADICATOR_01_DIR_S01?: DDMvMSEradicator01_DirS01;
  DD_MV_MS_ERADICATOR_01_DIR_S02?: DDMvMSEradicator01_DirS02;
  DD_MV_MS_ERADICATOR_01_DIR_S03?: DDMvMSEradicator01_DirS03;
  DD_MV_MS_ERADICATOR_01_DIR_S04?: DDMvMSEradicator01_DirS04;
  DD_MV_MS_ERADICATOR_01_DIR_S05?: DDMvMSEradicator01_DirS05;
}

interface DDMvMSEradicator01_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR01_DIRS01RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_OneRankThreePerk?: number;
}

interface DDMvMSEradicator01_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS02RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator01_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_DIRS03RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR01_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR01_DIRS03ProgressionEvents {
  MET_CNT_EradicatorModeSwapUses?: METCNTVanquishedEvilClass;
}

interface DDMVMSERADICATOR01_DIRS03RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_REQ_Perk_Eradicator_ModeSwap_FastSurgeCooldown?: number;
}

interface DDMvMSEradicator01_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY01_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator01_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator02_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSERADICATOR02_DIRScenesBySceneID;
}

interface DDMVMSERADICATOR02_DIRScenesBySceneID {
  DD_MV_MS_ERADICATOR_02_DIR_S01?: DDMvMSEradicator02_DirS01;
  DD_MV_MS_ERADICATOR_02_DIR_S02?: DDMvMSEradicator02_DirS02;
  DD_MV_MS_ERADICATOR_02_DIR_S03?: DDMvMSEradicator02_DirS03;
  DD_MV_MS_ERADICATOR_02_DIR_S04?: DDMvMSEradicator02_DirS04;
  DD_MV_MS_ERADICATOR_02_DIR_S05?: DDMvMSEradicator02_DirS05;
}

interface DDMvMSEradicator02_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR02_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR02_DIRS01RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_TwoRankThreePerks?: number;
}

interface DDMvMSEradicator02_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR02_EXTS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator02_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR02_DIRS03RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR02_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR02_DIRS03ProgressionEvents {
  MET_CNT_EradicatorSurgeUses?: METCNTVanquishedEvilClass;
}

interface DDMVMSERADICATOR02_DIRS03RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_REQ_Perk_Eradicator_ElectricSurge_ExtraSurge?: number;
}

interface DDMvMSEradicator02_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator02_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator03_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSERADICATOR03_DIRScenesBySceneID;
}

interface DDMVMSERADICATOR03_DIRScenesBySceneID {
  DD_MV_MS_ERADICATOR_03_DIR_S01?: DDMvMSEradicator03_DirS01;
  DD_MV_MS_ERADICATOR_03_DIR_S02?: DDMvMSEradicator03_DirS02;
  DD_MV_MS_ERADICATOR_03_DIR_S03?: DDMvMSEradicator03_DirS03;
  DD_MV_MS_ERADICATOR_03_DIR_S04?: DDMvMSEradicator03_DirS04;
  DD_MV_MS_ERADICATOR_03_DIR_S05?: DDMvMSEradicator03_DirS05;
}

interface DDMvMSEradicator03_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR03_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR03_DIRS01RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_OnlyThreePerks?: number;
}

interface DDMvMSEradicator03_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR03_EXTS02RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator03_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR03_DIRS03RequiredEvents;
  progressionEvents?: DDMVMSERADICATOR03_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR03_DIRS03ProgressionEvents {
  MET_CNT_EradicatorModeSwapAttack?: METCNTVanquishedEvilClass;
}

interface DDMVMSERADICATOR03_DIRS03RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_REQ_Perk_Eradicator_ScannerBeam_FastMoving?: number;
}

interface DDMvMSEradicator03_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR01_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSEradicator03_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSERADICATOR03_DIRS05RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSERADICATOR03_DIRS05RequiredEvents {
  MET_PlayingAsEradicator?: number;
  MET_NoEvilPerks?: number;
}

interface DDMvMSToad01_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSTOAD01_DIRScenesBySceneID;
}

interface DDMVMSTOAD01_DIRScenesBySceneID {
  DD_MV_MS_TOAD_01_DIR_S01?: DDMvMSToad01_DirS01;
  DD_MV_MS_TOAD_01_DIR_S02?: DDMvMSToad01_DirS02;
  DD_MV_MS_TOAD_01_DIR_S03?: DDMvMSToad01_DirS03;
  DD_MV_MS_TOAD_01_DIR_S04?: DDMvMSToad01_DirS04;
  DD_MV_MS_TOAD_01_DIR_S05?: DDMvMSToad01_DirS05;
}

interface DDMvMSToad01_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD01_DIRS01RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_OneRankThreePerk?: number;
}

interface DDMvMSToad01_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad01_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_DIRS03RequiredEvents;
  progressionEvents?: DDMVMSTOAD01_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD01_DIRS03ProgressionEvents {
  MET_CNT_ToadLeapAttack?: METCNTVanquishedEvilClass;
}

interface DDMVMSTOAD01_DIRS03RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_REQ_Perk_Toad_Leap_FastCooldown?: number;
}

interface DDMvMSToad01_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad01_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad02_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSTOAD02_DIRScenesBySceneID;
}

interface DDMVMSTOAD02_DIRScenesBySceneID {
  DD_MV_MS_TOAD_02_DIR_S01?: DDMvMSToad02_DirS01;
  DD_MV_MS_TOAD_02_DIR_S02?: DDMvMSToad02_DirS02;
  DD_MV_MS_TOAD_02_DIR_S03?: DDMvMSToad02_DirS03;
  DD_MV_MS_TOAD_02_DIR_S04?: DDMvMSToad02_DirS04;
  DD_MV_MS_TOAD_02_DIR_S05?: DDMvMSToad02_DirS05;
}

interface DDMvMSToad02_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD02_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD02_DIRS01RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_TwoRankThreePerks?: number;
}

interface DDMvMSToad02_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD02_EXTS02RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad02_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD02_DIRS03RequiredEvents;
  progressionEvents?: DDMVMSTOAD02_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD02_DIRS03ProgressionEvents {
  MET_CNT_AcidArmorUses?: METCNTVanquishedEvilClass;
}

interface DDMVMSTOAD02_DIRS03RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_REQ_Perk_Toad_AcidArmor_HitBonus?: number;
}

interface DDMvMSToad02_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad02_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSDOLLMASTER02_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad03_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSTOAD03_DIRScenesBySceneID;
}

interface DDMVMSTOAD03_DIRScenesBySceneID {
  DD_MV_MS_TOAD_03_DIR_S01?: DDMvMSToad03_DirS01;
  DD_MV_MS_TOAD_03_DIR_S02?: DDMvMSToad03_DirS02;
  DD_MV_MS_TOAD_03_DIR_S03?: DDMvMSToad03_DirS03;
  DD_MV_MS_TOAD_03_DIR_S04?: DDMvMSToad03_DirS04;
  DD_MV_MS_TOAD_03_DIR_S05?: DDMvMSToad03_DirS05;
}

interface DDMvMSToad03_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD03_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD03_DIRS01RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_OnlyThreePerks?: number;
}

interface DDMvMSToad03_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD03_DIRS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD03_DIRS02RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_REQ_Perk_CrowdReveal?: number;
}

interface DDMvMSToad03_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD03_DIRS03RequiredEvents;
  progressionEvents?: DDMVMSTOAD03_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD03_DIRS03ProgressionEvents {
  MET_CNT_EcholocationAttack?: METCNTVanquishedEvilClass;
}

interface DDMVMSTOAD03_DIRS03RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_REQ_Perk_Toad_Echolocation_Deafen?: number;
}

interface DDMvMSToad03_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSTOAD03_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD03_DIRS04ProgressionEvents {
  MET_CNT_AcidArmorAttack?: METCNTVanquishedEvilClass;
}

interface DDMvMSToad03_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD03_DIRS05RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD03_DIRS05RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_NoEvilPerks?: number;
}

interface DDMvMSToad03_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSTOAD03_EXTScenesBySceneID;
}

interface DDMVMSTOAD03_EXTScenesBySceneID {
  DD_MV_MS_TOAD_03_EXT_S01?: DDMvMSToad03_EXTS01;
  DD_MV_MS_TOAD_03_EXT_S02?: DDMvMSToad03_EXTS02;
  DD_MV_MS_TOAD_03_EXT_S03?: DDMvMSToad03_EXTS03;
  DD_MV_MS_TOAD_03_EXT_S04?: DDMvMSToad03_EXTS04;
  DD_MV_MS_TOAD_03_EXT_S05?: DDMvMSToad03_EXTS05;
}

interface DDMvMSToad03_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD03_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD03_EXTS01RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_TwoRankTwoPerks?: number;
}

interface DDMvMSToad03_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD03_DIRS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad03_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD03_EXTS03RequiredEvents;
  progressionEvents?: DDMVMSTOAD03_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD03_EXTS03ProgressionEvents {
  MET_CNT_EcholocationUses?: METCNTVanquishedEvilClass;
}

interface DDMVMSTOAD03_EXTS03RequiredEvents {
  MET_PlayingAsToad?: number;
  MET_REQ_Perk_Toad_Echolocation_EchoCloneMotion?: number;
}

interface DDMvMSToad03_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSToad03_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSTOAD01_EXTS01RequiredEvents;
  progressionEvents?: DDMVMSTOAD03_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSTOAD03_EXTS05ProgressionEvents {
  MET_REQ_PursuitScore?: METCNTVanquishedEvilClass;
}

interface DDMvMSWerewolf01_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSWEREWOLF01_DIRScenesBySceneID;
}

interface DDMVMSWEREWOLF01_DIRScenesBySceneID {
  DD_MV_MS_WEREWOLF_01_DIR_S01?: DDMvMSWerewolf01_DirS01;
  DD_MV_MS_WEREWOLF_01_DIR_S02?: DDMvMSWerewolf01_DirS02;
  DD_MV_MS_WEREWOLF_01_DIR_S03?: DDMvMSWerewolf01_DirS03;
  DD_MV_MS_WEREWOLF_01_DIR_S04?: DDMvMSWerewolf01_DirS04;
  DD_MV_MS_WEREWOLF_01_DIR_S05?: DDMvMSWerewolf01_DirS05;
}

interface DDMvMSWerewolf01_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF01_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF01_DIRS01RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_OneRankThreePerk?: number;
}

interface DDMvMSWerewolf01_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF01_EXTS02RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf01_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF01_DIRS03RequiredEvents;
  progressionEvents?: DDMVMSWEREWOLF01_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF01_DIRS03ProgressionEvents {
  MET_CNT_HowlCowers?: METCNTVanquishedEvilClass;
}

interface DDMVMSWEREWOLF01_DIRS03RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_REQ_Perk_Werewolf_Howl_Reaction?: number;
}

interface DDMvMSWerewolf01_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf01_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf02_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSWEREWOLF02_DIRScenesBySceneID;
}

interface DDMVMSWEREWOLF02_DIRScenesBySceneID {
  DD_MV_MS_WEREWOLF_02_DIR_S01?: DDMvMSWerewolf02_DirS01;
  DD_MV_MS_WEREWOLF_02_DIR_S02?: DDMvMSWerewolf02_DirS02;
  DD_MV_MS_WEREWOLF_02_DIR_S03?: DDMvMSWerewolf02_DirS03;
  DD_MV_MS_WEREWOLF_02_DIR_S04?: DDMvMSWerewolf02_DirS04;
  DD_MV_MS_WEREWOLF_02_DIR_S05?: DDMvMSWerewolf02_DirS05;
}

interface DDMvMSWerewolf02_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF02_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF02_DIRS01RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_TwoRankThreePerks?: number;
}

interface DDMvMSWerewolf02_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF02_EXTS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf02_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF02_DIRS03RequiredEvents;
  progressionEvents?: DDMVMSWEREWOLF02_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF02_DIRS03ProgressionEvents {
  MET_CNT_BerserkUses?: METCNTVanquishedEvilClass;
}

interface DDMVMSWEREWOLF02_DIRS03RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_REQ_Perk_Werewolf_Berserk_HitPersist?: number;
}

interface DDMvMSWerewolf02_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSANOMALY02_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf02_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf03_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSWEREWOLF03_DIRScenesBySceneID;
}

interface DDMVMSWEREWOLF03_DIRScenesBySceneID {
  DD_MV_MS_WEREWOLF_03_DIR_S01?: DDMvMSWerewolf03_DirS01;
  DD_MV_MS_WEREWOLF_03_DIR_S02?: DDMvMSWerewolf03_DirS02;
  DD_MV_MS_WEREWOLF_03_DIR_S03?: DDMvMSWerewolf03_DirS03;
  DD_MV_MS_WEREWOLF_03_DIR_S04?: DDMvMSWerewolf03_DirS04;
  DD_MV_MS_WEREWOLF_03_DIR_S05?: DDMvMSWerewolf03_DirS05;
}

interface DDMvMSWerewolf03_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF03_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF03_DIRS01RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_ThreeRankThreePerks?: number;
}

interface DDMvMSWerewolf03_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF03_DIRS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF03_DIRS02RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_REQ_Perk_ProneReveal?: number;
}

interface DDMvMSWerewolf03_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF03_DIRS03RequiredEvents;
  progressionEvents?: DDMVMSWEREWOLF03_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF03_DIRS03ProgressionEvents {
  MET_CNT_SenseAttack?: METCNTVanquishedEvilClass;
}

interface DDMVMSWEREWOLF03_DIRS03RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_REQ_Perk_Werewolf_Sense_Toggle?: number;
}

interface DDMvMSWerewolf03_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf03_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF03_DIRS05RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF03_DIRS05RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_NoEvilPerks?: number;
}

interface DDMvMSWerewolf03_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVMSWEREWOLF03_EXTScenesBySceneID;
}

interface DDMVMSWEREWOLF03_EXTScenesBySceneID {
  DD_MV_MS_WEREWOLF_03_EXT_S01?: DDMvMSWerewolf03_EXTS01;
  DD_MV_MS_WEREWOLF_03_EXT_S02?: DDMvMSWerewolf03_EXTS02;
  DD_MV_MS_WEREWOLF_03_EXT_S03?: DDMvMSWerewolf03_EXTS03;
  DD_MV_MS_WEREWOLF_03_EXT_S04?: DDMvMSWerewolf03_EXTS04;
  DD_MV_MS_WEREWOLF_03_EXT_S05?: DDMvMSWerewolf03_EXTS05;
}

interface DDMvMSWerewolf03_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF03_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF03_EXTS01RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_TwoRankTwoPerks?: number;
}

interface DDMvMSWerewolf03_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF03_DIRS02RequiredEvents;
  progressionEvents?: DDMVMSANOMALY01_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf03_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVMSWEREWOLF03_EXTS03RequiredEvents;
  progressionEvents?: DDMVMSWEREWOLF03_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVMSWEREWOLF03_EXTS03RequiredEvents {
  MET_PlayingAsWerewolf?: number;
  MET_REQ_Perk_Werewolf_Sense_MarkTeen?: number;
}

interface DDMvMSWerewolf03_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvMSWerewolf03_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTDTWOFEETUNDERSTDS07RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader01_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNCHEERLEADER01_DIRScenesBySceneID;
}

interface DDMVTNCHEERLEADER01_DIRScenesBySceneID {
  DD_MV_TN_CHEERLEADER_01_DIR_S01?: DDMvTnCheerleader01_DirS01;
  DD_MV_TN_CHEERLEADER_01_DIR_S02?: DDMvTnCheerleader01_DirS02;
  DD_MV_TN_CHEERLEADER_01_DIR_S03?: DDMvTnCheerleader01_DirS03;
  DD_MV_TN_CHEERLEADER_01_DIR_S04?: DDMvTnCheerleader01_DirS04;
  DD_MV_TN_CHEERLEADER_01_DIR_S05?: DDMvTnCheerleader01_DirS05;
}

interface DDMvTnCheerleader01_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER01_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER01_DIRS01RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_OneRankThreeSupportPerk?: number;
}

interface DDMvTnCheerleader01_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER01_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER01_DIRS02ProgressionEvents {
  MET_CNT_PlayerHealAssists?: METCNTVanquishedEvilClass;
}

interface DDMVTNCHEERLEADER01_DIRS02RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_REQ_Perk_Motivator?: number;
}

interface DDMvTnCheerleader01_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER01_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER01_DIRS03ProgressionEvents {
  MET_CNT_StunWithParchment?: METCNTVanquishedEvilClass;
}

interface DDMVTNCHEERLEADER01_DIRS03RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_REQ_Perk_Parchment_Any?: number;
}

interface DDMvTnCheerleader01_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER01_DIRS04ProgressionEvents {
  MET_REQ_WeaponTypesCrafted?: METCNTVanquishedEvilClass;
}

interface DDMvTnCheerleader01_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader01_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNCHEERLEADER01_EXTScenesBySceneID;
}

interface DDMVTNCHEERLEADER01_EXTScenesBySceneID {
  DD_MV_TN_CHEERLEADER_01_EXT_S01?: DDMvTnCheerleader01_EXTS01;
  DD_MV_TN_CHEERLEADER_01_EXT_S02?: DDMvTnCheerleader01_EXTS02;
  DD_MV_TN_CHEERLEADER_01_EXT_S03?: DDMvTnCheerleader01_EXTS03;
  DD_MV_TN_CHEERLEADER_01_EXT_S04?: DDMvTnCheerleader01_EXTS04;
  DD_MV_TN_CHEERLEADER_01_EXT_S05?: DDMvTnCheerleader01_EXTS05;
}

interface DDMvTnCheerleader01_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader01_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER01_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER01_EXTS02ProgressionEvents {
  MET_CNT_MsecsHealingOthers?: METCNTVanquishedEvilClass;
}

interface DDMvTnCheerleader01_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER01_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER01_EXTS03ProgressionEvents {
  MET_CNT_CraftFlamethrower?: METCNTVanquishedEvilClass;
}

interface DDMVTNCHEERLEADER01_EXTS03RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_REQ_Perk_Flamethrower_Any?: number;
}

interface DDMvTnCheerleader01_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTOREXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader01_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER01_EXTS05ProgressionEvents {
  MET_CNT_GaveNoisemaker?: METCNTVanquishedEvilClass;
}

interface DDMvTnCheerleader02_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNCHEERLEADER02_DIRScenesBySceneID;
}

interface DDMVTNCHEERLEADER02_DIRScenesBySceneID {
  DD_MV_TN_CHEERLEADER_02_DIR_S01?: DDMvTnCheerleader02_DirS01;
  DD_MV_TN_CHEERLEADER_02_DIR_S02?: DDMvTnCheerleader02_DirS02;
  DD_MV_TN_CHEERLEADER_02_DIR_S03?: DDMvTnCheerleader02_DirS03;
  DD_MV_TN_CHEERLEADER_02_DIR_S04?: DDMvTnCheerleader02_DirS04;
  DD_MV_TN_CHEERLEADER_02_DIR_S05?: DDMvTnCheerleader02_DirS05;
}

interface DDMvTnCheerleader02_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER02_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER02_DIRS01RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_TwoRankThreeSupportPerks?: number;
}

interface DDMvTnCheerleader02_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER02_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER02_DIRS02ProgressionEvents {
  MET_CNT_StunnedEvil?: METCNTVanquishedEvilClass;
}

interface DDMVTNCHEERLEADER02_DIRS02RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_REQ_Perk_Spry?: number;
}

interface DDMvTnCheerleader02_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER02_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER02_DIRS03ProgressionEvents {
  MET_CNT_MsecsDamageFlameMine?: METCNTVanquishedEvilClass;
}

interface DDMVTNCHEERLEADER02_DIRS03RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_REQ_Perk_FlameMine_Any?: number;
}

interface DDMvTnCheerleader02_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER02_DIRS04ProgressionEvents {
  MET_CNT_PickupsUsed?: METCNTVanquishedEvilClass;
}

interface DDMvTnCheerleader02_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_DIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER02_DIRS05ProgressionEvents {
  MET_MapVote_Any?: METCNTVanquishedEvilClass;
}

interface DDMvTnCheerleader02_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNCHEERLEADER02_EXTScenesBySceneID;
}

interface DDMVTNCHEERLEADER02_EXTScenesBySceneID {
  DD_MV_TN_CHEERLEADER_02_EXT_S01?: DDMvTnCheerleader02_EXTS01;
  DD_MV_TN_CHEERLEADER_02_EXT_S02?: DDMvTnCheerleader02_EXTS02;
  DD_MV_TN_CHEERLEADER_02_EXT_S03?: DDMvTnCheerleader02_EXTS03;
  DD_MV_TN_CHEERLEADER_02_EXT_S04?: DDMvTnCheerleader02_EXTS04;
  DD_MV_TN_CHEERLEADER_02_EXT_S05?: DDMvTnCheerleader02_EXTS05;
}

interface DDMvTnCheerleader02_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER02_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER02_EXTS01RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_OneRankTwoSupportPerk?: number;
}

interface DDMvTnCheerleader02_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER02_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER02_EXTS02ProgressionEvents {
  MET_CNT_MsecsChased?: METCNTVanquishedEvilClass;
}

interface DDMvTnCheerleader02_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER02_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER02_EXTS03ProgressionEvents {
  MET_CNT_MsecsDamageSlingshot?: METCNTVanquishedEvilClass;
}

interface DDMVTNCHEERLEADER02_EXTS03RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_REQ_Perk_Slingshot_Any?: number;
}

interface DDMvTnCheerleader02_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER02_EXTS04ProgressionEvents {
  MET_PickupStash_Any?: METCNTVanquishedEvilClass;
}

interface DDMvTnCheerleader02_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader03_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNCHEERLEADER03_DIRScenesBySceneID;
}

interface DDMVTNCHEERLEADER03_DIRScenesBySceneID {
  DD_MV_TN_CHEERLEADER_03_DIR_S01?: DDMvTnCheerleader03_DirS01;
  DD_MV_TN_CHEERLEADER_03_DIR_S02?: DDMvTnCheerleader03_DirS02;
  DD_MV_TN_CHEERLEADER_03_DIR_S03?: DDMvTnCheerleader03_DirS03;
  DD_MV_TN_CHEERLEADER_03_DIR_S04?: DDMvTnCheerleader03_DirS04;
  DD_MV_TN_CHEERLEADER_03_DIR_S05?: DDMvTnCheerleader03_DirS05;
}

interface DDMvTnCheerleader03_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER03_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER03_DIRS01RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_ThreeRankThreeSupportPerks?: number;
}

interface DDMvTnCheerleader03_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER03_DIRS02RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER03_DIRS02RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_REQ_Perk_TeenVision?: number;
}

interface DDMvTnCheerleader03_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER03_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER03_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER03_DIRS03ProgressionEvents {
  MET_CNT_WoundWithTalisman?: METCNTVanquishedEvilClass;
}

interface DDMVTNCHEERLEADER03_DIRS03RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_REQ_Perk_Talisman_Any?: number;
}

interface DDMvTnCheerleader03_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnCheerleader03_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER03_DIRS05RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER03_DIRS05RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_NoTeenPerks?: number;
}

interface DDMvTnCheerleader03_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNCHEERLEADER03_EXTScenesBySceneID;
}

interface DDMVTNCHEERLEADER03_EXTScenesBySceneID {
  DD_MV_TN_CHEERLEADER_03_EXT_S01?: DDMvTnCheerleader03_EXTS01;
  DD_MV_TN_CHEERLEADER_03_EXT_S02?: DDMvTnCheerleader03_EXTS02;
  DD_MV_TN_CHEERLEADER_03_EXT_S03?: DDMvTnCheerleader03_EXTS03;
  DD_MV_TN_CHEERLEADER_03_EXT_S04?: DDMvTnCheerleader03_EXTS04;
  DD_MV_TN_CHEERLEADER_03_EXT_S05?: DDMvTnCheerleader03_EXTS05;
}

interface DDMvTnCheerleader03_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER03_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER03_EXTS01RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_TwoRankTwoSupportPerks?: number;
}

interface DDMvTnCheerleader03_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER03_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER03_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER03_EXTS02ProgressionEvents {
  MET_CNT_HitWithWeapon?: METCNTVanquishedEvilClass;
}

interface DDMvTnCheerleader03_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNCHEERLEADER03_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER03_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER03_EXTS03ProgressionEvents {
  MET_CNT_WoundWithCopter?: METCNTVanquishedEvilClass;
}

interface DDMVTNCHEERLEADER03_EXTS03RequiredEvents {
  MET_PlayingAsCheerleader?: number;
  MET_REQ_Perk_Copter_Any?: number;
}

interface DDMvTnCheerleader03_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER03_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER03_EXTS04ProgressionEvents {
  MET_CNT_WeaponsCrafted?: METCNTVanquishedEvilClass;
}

interface DDMvTnCheerleader03_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS09RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER03_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNCHEERLEADER03_EXTS05ProgressionEvents {
  MET_REQ_CoopScore?: METCNTVanquishedEvilClass;
}

interface DDMvTnJock01_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNJOCK01_DIRScenesBySceneID;
}

interface DDMVTNJOCK01_DIRScenesBySceneID {
  DD_MV_TN_JOCK_01_DIR_S01?: DDMvTnJock01_DirS01;
  DD_MV_TN_JOCK_01_DIR_S02?: DDMvTnJock01_DirS02;
  DD_MV_TN_JOCK_01_DIR_S03?: DDMvTnJock01_DirS03;
  DD_MV_TN_JOCK_01_DIR_S04?: DDMvTnJock01_DirS04;
  DD_MV_TN_JOCK_01_DIR_S05?: DDMvTnJock01_DirS05;
}

interface DDMvTnJock01_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK01_DIRS01RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_OneRankThreeToughnessPerk?: number;
}

interface DDMvTnJock01_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK01_DIRS02RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_REQ_Perk_Hardy?: number;
}

interface DDMvTnJock01_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER03_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK01_DIRS03RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_REQ_Perk_Copter_Any?: number;
}

interface DDMvTnJock01_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock01_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_DIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK01_DIRS05ProgressionEvents {
  MET_CNT_CommonPrizesUsed?: METCNTVanquishedEvilClass;
}

interface DDMvTnJock01_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNJOCK01_EXTScenesBySceneID;
}

interface DDMVTNJOCK01_EXTScenesBySceneID {
  DD_MV_TN_JOCK_01_EXT_S01?: DDMvTnJock01_EXTS01;
  DD_MV_TN_JOCK_01_EXT_S02?: DDMvTnJock01_EXTS02;
  DD_MV_TN_JOCK_01_EXT_S03?: DDMvTnJock01_EXTS03;
  DD_MV_TN_JOCK_01_EXT_S04?: DDMvTnJock01_EXTS04;
  DD_MV_TN_JOCK_01_EXT_S05?: DDMvTnJock01_EXTS05;
}

interface DDMvTnJock01_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock01_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER03_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock01_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK01_EXTS03ProgressionEvents {
  MET_CNT_MsecsDamageDemonSword?: METCNTVanquishedEvilClass;
}

interface DDMVTNJOCK01_EXTS03RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_REQ_Perk_DemonSword_Any?: number;
}

interface DDMvTnJock01_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK01_EXTS04ProgressionEvents {
  MET_CNT_CraftMinigamesSuccess?: METCNTVanquishedEvilClass;
}

interface DDMvTnJock01_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock02_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNJOCK02_DIRScenesBySceneID;
}

interface DDMVTNJOCK02_DIRScenesBySceneID {
  DD_MV_TN_JOCK_02_DIR_S01?: DDMvTnJock02_DirS01;
  DD_MV_TN_JOCK_02_DIR_S02?: DDMvTnJock02_DirS02;
  DD_MV_TN_JOCK_02_DIR_S03?: DDMvTnJock02_DirS03;
  DD_MV_TN_JOCK_02_DIR_S04?: DDMvTnJock02_DirS04;
  DD_MV_TN_JOCK_02_DIR_S05?: DDMvTnJock02_DirS05;
}

interface DDMvTnJock02_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK02_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK02_DIRS01RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_TwoRankThreeToughnessPerks?: number;
}

interface DDMvTnJock02_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK02_DIRS02RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK02_DIRS02RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_REQ_Perk_SlowDying?: number;
}

interface DDMvTnJock02_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK02_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNJOCK02_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK02_DIRS03ProgressionEvents {
  MET_CNT_MsecsChargingTalisman?: METCNTVanquishedEvilClass;
}

interface DDMVTNJOCK02_DIRS03RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_REQ_Perk_Talisman_Any?: number;
}

interface DDMvTnJock02_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK02_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK02_DIRS04ProgressionEvents {
  MET_CNT_WoundWithBurn?: METCNTVanquishedEvilClass;
}

interface DDMvTnJock02_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK02_DIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK02_DIRS05ProgressionEvents {
  MET_CNT_NoisemakerActivated?: METCNTVanquishedEvilClass;
}

interface DDMvTnJock02_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNJOCK02_EXTScenesBySceneID;
}

interface DDMVTNJOCK02_EXTScenesBySceneID {
  DD_MV_TN_JOCK_02_EXT_S01?: DDMvTnJock02_EXTS01;
  DD_MV_TN_JOCK_02_EXT_S02?: DDMvTnJock02_EXTS02;
  DD_MV_TN_JOCK_02_EXT_S03?: DDMvTnJock02_EXTS03;
  DD_MV_TN_JOCK_02_EXT_S04?: DDMvTnJock02_EXTS04;
  DD_MV_TN_JOCK_02_EXT_S05?: DDMvTnJock02_EXTS05;
}

interface DDMvTnJock02_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK02_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK02_EXTS01RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_OneRankTwoToughnessPerk?: number;
}

interface DDMvTnJock02_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK02_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNJOCK02_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK02_EXTS02ProgressionEvents {
  MET_CNT_PillsUsed?: METCNTVanquishedEvilClass;
}

interface DDMvTnJock02_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK02_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNJOCK02_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK02_EXTS03ProgressionEvents {
  MET_CNT_HitWithMolotov?: METCNTVanquishedEvilClass;
}

interface DDMVTNJOCK02_EXTS03RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_REQ_Perk_Molotov_Any?: number;
}

interface DDMvTnJock02_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock02_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK02_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK02_EXTS05ProgressionEvents {
  MET_CNT_StunWithOccult?: METCNTVanquishedEvilClass;
}

interface DDMvTnJock03_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNJOCK03_DIRScenesBySceneID;
}

interface DDMVTNJOCK03_DIRScenesBySceneID {
  DD_MV_TN_JOCK_03_DIR_S01?: DDMvTnJock03_DirS01;
  DD_MV_TN_JOCK_03_DIR_S02?: DDMvTnJock03_DirS02;
  DD_MV_TN_JOCK_03_DIR_S03?: DDMvTnJock03_DirS03;
  DD_MV_TN_JOCK_03_DIR_S04?: DDMvTnJock03_DirS04;
  DD_MV_TN_JOCK_03_DIR_S05?: DDMvTnJock03_DirS05;
}

interface DDMvTnJock03_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK03_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK03_DIRS01RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_ThreeRankThreeToughnessPerks?: number;
}

interface DDMvTnJock03_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK03_DIRS02RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK03_DIRS02RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_REQ_Perk_KeepWeapon?: number;
}

interface DDMvTnJock03_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK03_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNJOCK03_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK03_DIRS03ProgressionEvents {
  MET_CNT_WoundWithStaticShield?: METCNTVanquishedEvilClass;
}

interface DDMVTNJOCK03_DIRS03RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_REQ_Perk_StaticShield_Any?: number;
}

interface DDMvTnJock03_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTOREXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock03_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK03_DIRS05RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK03_DIRS05RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_NoTeenPerks?: number;
}

interface DDMvTnJock03_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNJOCK03_EXTScenesBySceneID;
}

interface DDMVTNJOCK03_EXTScenesBySceneID {
  DD_MV_TN_JOCK_03_EXT_S01?: DDMvTnJock03_EXTS01;
  DD_MV_TN_JOCK_03_EXT_S02?: DDMvTnJock03_EXTS02;
  DD_MV_TN_JOCK_03_EXT_S03?: DDMvTnJock03_EXTS03;
  DD_MV_TN_JOCK_03_EXT_S04?: DDMvTnJock03_EXTS04;
  DD_MV_TN_JOCK_03_EXT_S05?: DDMvTnJock03_EXTS05;
}

interface DDMvTnJock03_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK03_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK03_EXTS01RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_TwoRankTwoToughnessPerks?: number;
}

interface DDMvTnJock03_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK03_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER03_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock03_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK03_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNJOCK03_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK03_EXTS03ProgressionEvents {
  MET_CNT_StunWithSlingshot?: METCNTVanquishedEvilClass;
}

interface DDMVTNJOCK03_EXTS03RequiredEvents {
  MET_PlayingAsJock?: number;
  MET_REQ_Perk_Slingshot_Any?: number;
}

interface DDMvTnJock03_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnJock03_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNJOCK01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK03_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNJOCK03_EXTS05ProgressionEvents {
  MET_REQ_GritScore?: METCNTVanquishedEvilClass;
}

interface DDMvTnNerd01_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNNERD01_DIRScenesBySceneID;
}

interface DDMVTNNERD01_DIRScenesBySceneID {
  DD_MV_TN_NERD_01_DIR_S01?: DDMvTnNerd01_DirS01;
  DD_MV_TN_NERD_01_DIR_S02?: DDMvTnNerd01_DirS02;
  DD_MV_TN_NERD_01_DIR_S03?: DDMvTnNerd01_DirS03;
  DD_MV_TN_NERD_01_DIR_S04?: DDMvTnNerd01_DirS04;
  DD_MV_TN_NERD_01_DIR_S05?: DDMvTnNerd01_DirS05;
}

interface DDMvTnNerd01_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD01_DIRS01RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_OneRankThreeExpertisePerk?: number;
}

interface DDMvTnNerd01_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNNERD01_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD01_DIRS02ProgressionEvents {
  MET_CNT_CraftOccult?: METCNTVanquishedEvilClass;
}

interface DDMVTNNERD01_DIRS02RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_REQ_Perk_Technician?: number;
}

interface DDMvTnNerd01_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNNERD01_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD01_DIRS03ProgressionEvents {
  MET_CNT_HitWithSlingshot?: METCNTVanquishedEvilClass;
}

interface DDMVTNNERD01_DIRS03RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_REQ_Perk_Slingshot_Any?: number;
}

interface DDMvTnNerd01_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY03_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd01_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd01_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNNERD01_EXTScenesBySceneID;
}

interface DDMVTNNERD01_EXTScenesBySceneID {
  DD_MV_TN_NERD_01_EXT_S01?: DDMvTnNerd01_EXTS01;
  DD_MV_TN_NERD_01_EXT_S02?: DDMvTnNerd01_EXTS02;
  DD_MV_TN_NERD_01_EXT_S03?: DDMvTnNerd01_EXTS03;
  DD_MV_TN_NERD_01_EXT_S04?: DDMvTnNerd01_EXTS04;
  DD_MV_TN_NERD_01_EXT_S05?: DDMvTnNerd01_EXTS05;
}

interface DDMvTnNerd01_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd01_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd01_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNNERD01_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD01_EXTS03ProgressionEvents {
  MET_CNT_StunWithRayGun?: METCNTVanquishedEvilClass;
}

interface DDMVTNNERD01_EXTS03RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_REQ_Perk_RayGun_Any?: number;
}

interface DDMvTnNerd01_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_DIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd01_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd02_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNNERD02_DIRScenesBySceneID;
}

interface DDMVTNNERD02_DIRScenesBySceneID {
  DD_MV_TN_NERD_02_DIR_S01?: DDMvTnNerd02_DirS01;
  DD_MV_TN_NERD_02_DIR_S02?: DDMvTnNerd02_DirS02;
  DD_MV_TN_NERD_02_DIR_S03?: DDMvTnNerd02_DirS03;
  DD_MV_TN_NERD_02_DIR_S04?: DDMvTnNerd02_DirS04;
  DD_MV_TN_NERD_02_DIR_S05?: DDMvTnNerd0;
}

interface DDMvTnNerd02_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD02_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD02_DIRS01RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_TwoRankThreeExpertisePerks?: number;
}

interface DDMvTnNerd02_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD02_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER03_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD02_DIRS02RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_REQ_Perk_CraftMaster?: number;
}

interface DDMvTnNerd02_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD02_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNNERD02_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD02_DIRS03ProgressionEvents {
  MET_CNT_StunWithStaticShield?: METCNTVanquishedEvilClass;
}

interface DDMVTNNERD02_DIRS03RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_REQ_Perk_StaticShield_Any?: number;
}

interface DDMvTnNerd02_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNNERD02_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD02_DIRS04ProgressionEvents {
  MET_CNT_AdrenalineUsed?: METCNTVanquishedEvilClass;
}

interface DDMvTnNerd0 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd02_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNNERD02_EXTScenesBySceneID;
}

interface DDMVTNNERD02_EXTScenesBySceneID {
  DD_MV_TN_NERD_02_EXT_S01?: DDMvTnNerd02_EXTS01;
  DD_MV_TN_NERD_02_EXT_S02?: DDMvTnNerd02_EXTS02;
  DD_MV_TN_NERD_02_EXT_S03?: DDMvTnNerd02_EXTS03;
  DD_MV_TN_NERD_02_EXT_S04?: DDMvTnNerd02_EXTS04;
  DD_MV_TN_NERD_02_EXT_S05?: DDMvTnNerd02_EXTS05;
}

interface DDMvTnNerd02_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD02_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD02_EXTS01RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_OneRankTwoExpertisePerk?: number;
}

interface DDMvTnNerd02_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD02_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNNERD02_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD02_EXTS02ProgressionEvents {
  MET_CNT_CraftBurn?: METCNTVanquishedEvilClass;
}

interface DDMvTnNerd02_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD02_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNNERD02_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD02_EXTS03ProgressionEvents {
  MET_CNT_WoundWithParchment?: METCNTVanquishedEvilClass;
}

interface DDMVTNNERD02_EXTS03RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_REQ_Perk_Parchment_Any?: number;
}

interface DDMvTnNerd02_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd02_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd03_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNNERD03_DIRScenesBySceneID;
}

interface DDMVTNNERD03_DIRScenesBySceneID {
  DD_MV_TN_NERD_03_DIR_S01?: DDMvTnNerd03_DirS01;
  DD_MV_TN_NERD_03_DIR_S02?: DDMvTnNerd03_DirS02;
  DD_MV_TN_NERD_03_DIR_S03?: DDMvTnNerd03_DirS03;
  DD_MV_TN_NERD_03_DIR_S04?: DDMvTnNerd03_DirS04;
  DD_MV_TN_NERD_03_DIR_S05?: DDMvTnNerd03_DirS05;
}

interface DDMvTnNerd03_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD03_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD03_DIRS01RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_ThreeRankThreeExpertisePerks?: number;
}

interface DDMvTnNerd03_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD03_DIRS02RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTOREXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD03_DIRS02RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_REQ_Perk_Multitasker?: number;
}

interface DDMvTnNerd03_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD03_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNNERD03_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD03_DIRS03ProgressionEvents {
  MET_CNT_WoundWithHolyStaff?: METCNTVanquishedEvilClass;
}

interface DDMVTNNERD03_DIRS03RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_REQ_Perk_HolyStaff_Any?: number;
}

interface DDMvTnNerd03_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd03_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD03_DIRS05RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD03_DIRS05RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_NoTeenPerks?: number;
}

interface DDMvTnNerd03_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNNERD03_EXTScenesBySceneID;
}

interface DDMVTNNERD03_EXTScenesBySceneID {
  DD_MV_TN_NERD_03_EXT_S01?: DDMvTnNerd03_EXTS01;
  DD_MV_TN_NERD_03_EXT_S02?: DDMvTnNerd03_EXTS02;
  DD_MV_TN_NERD_03_EXT_S03?: DDMvTnNerd03_EXTS03;
  DD_MV_TN_NERD_03_EXT_S04?: DDMvTnNerd03_EXTS04;
  DD_MV_TN_NERD_03_EXT_S05?: DDMvTnNerd03__;
}

interface DDMvTnNerd03_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD03_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD03_EXTS01RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_TwoRankTwoExpertisePerks?: number;
}

interface DDMvTnNerd03_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD03_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd03_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD03_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNNERD03_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD03_EXTS03ProgressionEvents {
  MET_CNT_MsecsDamageMolotov?: METCNTVanquishedEvilClass;
}

interface DDMVTNNERD03_EXTS03RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_REQ_Perk_Molotov_Any?: number;
}

interface DDMvTnNerd03_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNNERD03_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD03_EXTS04ProgressionEvents {
  MET_CNT_PlayerRevives?: METCNTVanquishedEvilClass;
}

interface DDMvTnNerd03__ {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNNERD03_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD03_EXTS05ProgressionEvents {
  MET_REQ_WeaponryScore?: METCNTVanquishedEvilClass;
}

interface DDMvTnNerd03_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNNERD03_STDScenesBySceneID;
}

interface DDMVTNNERD03_STDScenesBySceneID {
  DD_MV_TN_NERD_03_STD_S01?: DDMvTnNerd0;
  DD_MV_TN_NERD_03_STD_S02?: DDMvTnNerd03_StdS02;
  DD_MV_TN_NERD_03_STD_S03?: DDMvTnNerd03__;
  DD_MV_TN_NERD_03_STD_S04?: DDMvTnNerd03_StdS04;
  DD_MV_TN_NERD_03_STD_S05?: DDMvTnNerd03_StdS05;
  DD_MV_TN_NERD_03_STD_S06?: DDMvTnNerd03_StdS06;
  DD_MV_TN_NERD_03_STD_S07?: DDMvTnNerd03_StdS07;
  DD_MV_TN_NERD_03_STD_S08?: DDMvTnNerd03_StdS08;
  DD_MV_TN_NERD_03_STD_S09?: DDMvTnNerd03_StdS09;
  DD_MV_TN_NERD_03_STD_S10?: DDMvTnNerd03_StdS10;
}

interface DDMvTnNerd03_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd03_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD03_STDS04RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD03_STDS04RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_TwoRankOneExpertisePerks?: number;
}

interface DDMvTnNerd03_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD03_STDS05RequiredEvents;
  progressionEvents?: DDMVTNNERD03_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD03_STDS05ProgressionEvents {
  MET_CNT_MsecsDamageFlamethrower?: METCNTVanquishedEvilClass;
}

interface DDMVTNNERD03_STDS05RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_REQ_Perk_Flamethrower_Any?: number;
}

interface DDMvTnNerd03_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD03_STDS06RequiredEvents;
  progressionEvents?: DDMVTNNERD03_STDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD03_STDS06ProgressionEvents {
  MET_CNT_CraftCross?: METCNTVanquishedEvilClass;
}

interface DDMVTNNERD03_STDS06RequiredEvents {
  MET_PlayingAsNerd?: number;
  MET_REQ_Perk_Cross_Any?: number;
}

interface DDMvTnNerd03_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNNERD03_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNNERD03_STDS07ProgressionEvents {
  MET_CNT_WoundedEvil?: METCNTVanquishedEvilClass;
}

interface DDMvTnNerd03_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd03_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK02_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnNerd03_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNNERD01_STDS01RequiredEvents;
  progressionEvents?: DDMVMSANOMALY01_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider01_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNOUTSIDER01_DIRScenesBySceneID;
}

interface DDMVTNOUTSIDER01_DIRScenesBySceneID {
  DD_MV_TN_OUTSIDER_01_DIR_S01?: DDMvTnOutsider01_DirS01;
  DD_MV_TN_OUTSIDER_01_DIR_S02?: DDMvTnOutsider01_DirS02;
  DD_MV_TN_OUTSIDER_01_DIR_S03?: DDMvTnOutsider01_DirS03;
  DD_MV_TN_OUTSIDER_01_DIR_S04?: DDMvTnOutsider01_DirS04;
  DD_MV_TN_OUTSIDER_01_DIR_S05?: DDMvTnOutsider01_DirS05;
}

interface DDMvTnOutsider01_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER01_DIRS01RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_OneRankThreeStealthPerk?: number;
}

interface DDMvTnOutsider01_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER01_DIRS02RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_REQ_Perk_FailMaster?: number;
}

interface DDMvTnOutsider01_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNJOCK03_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER01_DIRS03RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_REQ_Perk_Slingshot_Any?: number;
}

interface DDMvTnOutsider01_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider01_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider01_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNOUTSIDER01_EXTScenesBySceneID;
}

interface DDMVTNOUTSIDER01_EXTScenesBySceneID {
  DD_MV_TN_OUTSIDER_01_EXT_S01?: DDMvTnOutsider01_EXTS01;
  DD_MV_TN_OUTSIDER_01_EXT_S02?: DDMvTnOutsider01_EXTS02;
  DD_MV_TN_OUTSIDER_01_EXT_S03?: DDMvTnOutsider01_EXTS03;
  DD_MV_TN_OUTSIDER_01_EXT_S04?: DDMvTnOutsider01_EXTS04;
  DD_MV_TN_OUTSIDER_01_EXT_S05?: DDMvTnOutsider01_EXTS05;
}

interface DDMvTnOutsider01_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider01_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER03_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider01_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNOUTSIDER01_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER01_EXTS03ProgressionEvents {
  MET_CNT_StunWithFlamethrower?: METCNTVanquishedEvilClass;
}

interface DDMVTNOUTSIDER01_EXTS03RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_REQ_Perk_Flamethrower_Any?: number;
}

interface DDMvTnOutsider01_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNOUTSIDER01_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER01_EXTS04ProgressionEvents {
  MET_CNT_GaveAdrenaline?: METCNTVanquishedEvilClass;
}

interface DDMvTnOutsider01_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNOUTSIDER01_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER01_EXTS05ProgressionEvents {
  MET_CNT_UncommonPrizesUsed?: METCNTVanquishedEvilClass;
}

interface DDMvTnOutsider02_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNOUTSIDER02_DIRScenesBySceneID;
}

interface DDMVTNOUTSIDER02_DIRScenesBySceneID {
  DD_MV_TN_OUTSIDER_02_DIR_S01?: DDMvTnOutsider02_DirS01;
  DD_MV_TN_OUTSIDER_02_DIR_S02?: DDMvTnOutsider02_DirS02;
  DD_MV_TN_OUTSIDER_02_DIR_S03?: DDMvTnOutsider02_DirS03;
  DD_MV_TN_OUTSIDER_02_DIR_S04?: DDMvTnOutsider02_DirS04;
  DD_MV_TN_OUTSIDER_02_DIR_S05?: DDMvTnOutsider02_DirS05;
}

interface DDMvTnOutsider02_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER02_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER02_DIRS01RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_TwoRankThreeStealthPerks?: number;
}

interface DDMvTnOutsider02_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER02_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER02_DIRS02RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_REQ_Perk_Augur?: number;
}

interface DDMvTnOutsider02_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER02_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNOUTSIDER02_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER02_DIRS03ProgressionEvents {
  MET_CNT_HitWithTalisman?: METCNTVanquishedEvilClass;
}

interface DDMVTNOUTSIDER02_DIRS03RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_REQ_Perk_Talisman_Any?: number;
}

interface DDMvTnOutsider02_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNOUTSIDER02_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER02_DIRS04ProgressionEvents {
  MET_CNT_ObjectsSearched?: METCNTVanquishedEvilClass;
}

interface DDMvTnOutsider02_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNNERD03_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider02_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNOUTSIDER02_EXTScenesBySceneID;
}

interface DDMVTNOUTSIDER02_EXTScenesBySceneID {
  DD_MV_TN_OUTSIDER_02_EXT_S01?: DDMvTnOutsider02_EXTS01;
  DD_MV_TN_OUTSIDER_02_EXT_S02?: DDMvTnOutsider02_EXTS02;
  DD_MV_TN_OUTSIDER_02_EXT_S03?: DDMvTnOutsider02_EXTS03;
  DD_MV_TN_OUTSIDER_02_EXT_S04?: DDMvTnOutsider02_EXTS04;
  DD_MV_TN_OUTSIDER_02_EXT_S05?: DDMvTnOutsider02_EXTS05;
}

interface DDMvTnOutsider02_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER02_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER02_EXTS01RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_OneRankTwoStealthPerk?: number;
}

interface DDMvTnOutsider02_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER02_DIRS02RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider02_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER02_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNJOCK02_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER02_EXTS03RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_REQ_Perk_Molotov_Any?: number;
}

interface DDMvTnOutsider02_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNNERD02_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider02_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider03_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNOUTSIDER03_DIRScenesBySceneID;
}

interface DDMVTNOUTSIDER03_DIRScenesBySceneID {
  DD_MV_TN_OUTSIDER_03_DIR_S01?: DDMvTnOutsider03_DirS01;
  DD_MV_TN_OUTSIDER_03_DIR_S02?: DDMvTnOutsider03_DirS02;
  DD_MV_TN_OUTSIDER_03_DIR_S03?: DDMvTnOutsider03_DirS03;
  DD_MV_TN_OUTSIDER_03_DIR_S04?: DDMvTnOutsider03_DirS04;
  DD_MV_TN_OUTSIDER_03_DIR_S05?: DDMvTnOutsider03_DirS05;
}

interface DDMvTnOutsider03_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER03_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER03_DIRS01RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_ThreeRankThreeStealthPerks?: number;
}

interface DDMvTnOutsider03_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER03_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER03_DIRS02RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_REQ_Perk_CrouchMaster?: number;
}

interface DDMvTnOutsider03_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER03_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER03_DIRS03RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_REQ_Perk_FlameMine_Any?: number;
}

interface DDMvTnOutsider03_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTOREXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider03_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER03_DIRS05RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER03_DIRS05RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_NoTeenPerks?: number;
}

interface DDMvTnOutsider03_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNOUTSIDER03_EXTScenesBySceneID;
}

interface DDMVTNOUTSIDER03_EXTScenesBySceneID {
  DD_MV_TN_OUTSIDER_03_EXT_S01?: DDMvTnOutsider03_EXTS01;
  DD_MV_TN_OUTSIDER_03_EXT_S02?: DDMvTnOutsider03_EXTS02;
  DD_MV_TN_OUTSIDER_03_EXT_S03?: DDMvTnOutsider03_EXTS03;
  DD_MV_TN_OUTSIDER_03_EXT_S04?: DDMvTnOutsider03_EXTS04;
  DD_MV_TN_OUTSIDER_03_EXT_S05?: DDMvTnOutsider03_EXTS05;
}

interface DDMvTnOutsider03_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER03_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER03_EXTS01RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_TwoRankTwoStealthPerks?: number;
}

interface DDMvTnOutsider03_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER03_DIRS02RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider03_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER03_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNOUTSIDER03_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNOUTSIDER03_EXTS03ProgressionEvents {
  MET_CNT_MsecsDamageCopter?: METCNTVanquishedEvilClass;
}

interface DDMVTNOUTSIDER03_EXTS03RequiredEvents {
  MET_PlayingAsOutsider?: number;
  MET_REQ_Perk_Copter_Any?: number;
}

interface DDMvTnOutsider03_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_DIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnOutsider03_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNOUTSIDER01_STDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK03_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk01_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNPUNK01_DIRScenesBySceneID;
}

interface DDMVTNPUNK01_DIRScenesBySceneID {
  DD_MV_TN_PUNK_01_DIR_S01?: DDMvTnPunk01_DirS01;
  DD_MV_TN_PUNK_01_DIR_S02?: DDMvTnPunk01_DirS02;
  DD_MV_TN_PUNK_01_DIR_S03?: DDMvTnPunk01_DirS03;
  DD_MV_TN_PUNK_01_DIR_S04?: DDMvTnPunk01_DirS04;
  DD_MV_TN_PUNK_01_DIR_S05?: DDMvTnPunk01_DirS05;
}

interface DDMvTnPunk01_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK01_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK01_DIRS01RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_OneRankThreeSavvyPerk?: number;
}

interface DDMvTnPunk01_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK01_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK01_DIRS02RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_REQ_Perk_PickupVision?: number;
}

interface DDMvTnPunk01_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK01_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNOUTSIDER03_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK01_DIRS03RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_REQ_Perk_Copter_Any?: number;
}

interface DDMvTnPunk01_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk01_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk01_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNPUNK01_EXTScenesBySceneID;
}

interface DDMVTNPUNK01_EXTScenesBySceneID {
  DD_MV_TN_PUNK_01_EXT_S01?: DDMvTnPunk01_EXTS01;
  DD_MV_TN_PUNK_01_EXT_S02?: DDMvTnPunk01_EXTS02;
  DD_MV_TN_PUNK_01_EXT_S03?: DDMvTnPunk01_EXTS03;
  DD_MV_TN_PUNK_01_EXT_S04?: DDMvTnPunk01_EXTS04;
  DD_MV_TN_PUNK_01_EXT_S05?: DDMvTnPunk01_EXTS05;
}

interface DDMvTnPunk01_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk01_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK01_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNPUNK01_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK01_EXTS02ProgressionEvents {
  MET_CNT_WastebasketSearched?: METCNTVanquishedEvilClass;
}

interface DDMvTnPunk01_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK01_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNPUNK01_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK01_EXTS03ProgressionEvents {
  MET_CNT_WoundWithFlamethrower?: METCNTVanquishedEvilClass;
}

interface DDMVTNPUNK01_EXTS03RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_REQ_Perk_Flamethrower_Any?: number;
}

interface DDMvTnPunk01_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTOREXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk01_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk02_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNPUNK02_DIRScenesBySceneID;
}

interface DDMVTNPUNK02_DIRScenesBySceneID {
  DD_MV_TN_PUNK_02_DIR_S01?: DDMvTnPunk02_DirS01;
  DD_MV_TN_PUNK_02_DIR_S02?: DDMvTnPunk02_DirS02;
  DD_MV_TN_PUNK_02_DIR_S03?: DDMvTnPunk02_DirS03;
  DD_MV_TN_PUNK_02_DIR_S04?: DDMvTnPunk0;
  DD_MV_TN_PUNK_02_DIR_S05?: DDMvTnPunk02_DirS05;
}

interface DDMvTnPunk02_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK02_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK02_DIRS01RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_TwoRankThreeSavvyPerks?: number;
}

interface DDMvTnPunk02_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK02_DIRS02RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK02_DIRS02RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_REQ_Perk_EssenceVision?: number;
}

interface DDMvTnPunk02_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK02_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNPUNK02_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK02_DIRS03ProgressionEvents {
  MET_CNT_HitWithFlameMine?: METCNTVanquishedEvilClass;
}

interface DDMVTNPUNK02_DIRS03RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_REQ_Perk_FlameMine_Any?: number;
}

interface DDMvTnPunk0 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVTNNERD03_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk02_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVTNOUTSIDER01_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk02_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNPUNK02_EXTScenesBySceneID;
}

interface DDMVTNPUNK02_EXTScenesBySceneID {
  DD_MV_TN_PUNK_02_EXT_S01?: DDMvTnPunk02_EXTS01;
  DD_MV_TN_PUNK_02_EXT_S02?: DDMvTnPunk02_EXTS02;
  DD_MV_TN_PUNK_02_EXT_S03?: DDMvTnPunk02_EXTS03;
  DD_MV_TN_PUNK_02_EXT_S04?: DDMvTnPunk02_EXTS04;
  DD_MV_TN_PUNK_02_EXT_S05?: DDMvTnPunk02_EXTS05;
}

interface DDMvTnPunk02_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK02_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK02_EXTS01RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_OneRankTwoSavvyPerk?: number;
}

interface DDMvTnPunk02_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK02_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNJOCK02_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk02_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK02_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNNERD01_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK02_EXTS03RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_REQ_Perk_Slingshot_Any?: number;
}

interface DDMvTnPunk02_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVTNPUNK02_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK02_EXTS04ProgressionEvents {
  MET_CNT_LockboxSearched?: METCNTVanquishedEvilClass;
}

interface DDMvTnPunk02_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_DIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk03_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNPUNK03_DIRScenesBySceneID;
}

interface DDMVTNPUNK03_DIRScenesBySceneID {
  DD_MV_TN_PUNK_03_DIR_S01?: DDMvTnPunk03_DirS01;
  DD_MV_TN_PUNK_03_DIR_S02?: DDMvTnPunk03_DirS02;
  DD_MV_TN_PUNK_03_DIR_S03?: DDMvTnPunk03_DirS03;
  DD_MV_TN_PUNK_03_DIR_S04?: DDMvTnPunk03_DirS04;
  DD_MV_TN_PUNK_03_DIR_S05?: DDMvTnPunk03_DirS05;
}

interface DDMvTnPunk03_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK03_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK03_DIRS01RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_ThreeRankThreeSavvyPerks?: number;
}

interface DDMvTnPunk03_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK03_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER03_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK03_DIRS02RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_REQ_Perk_MedkitMaster?: number;
}

interface DDMvTnPunk03_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK03_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNPUNK03_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK03_DIRS03ProgressionEvents {
  MET_CNT_MsecsChargingStaticShield?: METCNTVanquishedEvilClass;
}

interface DDMVTNPUNK03_DIRS03RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_REQ_Perk_StaticShield_Any?: number;
}

interface DDMvTnPunk03_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVTNPUNK03_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK03_DIRS04ProgressionEvents {
  MET_CNT_GaveResurrect?: METCNTVanquishedEvilClass;
}

interface DDMvTnPunk03_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK03_DIRS05RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK03_DIRS05RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_NoTeenPerks?: number;
}

interface DDMvTnPunk03_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNPUNK03_EXTScenesBySceneID;
}

interface DDMVTNPUNK03_EXTScenesBySceneID {
  DD_MV_TN_PUNK_03_EXT_S01?: DDMvTnPunk03_EXTS01;
  DD_MV_TN_PUNK_03_EXT_S02?: DDMvTnPunk03_EXTS02;
  DD_MV_TN_PUNK_03_EXT_S03?: DDMvTnPunk03_EXTS03;
  DD_MV_TN_PUNK_03_EXT_S04?: DDMvTnPunk03_EXTS04;
  DD_MV_TN_PUNK_03_EXT_S05?: DDMvTnPunk03__;
}

interface DDMvTnPunk03_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK03_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK03_EXTS01RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_TwoRankTwoSavvyPerks?: number;
}

interface DDMvTnPunk03_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK03_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNPUNK03_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK03_EXTS02ProgressionEvents {
  MET_CNT_MsecsMedkitHealingSelf?: METCNTVanquishedEvilClass;
}

interface DDMvTnPunk03_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK03_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNPUNK03_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK03_EXTS03ProgressionEvents {
  MET_CNT_CraftParchment?: METCNTVanquishedEvilClass;
}

interface DDMVTNPUNK03_EXTS03RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_REQ_Perk_Parchment_Any?: number;
}

interface DDMvTnPunk03_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER03_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk03__ {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVTNPUNK03_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK03_EXTS05ProgressionEvents {
  MET_REQ_IngenuityScore?: METCNTVanquishedEvilClass;
}

interface DDMvTnPunk03_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNPUNK03_STDScenesBySceneID;
}

interface DDMVTNPUNK03_STDScenesBySceneID {
  DD_MV_TN_PUNK_03_STD_S01?: DDMvTnPunk03_StdS01;
  DD_MV_TN_PUNK_03_STD_S02?: DDMvTnPunk03_StdS02;
  DD_MV_TN_PUNK_03_STD_S03?: DDMvTnPunk03__;
  DD_MV_TN_PUNK_03_STD_S04?: DDMvTnPunk03_StdS04;
  DD_MV_TN_PUNK_03_STD_S05?: DDMvTnPunk03_StdS05;
  DD_MV_TN_PUNK_03_STD_S06?: DDMvTnPunk03_StdS06;
  DD_MV_TN_PUNK_03_STD_S07?: DDMvTnPunk0;
  DD_MV_TN_PUNK_03_STD_S08?: DDMvTnPunk03_StdS08;
  DD_MV_TN_PUNK_03_STD_S09?: DDMvTnPunk03_StdS09;
  DD_MV_TN_PUNK_03_STD_S10?: DDMvTnPunk03_StdS10;
}

interface DDMvTnPunk03_StdS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk03_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk03_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK03_STDS04RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK03_STDS04RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_TwoRankOneSavvyPerks?: number;
}

interface DDMvTnPunk03_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK03_STDS05RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK03_STDS05RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_REQ_Perk_DemonSword_Any?: number;
}

interface DDMvTnPunk03_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNPUNK03_STDS06RequiredEvents;
  progressionEvents?: DDMVTNPUNK03_STDS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNPUNK03_STDS06ProgressionEvents {
  MET_CNT_WoundWithRayGun?: METCNTVanquishedEvilClass;
}

interface DDMVTNPUNK03_STDS06RequiredEvents {
  MET_PlayingAsPunk?: number;
  MET_REQ_Perk_RayGun_Any?: number;
}

interface DDMvTnPunk03_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk03_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTOREXTS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnPunk03_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS02RequiredEvents;
  progressionEvents?: DDMVTNNERD03_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin01_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNVIRGIN01_DIRScenesBySceneID;
}

interface DDMVTNVIRGIN01_DIRScenesBySceneID {
  DD_MV_TN_VIRGIN_01_DIR_S01?: DDMvTnVirgin01_DirS01;
  DD_MV_TN_VIRGIN_01_DIR_S02?: DDMvTnVirgin01_DirS02;
  DD_MV_TN_VIRGIN_01_DIR_S03?: DDMvTnVirgin01_DirS03;
  DD_MV_TN_VIRGIN_01_DIR_S04?: DDMvTnVirgin01_DirS04;
  DD_MV_TN_VIRGIN_01_DIR_S05?: DDMvTnVirgin01_DirS05;
}

interface DDMvTnVirgin01_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN01_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN01_DIRS01RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_OneRankThreeRecoveryPerk?: number;
}

interface DDMvTnVirgin01_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN01_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER03_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN01_DIRS02RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_REQ_Perk_InjuryVision?: number;
}

interface DDMvTnVirgin01_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN01_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNVIRGIN01_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN01_DIRS03ProgressionEvents {
  MET_CNT_StunWithMolotov?: METCNTVanquishedEvilClass;
}

interface DDMVTNVIRGIN01_DIRS03RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_REQ_Perk_Molotov_Any?: number;
}

interface DDMvTnVirgin01_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin01_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTOREXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin01_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNVIRGIN01_EXTScenesBySceneID;
}

interface DDMVTNVIRGIN01_EXTScenesBySceneID {
  DD_MV_TN_VIRGIN_01_EXT_S01?: DDMvTnVirgin01_EXTS01;
  DD_MV_TN_VIRGIN_01_EXT_S02?: DDMvTnVirgin01_EXTS02;
  DD_MV_TN_VIRGIN_01_EXT_S03?: DDMvTnVirgin01_EXTS03;
  DD_MV_TN_VIRGIN_01_EXT_S04?: DDMvTnVirgin01_EXTS04;
  DD_MV_TN_VIRGIN_01_EXT_S05?: DDMvTnVirgin01_EXTS05;
}

interface DDMvTnVirgin01_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin01_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN01_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNJOCK02_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin01_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN01_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNVIRGIN01_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN01_EXTS03ProgressionEvents {
  MET_CNT_WoundWithCross?: METCNTVanquishedEvilClass;
}

interface DDMVTNVIRGIN01_EXTS03RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_REQ_Perk_Cross_Any?: number;
}

interface DDMvTnVirgin01_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER03_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin01_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin02_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNVIRGIN02_DIRScenesBySceneID;
}

interface DDMVTNVIRGIN02_DIRScenesBySceneID {
  DD_MV_TN_VIRGIN_02_DIR_S01?: DDMvTnVirgin02_DirS01;
  DD_MV_TN_VIRGIN_02_DIR_S02?: DDMvTnVirgin02_DirS02;
  DD_MV_TN_VIRGIN_02_DIR_S03?: DDMvTnVirgin02_DirS03;
  DD_MV_TN_VIRGIN_02_DIR_S04?: DDMvTnVirgin02_DirS04;
  DD_MV_TN_VIRGIN_02_DIR_S05?: DDMvTnVirgin02_DirS05;
}

interface DDMvTnVirgin02_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN02_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN02_DIRS01RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_TwoRankThreeRecoveryPerks?: number;
}

interface DDMvTnVirgin02_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN02_DIRS02RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTOREXTS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN02_DIRS02RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_REQ_Perk_ReviveMaster?: number;
}

interface DDMvTnVirgin02_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN02_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNVIRGIN02_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN02_DIRS03ProgressionEvents {
  MET_CNT_MsecsChargingHolyStaff?: METCNTVanquishedEvilClass;
}

interface DDMVTNVIRGIN02_DIRS03RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_REQ_Perk_HolyStaff_Any?: number;
}

interface DDMvTnVirgin02_DirS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin02_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin02_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNVIRGIN02_EXTScenesBySceneID;
}

interface DDMVTNVIRGIN02_EXTScenesBySceneID {
  DD_MV_TN_VIRGIN_02_EXT_S01?: DDMvTnVirgin02_EXTS01;
  DD_MV_TN_VIRGIN_02_EXT_S02?: DDMvTnVirgin02_EXTS02;
  DD_MV_TN_VIRGIN_02_EXT_S03?: DDMvTnVirgin02_EXTS03;
  DD_MV_TN_VIRGIN_02_EXT_S04?: DDMvTnVirgin02_EXTS04;
  DD_MV_TN_VIRGIN_02_EXT_S05?: DDMvTnVirgin02_EXTS05;
}

interface DDMvTnVirgin02_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN02_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN02_EXTS01RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_OneRankTwoRecoveryPerk?: number;
}

interface DDMvTnVirgin02_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN02_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNNERD03_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin02_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN02_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNVIRGIN02_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN02_EXTS03ProgressionEvents {
  MET_CNT_StunWithCopter?: METCNTVanquishedEvilClass;
}

interface DDMVTNVIRGIN02_EXTS03RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_REQ_Perk_Copter_Any?: number;
}

interface DDMvTnVirgin02_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNOUTSIDER01_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin02_EXTS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNOUTSIDER01_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin03_Dir {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNVIRGIN03_DIRScenesBySceneID;
}

interface DDMVTNVIRGIN03_DIRScenesBySceneID {
  DD_MV_TN_VIRGIN_03_DIR_S01?: DDMvTnVirgin03_DirS01;
  DD_MV_TN_VIRGIN_03_DIR_S02?: DDMvTnVirgin03_DirS02;
  DD_MV_TN_VIRGIN_03_DIR_S03?: DDMvTnVirgin03_DirS03;
  DD_MV_TN_VIRGIN_03_DIR_S04?: DDMVTNVIRGIN03_DIRS04Class;
  DD_MV_TN_VIRGIN_03_DIR_S05?: DDMvTnVirgin03_DirS05;
}

interface DDMvTnVirgin03_DirS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN03_DIRS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN03_DIRS01RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_ThreeRankThreeRecoveryPerks?: number;
}

interface DDMvTnVirgin03_DirS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN03_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN03_DIRS02RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_REQ_Perk_HealMaster?: number;
}

interface DDMvTnVirgin03_DirS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN03_DIRS03RequiredEvents;
  progressionEvents?: DDMVTNPUNK02_DIRS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN03_DIRS03RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_REQ_Perk_FlameMine_Any?: number;
}

interface DDMVTNVIRGIN03_DIRS04Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVLTDSPECTRECOLLECTORDIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin03_DirS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN03_DIRS05RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN03_DIRS05RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_NoTeenPerks?: number;
}

interface DDMvTnVirgin03_EXT {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNVIRGIN03_EXTScenesBySceneID;
}

interface DDMVTNVIRGIN03_EXTScenesBySceneID {
  DD_MV_TN_VIRGIN_03_EXT_S01?: DDMvTnVirgin03_EXTS01;
  DD_MV_TN_VIRGIN_03_EXT_S02?: DDMvTnVirgin03_EXTS02;
  DD_MV_TN_VIRGIN_03_EXT_S03?: DDMvTnVirgin03_EXTS03;
  DD_MV_TN_VIRGIN_03_EXT_S04?: DDMvTnVirgin03_EXTS04;
  DD_MV_TN_VIRGIN_03_EXT_S05?: DDMVTNVIRGIN03_EXTS05Class;
}

interface DDMvTnVirgin03_EXTS01 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN03_EXTS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS01ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN03_EXTS01RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_TwoRankTwoRecoveryPerks?: number;
}

interface DDMvTnVirgin03_EXTS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN03_DIRS02RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER01_DIRS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin03_EXTS03 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN03_EXTS03RequiredEvents;
  progressionEvents?: DDMVTNPUNK03_EXTS03ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN03_EXTS03RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_REQ_Perk_Parchment_Any?: number;
}

interface DDMvTnVirgin03_EXTS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_DIRS04ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN03_EXTS05Class {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER03_EXTS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin03_Std {
  movieData?: MovieData;
  scenesBySceneId?: DDMVTNVIRGIN03_STDScenesBySceneID;
}

interface DDMVTNVIRGIN03_STDScenesBySceneID {
  DD_MV_TN_VIRGIN_03_STD_S01?: DDMVTNVIRGIN03_DIRS04Class;
  DD_MV_TN_VIRGIN_03_STD_S02?: DDMvTnVirgin03_StdS02;
  DD_MV_TN_VIRGIN_03_STD_S03?: DDMVTNVIRGIN03_EXTS05Class;
  DD_MV_TN_VIRGIN_03_STD_S04?: DDMvTnVirgin03_StdS04;
  DD_MV_TN_VIRGIN_03_STD_S05?: DDMvTnVirgin03_StdS05;
  DD_MV_TN_VIRGIN_03_STD_S06?: DDMvTnVirgin03_StdS06;
  DD_MV_TN_VIRGIN_03_STD_S07?: DDMvTnVirgin03_StdS07;
  DD_MV_TN_VIRGIN_03_STD_S08?: DDMvTnVirgin03_StdS08;
  DD_MV_TN_VIRGIN_03_STD_S09?: DDMvTnVirgin03_StdS09;
  DD_MV_TN_VIRGIN_03_STD_S10?: DDMvTnVirgin03_StdS10;
  DD_MV_TN_VIRGIN_03_STD_S11?: DDMvTnVirgin03_StdS11;
}

interface DDMvTnVirgin03_StdS02 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNCHEERLEADER02_EXTS02ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin03_StdS04 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN03_STDS04RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESDIRS06ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN03_STDS04RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_TwoRankOneRecoveryPerks?: number;
}

interface DDMvTnVirgin03_StdS05 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN03_STDS05RequiredEvents;
  progressionEvents?: DDMVTNVIRGIN03_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN03_STDS05ProgressionEvents {
  MET_CNT_CraftDemonSword?: METCNTVanquishedEvilClass;
}

interface DDMVTNVIRGIN03_STDS05RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_REQ_Perk_DemonSword_Any?: number;
}

interface DDMvTnVirgin03_StdS06 {
  sceneData?: SceneData;
  requiredEvents?: DDMVTNVIRGIN03_STDS06RequiredEvents;
  progressionEvents?: DDMVTNNERD03_STDS05ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN03_STDS06RequiredEvents {
  MET_PlayingAsVirgin?: number;
  MET_REQ_Perk_Flamethrower_Any?: number;
}

interface DDMvTnVirgin03_StdS07 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNNERD03_STDS07ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin03_StdS08 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVLTDEVILNEVERDIESEXTS06ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin03_StdS09 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK02_DIRS05ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin03_StdS10 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNJOCK01_EXTS04ProgressionEvents;
  rewards?: string[];
}

interface DDMvTnVirgin03_StdS11 {
  sceneData?: SceneData;
  requiredEvents?: DDMVLTD2023_VALENTINESMYFUREVERLOVESTDS01RequiredEvents;
  progressionEvents?: DDMVTNVIRGIN03_STDS11ProgressionEvents;
  rewards?: string[];
}

interface DDMVTNVIRGIN03_STDS11ProgressionEvents {
  MET_CNT_MsecsHealingSelf?: METCNTVanquishedEvilClass;
}

interface DDTAllStoreItemsBit {
  Slots?: Slots;
  StoreDataGuid?: string;
  RewardDrops?: RewardDrops;
  Skus?: Skus;
}

interface RewardDrops {
  BasicDaily?: BasicDaily;
}

interface BasicDaily {
  currencyType?: string;
  timeframe?: string;
  streakModifier?: number;
  maxStreak?: number;
  currentStreak?: number;
  claimable?: boolean;
}

interface Skus {
  "SKU-VHS-FoundersPack1"?: SkuVhsFoundersPack;
  "SKU-VHS-FoundersPack2"?: SkuVhsFoundersPack;
  "SKU-VHS-FoundersPack3"?: SkuVhsFoundersPack;
  "SKU-VHS-Currency1"?: SkuVhsCurrency;
  "SKU-VHS-Currency2"?: SkuVhsCurrency;
  "SKU-VHS-Currency3"?: SkuVhsCurrency;
  "SKU-VHS-Currency4"?: SkuVhsCurrency;
  "SKU-VHS-Currency0"?: SkuVhsCurrency;
  "SKU-VHS-Eradicator"?: SKUVHSEradicator;
  "SKU-VHS-Nerd"?: SKUVHSNerd;
  "SKU-VHS-Anomaly"?: SKUVHSAnomaly;
}

interface SKUVHSAnomaly {
  grantables?: string[];
  type?: string;
  name?: string;
  description?: string;
  canOwnMultiple?: boolean;
  usdPriceCents?: number;
  compensationByInventoryItem?: SKUVHSAnomalyCompensationByInventoryItem;
  category?: string;
  containedSkus?: any[];
  itemId?: number;
  appId?: number;
  packageId?: number;
  overlayToStoreFlag?: number;
  purchaseable?: boolean;
}

interface SKUVHSAnomalyCompensationByInventoryItem {
  ID_CH_Evil_Anomaly?: string;
}

interface SkuVhsCurrency {
  grantables?: string[];
  type?: string;
  name?: string;
  description?: string;
  canOwnMultiple?: boolean;
  usdPriceCents?: number;
  compensationByInventoryItem?: any[];
  category?: string;
  itemId?: number;
  regionalPrice?: number;
  regionalCurrencyCode?: string;
}

interface SKUVHSEradicator {
  grantables?: string[];
  type?: string;
  name?: string;
  description?: string;
  canOwnMultiple?: boolean;
  usdPriceCents?: number;
  compensationByInventoryItem?: SKUVHSEradicatorCompensationByInventoryItem;
  category?: string;
  containedSkus?: any[];
  itemId?: number;
  appId?: number;
  packageId?: number;
  overlayToStoreFlag?: number;
}

interface SKUVHSEradicatorCompensationByInventoryItem {
  ID_CH_Evil_Eradicator?: string;
}

interface SkuVhsFoundersPack {
  grantables?: string[];
  type?: string;
  name?: string;
  description?: string;
  canOwnMultiple?: boolean;
  usdPriceCents?: number;
  compensationByInventoryItem?: any[];
  category?: string;
  containedSkus?: string[];
  itemId?: number;
  appId?: number;
  packageId?: number;
  overlayToStoreFlag?: number;
  purchaseable?: boolean;
}

interface SKUVHSNerd {
  grantables?: string[];
  type?: string;
  name?: string;
  description?: string;
  canOwnMultiple?: boolean;
  usdPriceCents?: number;
  compensationByInventoryItem?: SKUVHSNerdCompensationByInventoryItem;
  category?: string;
  containedSkus?: any[];
  itemId?: number;
  appId?: number;
  packageId?: number;
  overlayToStoreFlag?: number;
}

interface SKUVHSNerdCompensationByInventoryItem {
  ID_CH_Teen_Nerd?: string;
}

interface Slots {
  "5_Characters?:0?:SGSTS_Large"?: The1__Featured4_SgstsSmall;
  "5_Characters?:1?:SGSTS_Large"?: The1__Featured4_SgstsSmall;
  "5_Characters?:2?:SGSTS_Large"?: The1__Featured4_SgstsSmall;
  "1_Featured?:0?:SGSTS_Large"?: The1__Featured;
  "1_Featured?:1?:SGSTS_Large"?: The1__Featured;
  "1_Featured?:2?:SGSTS_Large"?: The1__Featured;
  "1_Featured?:3?:SGSTS_Small"?: The1__Featured;
  "1_Featured?:4?:SGSTS_Small"?: The1__Featured4_SgstsSmall;
  "3_PrizePacks?:0?:SGSTS_Large"?: The1__Featured4_SgstsSmall;
  "3_PrizePacks?:1?:SGSTS_Large"?: The1__Featured4_SgstsSmall;
  "3_PrizePacks?:2?:SGSTS_Large"?: The1__Featured4_SgstsSmall;
  "3_PrizePacks?:3?:SGSTS_Large"?: The1__Featured4_SgstsSmall;
  "3_PrizePacks?:4?:SGSTS_Large"?: The1__Featured4_SgstsSmall;
  "10_Promo?:0?:SGSTS_Large"?: The10_Promo0SGSTSLarge;
}

interface The10_Promo0SGSTSLarge {
  Name?: string;
  BundlePricingStyles?: The10_Promo0SGSTSLargeBundlePricingStyle[];
  Content?: The10_Promo0SGSTSLargeContent[];
}

interface The10_Promo0SGSTSLargeBundlePricingStyle {
  PNT_FanPoints?: string;
}

interface The10_Promo0SGSTSLargeContent {
  Grantable?: string;
  TileSize?: TileSize;
  PurchaseOptions?: The1_Featured0SGSTSLargeBundlePricingStyle[];
}

interface The1_Featured0SGSTSLargeBundlePricingStyle {
  PNT_FanPoints?: PNTFanPoints;
  PNT_HardCurrency?: PNTHardCurrency;
}

enum PNTFanPoints {
  SPSOnlyConst = "SPS_OnlyConst",
  SPSTwoForOne = "SPS_TwoForOne",
  The0SPSFree0 = "0?:SPS_Free?:0",
  The12000SPSOnlyConst12000 = "12000?:SPS_OnlyConst?:12000",
  The2400SPSPercentOff1200 = "2400?:SPS_PercentOff?:1200",
  The7200SPSOnlyConst7200 = "7200?:SPS_OnlyConst?:7200",
  The9600SPSOnlyConst9600 = "9600?:SPS_OnlyConst?:9600",
}

enum PNTHardCurrency {
  SPSOnlyConst = "SPS_OnlyConst",
  SPSTwoForOne = "SPS_TwoForOne",
  The0SPSFree0 = "0?:SPS_Free?:0",
  The120SPSPercentOff60 = "120?:SPS_PercentOff?:60",
  The360SPSOnlyConst360 = "360?:SPS_OnlyConst?:360",
  The480SPSOnlyConst480 = "480?:SPS_OnlyConst?:480",
  The600SPSOnlyConst600 = "600?:SPS_OnlyConst?:600",
}

enum TileSize {
  SGSTSLarge = "SGSTS_Large",
  SGSTSSmall = "SGSTS_Small",
}

interface The1__Featured {
  Name?: string;
  BundlePricingStyles?: The1_Featured0SGSTSLargeBundlePricingStyle[];
  Content?: The10_Promo0SGSTSLargeContent[];
  OfferExpiredOn?: string;
}

interface The1__Featured4_SgstsSmall {
  Name?: string;
  BundlePricingStyles?: The10_Promo0SGSTSLargeBundlePricingStyle[];
  Content?: The1_Featured4SGSTSSmallContent[];
  PurchaseOptions_ThirdParty?: PurchaseOptionsThirdParty;
}

interface The1_Featured4SGSTSSmallContent {
  Grantable?: string;
  TileSize?: TileSize;
  PurchaseOptions?: The10_Promo0SGSTSLargeBundlePricingStyle[];
}

interface PurchaseOptionsThirdParty {
  SkuCode?: string;
}

interface DDTAllWeaponsBit {
/** TODO, currently here */
  weaponLoadoutsByCharacterType?: { [key in Teens]: WeaponLoadoutsByCharacterTypeCTTeen } & {
    CT_DollMaster?: WeaponLoadoutsByCharacterTypeCTDollMaster,
    CT_Toad?: CTToad;
    CT_Werewolf?: CTWerewolf;
    CT_Eradicator?: WeaponLoadoutsByCharacterTypeCTEradicator;
    CT_Anomaly?: WeaponLoadoutsByCharacterTypeCTAnomaly;
  };
  pointsByWeaponType?: { [key: string]: PointsByWeaponType };
  teenWeaponUnlockLevels?: { [key: string]: { [key: string]: string[] } };
  weaponXpToNextLevel?: { [key: string]: number };
  stigmaXpToNextLevel?: { [key: string]: number };
  weaponManifestNumber?: number;
}

interface PointsByWeaponType {
  PNT_WeaponExperience?: number;
  PNT_WeaponLevel?: number;
}


interface WeaponLoadoutsByCharacterTypeCTAnomaly {
  EAT_AnomalyDisperse?: EATAnomalyDisperse;
  EAT_AnomalyMimicry?: EATAnomalyMimicry;
  EAT_AnomalyScour?: EATAnomalyScour;
}

interface EATAnomalyDisperse {
  perk?: EATAnomalyDispersePerk;
}

interface EATAnomalyDispersePerk {
  PS_EAPerkAnomalyDisperse?: string;
}

interface EATAnomalyMimicry {
  perk?: EATAnomalyMimicryPerk;
}

interface EATAnomalyMimicryPerk {
  PS_EAPerkAnomalyMimicry?: string;
}

interface EATAnomalyScour {
  perk?: EATAnomalyScourPerk;
}

interface EATAnomalyScourPerk {
  PS_EAPerkAnomalyScour?: string;
}

interface WeaponLoadoutsByCharacterTypeCTTeen {
  WT_Cross?: CTCheerleaderWTCross;
  WT_DemonSword?: WTDemonSword;
  WT_Flamethrower?: WTFlamethrower;
  WT_RayGun?: WTRayGun;
  WT_Molotov?: WTMolotov;
  WT_RCCopter?: WTRCCopter;
  WT_Parchment?: WTParchment;
  WT_HolySlingshot?: WTHolySlingshot;
  WT_FlameMine?: WTFlameMine;
  WT_StaticShield?: WTStaticShield;
  WT_Talisman?: WTTalisman;
  WT_HolyStaff?: WTHolyStaff;
}

interface CTCheerleaderWTCross {
  skin?: WTCrossSkin;
  perk?: WTCrossPerk;
  unlockLevel?: number;
}

interface WTCrossPerk {
  PS_WPerkCross?: string;
}

interface WTCrossSkin {
  PS_WSkinCross?: string;
}

interface WTDemonSword {
  skin?: WTDemonSwordSkin;
  perk?: WTDemonSwordPerk;
  unlockLevel?: number;
}

interface WTDemonSwordPerk {
  PS_WPerkDemonSword?: string;
}

interface WTDemonSwordSkin {
  PS_WSkinDemonSword?: string;
}

interface WTFlameMine {
  skin?: WTFlameMineSkin;
  perk?: WTFlameMinePerk;
  unlockLevel?: number;
}

interface WTFlameMinePerk {
  PS_WPerkFlameMine?: string;
}

interface WTFlameMineSkin {
  PS_WSkinFlameMine?: string;
}

interface WTFlamethrower {
  skin?: WTFlamethrowerSkin;
  perk?: WTFlamethrowerPerk;
  unlockLevel?: number;
}

interface WTFlamethrowerPerk {
  PS_WPerkFlamethrower?: string;
}

interface WTFlamethrowerSkin {
  PS_WSkinFlamethrower?: string;
}

interface WTHolySlingshot {
  skin?: WTHolySlingshotSkin;
  perk?: WTHolySlingshotPerk;
  unlockLevel?: number;
}

interface WTHolySlingshotPerk {
  PS_WPerkHolySlingshot?: string;
}

interface WTHolySlingshotSkin {
  PS_WSkinHolySlingshot?: string;
}

interface WTHolyStaff {
  skin?: WTHolyStaffSkin;
  perk?: WTHolyStaffPerk;
  unlockLevel?: number;
}

interface WTHolyStaffPerk {
  PS_WPerkHolyStaff?: string;
}

interface WTHolyStaffSkin {
  PS_WSkinHolyStaff?: string;
}

interface WTMolotov {
  skin?: WTMolotovSkin;
  perk?: WTMolotovPerk;
  unlockLevel?: number;
}

interface WTMolotovPerk {
  PS_WPerkMolotov?: string;
}

interface WTMolotovSkin {
  PS_WSkinMolotov?: string;
}

interface WTParchment {
  skin?: WTParchmentSkin;
  perk?: WTParchmentPerk;
  unlockLevel?: number;
}

interface WTParchmentPerk {
  PS_WPerkParchment?: string;
}

interface WTParchmentSkin {
  PS_WSkinParchment?: string;
}

interface WTRCCopter {
  skin?: WTRCCopterSkin;
  perk?: WTRCCopterPerk;
  unlockLevel?: number;
}

interface WTRCCopterPerk {
  PS_WPerkRCCopter?: string;
}

interface WTRCCopterSkin {
  PS_WSkinRCCopter?: string;
}

interface WTRayGun {
  skin?: WTRayGunSkin;
  perk?: WTRayGunPerk;
  unlockLevel?: number;
}

interface WTRayGunPerk {
  PS_WPerkRayGun?: string;
}

interface WTRayGunSkin {
  PS_WSkinRayGun?: string;
}

interface WTStaticShield {
  skin?: WTStaticShieldSkin;
  perk?: WTStaticShieldPerk;
  unlockLevel?: number;
}

interface WTStaticShieldPerk {
  PS_WPerkStaticShield?: string;
}

interface WTStaticShieldSkin {
  PS_WSkinStaticShield?: string;
}

interface WTTalisman {
  skin?: WTTalismanSkin;
  perk?: WTTalismanPerk;
  unlockLevel?: number;
}

interface WTTalismanPerk {
  PS_WPerkTalisman?: string;
}

interface WTTalismanSkin {
  PS_WSkinTalisman?: string;
}

interface WeaponLoadoutsByCharacterTypeCTDollMaster {
  EAT_DollMasterDollSummon?: EATDollMasterDollSummon;
  EAT_DollMasterDollTeleport?: EATDollMasterDollTeleport;
  EAT_DollMasterDollTrap?: EATDollMasterDollTrap;
}

interface EATDollMasterDollSummon {
  perk?: EATDollMasterDollSummonPerk;
}

interface EATDollMasterDollSummonPerk {
  PS_EAPerkDollMasterDollSummon?: string;
}

interface EATDollMasterDollTeleport {
  perk?: EATDollMasterDollTeleportPerk;
}

interface EATDollMasterDollTeleportPerk {
  PS_EAPerkDollMasterDollTeleport?: string;
}

interface EATDollMasterDollTrap {
  perk?: EATDollMasterDollTrapPerk;
}

interface EATDollMasterDollTrapPerk {
  PS_EAPerkDollMasterDollTrap?: string;
}

interface WeaponLoadoutsByCharacterTypeCTEradicator {
  EAT_EradicatorElectricSurge?: EATEradicatorElectricSurge;
  EAT_EradicatorModeSwap?: EATEradicatorModeSwap;
  EAT_EradicatorScannerBeam?: EATEradicatorScannerBeam;
}

interface EATEradicatorElectricSurge {
  perk?: EATEradicatorElectricSurgePerk;
}

interface EATEradicatorElectricSurgePerk {
  PS_EAPerkEradicatorElectricSurge?: string;
}

interface EATEradicatorModeSwap {
  perk?: EATEradicatorModeSwapPerk;
}

interface EATEradicatorModeSwapPerk {
  PS_EAPerkEradicatorModeSwap?: string;
}

interface EATEradicatorScannerBeam {
  perk?: EATEradicatorScannerBeamPerk;
}

interface EATEradicatorScannerBeamPerk {
  PS_EAPerkEradicatorScannerBeam?: string;
}

interface CTToad {
  EAT_ToadAcidArmor?: EATToadAcidArmor;
  EAT_ToadEcholocation?: EATToadEcholocation;
  EAT_ToadLeap?: EATToadLeap;
}

interface EATToadAcidArmor {
  perk?: EATToadAcidArmorPerk;
}

interface EATToadAcidArmorPerk {
  PS_EAPerkToadAcidArmor?: string;
}

interface EATToadEcholocation {
  perk?: EATToadEcholocationPerk;
}

interface EATToadEcholocationPerk {
  PS_EAPerkToadEcholocation?: string;
}

interface EATToadLeap {
  perk?: EATToadLeapPerk;
}

interface EATToadLeapPerk {
  PS_EAPerkToadLeap?: string;
}

interface CTWerewolf {
  EAT_WerewolfBerserk?: EATWerewolfBerserk;
  EAT_WerewolfHowl?: EATWerewolfHowl;
  EAT_WerewolfSense?: EATWerewolfSense;
}

interface EATWerewolfBerserk {
  perk?: EATWerewolfBerserkPerk;
}

interface EATWerewolfBerserkPerk {
  PS_EAPerkWerewolfBerserk?: string;
}

interface EATWerewolfHowl {
  perk?: EATWerewolfHowlPerk;
}

interface EATWerewolfHowlPerk {
  PS_EAPerkWerewolfHowl?: string;
}

interface EATWerewolfSense {
  perk?: EATWerewolfSensePerk;
}

interface EATWerewolfSensePerk {
  PS_EAPerkWerewolfSense?: string;
}

interface DDTJourneyDataBit {
  journeysByJourneyKey?: JourneysByJourneyKey;
  journeyGuid?: string;
}

interface JourneysByJourneyKey {
  CT_Cheerleader?: JourneysByJourneyKeyCTCheerleader;
  CT_DollMaster?: JourneysByJourneyKeyCTCheerleader;
  CT_Jock?: JourneysByJourneyKeyCTCheerleader;
  CT_Outsider?: JourneysByJourneyKeyCTCheerleader;
  CT_Punk?: JourneysByJourneyKeyCTCheerleader;
  CT_Toad?: JourneysByJourneyKeyCTCheerleader;
  CT_Virgin?: JourneysByJourneyKeyCTCheerleader;
  CT_Werewolf?: JourneysByJourneyKeyCTCheerleader;
  CT_Eradicator?: JourneysByJourneyKeyCTCheerleader;
  CT_Nerd?: JourneysByJourneyKeyCTCheerleader;
  CT_Anomaly?: JourneysByJourneyKeyCTAnomaly;
}

interface JourneysByJourneyKeyCTAnomaly {
  "1"?: CTAnomaly1;
}

interface CTAnomaly1 {
  "1"?: The1_1;
}

interface The1_1 {
  Start?: boolean;
  EvilPerk1T1?: boolean;
  PerkPoint2?: boolean;
}

interface JourneysByJourneyKeyCTCheerleader {
  "1": { [key: string]: { [key: string]: boolean } };
}

interface DDTSeasonalEventBit {
  activeSeasonalEventTypes?: string[];
}

interface DDTServerNotificationBit {
  serverNotificationData?: ServerNotificationData;
}

interface ServerNotificationData {
  serverNotifications?: any[];
}
