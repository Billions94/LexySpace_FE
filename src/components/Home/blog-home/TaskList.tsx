import { useState, FormEvent } from "react"
import { Form } from "react-bootstrap"


const TaskList = () => {

    const [task, setTask] = useState('')

    const handleSubmit = (e: FormEvent) => {

    }

    return(
        <div id='Task'>
            <Form onSubmit={handleSubmit}>
            <textarea  
                className="form-control taskList"
                placeholder="Keep track of your activities :)"
                value={task}
                rows={5}
                onChange={(e) => setTask(e.target.value)}
                />
            </Form>
        </div>
    )
}

export default TaskList