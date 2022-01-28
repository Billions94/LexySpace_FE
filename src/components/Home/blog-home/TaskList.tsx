import { useState, FormEvent } from "react"
import { Form } from "react-bootstrap"
import { ReduxState } from "../../../redux/interfaces"
import { useSelector, useDispatch } from "react-redux"
import { saveTasksAction } from "../../../redux/actions"


const TaskList = () => {

    // const [task, setTask] = useState('')
    const dispatch = useDispatch()
    const { tasks } = useSelector((state: ReduxState['data']) => state)

    const handleSubmit = (e: FormEvent) => {

    }

    return(
        <div id='Task'>
            <Form onSubmit={handleSubmit}>
            <textarea  
                className="form-control taskList"
                placeholder="Keep track of your activities :)"
                value={tasks}
                rows={5}
                onChange={(e) => dispatch(saveTasksAction(e.target.value))}
                />
            </Form>
        </div>
    )
}

export default TaskList