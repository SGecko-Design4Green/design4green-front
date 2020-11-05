import { useCombobox, useSelect } from "downshift";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { autocompleteService } from "../services/autocomplete-service";
import { InMemorySelect } from "./Select";


export default function DepartmentSelect({ onChange, departments }) {
  // const [departementQuery, setDepartementQuery] = useState('');
  // const queryId = `departements-${region + departementQuery}`;
  // const { data, status } = useQuery<string[]>('departments', () => autocompleteService.autocompleteDepartments({query: departementQuery, region}));

  return <InMemorySelect
    data={departments}
    onSelectedItemChange={onChange}
    text="Choisissez un departement:"
  />;
}