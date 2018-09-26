import React from 'react';


const Layout = (props) =>{
    return(
        <div className="container">
            <div className="row">
                <div className="col align-self-center">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Layout;