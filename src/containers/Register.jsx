import React, {useState} from "react";
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {registerRequest} from "../actions"

import Header from "../components/Header";

import "../assets/styles/components/Register.scss"

const Register = (props) => {
    const [form, setForm] =  useState({
        email:"",
        name: "",
        password: "",
    })

    const handleInput = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        props.registerRequest(form)
        props.history.push("/");
    }
    return(
        <>
            <Header isRegister />
            <section className="register">
                <section className="register__container">
                <h2>Regístrate</h2>
                <form className="register__container--form" onSubmit={handleSubmit}>
                    <input 
                        name="name"
                        className="input" 
                        type="text" 
                        placeholder="Nombre" 
                        onChange={handleInput}
                    />
                    <input 
                        name="email"
                        className="input" 
                        type="text" 
                        placeholder="Correo" 
                        onChange={handleInput}
                    />
                    <input 
                        name="password"
                        className="input" 
                        type="password" 
                        placeholder="Contraseña" 
                        onChange={handleInput}
                    />
                    <button className="button">Registrarme</button>
                </form>
                <Link to="/login">Iniciar sesión</Link>
                </section>
            </section>
        </>
    )
}

const mapToDispatchToProps = {
    registerRequest
}
export default connect(null, mapToDispatchToProps)(Register)