import React, { useRef, useImperativeHandle, forwardRef } from "react";

let RefreshBtn = ({ name }, ref) => {

    console.log(name('inner'));

	const buttonRef = useRef();
	useImperativeHandle(ref, () => ({
		click: () => {
			buttonRef.current.click();
		}
	}));

	function handleRefresh() {
		console.log("刷新");
	}

	return <button ref={buttonRef} onClick={handleRefresh}>点我刷新{name('hei')}</button>;
};

RefreshBtn = forwardRef(RefreshBtn);

export default RefreshBtn;
