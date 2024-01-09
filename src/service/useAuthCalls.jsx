import axios from "axios"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import { useNavigate } from "react-router-dom"
import React from 'react'
import { useDispatch } from "react-redux"
import { loginSuccess, fetchStart, fetchFail } from "../features/authSlice"

const useAuthCalls = () => {
    const disPatch = useDispatch()
    const navigate = useNavigate()

    const login = async (userInfo) => {
        disPatch(fetchStart())
        console.log("userInfo",userInfo)
        
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/auth/login/`,
                userInfo)
                disPatch(loginSuccess(data))
            toastSuccessNotify("login başarılı")
            navigate("/stock")
           
        } catch (error) {
            disPatch(fetchFail())
            toastErrorNotify("login başarısız")
            console.log(error)
        }

    }

    const register = async () => { }
    const logout = async () => { }
    return {login, register, logout}


}

export default useAuthCalls


