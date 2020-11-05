import { useCombobox, useSelect } from "downshift";
import { useState } from "react";
import { useQuery } from "react-query";
import { autocompleteService } from "../services/autocomplete-service";
import { Select } from "./Select";

export default function DepartmentSelect({region, onChange}) {
  const [departementQuery, setDepartementQuery] = useState('');
  // const queryId = `departements-${region + departementQuery}`;
  const { data, status } = useQuery<string[]>('departments', () => autocompleteService.autocompleteDepartments({query: departementQuery, region}));

  return <Select
      data={data}
      onInputValueChange={setDepartementQuery}
      onSelectedItemChange={onChange}
      text="Choisissez un departement:"
      status={status}
  />;
}