import { useCombobox } from "downshift";
import { useState } from "react";
import { QueryStatus } from "react-query";
import { Box, Flex } from "rebass";
import Input from "./presentational/Input";
import Button from "./presentational/Button";

export interface SelectProps {
    readonly text: string;
    readonly onSelectedItemChange: (item: any) => void;
    readonly data?: any[];
    readonly onInputValueChange: (item: any) => void;
    readonly status: QueryStatus
}

export function Select({ text, onSelectedItemChange, data, onInputValueChange, status }: SelectProps) {
    const [isInputFocused, setIsInputFocused] = useState(false);

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
        items: data || [],
        onInputValueChange: ({ inputValue }) => {
            onInputValueChange(inputValue);
        },
        onSelectedItemChange: ({ selectedItem }) => {
            onSelectedItemChange(selectedItem);
        }
    })

    return <Box sx={{position: 'relative'}} className='no-print'>
        <label {...getLabelProps()} style={{fontWeight: 'bold'}}>{text}</label>
        <Flex {...getComboboxProps()} sx={{
            outline: isInputFocused ? 'auto 1px' : undefined,
            outlineColor: 'Medium',
            marginTop: '5px'
        }}>
            <Box width={0.85}>
                <Input
                {...getInputProps()} 
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
             />
            </Box>
            <Box width={0.15}>
                <Button
                    type="button"
                    {...getToggleButtonProps()}
                    aria-label={'toggle menu'}
                >
                    &#8595;
            </Button>
            </Box>
        </Flex>
        <Box {...getMenuProps()} sx={{
            border: "1px solid",
            borderColor: 'Medium',
            visibility: !isOpen ? 'hidden' : undefined,
            position: 'absolute',
            background: 'White',
            width: '100%'
        }}
        ariaHidden={isOpen}
        >
        {isOpen && status === 'error' && (<>Une erreur est survenue, merci de bien vouloir reessayer</>)}
        {isOpen && status === 'loading' && (<>Chargement des donnees en cours...</>)}
        {isOpen &&
            (data || []).map((item, index) => (
                <Box
                    sx={{
                        padding: '7px',
                        backgroundColor: highlightedIndex === index ? 'Lighter grey' : 'White',
                        color: highlightedIndex === index ? 'Almost black' : 'Darker grey'
                    }}
                    key={`${item}${index}`}
                    {...getItemProps({ item: item, index })}
                >
                    {item}
                </Box>
            ))}
        </Box>
    </Box>;
}