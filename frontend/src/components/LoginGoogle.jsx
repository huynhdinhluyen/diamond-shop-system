import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const CLIENT_ID = '41692549768-5hd5d5dr10ia7f5ccddhk39uig7bo7rq.apps.googleusercontent.com';

const GoogleLoginComponent = () => {
    const onSuccess = async (response) => {
        console.log('Login Success:', response.profileObj);
        try {
            const res = await axios.post('/api/auth/google', {
                token: response.tokenId
            });
            console.log('Server Response:', res.data);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const onFailure = (response) => {
        console.error('Login Failed:', response);
    };

    return (
        <div>
            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default GoogleLoginComponent;
