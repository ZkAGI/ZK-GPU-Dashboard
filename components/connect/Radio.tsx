import { useId } from "react";

interface RadioProps {
    value: string
    text: string
    name: string
    checked?: boolean
    onChange?: (isChecked: boolean) => any
}

export function Radio(props: RadioProps) {
    const { text, value, name, checked, onChange } = props
    const id = useId()

    return <div className="flex space-x-2">
        <input
            type="radio"
            id={id}
            value={value}
            name={name}
            checked={checked}
            onClick={e => {
                if ((e.target as any).checked) {
                    onChange && onChange((e.target as any).value)
                }
            }} />
        <label htmlFor={id}>{text}</label>
    </div>
}