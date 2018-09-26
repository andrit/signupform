import React, {Component} from 'react';
import './header.css';

class Header extends Component {
    render(){
        return(<header className="top-header">
            <img className="brand-logo" src="img/pcr_header_logo.png" alt="PC Richard & Son" />
        </header>)
    }
}

export default Header;