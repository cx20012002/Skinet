import React, {useState} from 'react'
import {ProductBrand, ProductType} from "../models/product";
import {Checkbox, FormControl, FormControlLabel} from "@mui/material";

interface Props {
    items: ProductBrand[] | ProductType[];
    checked?: ProductBrand[] | ProductType[];
    onChange: (items: ProductBrand[] | ProductType[]) => void;
}

function CheckBoxButton({items, checked, onChange}: Props) {
    const [checkedItems, setCheckedItems] = useState(checked || []);

    function handleChecked(id: number) {
        // setCheckedItems([{name:'', id}])
        const currentIndex = checkedItems.findIndex(item=>item.id == id);
        let newChecked: ProductBrand[] | ProductType[];
        if (currentIndex === -1) newChecked = [...checkedItems, {name: '', id}];
        else newChecked = checkedItems.filter(item => item.id !== id);
        setCheckedItems(newChecked);
        onChange(newChecked);
        // const currentIndex = checkedItems.findIndex(item => item.id === id);
        // let newChecked: string[];
        // if (currentIndex === -1) newChecked = [...checkedItems, id];
        // else newChecked = checkedItems.filter(item => item !== id.toString());
        // setCheckedItems(newChecked);
        // onChange(newChecked);
    }

    return (
        <FormControl>
            {items.map(({name, id}) => (
                <FormControlLabel
                    control={<Checkbox
                        // checked={checkedItems.indexOf(0) !== -1}
                        onClick={() => handleChecked(id)}
                    />}
                    label={name}
                    key={id}
                />
            ))}
        </FormControl>
    )
}

export default CheckBoxButton