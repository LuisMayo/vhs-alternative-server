export interface MathmakingInfoResponse {
    data?: Data;
    log?:  Log;
}

export interface Data {
    DDT_DynamicBountyRewardsBit?: DDTDynamicBountyRewardsBit;
    playerSettingsData?:          string;
    serverTime?:                  number;
}

export interface DDTDynamicBountyRewardsBit {
    MR_EU_Central1?:   MREUCentral1;
    lastEarnedBounty?: number;
    quickQueueChar?:   string;
}

export interface MREUCentral1 {
    bountiesByCharType?: BountiesByCharType;
}

export interface BountiesByCharType {
    CT_Anomaly?:    number;
    CT_DollMaster?: number;
    CT_Eradicator?: number;
    CT_Toad?:       number;
    CT_Werewolf?:   number;
}

export interface Log {
    logSuccessful?: boolean;
}
