import React, {useState, useEffect} from 'react';
import { auth, db} from './firebase';
import Formulario from "./components/answersForm/Formulario";
import AnswersAdmin from "./components/answersForm/AnswersAdmin";
import Login from './components/auth/Login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import {Provider} from "react-redux";
import LoginContainer from "./components/auth/Login.container";

function App({store}) {

    const [firebaseUser, setFirebaseUser] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                setFirebaseUser(user)
                if(isUserAdmin(user)) {
                    setIsAdmin(true)
                }
                localStorage.setItem('admin', isAdmin);
            } else {
                setFirebaseUser(null)
                localStorage.removeItem('admin')
            }
        })
    })

    const isUserAdmin = async() => {
        const adminCollection = await db.collection('adminID').get()
        adminCollection.docs.map( doc => {
            try {
                if(doc.id === firebaseUser.id){
                    return true;
                }
            } catch(error){
                console.log(error);
                return null;
            }
        })
        return false;
    }

    const PrivateRoute = ({component, path, ...rest}) => {
        if(localStorage.getItem('admin')){
            console.log('entra a la ruta privada siendo admin')
            return <Route component={component} path={path} {...rest}/>
        } else {
            console.log('entra a la ruta privada sin ser admin')
            return <Redirect to="/" {...rest} />
        }
    }

    return firebaseUser !== false ? (
        <Provider store={store}>
            <Router>
                <Switch>
                    <PrivateRoute component={Admin} path="/admin"/>
                    <Route component={Login} path="/login"/>
                    <Route component={Formulario} path="/formulario"/>
                    <Route component={Home} path="/home"/>
                    <Route component={LoginContainer} path="/" exact></Route>
                    <Route component={AnswersAdmin} path="/adminForm"/>
                </Switch>
            </Router>
        </Provider>
    ) : <p>Loading</p>
}

export default App;
