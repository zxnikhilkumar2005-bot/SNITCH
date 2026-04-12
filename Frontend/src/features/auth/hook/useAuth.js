import { setError,setLoading,setUser } from "../state/auth.slice.js";
import { register } from "../service/auth.service";
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


    return{handleRegister}
}