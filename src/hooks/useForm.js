import { useState, useEffect, useCallback } from "react";

// Creates an Object with empty values
const getErrorDefaultState = (obj) => {
  const res = {};

  for (let prop in obj) {
    res[prop] = "";
  }

  return res;
};

const checkErrors = (obj) => {
  let isError = false;

  for (let prop in obj) {
    if (obj[prop]) isError = true;
  }

  return isError;
};

//useForm hook
function useForm({ initialState, cb, validators, phase1, phase2 }) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(getErrorDefaultState(initialState));
  const [touched, setTouched] = useState(getErrorDefaultState(initialState));
  const [hasFailed, setHasFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const valueChange = (e) => {
    const { name, value, checked } = e.target;
    // Checkbox Support
    if (e.target.type === "checkbox") {
      // Array in checkbox support
      if (Array.isArray(values[name])) {
        let res = [];
        if (!checked) {
          res = values[name].filter((val) => val !== value);
          return setValues({ ...values, [name]: res });
        }
        return setValues({ ...values, [name]: [...values[name], value] });
      }

      return setValues({
        ...values,
        [name]: checked,
      });
    }
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((touched) => ({
      ...touched,
      [name]: true,
    }));
  };

  //resets everything
  const reset = () => {
    setValues(() => initialState);
    setErrors(() => getErrorDefaultState(initialState));
    setTouched(() => getErrorDefaultState(initialState));
    setHasFailed(() => false);
    setIsSubmitting(() => false);
  };

  // handles the form submitting, does not runs the callback if there are errors
  const handleSubmit = (e) => {
    e.preventDefault();

    //check for errors and if there are errors return PHASE2
    if (phase2) {
      const areErrors = runValidators(validators);
      if (areErrors) {
        setHasFailed(() => true);
        return;
      }
    }

    //check for errors and if there are errors return PHASE1
    if (phase1) {
      const areErrors = checkErrors(errors);
      if (areErrors) {
        setHasFailed(() => true);
        return;
      }
    }

    setHasFailed((failed) => !failed);
    //executes the callback if there was no error
    cb(values, { setIsSubmitting, reset });
  };

  // Run the validators and set the errors in the state, returns a boolean if there is any error
  const runValidators = useCallback(
    (validators) => {
      let isError = false; // boolean to check if there was any error
      if (!validators) return;
      for (let error in getErrorDefaultState(initialState)) {
        if (error === "default") continue;

        const err =
          validators[error] && validators[error](values[error], values);

        if (err) isError = true;

        err
          ? setErrors((errors) => ({ ...errors, [error]: err }))
          : setErrors((errors) => ({ ...errors, [error]: "" }));
      }

      // Runs the default validator
      const formError = validators.default && validators.default(values);
      if (formError) {
        for (let err in formError) {
          if (formError[err]) isError = true;
        }
        setErrors((err) => ({ ...err, ...formError }));
      }
      return isError;
    },
    [values, initialState]
  );

  // If on phase2 prop is passed, then runs the validators onChange
  useEffect(() => {
    if (phase1) runValidators(validators);
  }, [values, runValidators, validators, phase1]);

  // runs If formSubmission has failed once; It validates the input on change
  useEffect(() => {
    if (phase2 && hasFailed) {
      runValidators(validators);
    }
  }, [values, runValidators, validators, hasFailed, phase2]);

  // cleans up the error state, after hasFailed is set to false ;
  // useEffect(() => {

  //   if (!hasFailed) setErrors(getErrorDefaultState(initialState));
  // }, [hasFailed, setErrors, initialState]);

  return {
    state: { values, errors, touched, hasFailed },
    valueChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  };
}

export default useForm;
