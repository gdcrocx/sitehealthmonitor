import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { checkStatus, deleteMonitor } from '../actions/monitors'; //taskScheduler

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
        this.props.deleteMonitor({ id: e.target.name })
        this.setState({ isLoading: false });
    }

    renderList() {
        const errors = {};
        if (!isEmpty(this.props.monitors)) {
            const monitorTable = this.props.monitors.monitorList.map((monitor) => {
                return (
                    <tr key={monitor.id}>
                        <td>{monitor.name}</td>
                        <td><a href={monitor.url} target="_blank">{monitor.url}</a></td>
                        <td className={classnames({ 'status-success': monitor.isActive }, { 'status-failure': !monitor.isActive })}><input type="checkbox" checked={monitor.isActive} readOnly /></td>
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
                {this.refreshStatus()}
            </div>            
        );
    }

    // refreshStatus() {
    //     if (!isEmpty(this.props.monitors)) {
    //         let monitors = this.props.monitors;
    //         console.log("Refreshing Stats - " + JSON.stringify(monitors));
    //         setInterval(function(){
    //             taskScheduler(monitors)
    //         }, 10000);
    //     }        
    // }
}

Monitors.propTypes = {
    checkStatus: React.PropTypes.func.isRequired,
    // taskScheduler: React.PropTypes.func.isRequired,
    deleteMonitor: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        monitors: state.monitors
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ checkStatus: checkStatus, deleteMonitor: deleteMonitor, taskScheduler: taskScheduler }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Monitors);