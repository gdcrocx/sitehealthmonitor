import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { checkStatus, deleteMonitor } from '../actions/monitors';

class Monitors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            url: '',
            isActive: false,
            isLoading: false,
            errors: {}            
        }        
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) { 
        e.preventDefault();
        this.setState({ isLoading: true });
        this.props.deleteMonitor({id: e.target.name})
        this.setState({ isLoading: false });                
    }

    renderList() {        
        const errors = {};
        if (!isEmpty(this.props.monitors)) {
            const monitorTable = this.props.monitors.monitorList.map((monitor) => {
                return (
                    <tr key={monitor.id}>
                        <td>{monitor.name}</td>
                        <td>{monitor.url}</td>
                        <td className={ classnames({ 'status-success': monitor.isActive }, { 'status-failure': !monitor.isActive }) }><input type="checkbox" checked={monitor.isActive} readOnly /></td>
                        <td><button name={monitor.id} className="button-danger" onClick={this.onClick} disabled={this.state.isLoading}>Remove</button></td>
                    </tr>
                );
            });
            return monitorTable
        }
    }

    render() {
        return (
            <div>
                <h2>Status Checks</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Module</th>
                            <th>URL</th>
                            <th>Status</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
            </div>
        );
    }
}

Monitors.propTypes = {
    checkStatus: React.PropTypes.func.isRequired,
    deleteMonitor: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {    
    return {
        monitors: state.monitors
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ checkStatus: checkStatus, deleteMonitor: deleteMonitor }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Monitors);