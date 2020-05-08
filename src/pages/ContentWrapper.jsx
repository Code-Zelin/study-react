import React from "react";
import { ThemeContext, themes } from "./Content";
import ContentItem from "./ContentItem";
import { useState } from "react";
import { useEffect } from "react";
import RefreshBtn from "./RefreshBtn";
import { forwardRef } from "react";
import { useCallback } from "react";

let ContentWrapper = ({}, ref) => {
	const [data, setData] = useState("hhha");

	useEffect(() => {
		setTimeout(() => {
			console.log(1);
			setData("hhh啊啊啊啊a");
		}, 2000);
	}, []);

	// const updateData = useCallback((text = '') => {
	//     console.log(data, text);
	//     return data + '木头人' + text
	// }, [data])

	return (
		<ThemeContext.Provider value={themes.light}>
			<div className="list">
				{console.log(data)}
				<RefreshBtn name={(text = "") => data + "木头人" + text} ref={ref} />

				{/* <button>更新</button> */}

				{["aaa", "bbb", "ccc"].map((item) => (
					<ContentItem name={item} key={item} />
				))}
			</div>
		</ThemeContext.Provider>
	);
};

export default forwardRef(ContentWrapper);
