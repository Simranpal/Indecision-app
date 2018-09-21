class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options :['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4']
        };
    }
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
    handleDeleteOption(optionToRemove) {
        this.setState((prevState)=>({
            options : prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
        
    }
    handleDeleteOptions(){
        this.setState(()=>{
            return{
                options:[]
            };
        });
    }
    handlePick(){
            const randomNo = Math.floor(Math.random() * this.state.options.length);
            const option = this.state.options[randomNo];
            alert(option);
    }
    handleAddOption(option){
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
    }
    render() {
        const title = 'Indecision';
        const subTitle = 'Put your life in the hands of a computer';
        return (
            <div>
            <Header/>
            <Action 
                hasOptions ={this.state.options.length > 0}
                handlePick ={this.handlePick}
                />
            <Options 
                options = {this.state.options}
                handleDeleteOptions = {this.handleDeleteOptions}
                handleDeleteOption = {this.handleDeleteOption}
                />
            <AddOption
                handleAddOption = {this.handleAddOption}
            />
        </div>
        );
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subTitle}</h2>
            </div>
    );
}

Header.defaultProps = {
    title: 'Indecision',
    subTitle : 'Put your life in the hands of a computer'
};

const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.handlePick}
                disabled = {!props.hasOptions}
                >
                What should I do? 
                </button>
        </div>
    );
}

const Options = (props) =>{
    return (
        <div>
            <button onClick ={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            <ol>
            {
                props.options.map((option) => (
                    <Option 
                    key ={option} 
                    optionText = {option} 
                    handleDeleteOption = {props.handleDeleteOption}
                    />
                ))
            }</ol>
        </div>
    );
}

const Option = (props) =>{
    return (
        <div>
          <li>{props.optionText}</li>
          <button onClick = {(e)=>{
            props.handleDeleteOption(props.optionText);
          }} 
          >
          remove </button>
        </div>
    );
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleAddOption (e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error  = this.props.handleAddOption(option);
        
        this.setState(()=> {
            return {
                error : error
            }
        });
        if(!error) {
            e.target.elements.option.value = '';
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                 </form>
            </div>
        );
    }
}

const MyComponent = (props) =>{
    return(
        <div>
            <p>User:{props.name} </p>
            <p>Age : {props.age} </p>
        </div>
    );
}
ReactDOM.render(<IndecisionApp/ >, document.getElementById('app'));