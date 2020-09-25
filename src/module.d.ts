export interface Config {
    readonly rootURL: string;
    readonly cachePath: string;
}

export interface MatchGroups {
    readonly [key: string]: string;
}

export interface LinkedData<T = any> {
    readonly name: string;
    readonly url: string;
    readonly data?: T;
}

export interface CountryData {
    readonly code2: string;
    readonly code3: string;
}

export interface CountryDetailData {
    readonly flag: string; //base64
    readonly code: string;
}

export interface WorldModel {
    readonly continents: ContinentModel[];
}

export interface ContinentModel {
    readonly name: string;
    readonly countries: CountryModel[];
}

export interface CountryModel {
    readonly name: string;
    readonly code: string;
    readonly flag: string; //base64
}