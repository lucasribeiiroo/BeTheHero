import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg'
import './styles.css';
import api from '../services/api'
import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';
import { containerMotion } from '../../animations/FrameMotion'
import { motion } from "framer-motion";

export default function IncidentRegister(){
  const { register, handleSubmit, errors } = useForm()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  async function handleNewIncident(e){
    e.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      });
      history.push('/profile');
    } catch (error){
      toastr.error('Erro ao cadastrar novo incidente, verifique as informações')
    }
  }

  return (
    <motion.div 
      className="incident-register-container container"
      variants={containerMotion(0.5)}
      initial="hidden"
      animate="visible"
    >
      <div className="content">
        <section>
        <img src={logo} alt="logo-bth"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
        
          <Link className='back-link' to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleSubmit(handleNewIncident)}>
          <input
            name='title'
            ref={register({ required: true, maxLength: 30 })} 
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          {errors?.title?.type === "required"  && <div className="error-message">Campo obrigatório!</div>}
          {errors?.title?.type === "maxLength" && <div className="error-message">Campo inválido, título deve ter no máximo 30 caracteres!</div>}
          <textarea 
            name='description'
            placeholder="Descrição"
            ref={register({ required: true })} 
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          {errors.description && <div className="error-message">Campo obrigatório!</div>}
          <input 
            name='value'
            placeholder="Valor em reais"
            ref={register({ required: true, pattern: /\d+/ })} 
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          {errors?.value?.type === "required" && <div className="error-message">Campo obrigatório!</div>}
          {errors?.value?.type === "pattern" && <div className="error-message">Campo inválido, digite apenas números!</div>}
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </motion.div>
  )
}