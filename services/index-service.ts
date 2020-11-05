export interface IndexService{
    readonly indexNational: () => Promise<any>;
}

class StaticIndexService implements IndexService{
    constructor(private readonly delay: number) { }
    async indexNational(): Promise<any> {
        return new Promise(resolve=>setTimeout(() => resolve({
            "global": 92.72245788574219,
            "global_region": null,
            "global_dept": null,
            "global_national": null,
            "iris_code": null,
            "information_access": {
              "global": 87.01314544677734,
              "global_region": null,
              "global_dept": null,
              "global_national": null,
              "monoparental_families_percent": null,
              "single_person_percent": null,
              "number_of_public_service_per_citizen": null,
              "number_of_public_services": null
            },
            "numeric_interfaces_access": {
              "global": 93.69023132324219,
              "global_region": null,
              "global_dept": null,
              "global_national": null,
              "high_speed_internet_access_percent": null,
              "mobile_network_availability_percent": null,
              "percent_of_poor_people": null,
              "available_median_salary": null
            },
            "administrative_competencies": {
              "global": 87.732177734375,
              "global_region": null,
              "global_dept": null,
              "global_national": null,
              "unemployed_percent": null,
              "_15_29_percent": null
            },
            "numeric_competencies": {
              "global": 101.94441223144531,
              "global_region": null,
              "global_dept": null,
              "global_national": null,
              "percent_of_65_plus_people": null,
              "percent_of_people_without_grade": null
            }
          }), this.delay))
    }
}

export const indexService: IndexService = new StaticIndexService(500);