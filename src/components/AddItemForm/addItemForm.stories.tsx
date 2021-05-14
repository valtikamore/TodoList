
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {AddItemForm, addItemType} from "./additemForm";

export default {
    title: 'TOdolist/Additemform',
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: 'Button inside form clicked'
        }
    }
} as Meta
const Template: Story<addItemType> = (args) => <AddItemForm {...args}/>

export const AddItemFormExample = Template.bind({})
AddItemFormExample.args = {
    addItem: action('Button inside form clicked')
}