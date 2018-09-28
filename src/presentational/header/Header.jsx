import React, {Component} from 'react';
import './header.css';

class Header extends Component {
    render(){
        return(<header className="top-header">
            <img className="brand-logo" src={this.props.logo.imgsrc} alt={this.props.logo.imgalt} />
        </header>)
    }
}

export default Header;
