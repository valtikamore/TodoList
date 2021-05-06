import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";



export default {
    title: 'Todolist/Task',
    component: Task
} as Meta

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove changed inside Task')

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>

const baseArgs = {
    changeStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}
export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    ...baseArgs
}
