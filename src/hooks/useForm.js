import { useState, useEffect, useCallback } from "react";

// Creates an Object with empty values
const getErrorDefaultState = (obj) => {
  const res = {};

  for (let prop in obj) {
    res[prop] = "";
  }

  return res;
};

// Default Form States ;   isSubmitting, hasFailed

//useForm hook
function useForm({ initialState, cb, validators, onChange, phase2 }) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(getErrorDefaultState(initialState));
  const [hasFailed, setHasFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const valueChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const reset = () => {
    setValues(initialState);
    setErrors(getErrorDefaultState(initialState));
    setHasFailed(false);
    setIsSubmitting(false);
  };

  // handles the form submitting, does not runs the callback if there are errors
  const handleSubmit = (e) => {
    e.preventDefault();
    setHasFailed(true);
    //check for errors and if there are errors return
    const areErrors = runValidators(validators);
    if (areErrors) return;

    //executes the callback if there was no error
    cb(values, { setIsSubmitting, reset });
  };

  // Run the validators and set the errors in the state, returns a boolean if there is any error
  const runValidators = useCallback(
    (validators) => {
      let isError = false; // boolean to check if there was any error
      if (!validators) return;
      validators.default && validators.default(values, setErrors);

      for (let error in validators) {
        const err = validators[error] && validators[error](values[error]);
        if (err) isError = true;
        err
          ? setErrors((errors) => ({ ...errors, [error]: err }))
          : setErrors((errors) => ({ ...errors, [error]: "" }));
      }
      return isError;
    },
    [values]
  );

  //   useEffect(() => {
  //     if (onChange) runValidators(validators);
  //   }, [values, runValidators, validators, onChange]);

  useEffect(() => {
    if (phase2 && hasFailed) {
      runValidators(validators);
    }
  }, [values, runValidators, validators, hasFailed, phase2]);

  useEffect(() => {
    if (!hasFailed) setErrors(getErrorDefaultState(initialState));
  }, [hasFailed, setErrors, initialState]);

  return {
    state: { values, errors },
    valueChange,
    handleSubmit,
    isSubmitting,
  };
}

export default useForm;
