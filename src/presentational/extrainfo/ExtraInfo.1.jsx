import React, {Component} from 'react';
import PropTypes from "prop-types";
import {TransitionAnimation} from '../../utils/TransitionAnimation';
import {fetchPostData, fetchGetData} from '../../utils/http';

import './extrainfo.css';

const whatLike = [
    {"brand": "Apple"},
    {"brand": "Bose"},
    {"brand": "Frigidaire"},
    {"brand": "GE"},
    {"brand": "Samsung"},
    {"brand": "SONOS"},
    {"brand": "LG"},
    {"brand": "Sony"},
    {"brand": "Whirlpool"},
    {"brand": "Other"}
];

const likeCategories = [
    {"category": "Appliances"},
    {"category": "TVs & Electronics"},
    {"category": "Mattresses & Recliners"},
    {"category": "BBQs"}
];

//const ExtraInfo = React.forwardRef((props, ref) => (
class ExtraInfo extends Component{

    state={
        days: [],
        years: [],
        customInputs:[]
    }

    static propTypes = {
        activeSection: PropTypes.string,
        handleAddCategories: PropTypes.func,
        handleAddLikes: PropTypes.func,
        selectedLikes: PropTypes.array,
        selectedCategories: PropTypes.array,
    }

    dev_url = "https://apps.pcrichard.com:8082/superphone/"; 
    prod_url = "https://apps.pcrichard.com/superphone/";

    componentDidMount() {
       // superphone APi
       const apiurl= 'https://superphone.io/f/NZAYCyzl';
       fetchGetData(apiurl)
        .then(res => res.json())
        .then(data => {
            let getData = data;
            function compare(a, b) {
                let orderA = a.sortOrder;
                let orderB = b.sortOrder;
                let comparison =0;
                if(orderA > orderB){
                    comparison = 1;
                } else if (orderA < orderB) {
                    comparison = -1;
                }
                return comparison;
            }
            const FormFields = getData.formFields.sort(compare);
            this.setState({
                customInputs: FormFields
            })

        })
        .then(() => {
            this.renderDays();
            this.renderYears();
        })
        .catch(error => {
            console.log('error GET from superphone API: ', error);
        })
    }
    

    handleSubmit = (e) => {
        e.preventDefault();
        fetchPostData(this.dev_url, {
            action : "advanced",
            hash : "NZAYCyzl",
            phone : this.props.phone,
            birthday: this.props.birthday || '2015-12-31',
            key1 : 'c5efbe2851797b79409ba18378ea724fa9662504',
            type1 : 'radio',
            value1 : 'NO',

            key2 : '5bdbeca67ac99d2e1389e154044585f8f8639bf5',
            type2 : 'checkbox',
            value2 : '%5B%22GE%22%2C+%22LG%22%5D',

            key3 : 'b73e88a0833a35e41f2c2d53698422dece12abf4',
            type3 : 'checkbox',
            value3 : '%5B%22TVS+AND+ELECTRONICS%22%5D'
            }, 'POST', 'cors'
        )
            .then(res => {
                const response = res;
                //show them a thank you page
                //this.props.handleSwitchSection('extrainfosection');
            }
            ).catch((res) => {
                if(res instanceof Error) {
                    console.log(res.message);
                  } else {
                    console.log(res.data);
                  }
                
            })
    }

    handleLikesClick = (e) => {
        e.preventDefault();
        let like = e.target.value;
        //let rgxlike = like.replace('brand-', '');
       // console.log(rgxlike);
        this.props.handleAddLikes(like);
    }

    handleCategoriesClick = (e) => {
        e.preventDefault();
        let category = e.target.value;
        //let rgxcat = category.replace('cat-', '');
        this.props.handleAddCategories(category);
    }

    renderDays = () => {
        let daysarr = [];
        let days = 0;
        for(var count = 1; count < 32; count++){
            days++;
            daysarr.push(days);
        }
        this.setState({
            days:daysarr
        });
    }

    renderYears = () => {
        let yearsarr = [];
        let years = 1920;
        for(var count = 1; count < 81; count++){
            years++;
            yearsarr.push(years);
        }
        this.setState({
            years:yearsarr
        });
    }

    handleHavePcrAcct= (e) => {
        e.preventDefault();
        let pcrAcctState = e.target.value;
        this.props.handlePcrAcct(pcrAcctState);
    }

