import React, {Component} from 'react';
import PropTypes from "prop-types";
import {TransitionAnimation} from '../../utils/TransitionAnimation';
import {fetchPostData, fetchGetData} from '../../utils/http';
import CheckboxCustomInput from './CheckboxCustomInput';
import RadioCustomInput from './RadioCustomInput';
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
        birthDay: '',
        birthYear: '',
        birthMonth: '',
        customInputs:[],
        // selectedCheckboxes:[],
        radioActiveState: null
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
    //    const apiurl= 'https://superphone.io/f/' + this.props.formHash ;
       const apiurl= 'https://superphone.io/f/NZAYCyzl';
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
            console.log('api data: ', getData);
            const FormFields = getData.formFields.sort(compare);
            console.log(FormFields);
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
    
    // transformAnswerForDataTransport = (answers) => {
    //     let n =1;
    //     return answers.map(answer => {
    //         n++;
    //         // return key.n : answer.key,
    //         //         type.n : answer.fieldType,
    //         //          value.n : answer.inputState
    //         return {
    //                 key : answer.hashKey,
    //                 type : answer.fieldType,
    //                 value : answer.inputState
    //                 }
    //     })
    // }

    // transformArrayToObject = (arr) => {
    //     let obj = {};
    //     for(let i = 0; i < arr.length; ++i){
    //         if(arr[i] !== undefined){
    //             obj[i] = arr[i];
    //         }
    //     }
    //     return obj;
    // }

    // handleInitialFormSave = () => {
    //     return new Promise((res, rej) => {
    //         try{
    //             this.props.handleExtraInfoFormSubmit()
    //             res();
    //         }
    //         catch(e){
    //             rej(e)
    //         }
    //     })
    // }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //      this.handleInitialFormSave()
    //      .then(() => {
    //          let ExtraAnswers = this.props.formAnswers;
    //         console.log('extraanswers in extrainfo: '. ExtraAnswers);
    //         //turn extraanswers into correct format
    //        let AnswersArray = this.transformAnswerForDataTransport(ExtraAnswers);
    //        // let AnswersObject = this.transformArrayToObject(AnswersArray);
    //        console.log('array: '. AnswersArray);
    //        // console.log('object: '. AnswersObject);
    //         let birthday = `${this.state.birthYear}-${this.state.birthMonth}-${this.state.birthDay}`;
    //        fetchPostData(this.dev_url, {
    //            action : "advanced",
    //            hash : "NZAYCyzl",
    //            phone : this.props.phone,
    //            birthday: birthday,
    //            key1 : 'c5efbe2851797b79409ba18378ea724fa9662504',
    //            type1 : 'radio',
    //            value1 : 'NO',
   
    //            key2 : '5bdbeca67ac99d2e1389e154044585f8f8639bf5',
    //            type2 : 'checkbox',
    //            value2 : '%5B%22GE%22%2C+%22LG%22%5D',
   
    //            key3 : 'b73e88a0833a35e41f2c2d53698422dece12abf4',
    //            type3 : 'checkbox',
    //            value3 : '%5B%22TVS+AND+ELECTRONICS%22%5D'
    //            }, 'POST', 'cors')
    //            .then(res => {
    //                const response = res;
    //                //show them a thank you page
    //                //this.props.handleSwitchSection('extrainfosection');
    //            }
    //            ).catch((res) => {
    //                if(res instanceof Error) {
    //                    console.log(res.message);
    //                  } else {
    //                    console.log(res.data);
    //                  }
                   
    //            })
    //      })
       
    // }
    handleSubmit = (e) => {
        e.preventDefault();
        let birthday = `${this.state.birthYear}-${this.state.birthMonth}-${this.state.birthDay}`;
        this.props.isLoading(); 
        this.props.submitform(birthday);
         //setTimeout(this.formFetch, 0);        
    }

    // formFetch = () => {
    //     let ExtraAnswers = this.props.formAnswers;
    //         console.log('extraanswers in extrainfo: '. ExtraAnswers);
    //         //turn extraanswers into correct format
    //        let AnswersArray = this.transformAnswerForDataTransport(ExtraAnswers);
    //        // let AnswersObject = this.transformArrayToObject(AnswersArray);
    //        console.log('array: '. AnswersArray);
    //        // console.log('object: '. AnswersObject);
    //         let birthday = `${this.state.birthYear}-${this.state.birthMonth}-${this.state.birthDay}`;
    //        fetchPostData(this.dev_url, {
    //            action : "advanced",
    //            hash : "NZAYCyzl",
    //            phone : this.props.phone,
    //            birthday: birthday,
    //            key1 : 'c5efbe2851797b79409ba18378ea724fa9662504',
    //            type1 : 'radio',
    //            value1 : 'NO',
   
    //            key2 : '5bdbeca67ac99d2e1389e154044585f8f8639bf5',
    //            type2 : 'checkbox',
    //            value2 : '%5B%22GE%22%2C+%22LG%22%5D',
   
    //            key3 : 'b73e88a0833a35e41f2c2d53698422dece12abf4',
    //            type3 : 'checkbox',
    //            value3 : '%5B%22TVS+AND+ELECTRONICS%22%5D'
    //            }, 'POST', 'cors')
    //            .then(res => {
    //                const response = res;
    //                //show them a thank you page
    //                //this.props.handleSwitchSection('extrainfosection');
    //            }
    //            ).catch((res) => {
    //                if(res instanceof Error) {
    //                    console.log(res.message);
    //                  } else {
    //                    console.log(res.data);
    //                  }
                   
    //            })
    // }



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


    //checkbox click handler
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
            <form
                //ref={ref}
                id="extrainfosection"
                className="form-section text-center">
          
                <div className="purpose-statement">
                    <p>I could Text you info on deals you may be interested in.</p>
                </div>
                {this.state.customInputs.map((input, i) => {
                    //console.log('options: ', input.options);
                    if(input.type === 'radio'){
                        return(
                            <div className="preference-section" key={i}>
                                <h2>{input.name}</h2>
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
                                <h2>{input.name}</h2>
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
                    <h2>Receive Gifts on your Birthday!</h2>
                    <div className="bday-selectgroup-wrap">
                        <div className="select-group">
                            <select onChange={this.handleChooseMonthBday} value={this.state.birthMonth}>
                                <option value="0">Month </option>
                                <option value="1">January</option>
                                <option value="2">february</option>
                                <option value="3">march</option>
                                <option value="4">april</option>
                                <option value="5">may</option>
                                <option value="6">june</option>
                                <option value="7">july</option>
                                <option value="8">august</option>
                                <option value="9">september</option>
                                <option value="10">october</option>
                                <option value="11">november</option>
                                <option value="12">december</option>
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
//));
const ExtraInfoMotion = TransitionAnimation(ExtraInfo);
export default ExtraInfoMotion;