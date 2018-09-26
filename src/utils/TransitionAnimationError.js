import React from 'react';
import Transition from 'react-transition-group/Transition';

const duration = 400;
const duration2 = 800;

const errorStyle = {
    transition: `opacity ${duration2}ms ease-in-out, top ${duration}ms ease-in-out`,
    opacity: 0,
    top: -1000,
    position: 'relative'
}

const errorTransitionStyles = {
  entering: { opacity: 0, top: -1000 },
  entered:  { opacity: 1, top: 0 },
};

export const TransitionAnimationError = (Module) => {

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
                        ...errorStyle,
                        ...errorTransitionStyles[state]
                    }}>
                        <Module {...this.props} />
                    </div>
                    )}
                </Transition>
            )
        }
    }
}