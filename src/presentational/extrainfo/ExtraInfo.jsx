import React, {Component} from 'react';
import PropTypes from "prop-types";
import {TransitionAnimation} from '../../utils/TransitionAnimation';
import {fetchGetData} from '../../utils/http';
import CheckboxCustomInput from './CheckboxCustomInput';
import RadioCustomInput from './RadioCustomInput';
import './extrainfo.css';

class ExtraInfo extends Component{

    state={
        days: [],
        years: [],
        birthDay: '',
        birthYear: '',
        birthMonth: '',
        customInputs:[],
        radioActiveState: null
    }

    static propTypes = {
        activeSection: PropTypes.string,
        handleAddCategories: PropTypes.func,
        handleAddLikes: PropTypes.func,
        selectedLikes: PropTypes.array,
        selectedCategories: PropTypes.array,
    }
    componentDidMount() {
    const apiurl= 'https://superphone.io/f/' + this.props.formHash;
       fetchGetData(apiurl)
        .then(res => {
           
            return res.json();
        })
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
            console.log('error GET from API: ', error);
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        let birthday = `${this.state.birthYear}-${this.state.birthMonth}-${this.state.birthDay}`;
        this.props.isLoading(); 
        this.props.submitform(birthday);       
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

    handleChooseMonthBday = (e) => {
        let value = e.target.value;
        this.setState({
            birthMonth: value
        })
        
    }
    handleChooseYearBday = (e) => {
        let value = e.target.value;
        this.setState({
            birthYear: value
        })

    }
    handleChooseDayBday = (e) => {
        let value = e.target.value;
        this.setState({
            birthDay: value
        })
    }

    handleCheckboxClick = (boxValue, hash) => {
        return this.props.addCheckboxToSelectedArray(boxValue, hash);
    }

    handleRadioClick = (value, hash) => {     
        this.setState({
            radioActiveState: value
        })
       this.props.handleRadioAnswersUpdate(value, 'radio', hash);
        
    }

    render(){
        return(
            <form id="extrainfosection"
                className="form-section text-center">
          
                <div className="purpose-statement">
                    <p>Purpose of form</p>
                </div>
                {this.state.customInputs.map((input, i) => {
                    if(input.type === 'radio'){
                        return(
                            <div className="preference-section" key={i}>
                                <header>
                                    <h2>{input.name}</h2>
                                </header>
                                    <RadioCustomInput 
                                        radioActiveState={this.state.radioActiveState} 
                                        handleRadioClick={this.handleRadioClick} 
                                        options={input.options}
                                        hash={input.hash} />
                            </div>
                        )
                    } else if ( input.type === 'checkbox'){
                        return(
                            <div className="preference-section" key={i}>
                                <header><h2>{input.name}</h2></header>
                                    <CheckboxCustomInput 
                                        selectedBoxes={this.props.selectedCheckboxes} 
                                        handleOnClick={this.handleCheckboxClick} 
                                        options={input.options}
                                        hash={input.hash} />
                            </div>
                        )
                    }
                    
                    
                    })
                }

                <div className="preference-section">
                    <header><h2>Receive Gifts on your Birthday!</h2></header>
                    <div className="bday-selectgroup-wrap">
                        <div className="select-group">
                            <select onChange={this.handleChooseMonthBday} value={this.state.birthMonth}>
                                <option value="0">Month </option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>

                        <div className="select-group">
                            <select onChange={this.handleChooseDayBday} value ={this.state.birthDay}>
                                <option value="0">Day </option>
                                {this.state.days.map((day, i) => {
                                    return <option key={i} 
                                                    value={day}>{day}</option>
                                })}
                                
                            </select>
                        </div>

                        <div className="select-group">
                            <select onChange={this.handleChooseYearBday}  value={this.state.birthYear}>
                                <option value="0">Year </option>
                                {this.state.years.map((year, i) => {
                                    return <option key={i}
                                                    value={year}>{year}</option>
                                })}
                            </select>
                        </div>
                    </div> 
                </div>

                    <div className="accept-submit">
                        <button className="pcrbtn btn-red" onClick={this.handleSubmit}>Add My Additional Info</button>
                    </div>
                    
                

            </form>

        )
    }
}

const ExtraInfoMotion = TransitionAnimation(ExtraInfo);
export default ExtraInfoMotion;
