import React from 'react';
import MonitorInput from '../containers/monitor-input';
import Monitors from '../containers/monitors';
require('../../scss/style.scss');

const App = () => (
    <div>
        {/* <h2>User List</h2>
        <UserList />
        <hr />
        <h2>User Details</h2>
        <UserDetails /> */}
        <h2>Site Health Monitor</h2>
        <MonitorInput/>
        <Monitors/>        
    </div>
);

export default App;
