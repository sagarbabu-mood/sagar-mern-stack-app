import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner'
import './index.css'


const Home = () => {

    const [username, onUpdateUsername] = useState('')

    const [isLoading, onUpdateLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const userId = Cookies.get('sagar-mongodb-login');
            if (userId) {
                const url = `https://mern-stack-backend-k83i.onrender.com/getUserData`
                const userDetails = { userId }
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify(userDetails),
                }
                const response = await fetch(url, options)
                if (response.ok) {
                    const data = await response.json()
                    onUpdateUsername(data.username)
                    onUpdateLoading(false)
                }
            }
        }
        fetchData()
    }, [])

    if (isLoading) {
        return <div className='container'>
            <Loader />
        </div>
    }

    return (
        <div className='container'>
            <p className='marquee'>
                Welcome <strong>{username}</strong>, you have completed your registration and logged into the MERN Stack application.
                <br /><br />Happy Learning
            </p>
        </div>
    );
}

export default Home