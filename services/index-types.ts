export interface InformationAccess {
    readonly global: number;
    readonly monoparental_families_percent: number;
    readonly single_person_percent: number;
    readonly number_of_public_service_per_citizen: number;
    readonly number_of_public_services: number;
}

export interface NumericInterfaceAccess {
    readonly global: number;
    readonly high_speed_internet_access_percent: number;
    readonly mobile_network_availability_percent: number;
    readonly percent_of_poor_people: number;
    readonly available_median_salary: number;
}

export interface AdministrativeComptencies {
    readonly global: number;
    readonly unemployed_percent: number;
    readonly _15_29_percent: number;
}

export interface NumericCompetencies {
    readonly global: number;
    readonly percent_of_65_plus_people: number;
    readonly percent_of_people_without_grade: number;
}

export interface Indexes {
    readonly global: number;
    readonly information_access: InformationAccess;
    readonly numeric_interfaces_access: NumericInterfaceAccess;
    readonly administrative_competencies: AdministrativeComptencies;
    readonly numeric_competencies: NumericCompetencies;
}

type RegionalValues = { readonly global_national: number; };
type DepartmentalValues = RegionalValues & { readonly global_region: number; };
type ForCityValues = RegionalValues & DepartmentalValues & { readonly global_dept: number; };
type ForDistrictValues = RegionalValues & DepartmentalValues & ForCityValues & { readonly iris_code: number; };


type Regional<T> = RegionalValues & {
    readonly [P in keyof T]: T[P] extends number ? number : T[P] & RegionalValues;
};

type Departmental<T> = DepartmentalValues & {
    readonly [P in keyof T]: T[P] extends number ? number : T[P] & DepartmentalValues;
};

type ForCity<T> = ForCityValues & { 
    readonly [P in keyof T]: T[P] extends number ? number : T[P] & ForCityValues;
};

type ForDistrict<T> = ForDistrictValues & {
    readonly [P in keyof T]: T[P] extends number ? number : T[P] & ForCityValues;
};


export type RegionalIndexes = Regional<Indexes>;
export type DepartmentalIndexes = Departmental<Indexes>;
export type ForCityIndexes = ForCity<Indexes>;
export type ForDistrictIndexes = ForDistrict<Indexes>;
