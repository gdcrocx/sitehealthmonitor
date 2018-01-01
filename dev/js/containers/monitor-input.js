import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextFieldGroup from '../components/TextFieldGroup';
import { addMonitor, validateInput, logError } from '../actions/monitors';
import shortid from 'shortid';
import isEmpty from 'lodash/isEmpty';

class MonitorInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMonitorName: 'DEMO',
            newMonitorUrl: 'http://127.0.0.1/',
            isActive: false,
            isLoading: false,
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    isValidInput() {
        const { errors, isValid } = validateInput({ name: this.state.newMonitorName, url: this.state.newMonitorUrl });
        if (!isValid) {            
            // For Redux State
            this.props.logError({ errors: errors });
            //For React State
            this.setState({ errors: errors });
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValidInput()) {
            this.setState({ isLoading: true });
            if (!isEmpty(this.props.monitors)) {                
                const isValid = () => {                    
                    let isValid = true;
                    // console.log("Monitors : " + JSON.stringify(this.props.monitors.monitorList));
                    // console.log("Length : " + this.props.monitors.monitorList.length);
                    for (let index = 0; index < this.props.monitors.monitorList.length; index++) {
                        if (this.state.newMonitorUrl === this.props.monitors.monitorList[index].url) {                        
                            isValid = false;
                        }
                    }
                    return isValid;
                }
                if (isValid()) {
                    // For Redux State
                    this.props.addMonitor({ errors: {}, monitor: { id: shortid.generate(), isActive: true, url: this.state.newMonitorUrl, name: this.state.newMonitorName } });
                    // For React State
                    this.setState({ errors: {}, isLoading: true, monitor: { isActive: true, newMonitorUrl: this.state.newMonitorUrl, newMonitorName: this.state.newMonitorName } });                    
                }
                else {                                        
                    this.setState({ errors: "Duplicate entry. Skipping.." });                    
                    this.props.logError({ errors: { url: "Duplicate entry. Skipping.." } });
                }
            }
            else {                
                // For Redux State
                this.props.addMonitor({ errors: {}, monitor: { id: shortid.generate(), isActive: true, url: this.state.newMonitorUrl, name: this.state.newMonitorName } });
                // For React State
                this.setState({ errors: {}, isLoading: true, monitor: { isActive: true, newMonitorUrl: this.state.newMonitorUrl, newMonitorName: this.state.newMonitorName } });
            }
        }
        this.setState({ isLoading: false });
    }

    render() {
        const { newMonitorName, newMonitorUrl, errors, isActive, isLoading } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                {/* <TextFieldGroup
                    field="newMonitorName"
                    label="Module Name"
                    value={this.state.newMonitorName}
                    error="None"
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="newMonitorUrl"
                    label="Module URL"
                    value={this.state.newMonitorUrl}
                    error="None"
                    onChange={this.onChange}
                /> */}
                <input type="text" name="newMonitorName" value={this.state.newMonitorName} onChange={this.onChange} />
                <br />
                <input type="text" name="newMonitorUrl" value={this.state.newMonitorUrl} onChange={this.onChange} />
                <br />
                <button type="submit" className="button-primary" disabled={this.state.isLoading}>Add New Monitor</button>
                <button type="reset" className="button-danger">Cancel</button>
            </form>
        );
    }
}

MonitorInput.propTypes = {
    addMonitor: React.PropTypes.func.isRequired,
    logError: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        monitors: state.monitors
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ addMonitor: addMonitor, logError: logError }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MonitorInput);