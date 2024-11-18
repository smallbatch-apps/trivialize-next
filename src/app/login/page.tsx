// import { FC } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

import BlueBox from "@/components/layout/BlueBox";
import LoginForm from "@/components/forms/LoginForm";
import Hero from "@/images/heroes/books-2.jpg";

export default function LogIn() {
  return (
    <>
      <BlueBox hero={Hero}>
        <h2 className="text-6xl mb-8 font-oswald">Log In To Trivialize</h2>
      </BlueBox>

      <div className="px-5 py-3 sm:px-8 sm:py-5 md:px-16 md:py-10 lg:px-20 lg:py-16 xl:px-60 xl:py-20 2xl:px-72 2xl:py-32 font-light">
        HELLO
        <LoginForm />
      </div>
    </>
  );
}
