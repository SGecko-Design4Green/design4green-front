import { useCombobox } from "downshift";
import { useEffect, useState } from "react";
import { QueryStatus } from "react-query";
import { Box, Flex } from "rebass";
import Input from "./presentational/Input";
import Button from "./presentational/Button";
import { useWindow } from "../contexts/browser-context";
import { MOBILE_WIDTH } from "../constants/constants";

export interface SelectProps {
    readonly text: string;
    readonly onSelectedItemChange: (item: any) => void;
    readonly data?: string[];
    readonly onInputValueChange: (item: any) => void;
    readonly status: QueryStatus
    readonly inputValue?: string;
}

export function InMemorySelect(props: Omit<SelectProps, 'status' | 'onInputValueChange' | 'inputValue'>) {
    const [inputValue, setInputValue] = useState('');
    const [matchingData, setMatchingData] = useState([...props.data]);

    useEffect(() => {
        setMatchingData([...props.data]);
        setInputValue('');
    }, [props.data]);

    return <Select {...props}
        data={matchingData}
        status={QueryStatus.Success}
        onInputValueChange={(inputValue: string) => {
            setInputValue(inputValue);
            setMatchingData(props.data.filter(d => d.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())))
        }}
        inputValue={inputValue}
    />;
}


export function Select({ text, onSelectedItemChange, data, onInputValueChange, status, inputValue }: SelectProps) {
    const [isInputFocused, setIsInputFocused] = useState(false);

    const {innerWidth} = useWindow();
    const isDesktopWidth = innerWidth > MOBILE_WIDTH;


    const {
        isOpen,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        highlightedIndex,
        getItemProps
    } = useCombobox({
        items: data || [],
        onInputValueChange: ({ inputValue }) => {
            onInputValueChange(inputValue);
        },
        onSelectedItemChange: ({ selectedItem }) => {
            onSelectedItemChange(selectedItem);
        },
        inputValue: inputValue
    })

    return <Box className='no-print'>
        <label {...getLabelProps()} style={{ fontWeight: 'bold' }}>{text}</label>
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
        {/*Menu */}
        <Box {...getMenuProps()} sx={{
            border: "1px solid",
            borderColor: 'Medium',
            visibility: !isOpen ? 'hidden' : undefined,
            position: 'absolute',
            background: 'White',
            width: isDesktopWidth ? '24.2%' : '98.1%'
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