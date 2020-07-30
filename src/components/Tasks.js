import React from 'react';
import {Link} from "react-router-dom";
import {openAnswers} from "../redux/userFormDuck";
import {useDispatch} from "react-redux";
import {withRouter} from "react-router";

const Tasks = ({answersInfo}) => {

    const dispatch = useDispatch()

    function getOnClick(answerInfo) {
        dispatch(openAnswers(answerInfo));
    }

    return (
        <>
        {
            answersInfo.map( answerInfo => (
                <li key={answerInfo.id}>
                    <Link to="/formulario"
                          onClick = { () => getOnClick(answerInfo)}
                    >{answerInfo.name}</Link>
                </li>
            ))
        }
        </>
    );
};


export default withRouter(Tasks);
