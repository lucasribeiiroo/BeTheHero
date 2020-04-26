import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import logo from '../../assets/logo.svg'
import api from '../services/api'
import './styles.css';
import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';
import { containerMotion } from '../../animations/FrameMotion'
import { motion } from "framer-motion";

export default function Register(){

  const { register, handleSubmit, errors, setError, clearError } = useForm()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const history = useHistory();

  async function handleRegister(){
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    }
    try{
      const response = await api.post('ongs', data);
      toastr.sucess(`Seu ID de acesso é: ${response.data.id}`);
      history.push('/'); 
    } catch(error){
      toastr.info('Erro ao realizar cadastro, verifique suas informações!')
    }
  }

  const checkPhone = (e) => {
    const { value } = e.target;
    const phoneRegex = new RegExp(/\d{11}/);
    if(!phoneRegex.test(value)){
      setError("whatsapp", "invalidPhone", "Campo inválido, digite apenas números!")
    } else { 
      clearError("whatsapp");
    }
  }

  const checkUf = (e) => {
    const { value } = e.target;
    const ufRegex = new RegExp(/[A-Za-z]/);
    if(!ufRegex.test(value) || value.length > 2){
      setError("uf", "invalidUf", "Campo inválido, digite apenas as siglas sem números!")
    } else { 
      clearError("uf");
    }
  }

  return (
    <motion.div 
      className="register-container container"
      variants={containerMotion(0.5)}
      initial="hidden"
      animate="visible"
    >
      <div className="content">
        <section>
        <img src={logo} alt="logo-bth"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrem os casos da sua ONG.</p>
        
          <Link className='back-link' to="/">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para inicio
          </Link>
        </section>

        <form onSubmit={handleSubmit(handleRegister)}>
          <input
            name='ong'
            ref={register({ required: true })} 
            placeholder="Nome da ONG" 
            value={name}
            onChange={e => setName(e.target.value)}
          />

          {errors?.ong?.type === "required" && <div className="error-message">Campo obrigatório!</div>}

          <input 
            name='email'
            ref={register({ required: true })} 
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}    
          />

          {errors?.email?.type === "required" && <div className="error-message">Campo obrigatório!</div>}
          
          <input 
            name='whatsapp'
            ref={register({ required: true })}
            placeholder="DDD + WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            onBlur={e => checkPhone(e)}    
          />

          {errors?.whatsapp?.type === "invalidPhone" && <div className="error-message">{errors.whatsapp.message}</div>}
          {errors?.whatsapp?.type === "required" && <div className="error-message">Campo obrigatório!</div>}

            <input
              name='city'
              ref={register({ required: true })} 
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)} 
            />

            {errors?.city?.type === "required" && <div className="error-message">Campo obrigatório!</div>}
            
            <input
              name='uf'
              ref={register({ required: true, maxLength: 2 })} 
              placeholder="UF"
              value={uf}
              onChange={e => setUf(e.target.value)}
              onBlur={e => checkUf(e)}
            />

            {errors?.uf?.type === "required" && <div className="error-message">Campo obrigatório!</div>}
            {errors?.uf?.type === "invalidUf" && <div className="error-message">{errors.uf.message}</div>}

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </motion.div>
  )
}