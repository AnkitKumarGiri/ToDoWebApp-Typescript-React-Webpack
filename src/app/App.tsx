import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import ListItem from './ListItem';
import InputRow from './InputRow';

interface ListState {
    todos: {
        text: string,
        display: boolean
    }[],
    completed: {
        text: string,
        display: boolean
    }[],
    input_box_text: string,
}

class List extends React.Component<{}, ListState> {

    constructor(props: any){
        super(props);
        this.state = {
           todos:[{
            text: null,
            display: false,
           }],
           completed:[{
            text: null,
            display: false,
           }],
           input_box_text: '',
        };
        this.onSelectToDo = this.onSelectToDo.bind(this);
        this.onDeleteToDo = this.onDeleteToDo.bind(this);
        this.onSelectCompleted = this.onSelectCompleted.bind(this);
        this.onDeleteCompleted = this.onDeleteCompleted.bind(this);
    }

    onInputChange = (e: React.BaseSyntheticEvent) => {
        this.setState({
            input_box_text: e.target.value.toUpperCase()
        })
    }
    refreshInput(){
        this.setState({
            input_box_text: '',
        })
    }
    addNewItem = () => {
        const  new_item = this.state.input_box_text;
        if(new_item.length === 0) {
            return;
        }

        const todos = this.state.todos.slice();
        this.setState({
            todos: todos.concat([{
                text: new_item,
                display: true,
            }]),
        })
        this.refreshInput();
    }

    onKeyPress = (e: React.KeyboardEvent<HTMLInputElement> ) => {
        if(e.key === 'Enter'){
            this.addNewItem();
        }
    }
    
    renderInputRow(){
        return (
            <InputRow
                maxLength = {27}
                onChange = {this.onInputChange}
                placeholder = {"New Item..."}
                onClick = {this.addNewItem}
                onKeyPress = {this.onKeyPress}
                value = {this.state.input_box_text}
            />
        );
    }
    
    onDeleteToDo(num: number){
        const todos = this.state.todos.slice();
        todos[num].display = false;
        this.setState({
            todos: todos,
        });
    }

    onDeleteCompleted(num: number){
        const completed = this.state.completed.slice();
        completed[num].display = false;
        this.setState({
            completed: completed,
        });
    }

    onSelectToDo(num: number){
        const new_item = this.state.todos[num].text;
        if(new_item.length === 0)
            return;
        const completed = this.state.completed.slice();
        this.setState({
            completed: completed.concat([{
                text: new_item,
                display: true,
            }]),
        });
        this.onDeleteToDo(num);
    }
    
    onSelectCompleted(num: number){
        const new_item = this.state.completed[num].text;
        if(new_item.length === 0)
            return;
        const todos = this.state.todos.slice();
        this.setState({
            todos: todos.concat([{
                text: new_item,
                display: true,
            }]),
        });
        this.onDeleteCompleted(num);
    }

    onClearToDo = () => {
        this.setState({
            todos:[{
                text: null,
                display: false,
               }], 
        })
    }

    onClearCompleted = () =>{
        this.setState({
            completed:[{
                text: null,
                display: false,
               }], 
        })
    }

    render() {

        const todos = this.state.todos;
        const completed = this.state.completed;
        
        const todo_list = todos.map((item, num) => {
            // console.log(item);
            // console.log(num);
            const text = item.text;
            const display = item.display ? 'show list' : 'hide list';
            const checked = false;
            return (
                <ListItem
                    key = {num.toString()}
                    index = {num}
                    value = {text}
                    onSelect = { this.onSelectToDo }
                    onDelete = { this.onDeleteToDo }
                    classVal = {display}
                    checked = {checked}
                />
            )
        });
        
        const completed_list = completed.map((item, num) => {
            // console.log(item);
            // console.log(num);
            const text = item.text;
            const display = item.display ? 'show list' : 'hide list';
            const checked = true;
            return (
                <ListItem
                    key = {num.toString()}
                    index = {num}
                    value = {text}
                    onSelect = { this.onSelectCompleted }
                    onDelete = { this.onDeleteCompleted }
                    classVal = {display}
                    checked = {checked}
                />
            )
        });

        return (
            <div className = "list">
                <div className = "things-to-do">
                    <div className = "heading" >
                        <h1> To Do List </h1>
                    </div> 
                    {this.renderInputRow()}
                    <ul>{todo_list}</ul>
                    <div className = "clear-list">
                        <button onClick= {this.onClearToDo}>Clear todos</button>
                    </div>
                </div>

                <div className = "done">
                    <h1> Completed List </h1>
                    <ul>{completed_list}</ul>
                    <div className = "clear-list">
                        <button onClick= {this.onClearCompleted}>Clear Completed</button>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <List />,
    document.getElementById('root')
);