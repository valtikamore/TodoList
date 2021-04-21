import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import EditableSpan, {EditableSpanPropsType} from "./EditableSpan";

export default {
    title: 'TOdolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'Button inside form clicked'
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start value Editable span'
        }
    }
} as Meta

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args}/>

const changeTaskStatusCallback = action('Status changed inside Task')

const baseArgs = {
    changeTaskTitle: changeTaskStatusCallback,
    title:'html'
}
export const EditableSpanExample = Template.bind({})
EditableSpanExample.args = {
    ...baseArgs,
}