import React, {Fragment, useCallback, useState} from 'react';
import {times} from "lodash";
import {auth, db} from "../../firebase";

const AddAnswerForm = () => {

    const [answersNumber, setAnswersNumber ] = useState(0);

    const [correctAnswers, setCorrectAnswers ] = useState({});
    const [name, setName] = useState('');
    const [id, setId] = useState('');

    const handleAnswersNumber = (e) => {
        if(e.target.value.isNaN){
            setAnswersNumber(0)
        } else {
            setAnswersNumber(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        saveData()
    }

    const saveData = useCallback(async() => {
        try{
            await db.collection('answers').doc().set({
                correctAnswers: correctAnswers,
                name: name,
                id : id
            }).then(() => alert('Answers saved succesfully to the database'));
        } catch (error) {
            console.log(error)
        }
    })

    const handleQuestionChange = (event, index) => {
        const corrects = correctAnswers;
        corrects[index+1] = event.target.value;
        setCorrectAnswers(corrects);
    }




    return (
        <div className="container-flex">
            <form
                onSubmit={handleSubmit}
            >
                <label>Nombre: </label>
                <input
                    type="text"
                    onChange={ (e) => {setName(e.target.value)}}
                    value={name}
                />
                <br/>
                <label>Cantidad de preguntas: </label>
                <input
                    type="number"
                    onChange={(e) => handleAnswersNumber(e)}
                    value = {answersNumber}
                />
                <label>id:</label>
                <input
                    type="text"
                    onChange={(e) => {setId(e.target.value)}}
                    value={id}
                />
                <div>
                    {
                        times(answersNumber, (i) => (
                            <Fragment key = {i}>
                                <div className="d-flex flex-column justify-content-between">
                                    <label>Pregunta: {i+1} </label>
                                    <input
                                        key={i}
                                        type="text"
                                        onChange={(e) => handleQuestionChange(e, i)}
                                    />
                                </div>
                            <br/>
                            </Fragment>
                        ))
                    }
                </div>
                <button
                    className="btn btn-success"
                    type="submit"
                >
                    Enviar
                </button>
            </form>

        </div>
    );
};

export default AddAnswerForm;
