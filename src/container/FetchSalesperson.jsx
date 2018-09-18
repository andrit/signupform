import React, {Component} from 'react';
import axios from 'axios';

class FetchSalesPerson extends Component {
    state={
        salesperson: null,
       // haveProfileImg: true,
    }

    componentDidMount(){
        //get sales person info and set flags
        //ajax, get image set as state
        //on fail setState to false
        const getSalesUrl = "json/salesperson.json"
        axios.get(getSalesUrl)
            .then(res => {
                console.log('salesperson data from fetch: ', res.data);
                let salespersondata = res.data;
                salespersondata.map( (salesperson) => {
                    this.setState({
                        salesperson,
                        //haveProfileImg: true
                    })
                })
                
            })
            .catch((error) => {
                console.log(error);
               /* this.setState({
                    haveProfileImg: false
                })*/
            })
    }

    render() {
        return this.props.children(this.state)
    }
}

export default FetchSalesPerson;