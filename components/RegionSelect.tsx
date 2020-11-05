import { useState } from "react";
import { useQuery } from "react-query";
import { autocompleteService } from "../services/autocomplete-service";

import { InMemorySelect, Select } from "./Select";


export default function RegionSelect({ onChange, regions }) {
    // const [regionQuery, setRegionQuery] = useState('');
    // const { data: regions, status } = useQuery<string[]>(`regions`, () => autocompleteService.autocompleteRegions({ query: regionQuery}), );

    return <InMemorySelect
        data={regions}
        onSelectedItemChange={onChange}
        text="Choisissez une region:"
    />;
}
