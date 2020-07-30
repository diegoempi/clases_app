import React, {useEffect, useState} from 'react';
import { auth } from '../firebase';
import {withRouter} from "react-router";
import {db} from '../firebase'
import Tasks from "./Tasks";

const Home = (props) => {

    const [user, setUser] = useState(null);

    const [answersInfo, setAnswersInfo] = useState([]);

    useEffect( () => {
        if(auth.currentUser) {
            setUser(auth.currentUser)
        } else {
            console.log('esta redirigiendo porque no hay usuario')
            props.history.push('/login')
        }
    }, [props.history])

    useEffect(() => {
        const getAnswersData = async() => {
            const snapshot = await db.collection('answers').get()
            const data = await snapshot.docs.map( doc => doc.data())
            const answersInfo = [];
            data.forEach(value => {
                answersInfo.push({
                    name: value.name,
                    id: value.id,
                    correctAnswers: value.correctAnswers
                });
            })
            setAnswersInfo(answersInfo)
        }
        getAnswersData()
    }, [])

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                props.history.push('/login');
            })
    }

    return (
        <div className="container-flex container-fluid">
            <div className="row mt-5">
                <div className="col d-flex justify-content-center">
                    <h1>INTENSIVO 2020</h1>
                </div>
                <div className="col d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={ () => handleLogout()}>Salir</button>
                </div>
            </div>
            <div className="row">
                    <div className="col">
                        <h4>Tareas por completar</h4>
                        <Tasks
                        answersInfo = {answersInfo}
                    />
                </div>
                <div className="col">
                    <h4>Tareas Completas</h4>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Home);
