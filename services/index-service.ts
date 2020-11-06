import type { RegionalIndexes, DepartmentalIndexes, ForCityIndexes, ForDistrictIndexes } from "./index-types";

export interface IndexService {
  readonly indexRegional: (region: string) => Promise<RegionalIndexes>;
  readonly indexDepartmental: (department: string) => Promise<DepartmentalIndexes>;
  readonly indexCity: (inseeCode: string) => Promise<ForCityIndexes>;
  readonly indexDistrict: (irisCode: string) => Promise<ForDistrictIndexes>;
}
class BackendIndexService implements IndexService {
  constructor(private readonly url: string) { }
  async indexRegional(region: string): Promise<RegionalIndexes> {
    const res = await fetch(`${this.url}/regional/${region}`);
    return res.json();
  };
  async indexDepartmental(department: string): Promise<DepartmentalIndexes> {
    const res = await fetch(`${this.url}/departmental/${department}`);
    return res.json();
  };
  async indexCity(inseeCode: string): Promise<ForCityIndexes> {
    const res = await fetch(`${this.url}/city/${inseeCode}`);
    return res.json();
  };
  async indexDistrict(irisCode: string): Promise<ForDistrictIndexes> {
    const res = await fetch(`${this.url}/districts/${irisCode}`);
    return res.json();
  };

}
class StaticIndexService implements IndexService {
  constructor(private readonly delay: number) { }
  async indexDepartmental(department: string): Promise<DepartmentalIndexes> {
    return new Promise(resolve => setTimeout(() => resolve({
      "global": 86.02450561523438,
      'global_region': 89.04955291748047,
      "global_national": 92.72245788574219,
      "information_access": {
        "global": 75.36396026611328,
        "global_region": 79.23330688476562,
        "global_national": 87.01314544677734,
        "monoparental_families_percent": null,
        "single_person_percent": null,
        "number_of_public_service_per_citizen": null,
        "number_of_public_services": null
      },
      "numeric_interfaces_access": {
        "global": 102.56858825683594,
        "global_region": 97.09712982177734,
        "global_national": 93.69023132324219,
        "high_speed_internet_access_percent": null,
        "mobile_network_availability_percent": null,
        "percent_of_poor_people": null,
        "available_median_salary": null
      },
      "administrative_competencies": {
        "global": 87.05220031738281,
        "global_region": 89.9955062866211,
        "global_national": 87.732177734375,
        "unemployed_percent": null,
        "_15_29_percent": null
      },
      "numeric_competencies": {
        "global": 89.38188171386719,
        "global_region": 95.89104461669922,
        "global_national": 101.94441223144531,
        "percent_of_65_plus_people": null,
        "percent_of_people_without_grade": null
      }
    }), this.delay));
  }
  async indexCity(inseeCode: string): Promise<ForCityIndexes> {
    return new Promise(resolve => setTimeout(() => resolve({
      "global": 115.125,
      "global_region": 91.21476745605469,
      "global_dept": 90.72703552246094,
      "global_national": 92.72245788574219,
      "information_access": {
        "global": 125.97716912799999,
        "global_region": 82.14131927490234,
        "global_dept": 81.04307556152344,
        "global_national": 87.01314544677734,
        "monoparental_families_percent": null,
        "single_person_percent": null,
        "number_of_public_service_per_citizen": null,
        "number_of_public_services": null
      },
      "numeric_interfaces_access": {
        "global": 94.13128226699997,
        "global_region": 98.47895812988281,
        "global_dept": 95.73599243164062,
        "global_national": 93.69023132324219,
        "high_speed_internet_access_percent": null,
        "mobile_network_availability_percent": null,
        "percent_of_poor_people": null,
        "available_median_salary": null
      },
      "administrative_competencies": {
        "global": 125.553211720625,
        "global_region": 89.73087310791016,
        "global_dept": 87.63152313232422,
        "global_national": 87.732177734375,
        "unemployed_percent": null,
        "_15_29_percent": null
      },
      "numeric_competencies": {
        "global": 95.19271236187501,
        "global_region": 98.89559936523438,
        "global_dept": 100.92508697509766,
        "global_national": 101.94441223144531,
        "percent_of_65_plus_people": null,
        "percent_of_people_without_grade": null
      }
    }), this.delay));
  }
  async indexDistrict(irisCode: string): Promise<ForDistrictIndexes> {
    return new Promise(resolve => setTimeout(() => resolve({
      "global": 122.0,
      "global_region": 91.21476745605469,
      "global_dept": 90.72703552246094,
      "global_national": 92.72245788574219,
      "iris_code": 620410101,
      "information_access": {
        "global": 138.1013937,
        "global_region": 82.14131927490234,
        "global_dept": 81.04307556152344,
        "global_national": 87.01314544677734,
        "monoparental_families_percent": 0.263981667,
        "single_person_percent": 0.50987131,
        "number_of_public_service_per_citizen": null,
        "number_of_public_services": null
      },
      "numeric_interfaces_access": {
        "global": 94.131282267,
        "global_region": 98.47895812988281,
        "global_dept": 95.73599243164062,
        "global_national": 93.69023132324219,
        "high_speed_internet_access_percent": null,
        "mobile_network_availability_percent": null,
        "percent_of_poor_people": null,
        "available_median_salary": 94.131282267
      },
      "administrative_competencies": {
        "global": 113.387957401,
        "global_region": 89.73087310791016,
        "global_dept": 87.63152313232422,
        "global_national": 87.732177734375,
        "unemployed_percent": null,
        "_15_29_percent": 0.21232334
      },
      "numeric_competencies": {
        "global": 104.980538913,
        "global_region": 98.89559936523438,
        "global_dept": 100.92508697509766,
        "global_national": 101.94441223144531,
        "percent_of_65_plus_people": 0.15139173,
        "percent_of_people_without_grade": 0.40574318
      }
    }), this.delay));
  }
  async indexRegional(region: string): Promise<RegionalIndexes> {
    return new Promise(resolve => setTimeout(() => resolve({
      "global": 89.04955291748047,
      "global_national": 92.72245788574219,
      "information_access": {
        "global": 79.23330688476562,
        "global_national": 87.01314544677734,
        "monoparental_families_percent": null,
        "single_person_percent": null,
        "number_of_public_service_per_citizen": null,
        "number_of_public_services": null
      },
      "numeric_interfaces_access": {
        "global": 97.09712982177734,
        "global_national": 93.69023132324219,
        "high_speed_internet_access_percent": null,
        "mobile_network_availability_percent": null,
        "percent_of_poor_people": null,
        "available_median_salary": null
      },
      "administrative_competencies": {
        "global": 89.9955062866211,
        "global_national": 87.732177734375,
        "unemployed_percent": null,
        "_15_29_percent": null
      },
      "numeric_competencies": {
        "global": 95.89104461669922,
        "global_national": 101.94441223144531,
        "percent_of_65_plus_people": null,
        "percent_of_people_without_grade": null
      }
    }), this.delay))
  }
}
export const indexService: IndexService = new BackendIndexService('http://vps-2f3ff050.vps.ovh.net:8080/api/index');
// export const indexService: IndexService = new StaticIndexService(500);

