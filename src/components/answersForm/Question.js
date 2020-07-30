import React, {Fragment} from "react";
import {selectAnswer} from "../../redux/userFormDuck";
import {useDispatch, useSelector} from "react-redux";
import styled from "@emotion/styled";

const Question = ({numberIndex}) => {

    const currentFormState = useSelector(store => store.userForm.formState);
    const checked = useSelector(store => store.userForm.checkedState);
    const userForm = useSelector(store => store.userForm)

    const maxCoins = currentFormState[numberIndex].maxCoins;
    const disabled = currentFormState[numberIndex].disabled;

    const alternatives = ['a', 'b', 'c', 'd', 'e'];

    const isQuestionDisabled = () => {
        return !disabled.includes(false);
    }

    const dispatch = useDispatch()

    const handleAlternativeSubmit = (event, index) => {
        dispatch(selectAnswer(numberIndex, index, event.target.value))
    }

    const AlternativeInput = styled.input`
      transform: scale(1);
    `;

    return (
        <Fragment>
            {`${numberIndex}:`}
            {
                alternatives.map((value, index) => (
                    <AlternativeInput
                        key = {index}
                        type="radio"
                        id="myCheck"
                        value={value}
                        checked={checked[numberIndex][index]}
                        disabled={disabled[index]}
                        onChange={ (event) => handleAlternativeSubmit(event, index) }
                    />
                ))
            }
            <br/>
            {
                isQuestionDisabled() ? <p>Monedas Ganadas: {maxCoins}</p> : <p>Máximo por ganar: {maxCoins}</p>
            }
        </Fragment>
    )
}

export default Question;
