import * as React from 'react';

interface InputRowProps {
    placeholder: string,
    maxLength: number,
    onChange: (e: React.BaseSyntheticEvent) => void,
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement> ) => void,
    value: string
    onClick: () => void
}

function InputRow(props: InputRowProps): JSX.Element{
    return (
        <div className = "input-row">
            <input 
                id = "to-do-input"
                type = "text"
                placeholder = {props.placeholder}
                maxLength = {props.maxLength}
                onChange = {props.onChange}
                onKeyPress = {props.onKeyPress}
                value = {props.value}
            ></input>
            <button 
                id="enter"
                onClick = {props.onClick}
            >Add</button>
        </div>
    )
}

export default InputRow;

