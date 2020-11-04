import { useCombobox, useSelect } from "downshift";
import { useState } from "react";
import { useQuery } from "react-query";

const autocompleteDepartments = async ({query}) : Promise<string[]> => {
    return new Promise(resolve => setTimeout(() => resolve(["Calvados", "Finistere", "Eure", "Ain", "Aine"]), 500));
    /*const res = await fetch(`https://localhost:8000/api/department?q=${query}&region=${region}&page=1&size=5`);
    return res.json();*/
  };

export default function DeparmentSelect({onChange}) {
    const [departmentQuery, setDepartmentQuery] = useState('');
    const { data: departments, status } = useQuery<string[]>(`department-${departmentQuery}`, autocompleteDepartments);

      
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
        items: departments || [],
        onInputValueChange: ({inputValue}) => {
            setDepartmentQuery(inputValue);
        },
        onSelectedItemChange: ({selectedItem}) =>{
            onChange(selectedItem);
        }
      })
    
    return <div>
      <label {...getLabelProps()}>Choisissez un departement:</label>
      <div {...getComboboxProps()}>
        <input {...getInputProps()} />
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label={'toggle menu'}
        >
          &#8595;
        </button>
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          (departments || []).map((region, index) => (
            <li
              style={
                highlightedIndex === index ? {backgroundColor: '#bde4ff'} : {}
              }
              key={`${region}${index}`}
              {...getItemProps({item: region, index})}
            >
              {region}
            </li>
          ))}
      </ul>
    </div>;
}