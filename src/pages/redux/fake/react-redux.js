import React, { createContext, Component } from "react";

const { Provider, Consumer } = createContext(null);

export class SProvider extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.store.subscribe(() => {
			this.forceUpdate();
		});
	}

	render() {
		return <Provider value={{
            state: this.props.store.getState(),
            dispatch: this.props.store.dispatch
        }}>{this.props.children}</Provider>;
	}
}

export function connect(getStateFn, dispatchs) {
	return (PropsComponent) => (props) => (
		<Consumer>
			{(store) => {
                let newDispatchs = {};

                // 如果传进来的是一个对象，那么需要对这个对象的每个元素用dispatch包装一下
                if(typeof dispatchs === "object") {
                    Object.keys(dispatchs).forEach((item) => {
                        newDispatchs[item] = store.dispatch.bind(store, dispatchs[item])
                    })
                } else if(typeof dispatchs === "function") {
                    newDispatchs = dispatchs(store.dispatch);
                }

				return <PropsComponent {...getStateFn(store.state)} {...newDispatchs} {...props} />;
			}}
		</Consumer>
	);
}
