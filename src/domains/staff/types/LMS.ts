export type LMS = {
    lmsId?: number;
    name: string;
    key?: string;
    secret?: string;
    credentials?: LTICredentials;
    versionId?: number;
    ltiVersion?: LTIVersion;
}

export type LTICredentials = {
    credId?: number;
    key: string;
    secret: string
}

export type LTIVersion = {
    versionId: number;
    version: string;
}