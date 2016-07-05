import React from 'react';
let LeftNav = require('./common/shop-left-nav.jsx');

class ShopManager extends React.Component {
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
ShopManager.propTypes = {

};
ShopManager.defaultProps = {

};

export default ShopManager;