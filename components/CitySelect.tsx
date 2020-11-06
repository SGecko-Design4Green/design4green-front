import { useState } from "react";
import { useQuery } from "react-query";
import { autocompleteService } from "../services/autocomplete-service";
import { Select } from "./Select";


export default function CitySelect({ region, department, onChange, disabled = false}) {
    const [cityQuery, setCityQuery] = useState('');
    const { data, status } = useQuery<string[]>(
        `cities-${region}-${department}-${cityQuery}`,
        () => autocompleteService.autocompleteCities({ query: cityQuery, region, department })
    );

    return <Select
        data={data}
        onInputValueChange={setCityQuery}
        onSelectedItemChange={onChange}
        text="Choisissez une ville:"
        status={status}
        disabled={disabled}
    />;
}