import React, {useEffect} from "react";
import Question from "./Question";
import styled from "@emotion/styled";
import {useDispatch, useSelector} from "react-redux";
import {openAnswers, reloadForm, sendAnswers} from "../../redux/userFormDuck";
import {Link} from "react-router-dom";

const Formulario = (props) => {

    const dispatch = useDispatch()

    const name = useSelector(store => store.userForm.name);
    const correctAnswers = useSelector(store => store.userForm.correctAnswers)
    const coinsGained = useSelector(store => store.userForm.coins)
    const userForm = useSelector(store => store.userForm)

    const questionsCount = Object.keys(correctAnswers).length;

    useEffect( () => {
        if(userForm.id === '') {
            console.log('user form is null')
            props.history.push("/home")
        }
    }, [])

    const handleSubmit = async() => {
        dispatch(sendAnswers(userForm))
    }

    const FlexContainer = styled.div`
      display: flex;
      flex-direction: row;
      height: 100%;
      width: 100%;
      justify-content: center;
      margin-top: 4%;
    `;

    return (
        <>
            <div className="container-fluid">
                <div className="d-flex flex-row justify-content-between mt-2">
                    <div className="flex-col">
                        <Link to="/home">Volver</Link>
                    </div>
                    <div>
                        <h2>{name.toUpperCase()}</h2>
                    </div>
                    <div className="flex-col">
                        Monedas: {coinsGained}
                    </div>
                </div>
                <FlexContainer className="w-100">
                    <div className="d-flex flex-column justify-content-around w-50">
                            {[...Array(questionsCount)].map((value, index) => (
                                <div
                                    className="d-flex flex-row justify-content-between"
                                    key = {index}
                                >
                                    <Question
                                    numberIndex= {index+1}
                                    index = {index}
                                    />
                                </div>
                            ))}
                        <div>
                            <button className="btn btn-success"
                                onClick = { () => handleSubmit()}
                            >
                                Enviar respuestas
                            </button>
                        </div>
                    </div>
                </FlexContainer>
            </div>
        </>
    )
}

export default Formulario;
