import { useReducer } from 'react';

const INITIAL_STATE = { value: '', isTouched: false };

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT': {
      return { ...state, value: action.payload };
    }
    case 'BLUR': {
      return { ...state, isTouched: true };
    }
    default: {
      return { ...INITIAL_STATE };
    }
  }
};

const useInput = validateValue => {
  const [inputState, dispatch] = useReducer(inputStateReducer, INITIAL_STATE);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const valueChangeHandler = event => {
    dispatch({ type: 'INPUT', payload: event.target.value });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
