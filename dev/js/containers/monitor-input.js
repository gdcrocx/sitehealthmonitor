import React, {Component} from 'react';
import {bindActionCreators} from 'redux'; 
import {connect} from 'react-redux';
import {TextFieldGroup} from '../components/TextFieldGroup'
import {addMonitor, validateInput} from '../actions/monitors';

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class MonitorInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMonitorName: 'DEMO',
            newMonitorUrl: 'http://127.0.0.1/',
            isActive: true,
            isLoading: false,
            errors: {}            
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) { 
        this.setState({ [e.target.name]: e.target.value });    
    }

    isValid() {
        console.log("Local State Before: " + JSON.stringify(this.state));
        const { errors, isValid } = validateInput(this.state.newMonitorUrl);
        // console.log(errors);
        // console.log(isValid);
        if (!isValid) {
            this.setState({ errors: errors });
        }
        console.log("Local State After : " + JSON.stringify(this.state));
        return isValid;
    }

    onSubmit(e) { 
        e.preventDefault();
        // setTimeout(function() {
        if(this.isValid()) {            
            this.setState({ errors: {}, isLoading: true });
            this.setState({ newMonitorUrl: this.state.newMonitorUrl })
        } else {
            console.log("Input is Invalid");
            console.log(this.state);
        }
        // }, 3000);
        // setTimeout(3000);
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <TextFieldGroup                    
                    field="name"
                    label="Module Name"
                    value={this.state.newMonitorName}
                    error={this.state.errors}
                    onChange={this.onChange}
                />
                <input type="text" name="newMonitorName" value={this.state.newMonitorName} onChange={this.onChange} />  
                <br/>
                <input type="text" name="newMonitorUrl" value={this.state.newMonitorUrl} onChange={this.onChange} />   
                <br/>
                <button type="submit" className="button-primary" disabled={this.state.isLoading}>Add New Monitor</button>
                <button type="reset" className="button-danger">Cancel</button>
            </form>
        );
    }
}

MonitorInput.propTypes = {
    addMonitor: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {    
    return {
        monitors: state.monitors
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({addMonitor: addMonitor}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MonitorInput);