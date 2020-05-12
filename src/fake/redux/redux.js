import { REDUX_INIT_TYPE } from "./config";

export function createStore(reducer, preloadedState, enhancer) {
	/**
	 * 为什么要交换一下？
	 * 看名字，可以大概知道第二个参数preloadedState代表了预设的State，如果不传就是空的，
	 * 也就是state的默认值，这个在初始化的时候有用到，也就是dispatch中对应的第一次reducer
	 *
	 * 一般的reducer会有default选项，会返回默认的state，而且在定义reducer的时候，会给state传一个默认的值，也就导致了，如果preloadedState不传，就会默认读取用户自己设置的init_state
	 *
	 * 当传了preloadedState，但是没有传enhancer，且preloadedState是一个方法，那么说明用户可能传错了，那么，需要将第二个参数移到第三个参数上，并将preloadedState置为undefined
	 * 否则初始化state的时候，是无法正常初始化的（参数有默认值，但是接收到的不是undefined的时候，就不会自动设置为默认值！
	 */
	if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
		enhancer = preloadedState;
		preloadedState = undefined;
	}

	if (typeof enhancer === "function") {
		return enhancer(createStore)(reducer);
	}

	let currentState = preloadedState;
	const currentListenerList = [];

	function getState() {
		return currentState;
	}

	function dispatch(action) {
		currentState = reducer(currentState, action);
		currentListenerList.forEach((listener) => listener());
		return action;
	}

	function subscribe(listener) {
		currentListenerList.push(listener);
	}

	dispatch({
		type: REDUX_INIT_TYPE,
	});

	return {
		getState,
		dispatch,
		subscribe,
	};
}

export function applyMiddleware(...middleWares) {
	return (createStore) => (...args) => {
		// 根据传进来的参数，创建一个新的store
		let store = createStore(...args);

		// 先把原来的dispatch保存下来，后面需要引用他
		let oldDispatch = store.dispatch;

		/**
         * 把中间件都执行一下，然后返回一个新的数组，
         * 中间件执行后都会返回一个函数，接受dispatch作为参数
         * 如 thunk的源码
         * function createThunkMiddleware(extraArgument) {
         *      return ({ dispatch, getState }) => next => action => {
         *          if (typeof action === 'function') {
         *              return action(dispatch, getState, extraArgument);
         *          }
         *          return next(action);
         *      };
         * }
         * export default createThunkMiddleware();
         * 实际上返回的就是
         * ({ dispatch, getState }) => next => action => {
         *      if (typeof action === 'function') {
         *          return action(dispatch, getState);
         *      }
         *      return next(action);
         * };
         * 这里面接受一个对象参数，{dispatch, getState}
         * 返回一个函数，next为参数，这个next实际上就是一个dispatch，同样接受一个action作为参数，返回一个结果
         * next => action => {
         *      if (typeof action === 'function') {
         *          return action(dispatch, getState);
         *      }
         *      return next(action);
         * }
         * 与之前写的dispatch做个对比
         * function dispatch(action) {
         *      currentState = reducer(currentState, action);
         *      return action;
         * }
         * 基本造型是一样的，只不过这里面是对dispatch进行了一次强化，
         * 如果dispatch接受的action是一个函数，那么就先执行一下这个函数，再返回结果，否则，就直接返回执行后的结果
         * 这也就是最开始为什么dispatch要返回一个action的原因，用于将这个action再传给下一个中间件，也就是这一次执行的所有的中间件都是用的同一个action
         * 
         * 每个中间件都是接受一个dispatch做参数，执行完之后，都是返回一个action（执行操作），当做下一个中间件的dispatch的action
         * 
         * 所以先创建一个通用数据
         * 这里的dispatch是最原始的dispatch
         */
        const midData = {
            getState: store.getState,
            dispatch: (...args) => oldDispatch(...args)
        }
        let newMiddleWares = middleWares.map(mw => mw(midData));

        // 然后利用middleWares对store的dispath进行强化
        let newDispatch = compose(...newMiddleWares)(store.dispatch);

        return {
            ...store,
            dispatch: newDispatch
        }
	};
}

// 顺序执行中间件，由[a,b] => a(b(...args));
export function compose(...funcs) {
	return funcs.reduce((prevFn, currentFn) => (...args) => currentFn(prevFn(...args)));
}

export const fake_logger = ({dispatch, getState}) => nextDispatch => action => {
	console.log(action.type + "执行了！！！");
	console.log(getState())
	return nextDispatch(action);
}

export const fake_thunk = ({dispatch, getState}) => nextDispatch => action => {
	if(typeof action === "function") {
		return action(dispatch, getState)
	}
	return nextDispatch(action);
}