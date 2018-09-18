import React, { Component } from 'react';
import Layout from './Layout';
import IntroScreen from './presentational/introscreen';
import BasicInfo from './presentational/basicinfo';
import ExtraInfo from './presentational/extrainfo';
import Header from './presentational/header';

import {disableScroll, enableScroll} from './utils/handlescroll';


//const extrainfosection = React.createRef();
//const basicinfosection = React.createRef();

class App extends Component {

  state={
    activeSection: 'introsection',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    formAnswers: [],
    // selectedLikes:[],
    // selectedCategories:[],
    
    havePcrAcct: '',
    custBday:''
  }
  
  componentDidMount() {
    const urlParms = new URLSearchParams(window.location.search);
  }

  updateFieldValue = (stateprop, value) => {
    this.setState({
      [stateprop]: value
    });
};
  
  // doScrollTo = (element) => {
  //   const elRef = document.getElementById(element);
  //   window.scrollTo({
  //       left: 0, 
  //       top: elRef.offsetTop -80,
  //       behavior: "smooth"
  //   })
  // }


  handleSwitchSection = (section) => {
    let switchSectionState = new Promise((resolve, reject) => {
      try {
        console.log('in submit try');
        this.setState({
          activeSection: section
        })
      }
      catch(e) {
        reject(e)
      }
    });

    // switchSectionState.then(
    //   enableScroll()
    // )
    // .then(
    //   this.doScrollTo(section)
    // );   
    // return switchSectionState();   
  }

  //Removale Not Working Yet!  TODO
//   handleAddLike = (item) => {
//     let likes = this.state.selectedLikes;
//     if(likes.includes(item)){
//      let indexof = likes.indexOf(item);
//       let removedLikes = likes.splice(indexof, 1);
//       this.setState({
//         selectedLikes: likes
//       })
//     } else {
//     this.setState({
//       selectedLikes: likes.concat(item)
//     })
//  }
//   }
//   handleAddCategory = (item) => {
//     let categories = this.state.selectedCategories;
//     if(categories.includes(item)){
//       let indexof = categories.indexOf(item);
//        let removedcategories = categories.splice(indexof, 1);
//        this.setState({
//          selectedCategories: categories
//        })
//      } else {
//       this.setState({
//         selectedCategories: categories.concat(item)
//       })
//     }
//   }
 
  handleAddCheckbox = (item) => {
     this.handleFormAnswersUpdate(item, 'checkbox');
  }

  // handleRadioUpdate = (item) => {

  // }

  handleFormAnswersUpdate = (val, type) => {
    let inputState = val;
    let fieldType = type;
    this.setState(prevState => ({
      formAnswers: [...prevState.formAnswers, {inputState, fieldType}]
    }))
  }

  // havePcrAcct

  componentDidMount(){
    if(this.state.activeSection == 'introsection'){
        disableScroll();
    }
  }

  renderSectionOnState = () =>{
     switch(this.state.activeSection){
      case 'introsection':
        return <IntroScreen 
                  handleSwitchSection={this.handleSwitchSection} 
                  activeSection={this.state.activeSection} />
      break;
      case 'basicinfosection':
        return <BasicInfo 
                  handleSwitchSection={this.handleSwitchSection} 
                  activeSection={this.state.activeSection}
                  updateFieldValue={this.updateFieldValue}
                  firstname={this.state.firstname} 
                  lastname={this.state.lastname} 
                  phone={this.state.phone} 
                  email={this.state.email} 
                  />
      break;
      case 'extrainfosection':
        return <ExtraInfo
                  activeSection={this.state.activeSection}
                  handleAddCheckbox={this.handleAddCheckbox}
                  handleFormAnswersUpdate={this.handleFormAnswersUpdate}
                  selectedCheckboxes={this.state.selectedCheckboxes} />
      break;
    }
  }



  render() {
    return (
      <React.Fragment>
        <Layout>
          <Header />
          {this.renderSectionOnState()}
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
