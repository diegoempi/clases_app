import React, {useCallback, useState} from 'react';
import {auth, db} from "../../firebase";
import LoginPresentation from "./Login.presentation";

const LoginContainer = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault()
        checkForErrors()
        handleLogin()
    }

    const checkForErrors = () => {
        if (password.length < 6) {
            setError('La contraseña debe ser al menos de 6 caracteres');
            return;
        }
        setError(null);
    }

    const handleLogin = () => {
        if(!isLogin) signUp();
        else if(isLogin) signIn();
    }

    const resetUserStateAndRedirect = useCallback(() => {
        setEmail('')
        setPassword('')
        setError(null)
        props.history.push('/home')
    }, [props.history])

    const signUp = useCallback(async() => {
        try{
            const result = await auth.createUserWithEmailAndPassword(email, password);
            const user = result.user;
            await db.collection('users').doc(user.uid).set({
                id: user.uid,
                email: user.email,
                coins: 0
            })
            resetUserStateAndRedirect();
        } catch (error) {
            if(error.code === "auth/email-already-in-use"){
                setError('El email ya está en uso')
            } else if(error.code === "auth/invalid-email"){
                setError('El email es inválido')
            }
        }
    }, [email, password, resetUserStateAndRedirect, error])

    const signIn = useCallback( async () => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            resetUserStateAndRedirect();
        } catch (error) {
            if(error.code === "auth/wrong-password") {
                setError('Contraseña incorrecta')
            } else if (error.code === "auth/user-not-found") {
                setError('El email no se encuentra registrado')
            }
        }
    }, [email, password, resetUserStateAndRedirect, error])

    function handleRegisterClick() {
        setIsLogin(!isLogin);
    }


    return (
        <div>
            {
                isLogin ?
                    <LoginPresentation
                        email={email}
                        password={password}
                        welcomeMessage={'BIENVENIDO!'}
                        handleSubmit={handleSubmit}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        handleRegisterClick={handleRegisterClick}
                        signMessage={'INGRESAR'}
                        error={error}
                    />
                :   <LoginPresentation
                        email={email}
                        password={password}
                        welcomeMessage={'ÚNETE AQUÍ!'}
                        handleSubmit={handleSubmit}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        handleRegisterClick={handleRegisterClick}
                        signMessage={'REGISTRARSE'}
                        error={error}
                    />
            }
        </div>
    );
};

export default LoginContainer;
