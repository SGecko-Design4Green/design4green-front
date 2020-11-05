export interface Score {
    readonly informationAccess: number;
    readonly numericInterfacesAccess: number;
    readonly administrativeCompetencies: number;
    readonly numericCompetencies: number;
}

export interface ScoreInfo {
    readonly asideInformation: Record<string, Score>;
    readonly innerInformation: Record<string, Score>;
}

export interface ScoreProvider {
    readonly getRegionScore: (region: string) => Promise<ScoreInfo>;
}

class FakeScoreService implements ScoreProvider {
    constructor(private readonly delay: number) { }

    async getRegionScore(region: string): Promise<ScoreInfo> {
        return new Promise(resolve => setTimeout(() => resolve({
            asideInformation: {
                'Normandie': {
                    informationAccess: 123,
                    numericInterfacesAccess: 321,
                    administrativeCompetencies: 456,
                    numericCompetencies: 654,
                },
                'Pays de la Loire': {
                    informationAccess: 1,
                    numericInterfacesAccess: 1,
                    administrativeCompetencies: 1,
                    numericCompetencies: 1,
                }
            },
            innerInformation: {
                'Finistère': {
                    informationAccess: 153,
                    numericInterfacesAccess: 230,
                    administrativeCompetencies: 454,
                    numericCompetencies: 255,
                },
                'Morbihan': {
                    informationAccess: 10,
                    numericInterfacesAccess: 10,
                    administrativeCompetencies: 10,
                    numericCompetencies: 10,
                }
            }
        }), this.delay));
    }

}

export const scoreService: ScoreProvider = new FakeScoreService(0);