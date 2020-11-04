import { useCombobox, useSelect } from "downshift"; ///https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect
import { useState } from "react";
import { useQuery } from "react-query";

import { Button} from "rebass";
import { Input} from "rebass/forms";

const autocompleteRegions = async ({ query }): Promise<string[]> => {
    return new Promise(resolve => setTimeout(() => resolve(["Ile de france", "PACA", "Normandie", "Bretagne"]), 500));
    /* const res = await fetch(`https://localhost:8000/api/regions?q=${query}&page=1&size=5`);
    return res.json(); */
};

export default function RegionSelect({ onChange }) {
    const [regionQuery, setRegionQuery] = useState('');
    const { data: regions, status } = useQuery<string[]>(`regions-${regionQuery}`, autocompleteRegions);

    const {
        isOpen,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        highlightedIndex,
        getItemProps,
    } = useCombobox({
        items: regions || [],
        onInputValueChange: ({ inputValue }) => {
            setRegionQuery(inputValue);
        },
        onSelectedItemChange: ({ selectedItem }) => {
            onChange(selectedItem);
        }
    })

    return <div className="form-group">
        <label {...getLabelProps()}>Choisissez une region:</label>
        <div {...getComboboxProps()} className="input-group">
            <Input {...getInputProps()} />
            <div className="input-group-append">
                <Button
                    type="button"
                    {...getToggleButtonProps()}
                    aria-label={'toggle menu'}
                >
                    &#8595;
            </Button>
            </div>

        </div>
        <ul {...getMenuProps()}>
            {isOpen &&
                (regions || []).map((region, index) => (
                    <li
                        style={
                            highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
                        }
                        key={`${region}${index}`}
                        {...getItemProps({ item: region, index })}
                    >
                        {region}
                    </li>
                ))}
        </ul>
    </div>;
}