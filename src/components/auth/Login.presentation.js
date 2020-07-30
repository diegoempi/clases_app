import React from 'react';

const LoginPresentation = props => {
    return (

        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">
                                {props.welcomeMessage}
                            </h5>
                            {   props.error !== null ?
                                <div className="alert alert-danger">
                                    {props.error}
                                </div>
                                : null
                            }
                            <form className="form-signin" onSubmit={props.handleSubmit}>
                                <div className="form-label-group">
                                    <input type="email" id="inputEmail" className="form-control"
                                           placeholder="Email address" required autoFocus
                                           value = {props.email}
                                           onChange={ e => props.setEmail(e.target.value)}
                                    />
                                    <label htmlFor="inputEmail">Correo electrónico</label>
                                </div>
                                <div className="form-label-group">
                                    <input type="password" id="inputPassword" className="form-control"
                                           placeholder="Password" required
                                           value = {props.password}
                                           onChange={ e => props.setPassword(e.target.value)}
                                    />
                                    <label htmlFor="inputPassword">Contraseña</label>
                                </div>
                                <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Recordar contraseña</label>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                                    {props.signMessage}
                                </button>
                                <p className="text-center" onClick={ () => props.handleRegisterClick()}>
                                    'Tienes una cuenta? Inicia sesión aquí'
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

LoginPresentation.propTypes = {

};

export default LoginPresentation;
