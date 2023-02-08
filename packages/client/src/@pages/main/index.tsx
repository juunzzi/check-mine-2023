import {useEffect} from 'react'
import {useToast} from 'src/@components/commons/Toast/hooks'

const MainPage = () => {
    const {showToastMessage} = useToast()

    useEffect(() => {
        showToastMessage('hi', 'error')
    }, [])

    return <div>MainPage</div>
}

export default MainPage
