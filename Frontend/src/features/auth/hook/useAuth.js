import { setError,setLoading,setUser } from "../service/auth.service";
import { register } from "../service/auth.service";
import { useDispatch } from "react-redux";


export const useAuth = () => {
    const dispatch = useDispatch();
    async function handleRegister({email,contact,password,fullname,isSeller=false}) {
        const data = await register ({email,contact,password,fullname,isSeller});
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));


    }


    return{handleRegister}
}