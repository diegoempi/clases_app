import React, {useCallback, useState} from 'react';
import './Login.css';
import {db, auth} from '../../firebase';
import { withRouter } from 'react-router';

const Login = (props) => {

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
    }, [email, password, props.history])

    const signIn = useCallback( async () => {
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            resetUserStateAndRedirect();
        } catch (error) {
            if(error.code === "auth/wrong-password") {
                setError('Contraseña incorrecta')
            } else if (error.code === "auth/user-not-found") {
                setError('El email no se encuentra registrado')
            }
        }
    }, [email, password])

    const resetUserStateAndRedirect = () => {
        setEmail('')
        setPassword('')
        setError(null)
        props.history.push('/home')
    }

    function handleRegisterClick() {
        setIsLogin(!isLogin);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">
                                { isLogin ? 'BIENVENIDO NUEVAMENTE!' : 'REGÍSTRATE AQUÍ!'}
                            </h5>
                            <form className="form-signin" onSubmit={handleSubmit}>
                                {
                                    error && isLogin ? (
                                        <div className="alert alert-danger">
                                            {error}
                                        </div>
                                    ) : null
                                }
                                <div className="form-label-group">
                                    <input type="email" id="inputEmail" className="form-control"
                                           placeholder="Email address" required autoFocus
                                           value = {email}
                                           onChange={ e => setEmail(e.target.value)}
                                    />
                                        <label htmlFor="inputEmail">Correo electrónico</label>
                                </div>
                                <div className="form-label-group">
                                    <input type="password" id="inputPassword" className="form-control"
                                           placeholder="Password" required
                                           value = {password}
                                           onChange={ e => setPassword(e.target.value)}
                                    />
                                        <label htmlFor="inputPassword">Contraseña</label>
                                </div>
                                <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Recordar contraseña</label>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                                    {
                                        isLogin ? 'Ingresar' : 'Registrarse'
                                    }
                                </button>
                                <p className="text-center" onClick={ () => handleRegisterClick()}>
                                    { isLogin ? 'No tienes una cuenta? Registrate aquí' : 'Tienes una cuenta? Inicia sesión aquí' }
                                </p>
                                <hr className="my-4" />
                            </form>
                            <button className="btn btn-lg btn-google btn-block text-uppercase" type="button"><i
                                className="fab fa-google mr-2"></i> Iniciar con Google
                            </button>
                            <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="button">
                                <i className="fab fa-facebook-f mr-2"></i> Iniciar con Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Login);
