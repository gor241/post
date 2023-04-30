import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import api from "../utils/api";
// Этот хук используется когда нужно обрабатывать запросы на сервер, 
// работать со Spiner или Skeleton, а так же обрабатывать ошибки
export const useApi = (handler) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {currentUser, isLoading } = useContext(UserContext);
    const saveGroup = api.getGroup()
    const saveToken = api.getToken()

    useEffect(() => {
        if(!saveGroup){
            const groupSave = localStorage.getItem('group')
            api.setGroup(groupSave)
          }
          if(!saveToken){
            const tokenSave = localStorage.getItem('token')
            api.setToken(tokenSave)
          }
        setLoading(true);
        handler()
            .then((result)=> {
                setData(result);
            })
            .catch((err)=>{
                setError(err);
            })
            .finally(()=>{
                setLoading(false)
            })
    }, [handler,saveGroup,saveToken])


    return { data, setData, loading, error}    
}