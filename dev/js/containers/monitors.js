import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { checkStatus } from '../actions/checkStatus'

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class Monitors extends Component {

    renderList() {        
        console.log("Monitors Data - " + JSON.stringify(this.props.monitors));
        // console.dir(this.props.monitors);
        const errors = {};
        return this.props.monitors.map((monitor) => {
            console.log("Monitor Info - " + JSON.stringify(monitor));            
            return (
                <tr key={monitor.id}>
                    <td>{monitor.name}</td>
                    <td>{monitor.url}</td>
                    <td className={classnames({ 'status-success': monitor.isActive},  {'status-failure': !monitor.isActive})}><input type="checkbox" checked={monitor.isActive} readOnly/></td>
                </tr>
            );
        });
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
    checkStatus: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        monitors: state.monitors
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ checkStatus: checkStatus }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Monitors);