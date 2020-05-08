import React, { useMemo } from 'react'
import { useContext } from 'react';
import { ThemeContext } from './Content';

const ContentItem = ({ name }) => {
    console.log(name)
    const theme = useContext(ThemeContext);
    return useMemo(() => (
        <ContentText name={name} theme={theme} />
    ), [name, theme])
}

const ContentText = ({ name, theme }) => {
    console.log('name', name, theme)
    return (
        <div className="item" style={{
            backgroundColor: theme.background,
            color: theme.foreground,
            marginBottom: 20
        }}>{ name }</div>
    )
}

export default ContentItem;