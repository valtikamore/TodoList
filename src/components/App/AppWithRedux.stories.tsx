import {Meta, Story} from "@storybook/react";
import AppRedux from "./AppRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title:'Todolist/AppWithRedux',
    component:AppRedux,
    decorators:[ReduxStoreProviderDecorator]
} as Meta

const Template: Story = () => <AppRedux/>
export const AppWithReduxExample = Template.bind({})