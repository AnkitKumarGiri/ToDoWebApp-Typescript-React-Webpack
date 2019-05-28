import * as React from 'react';

interface ListItemProps {
    index: number,
    onSelect: (index: number) => void,
    onDelete: (index: number) => void,
    classVal: string,
    value: string,
    checked: boolean,
}

class ListItem extends React.PureComponent<ListItemProps, {}> {

    handleChange = () => {
        this.props.onSelect(this.props.index);
    }

    
    handleClick = () => {
        this.props.onDelete(this.props.index);
    }

    render(){
        return (
            <li className = {this.props.classVal} >
                <input
                    type = "checkbox"
                    onChange= { this.handleChange }
                    checked = {this.props.checked}
                />
                <div className = "select-list-item"  >
                    {this.props.value}
                </div>
                <div>   </div>
                <a
                    href = "#"
                    className = "delete-list-item"
                    onClick= { this.handleClick }
                >X</a>
            </li>
        )
    }
}

export default ListItem;