import { setError,setLoading,setUser } from "../state/auth.slice.js";
import { register,login } from "../service/auth.service";
import { useDispatch } from "react-redux";


export const useAuth = () => {
    const dispatch = useDispatch();
    async function handleRegister({email,contact,password,fullname,isSeller=false}) {
        try {
            dispatch(setLoading(true));
            const data = await register ({email,contact,password,fullName: fullname,isSeller});
            dispatch(setUser(data.user));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({email,password}) {
        try {
            dispatch(setLoading(true));
            const data = await login({email,password});
            dispatch(setUser(data.user));
            return true;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    }

    return { handleRegister, handleLogin };
}