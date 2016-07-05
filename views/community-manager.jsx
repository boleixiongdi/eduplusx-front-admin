import React from 'react';
let LeftNav = require('./common/community-left-nav.jsx');

class CommunityManager extends React.Component {
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
CommunityManager.propTypes = {

};
CommunityManager.defaultProps = {

};

export default CommunityManager;