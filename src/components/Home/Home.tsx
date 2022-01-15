import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getUsersAction } from "../../redux/actions"

const Home = () => {

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getUsersAction())
    }, [])
    return(
        <div>
            test 1....
        </div>
    )
}

export default Home