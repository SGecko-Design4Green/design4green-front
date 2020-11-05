
export interface Autocompletor {
    readonly autocompleteRegions: (params: { query: string }) => Promise<string[]>;
    readonly autocompleteDepartments: (params: { query: string, region: string }) => Promise<string[]>;
    readonly autocompleteCities: (params: { query: string, region: string, department: string }) => Promise<string[]>;
    readonly autocompleteNeighbours: (params: { query: string, region: string, department: string, city: string }) => Promise<string[]>;
}

class BackendAutocompletor implements Autocompletor {

    constructor(private readonly url: string) { }

    async autocompleteRegions({ query }: { query: any }): Promise<string[]> {
        const params = new URLSearchParams({
            q: query
        })
        const res = await fetch(`${this.url}/regions`);
        return res.json();
    };

    async autocompleteDepartments({ query, region }): Promise<string[]> {
        const params = new URLSearchParams({
            q: query,
            region,
            page: '1',
            size: '5'
        })
        const res = await fetch(`${this.url}/departments?${params.toString()}`);
        return res.json();
    };

    async autocompleteCities({ query, region, department }): Promise<string[]> {

        const params = new URLSearchParams({
            q: query,
            region,
            department,
            page: '1',
            size: '5'
        });

        const res = await fetch(`${this.url}/cities?${params.toString()}`);
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
        return new Promise(resolve => setTimeout(() => resolve(["Ile de france", "PACA", "Normandie", "Bretagne", "Arras (l'andouillette)"]), this.delay));
    };

    async autocompleteDepartments({ query, region }): Promise<string[]> {
        return new Promise(resolve => setTimeout(() => resolve(["Calvados", "Finistere", "Eure", "Ain", "Aine"]), this.delay));
    };

    async autocompleteCities(params: { query: string; region: string; department: string; }): Promise<string[]> {
        return new Promise(resolve => setTimeout(() => resolve(["Nantes", "Paris", "Arras", "Vernon", "Melun"]), this.delay));
    }

    async autocompleteNeighbours(params: { query: string; region: string; department: string; city: string; }): Promise<string[]> {
        return new Promise(resolve => setTimeout(() => resolve(["Barbès mon amour", "Pigalle c'est génial", "Manoir Pietrzyk", "Domaine Etancelin", "Watenberg Plaza"]), this.delay));
    }
}

export const autocompleteService: Autocompletor = new BackendAutocompletor('http://vps-2f3ff050.vps.ovh.net:8443/api');
// export const autocompleteService: Autocompletor = new FakeAutocompletor(500);