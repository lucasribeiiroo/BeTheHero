import React from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg'
import './styles.css';

export default function IncidentRegister(){
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

        <form>
          <input placeholder="Título"/>
          <textarea placeholder="Descrição"/>
          <input placeholder="Valor em reais"/>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}