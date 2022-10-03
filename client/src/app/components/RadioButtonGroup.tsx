import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";

interface Props {
    options: any[];
    onChange: (event: any) => void;
    selectedValue: string;
}

function RadioButtonGroup({options, onChange, selectedValue}: Props) {
    return (
        <FormControl component={"fieldset"}>
            <RadioGroup onChange={onChange} value={selectedValue}>
                {options.map(({value, label}) => (
                    <FormControlLabel control={<Radio/>} label={label} value={value} key={value}/>
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export default RadioButtonGroup;

