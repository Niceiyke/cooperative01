import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';

import { useAuth} from './useAuth';
import { encryptData } from '../utils/encryptdycrpt';
import { useNavigate } from 'react-router-dom';

const useFetchGet = () => {
    const { refreshToken, user, logout } = useAuth();
    const navigation = useNavigate();

    let config: RequestInit = {};

    const BASEURL = 'http://127.0.0.1:8000/api';

    const NewAccessToken = async (refresh: string): Promise<string | undefined> => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh }),
            });

            if (response.status === 200) {
                const token = await response.json();

                const access_token = token.access;

                encryptData('access', access_token);
                encryptData('user', jwtDecode(access_token));
                return access_token;
            }
        } catch (error) {
            // Handle error
        }
    };

    const originalRequest = async (url: string): Promise<any> => {
        const url2 = `${BASEURL}${url}`;
        const response = await fetch(url2, config);

        const data = await response.json();

        return data;
    };

    const callFetch = async (url: string): Promise<any> => {
        const isExpiredAccessToken = dayjs.unix(user.exp).diff(dayjs()) < 1;

        const refresh = jwtDecode(refreshToken);
        const isExpiredRefreshToken = dayjs.unix(refresh.exp).diff(dayjs()) < 1;

        if (isExpiredRefreshToken) {
            console.log('refresh expired');
            logout();
            navigation('/login');
        }

        if (isExpiredAccessToken) {
            console.log('token expired');
            const access_token = await NewAccessToken(refreshToken);
            console.log('token updated');

            config.headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            };

            const response = await originalRequest(url);

            return response;
        } else {
            const response = await originalRequest(url);

            return response;
        }
    };

    return callFetch;
};

export default useFetchGet;
