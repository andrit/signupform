import React from 'react';
import Transition from 'react-transition-group/Transition';
//consider more props to <Module/> like animationDuration and whether it is shown or not. 
//can counteranimate for > interaction
const duration = 400;
const duration2 = 800;

const defaultStyle = {
  transition: `opacity ${duration2}ms ease-in-out, top ${duration}ms ease-in-out`,
  opacity: 0,
  top: 1000,
  position: 'relative'
}

const transitionStyles = {
  entering: { opacity: 0, top: 1000 },
  entered:  { opacity: 1, top: 0 },
};

export const TransitionAnimation = (Module) => {

    return class AnimateHOC extends React.Component {
        state = {in:false}

        componentDidMount() {
            this.setState({ in: true })
        }
        
        render(){
            return(
                <Transition 
                    in={this.state.in} 
                    timeout={duration}
                    
                    unmountOnExit >
                    {(state) => (
                    <div style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>
                        <Module show={this.props.in} animationDuration={this.props.timeout} {...this.props} />
                    </div>
                    )}
                </Transition>
            )
        }
    }
}
