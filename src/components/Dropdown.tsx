import { useState, Attributes } from "react"

type Option = {
    value: string,
    label: string
}

interface DropdownProps {
    options: Option[],
    onChange?: any
}

export const Dropdown = ({ options, onChange } : DropdownProps) => {
    const [selected, setSelected] = useState(options[0].value)
    
    return <select
        value={selected}
        onChange={e => {
            setSelected(e.target.value)
            {onChange}
        }}
        >
            {
                options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))
            }
    </select>
} 