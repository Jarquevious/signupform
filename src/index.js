import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import "./styles.css";


const SignupForm = () => {
  const formik = useFormik({
    initialValues: { 
        firstName: "",
        lastName: "",
        email: "" 
    },
    validationSchema: Yup.object ({
      firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
        <h1>Subscibe!</h1>
        {/* First Name Input */}
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        type="text"
        {...formik.getFieldProps('firstName')}
      />
       {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
       
       {/* Last Name Input */}
       <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        type="text"
       {...formik.getFieldProps('lastName')}
      />
       {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

       {/* Email Input */}
       <label htmlFor="email">Email Address</label>
      <input
        id="email"
        type="email"
        {...formik.getFieldProps('email')}
      />
       {formik.touched.errors && formik.errors.email ? <div>{formik.errors.email}</div> : null}

      <button type="submit">Submit</button>
    </form>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
