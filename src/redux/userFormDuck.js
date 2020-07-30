import {db, auth} from "../firebase";

const initialState = {
    name: '',
    id: '',
    correctAnswers: {},
    selected: {},
    coins: 0,
    formState: {},
    checkedState: {}
}

const OPEN_ANSWERS = 'OPEN_ANSWERS';
const SEND_ANSWERS = 'SEND_ANSWERS';
const SELECT_ANSWER = 'SELECT_ANSWER';
const RELOAD_FORM = 'RELOAD_FORM';
const GET_STATE_FROM_DATABASE = 'GET_STATE_FROM_DATABASE'

export default function userFormReducer(state = initialState, action){
    switch(action.type) {
        case OPEN_ANSWERS:
            return {...state,
                id: action.payload.id,
                name: action.payload.name,
                correctAnswers: action.payload.correctAnswers,
                selected:{},
                formState: initializeFormState(action.payload.correctAnswers),
                checkedState: initializeCheckedState(action.payload.correctAnswers)
            }
        case RELOAD_FORM:
            return action.payload
        case SELECT_ANSWER:
            return {...state,
                    selected: {
                        ...state.selected,
                        [action.payload.questionNumber]: action.payload.value
                    },
                    checkedState : {
                        ...state.checkedState,
                        [action.payload.questionNumber]: getNewCheckedState(action.payload.index),
                    }
            }
        case SEND_ANSWERS:
            return {
                ...state,
                coins: action.payload.coins,
                formState: getNewFormState(state),
                //checkedState: initializeCheckedState(state.correctAnswers),
            };
        case GET_STATE_FROM_DATABASE:
            return {
                ...state,
                checkedState: action.payload.checkedState,
                formState: action.payload.formState,
                selected: action.payload.selected
            }
        default:
            return state;
    }
}

// actions
export const openAnswers = (answerInfo) => async(dispatch) => {

    if (localStorage.getItem(`userForm${answerInfo.id}`)) {
        dispatch({
            type: RELOAD_FORM,
            payload: JSON.parse(localStorage.getItem(`userForm${answerInfo.id}`))
        })
    } else {
        dispatch({
            type: OPEN_ANSWERS,
            payload: answerInfo,
            formState: initializeFormState(answerInfo.correctAnswers)
        })
        try {
            const userId = auth.currentUser.uid;
            await db.collection('userForm').doc(userId).get()
                .then((doc) => {
                    if (doc[answerInfo.id]) {
                        dispatch({
                            type: GET_STATE_FROM_DATABASE,
                            payload: doc[answerInfo.id]
                        })
                        console.log('pasa por aqui bro')
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
}

export const reloadForm = (payload) => (dispatch) => {
    dispatch({
        type: RELOAD_FORM,
        payload: payload
    })
}

export const sendAnswers = (userForm) => async(dispatch, getState) => {
    try{
        const userId = auth.currentUser.uid;
        await db.collection('usersForm').doc(userId).set({
            [userForm.id]: {
                selected: userForm.selected,
                formState: userForm.formState,
                checkedState: userForm.checkedState
            }
        }, { merge: true }).then(() => alert('Respuestas enviadas correctamente'));
    } catch (error) {
        console.log(error)
    }
    dispatch({
        type: SEND_ANSWERS,
        payload: {
            coins: 0
        }
    })
    const uForm = getState().userForm
    localStorage.setItem(`userForm${uForm.id}`, JSON.stringify(uForm))
}

export const selectAnswer = (questionNumber, index, value) => async(dispatch, getState) => {
    dispatch({
        type: SELECT_ANSWER,
        payload: {
            questionNumber: questionNumber,
            index: index,
            value: value
        }
    })
    const userForm = getState().userForm
    localStorage.setItem(`userForm${userForm.id}`, JSON.stringify(userForm))
}

const initializeFormState = (correctAnswers) => {
    const questionState = {
        disabled: [false, false, false, false, false],
        maxCoins: 5
    }
    const formState = {}
    Object.keys(correctAnswers).forEach( key => (
            formState[key]=questionState
        )
    )
    return formState;
}

const initializeCheckedState = (correctAnswers) => {

    const checked = [false, false, false, false, false];
    const checkedState = {};

    Object.keys(correctAnswers).forEach(key => (
        checkedState[key] = checked
    ));

    return checkedState;
}

const getNewCheckedState = (index) => {
    const checked = Array.from({length: 5}, () => false);
    return checked.map((checked, i) => (i === index ? true : false))
}

const getNewFormState = (state) => {
    let selected = state.selected;
    const correctAnswers = state.correctAnswers;
    let formState = state.formState;

    Object.keys(correctAnswers).forEach( (key, value) => {
        if(correctAnswers[key] === selected[key]) {
            formState = {
                ...formState,
                [key]: {
                    ...formState[key],
                    disabled: [true, true, true, true, true],
                }
            }
        } else if(selected[key] !== undefined) {
            formState = {
                ...formState,
                [key]: {
                    ...formState[key],
                    maxCoins: formState[key].maxCoins - 1
                }
            }
        }
    })
    return formState;
}
