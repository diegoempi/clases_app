import React, {useState} from 'react';
import AddAnswerForm from "./AddAnswerForm";

const AnswersAdmin = () => {

    const [isUsing, setIsUsing] = useState(false);

    return (
        <>
            <div className="d-flex justify-content-center">
            {
                isUsing ?
                <div className="mt-5">
                    <AddAnswerForm />
                </div>
                :
                <div className="row">
                    <button
                        className="btn btn-success mt-5 ml-5"
                        onClick={() => setIsUsing(true)}
                    >
                    Agrega una hoja de respuestas</button>
                </div>
            }
            </div>
        </>
    );
};

export default AnswersAdmin;
