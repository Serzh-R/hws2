import React, {
    SelectHTMLAttributes,
    DetailedHTMLProps,
    ChangeEvent,
} from 'react'
import s from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>

export type OptionType = {
    id: number
    value: string
}

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: OptionType[]
    onChangeOption?: (option: number) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = ({
                                                         options,
                                                         className,
                                                         onChange,
                                                         onChangeOption,
                                                         ...restProps
                                                     }) => {

// Тип для элемента массива options
    type MappedOptionType = React.ReactNode;

// Тип для массива options
    type MappedOptionsType = MappedOptionType[];


    const mappedOptions: any[] = options
    /*const mappedOptions: MappedOptionsType = options*/
        ? options.map((o) => (
            <option
                id={'hw7-option-' + o.id}
                className={s.option}
                key={o.id}
                value={o.id}
            >
                {o.value}
            </option>
        ))
        : []
    // map options with key

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            onChangeOption?.(value);
            onChange?.(e)
        }
    }

    const finalSelectClassName = s.select + (className ? ' ' + className : '')

    return (
        <select
            className={finalSelectClassName}
            onChange={onChangeCallback}
            {...restProps}
        >
            {mappedOptions}
        </select>
    )
}

export default SuperSelect
