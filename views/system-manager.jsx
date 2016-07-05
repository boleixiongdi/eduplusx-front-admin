import React from 'react';
let LeftNav = require('./common/system-left-nav.jsx');

class SystemManager extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <LeftNav></LeftNav>
            </div>
    );
    }
}
SystemManager.propTypes = {

};
SystemManager.defaultProps = {

};

export default SystemManager;