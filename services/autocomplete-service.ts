
export interface Autocompletor {
    readonly autocompleteRegions: (params: { query: string }) => Promise<string[]>;
    readonly autocompleteDepartments: (params: { query: string, region: string }) => Promise<string[]>;
    readonly autocompleteCities: (params: { query: string, department: string }) => Promise<string[]>;
    readonly autocompleteNeighbours: (params: { query: string, region: string, department: string, city: string }) => Promise<string[]>;
}

class BackendAutocompletor implements Autocompletor {

    constructor(private readonly url: string) { }

    async autocompleteRegions({ query }: { query: any }): Promise<string[]> {
        return ["AUVERGNE-RHONE-ALPES", "BOURGOGNE-FRANCHE-COMTE", "BRETAGNE", "CENTRE-VAL DE LOIRE", "CORSE", "GRAND EST", "HAUTS-DE-FRANCE", "ILE-DE-FRANCE", "LA REUNION", "MARTINIQUE", "NORMANDIE", "NOUVELLE-AQUITAINE", "OCCITANIE", "PAYS DE LA LOIRE", "PROVENCE-ALPES-COTE D'AZUR"];
    };

    async autocompleteDepartments({ query, region }): Promise<string[]> {
        return ["01 - AIN", "02 - AISNE", "03 - ALLIER", "04 - ALPES-DE-HAUTE-PROVENCE", "05 - HAUTES-ALPES", "06 - ALPES-MARITIMES", "07 - ARDECHE", "08 - ARDENNES", "09 - ARIEGE", "10 - AUBE", "11 - AUDE", "12 - AVEYRON", "13 - BOUCHES-DU-RHONE", "14 - CALVADOS", "15 - CANTAL", "16 - CHARENTE", "17 - CHARENTE-MARITIME", "18 - CHER", "19 - CORREZE", "21 - COTE-D'OR", "22 - COTES-D'ARMOR", "23 - CREUSE", "24 - DORDOGNE", "25 - DOUBS", "26 - DROME", "27 - EURE", "28 - EURE-ET-LOIR", "29 - FINISTERE", "2A - CORSE-DU-SUD", "2B - HAUTE-CORSE", "30 - GARD", "31 - HAUTE-GARONNE", "32 - GERS", "33 - GIRONDE", "34 - HERAULT", "35 - ILLE-ET-VILAINE", "36 - INDRE", "37 - INDRE-ET-LOIRE", "38 - ISERE", "39 - JURA", "40 - LANDES", "41 - LOIR-ET-CHER", "42 - LOIRE", "43 - HAUTE-LOIRE", "44 - LOIRE-ATLANTIQUE", "45 - LOIRET", "46 - LOT", "47 - LOT-ET-GARONNE", "48 - LOZERE", "49 - MAINE-ET-LOIRE", "50 - MANCHE", "51 - MARNE", "52 - HAUTE-MARNE", "53 - MAYENNE", "54 - MEURTHE-ET-MOSELLE", "55 - MEUSE", "56 - MORBIHAN", "57 - MOSELLE", "58 - NIEVRE", "59 - NORD", "60 - OISE", "61 - ORNE", "62 - PAS-DE-CALAIS", "63 - PUY-DE-DOME", "64 - PYRENEES-ATLANTIQUES", "65 - HAUTES-PYRENEES", "66 - PYRENEES-ORIENTALES", "67 - BAS-RHIN", "68 - HAUT-RHIN", "69 - RHONE", "70 - HAUTE-SAONE", "71 - SAONE-ET-LOIRE", "72 - SARTHE", "73 - SAVOIE", "74 - HAUTE-SAVOIE", "75 - PARIS", "76 - SEINE-MARITIME", "77 - SEINE-ET-MARNE", "78 - YVELINES", "79 - DEUX-SEVRES", "80 - SOMME", "81 - TARN", "82 - TARN-ET-GARONNE", "83 - VAR", "84 - VAUCLUSE", "85 - VENDEE", "86 - VIENNE", "87 - HAUTE-VIENNE", "88 - VOSGES", "89 - YONNE", "90 - TERRITOIRE-DE-BELFORT", "91 - ESSONNE", "92 - HAUTS-DE-SEINE", "93 - SEINE-SAINT-DENIS", "94 - VAL-DE-MARNE", "95 - VAL-D'OISE", "972 - MARTINIQUE", "974 - LA REUNION"];
    };

    async autocompleteCities({ query, department }): Promise<string[]> {
        const params = new URLSearchParams({
            q: query,
            department
        });

        const res = await fetch(`${this.url}/cities/search?${params.toString()}`);
        return res.json();
    };

    async autocompleteNeighbours({ query, region, department, city }): Promise<string[]> {

        const params = new URLSearchParams({
            q: query,
            region,
            department,
            city,
            page: '1',
            size: '5'
        });

        const res = await fetch(`${this.url}/neighbours?${params.toString()}`);
        return res.json();
    };
}