    render(){
        return(
            <section
                //ref={ref}
                id="extrainfosection"
                className={this.props.activeSection === 'extrainfosection' 
                        ? "isactive form-section text-center" 
                        : "notactive form-section text-center"}>
          
                <div className="purpose-statement">
                    <p>I could Text you info on deals you may be interested in.</p>
                </div>

                <div className="preference-section">
                    <h2>Tell me what you like</h2>
                    <h6>Tap on the brands you like or prefer</h6>
                    <div className="preference-options brands-like">
                        {whatLike.map((item, i) => {
                            return(
                            <div key={i} className="checkbox-group">
                                <label 
                                    className={this.props.selectedLikes.includes(item.brand) ? "active-box checkbox-label" : "checkbox-label"} 
                                    htmlFor={item.brand}>
                                    <input 
                                        className="checkbox-input" 
                                        type="checkbox" 
                                        //value={`brand-${item.brand}`}
                                        //id={`brand-${item.brand}`}
                                        value={item.brand}
                                        id={item.brand}
                                        onClick={this.handleLikesClick} />
                                    {item.brand}
                                </label>
                          </div>
                            );
                        })}
                    </div>
                </div>

                <div className="preference-section">
                    <h2>Choose your favorite Categories</h2>
                    <h6>Tap on the categories you wouldn't want to miss a big sale on.</h6>
                    <div className="preference-options">
                        {likeCategories.map((item, i) => {
                            return(
                            <div key={i} className="checkbox-group categories-like">
                                <label className={this.props.selectedCategories.includes(item.category) ? "active-box checkbox-label" : "checkbox-label"}  htmlFor={item.category}>
                                    <input 
                                        className="checkbox-input" 
                                        type="checkbox" 
                                        //value={`cat-${item.category}`} 
                                        //id={`cat-${item.category}`}
                                        value={item.category} 
                                        id={item.category}
                                        onClick={this.handleCategoriesClick} />
                                    {item.category}
                                </label>
                          </div>
                            );
                        })}
                    </div>
                </div>

                <div className="preference-section">
                    <h2>Do you have a P.C. Richard Card/Account?</h2>
                    <div className="preference-options">
                       
                            <div className="radio-group">
                                    <label 
                                        className={this.props.havePcrAcct === 'no'? "active-box radio-label" : "radio-label"} 
                                        htmlFor="no-card">
                                        <input 
                                            className="radio-input" 
                                            type="radio" 
                                            value="no" 
                                            id="no-card"
                                            onClick={this.handleHavePcrAcct} />
                                        No
                                    </label>
                            </div>

                            <div className="radio-group">
                                    <label 
                                        className={this.props.havePcrAcct === 'yes'? "active-box radio-label" : "radio-label"} 
                                        htmlFor="yes-card">
                                        <input 
                                            className="radio-input" 
                                            type="radio" 
                                            value="yes" 
                                            id="yes-card"
                                            onClick={this.handleHavePcrAcct} />
                                        Yes
                                    </label>
                            </div>

                    </div>
                </div>

                <div className="preference-section">
                    <h2>Receive Gifts on your Birthday!</h2>
                    <div className="bday-selectgroup-wrap">
                        <div className="select-group">
                            <select>
                                <option onChange={this.handleChooseMonthBday} 
                                        value="0">Month </option>
                                <option onChange={this.handleChooseMonthBday} 
                                        value="january">January</option>
                                <option onChange={this.handleChooseMonthBday} 
                                        value="february">february</option>
                                <option onChange={this.handleChooseMonthBday} 
                                        value="march">march</option>
                                <option onChange={this.handleChooseMonthBday} 
                                        value="april">april</option>
                                <option onChange={this.handleChooseMonthBday} 
                                        value="may">may</option>
                                <option onChange={this.handleChooseMonthBday} 
                                        value="june">june</option>
                                <option onChange={this.handleChooseMonthBday} 
                                        value="july">july</option>
                                <option onChange={this.handleChooseMonthBday} 
                                        value="august">august</option>
                                <option onChange={this.handleChooseMonthBday} 
                                        value="september">september</option>
                                <option onChange={this.handleChooseMonthBday} 
                                        value="october">october</option>
                                <option onChange={this.handleChooseMonthBday} 
                                        value="november">november</option>
                                <option onChange={this.handleChooseMonthBday} 
                                        value="december">december</option>
                            </select>
                        </div>

                        <div className="select-group">
                            <select>
                                <option value="0">Day </option>
                                {this.state.days.map((day, i) => {
                                    return <option key={i} 
                                                    onChange={this.handleChooseDayBday}
                                                    value={day}>{day}</option>
                                })}
                                
                            </select>
                        </div>

                        <div className="select-group">
                            <select>
                                <option value="0">Year </option>
                                {this.state.years.map((year, i) => {
                                    return <option key={i}
                                                    onChange={this.handleChooseYearBday} 
                                                    value={year}>{year}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="accept-submit">
                        <button className="pcrbtn btn-red" onClick={this.handleSubmit}>Add My Additional Info</button>
                    </div>
                    
                </div>

            </section>

        )
    }
}
//));
const ExtraInfoMotion = TransitionAnimation(ExtraInfo);
export default ExtraInfoMotion;