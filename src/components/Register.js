import React,{ useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [registerSuccess, setRegisterSuccess] = useState();
  const [registerError, setRegisterError] = useState();

  const onSubmit = (data) => {
    console.log(data);
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post("https://registration-api-ql4f.onrender.com/register", data, config)
      .then((res) => {
        console.log(res);
        setRegisterSuccess("Create Success");
        setRegisterError("");
        
      })
      .catch((err) => {
        console.log("error",err.response.data);
        setRegisterSuccess("");
        setRegisterError(err.response.data);
      });
  };
  return (
    <section>
      <div className="input-form">
        <div className="flex-col">
          <h1>Sign Up</h1>
          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="Full name"
              {...register("fullname")}
            />
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="error">This field is required</span>
            )}
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="error">This field is required</span>
            )}
            <input
              type="password"
              placeholder="Repeat password"
              {...register("repeat_password", {
                required: true,
                validate: (val) => {
                  if (watch("password") !== val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            {errors.repeat_password?.type === "required" && (
              <span className="error">This field is required</span>
            )}
            {errors.repeat_password?.type === "validate" && (
              <span className="error">{errors.repeat_password.message}</span>
            )}
            <button className="btn">Sign Up</button>
            <span>
              Already have an account?
              <Link to="/login" className="link">
                {" "}
                Sign in
              </Link>
            </span>
            <span className="error">{registerError}</span>
            <span className="success">{registerSuccess}</span>
          </form>
        </div>
      </div>
    </section>
  );
}