class FakeAutocompletor implements Autocompletor {

    constructor(private readonly delay: number) { }

    async autocompleteRegions({ query }: { query: any }): Promise<string[]> {
        return new Promise(resolve => setTimeout(() => resolve(["AUVERGNE-RHONE-ALPES", "BOURGOGNE-FRANCHE-COMTE", "BRETAGNE", "CENTRE-VAL DE LOIRE", "CORSE", "GRAND EST", "HAUTS-DE-FRANCE", "ILE-DE-FRANCE", "LA REUNION", "MARTINIQUE", "NORMANDIE", "NOUVELLE-AQUITAINE", "OCCITANIE", "PAYS DE LA LOIRE", "PROVENCE-ALPES-COTE D'AZUR"]), this.delay));
    };

    async autocompleteDepartments({ query, region }): Promise<string[]> {
        return new Promise(resolve => setTimeout(() => resolve(["01 - AIN", "02 - AISNE", "03 - ALLIER", "04 - ALPES-DE-HAUTE-PROVENCE", "05 - HAUTES-ALPES", "06 - ALPES-MARITIMES", "07 - ARDECHE", "08 - ARDENNES", "09 - ARIEGE", "10 - AUBE", "11 - AUDE", "12 - AVEYRON", "13 - BOUCHES-DU-RHONE", "14 - CALVADOS", "15 - CANTAL", "16 - CHARENTE", "17 - CHARENTE-MARITIME", "18 - CHER", "19 - CORREZE", "21 - COTE-D'OR", "22 - COTES-D'ARMOR", "23 - CREUSE", "24 - DORDOGNE", "25 - DOUBS", "26 - DROME", "27 - EURE", "28 - EURE-ET-LOIR", "29 - FINISTERE", "2A - CORSE-DU-SUD", "2B - HAUTE-CORSE", "30 - GARD", "31 - HAUTE-GARONNE", "32 - GERS", "33 - GIRONDE", "34 - HERAULT", "35 - ILLE-ET-VILAINE", "36 - INDRE", "37 - INDRE-ET-LOIRE", "38 - ISERE", "39 - JURA", "40 - LANDES", "41 - LOIR-ET-CHER", "42 - LOIRE", "43 - HAUTE-LOIRE", "44 - LOIRE-ATLANTIQUE", "45 - LOIRET", "46 - LOT", "47 - LOT-ET-GARONNE", "48 - LOZERE", "49 - MAINE-ET-LOIRE", "50 - MANCHE", "51 - MARNE", "52 - HAUTE-MARNE", "53 - MAYENNE", "54 - MEURTHE-ET-MOSELLE", "55 - MEUSE", "56 - MORBIHAN", "57 - MOSELLE", "58 - NIEVRE", "59 - NORD", "60 - OISE", "61 - ORNE", "62 - PAS-DE-CALAIS", "63 - PUY-DE-DOME", "64 - PYRENEES-ATLANTIQUES", "65 - HAUTES-PYRENEES", "66 - PYRENEES-ORIENTALES", "67 - BAS-RHIN", "68 - HAUT-RHIN", "69 - RHONE", "70 - HAUTE-SAONE", "71 - SAONE-ET-LOIRE", "72 - SARTHE", "73 - SAVOIE", "74 - HAUTE-SAVOIE", "75 - PARIS", "76 - SEINE-MARITIME", "77 - SEINE-ET-MARNE", "78 - YVELINES", "79 - DEUX-SEVRES", "80 - SOMME", "81 - TARN", "82 - TARN-ET-GARONNE", "83 - VAR", "84 - VAUCLUSE", "85 - VENDEE", "86 - VIENNE", "87 - HAUTE-VIENNE", "88 - VOSGES", "89 - YONNE", "90 - TERRITOIRE-DE-BELFORT", "91 - ESSONNE", "92 - HAUTS-DE-SEINE", "93 - SEINE-SAINT-DENIS", "94 - VAL-DE-MARNE", "95 - VAL-D'OISE", "972 - MARTINIQUE", "974 - LA REUNION"]), this.delay));
    };

    async autocompleteCities(params: { query: string; department: string;}): Promise<string[]> {

        const pages = [
            ["Nantes", "Paris", "Arras", "Vernon", "Melun"],
            ["Lille", "Dijon", "Lyon", "Reims", "Calais",]
        ];

        return new Promise(resolve => setTimeout(() => resolve(pages[0]), this.delay));
    }

    async autocompleteNeighbours(params: { query: string; region: string; department: string; city: string; }): Promise<string[]> {
        return new Promise(resolve => setTimeout(() => resolve(["Barbès mon amour", "Pigalle c'est génial", "Manoir Pietrzyk", "Domaine Etancelin", "Watenberg Plaza"]), this.delay));
    }
}

export const autocompleteService: Autocompletor = new BackendAutocompletor('http://vps-2f3ff050.vps.ovh.net:8080/api');
//export const autocompleteService: Autocompletor = new FakeAutocompletor(500);