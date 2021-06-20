import React from 'react'
import App from './App'
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from '../stories/decorators/ReduxStoreProviderDecorator'
export default {
    title: 'App Stories',
    component: App,
    decorator: [ReduxStoreProviderDecorator,BrowserRouterDecorator]
}

export const AppBaseExample = (props: any) => {
    return (<App demo={true} />)
}
