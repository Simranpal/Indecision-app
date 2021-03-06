import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        options :['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4'],
        selectedOption : undefined
    };
    //event handler methods
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState)=>({
            options : prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
        
    };
    handleDeleteOptions = ( ) => {
        this.setState(()=>{
            return{
                options:[]
            };
        });
    };
    handlePick = () => {
        const randomNo = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNo];
        this.setState(()=> {
            return{
                selectedOption : option
            };
        });
    };
    handleAddOption = (option) => {
        if(!option) {
            return 'Enter valid value to add item';
        }else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists';
        }
        //else
        this.setState((prevState)=> {
            return {
                options : prevState.options.concat(option)
            };
        });
    };
    handleClearSelectedOption =()=>{
        this.setState(()=> {
            return{
                selectedOption : undefined
            };
        });
    };

    componentDidMount(){
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
    
            if(options){
                this.setState(() => ({ options }));
            }
        }
        catch(e) {

        }
        
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    //render method
    render() {
        const title = 'Indecision';
        const subTitle = 'Put your life in the hands of a computer';
        return (
            <div>
            <Header/>
            <div className = "container">
                <Action 
                        hasOptions ={this.state.options.length > 0}
                        handlePick ={this.handlePick}
                        />
                <div className = "widget">
                    <Options 
                        options = {this.state.options}
                        handleDeleteOptions = {this.handleDeleteOptions}
                        handleDeleteOption = {this.handleDeleteOption}
                        />
                    <AddOption
                        handleAddOption = {this.handleAddOption}
                    />
                </div>
            </div>
            <OptionModal 
                selectedOption = {this.state.selectedOption}
                handleClearSelectedOption = {this.handleClearSelectedOption}
            />
        </div>
        );
    }
}