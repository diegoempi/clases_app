import React from 'react';
import {withRouter} from "react-router";

const Admin = (props) => {
    return (
        <>
        <h1>Acá van a estar las funciones del administrador</h1>
            <button onClick={ () => props.history.push('/adminForm')}>
            Administra respuestas
            </button>
        </>
    );
};

export default withRouter(Admin);
