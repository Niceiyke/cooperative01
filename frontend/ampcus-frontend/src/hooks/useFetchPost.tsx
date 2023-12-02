import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from './useAuth'; // Assuming you have a useAuth hook with AuthUser type
import { encryptData } from '../utils/encryptdycrpt';
import { useNavigate } from 'react-router-dom';

type HttpMethod = 'POST' | 'PUT'; // Add more methods as needed

const useFetchPost = () => {
    const { accessToken, refreshToken, user, logout } = useAuth();

    const navigation = useNavigate();

    const BASEURL = import.meta.env.VITE_APP_BASE_URL;

    const NewAccessToken = async (refresh: string): Promise<string | undefined> => {
        try {
            const response = await fetch(`${BASEURL}/token/refresh/`, {
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

    const originalRequest = async (
        url: string,
        method: HttpMethod,
        customHeaders?: Record<string, string>,
        formdata?: Record<string, any>,
    ): Promise<{ response: Response; data: any; error: any }> => {
        const url2 = `${BASEURL}${url}`;


        let error;
        let data;

        const response = await fetch(url2, {
            method: method,
            headers: customHeaders,
            body: JSON.stringify(formdata),
        });

        if (response.status === 400) {
            error = await response.json();
            console.log('error1', error);

            return { response, data, error };
        }
        if (response.status === 401) {
            error = await response.json();


            return { response, data, error };
        } else {
            data = await response.json();
            console.log(data);

            return { response, data, error };
        }
    };

    const callFetch = async (
        url: string,
        method: HttpMethod,
        formdata?: Record<string, any>
    ): Promise<{ response: Response; data: any; error: any }> => {

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

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            };

            const response = await originalRequest(url, method, headers, formdata);


            return response;
        } else {

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            };

            const response = await originalRequest(url, method, headers, formdata);

            return response;
        }
    };

    return callFetch;
};

export default useFetchPost;
