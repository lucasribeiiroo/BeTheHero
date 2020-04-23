import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg'
import './styles.css';
import api from '../services/api'
import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';


export default function IncidentRegister(){
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
    <div className="incident-register-container">
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

        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input 
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}