import React from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg'
import './styles.css';

export default function Register(){
  return (
    <div className="register-container">
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

        <form>
          <input placeholder="Nome da ONG"/>
          <input type="email" placeholder="E-mail"/>
          <input placeholder="WhatsApp"/>

          <div className="input-group">
            <input placeholder="Cidade"/>
            <input placeholder="UF" style={{ width: 80 }} />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}