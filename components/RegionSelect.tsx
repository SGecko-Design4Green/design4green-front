import { useState } from "react";
import { useQuery } from "react-query";
import { autocompleteService } from "../services/autocomplete-service";

import { Select } from "./Select";


export default function RegionSelect({ onChange }) {
    const [regionQuery, setRegionQuery] = useState('');
    const { data: regions, status } = useQuery<string[]>(`regions-${regionQuery}`, () => autocompleteService.autocompleteRegions({ query: regionQuery}));

    return <Select
        data={regions}
        onInputValueChange={setRegionQuery}
        onSelectedItemChange={onChange}
        text="Choisissez une region:"
        status={status}
    />
}