import { useEffect, useState } from "react";
import { Select } from "./Select";


export default function CitySelect({ region, department, onChange, cities: data, citiesStatus }) {
    const [cityQuery, setCityQuery] = useState('');

    const dataAsArray = data ? Object.keys(data) : [];
    const [cities, setCities] = useState(dataAsArray);

    useEffect(() => {
        if (data)
        setCities(Object.keys(data));
    }, [data]);

    const onInputValueChange = (query) => {
        setCities(dataAsArray.filter(city => city.includes(query.toUpperCase())));
        setCityQuery(query);
    }

    return <>
        <Select
            data={cities.slice(0, Math.min(10, cities.length))}
            onInputValueChange={onInputValueChange}
            onSelectedItemChange={onChange}
            text="Choisissez une ville:"
            status={citiesStatus}
            inputValue={cityQuery}
        />
    </>;
}