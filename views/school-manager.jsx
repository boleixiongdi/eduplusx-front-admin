import React from 'react';
let LeftNav = require('./common/school-left-nav.jsx');

class SchoolManager extends React.Component {
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
SchoolManager.propTypes = {

};
SchoolManager.defaultProps = {

};

export default SchoolManager;