import { useEffect, useState } from "react";
import { QueryStatus, useQuery } from "react-query";
import { autocompleteService } from "../services/autocomplete-service";

import { Select } from "./Select";


export default function NeighbourSelect({ region, department, city, onChange, districts }) {
    const [neighbourQuery, setNeighbourQuery] = useState('');
    const districtsDesignations = districts.map(district => district.designation);
    const [filteredDistricts, setFilteredDistricts] = useState(districtsDesignations);

    useEffect(() => {
        if (districtsDesignations) {
            districtsDesignations.filter(distrct => distrct && distrct.designation && distrct.designation.includes(neighbourQuery.toUpperCase()))
        }
    }, [neighbourQuery])
    

    return <><Select
        data={filteredDistricts}
        onInputValueChange={setNeighbourQuery}
        onSelectedItemChange={onChange}
        text="Choisissez un nom Iris:"
        status={QueryStatus.Success}
    /></>;
}