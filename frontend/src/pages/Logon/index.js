import React, { useState }from 'react';
import { useForm } from 'react-hook-form'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';
import api from '../services/api'
import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';
import { containerMotion } from '../../animations/FrameMotion'
import { motion } from "framer-motion";


function Logon(){
  const { register, handleSubmit, errors } = useForm()
  const [id, setId] = useState('');
  const history = useHistory();

  const handleLogin = async (data) =>{
    console.log('data', data)
    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
    } catch(err) {
      toastr.error('Falha no login, tente novamente');
    }
  }

    return (
      <motion.div  
        className="logon-container container"
        variants={containerMotion(0.5)}
        initial="hidden"
        animate="visible" 
      >
        <section className="form">
          <img src={logo} alt="logo-bth"/>
          <form onSubmit={handleSubmit(handleLogin)}>
            <h1>Faça seu logon</h1>
            <input
              name='id'
              placeholder="Sua ID"
              ref={register({ required: true })} 
              value={id}
              onChange={e => setId(e.target.value)}    
            />
            {errors.id && <div className="error-message">Campo obrigatório!</div>}
            <button className="button" type="submit">Entrar</button>

          <Link className='back-link' to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
          </form>
        </section>

        <img src={heroesImg} alt="heroes"/>
      </motion.div>
    )
}

export default Logon;