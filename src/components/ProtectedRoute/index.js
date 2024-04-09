import Cookies from 'js-cookie'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = props => {
    const accessToken = Cookies.get('sagar-mongodb-login')
    if (accessToken === undefined) {
        return <Redirect to="/login" />
    }
    return <Route {...props} />
}

export default ProtectedRoute