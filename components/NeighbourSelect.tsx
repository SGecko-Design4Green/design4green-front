import { useState } from "react";
import { useQuery } from "react-query";
import { autocompleteService } from "../services/autocomplete-service";

import { Select } from "./Select";


export default function NeighbourSelect({ region, department, city, onChange }) {
    const [neighbourQuery, setNeighbourQuery] = useState('');
    const { data: neighbours, status } = useQuery<string[]>(
        `neighbours-${neighbourQuery}`,
        () => autocompleteService.autocompleteNeighbours({ query: neighbourQuery, region, department, city })
    );

    return <Select
        data={neighbours}
        onInputValueChange={setNeighbourQuery}
        onSelectedItemChange={onChange}
        text="Choisissez un nom Iris:"
        status={status}
    />;
}