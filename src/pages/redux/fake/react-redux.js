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
		/**
		 * 刚开始我是直接把this.props.store传给value的，但是会导致组件不刷新，我认为应该是react在做浅比较的时候，认为方法都是一样的，因为state是通过getState方法获取的
		 * 所以我把state和dispatch提出来，这样对比的时候，state就会变化了（事实证明也成功了。。）
		 * 我还没看react-redux的源码，，如果有错误，欢迎大家指出来，留言给我说，求轻喷T_T
		 */
		return (
			<Provider
				value={{
					state: this.props.store.getState(),
					dispatch: this.props.store.dispatch,
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

/**
 * connect是一个高阶函数，他对接收到的组件经行了一次二次封装，并将用户传入的参数都用redux执行一次，再以props的形式传给组件
 * @params {function} getStateFn 接受state作为参数，返回一个用户自己定义的对象
 * @params {function | object} dispatchs 有可能是一个对象，内部是key: action
 * function接受dispatch作为参数，返回一个用户自己定义的对象
 * 都会返回key: () => dispatch(action);
 */
export function connect(getStateFn, dispatchs) {
	return (PropsComponent) => (props) => (
		<Consumer>
			{(store) => {
				let newDispatchs = {};

				// 如果传进来的是一个对象，那么需要对这个对象的每个元素用dispatch包装一下
				if (typeof dispatchs === "object") {
					Object.keys(dispatchs).forEach((item) => {
						newDispatchs[item] = () => store.dispatch(dispatchs[item]);
					});
				} else if (typeof dispatchs === "function") {
					newDispatchs = dispatchs(store.dispatch);
				}

				return <PropsComponent {...getStateFn(store.state)} {...newDispatchs} {...props} />;
			}}
		</Consumer>
	);
}
