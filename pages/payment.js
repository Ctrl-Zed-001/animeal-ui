import axios from 'axios'
import { useState, useEffect } from 'react'

const payment = () => {
    const [iframe, setIframe] = useState()

    useEffect(() => {
        axios.post('/api/ccavRequestHandler')
            .then(res => setIframe(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: iframe }}>

            </div>
        </>
    )
}
export default payment