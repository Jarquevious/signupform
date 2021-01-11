import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField, } from "formik";
import * as Yup from "yup";
import "./styles.css";

// Input primitive components

// Text Input Component
const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? ( 
        <div className="error">{meta.error}</div>) : null}
    </>    
  );
};

// Checkbox Component
const MyCheckbox = ({ children, ...props  }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? ( 
      <div className="error">{meta.error}</div>) : null}
    </div>
  );
};

// Select Component
const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props); 
  return (
    <div> 
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div> ) : null}
    </div>
  );
};

const SignupForm = () => {
  return (
    <Formik

    // Initial Values Initiated
      initialValues={{ 
        firstName: "", 
        lastName: "",
        email: "", 
        acceptedTerms: false, 
        jobType: '' }}

      // Validation Scheme calling Yup, a 
      // JavaScript schema builder for 
      // value parsing and validation
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Required"),
        acceptedTerms: Yup.boolean()
          .required('Required')
          .oneOf([true], 'You must accept the terms and conditions.'),
        jobType: Yup.string()
          .oneOf(
            ['designer', 'development', 'product', 'other'], 
            'Invalid Job Type'
          )
          .required('Required'),                                           
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>

        {/* Title */}
        <h1>Subscibe!</h1>

        {/* First Name Input */}
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" type="text" />
        <ErrorMessage name="firstName" />
        
        {/* Last Name Input */}
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" type="text" />
        <ErrorMessage name="lastName" />

        {/* Email Input */}
        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />

        <label htmlFor="colors">Select a color</label>
        <Field name="colors" as="select" className="my-select">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </Field>
    
        {/* Submit Button */}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
