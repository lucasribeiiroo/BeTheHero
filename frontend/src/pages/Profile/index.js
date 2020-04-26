import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.svg';
import loader from '../../assets/loader.json';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './styles.css';
import api from '../services/api'
import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';
import { motion } from "framer-motion";
import { containerMotion, itemMotion } from '../../animations/FrameMotion'
import { defaultOptions } from '../../animations/Lottie'
import Lottie from 'react-lottie';

export default function Profile(){
  const [incidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const history = useHistory();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    loadIncidents();
    setTimeout(() => { 
      setShowLoader(false)
  }, 1500);
  }, [ongId])

  function loadIncidents() {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }

  async function handleDeleteIncident(id){
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })
      loadIncidents();
    } catch (error){
      toastr.error('Erro ao deletar caso, tente novamente');
    }
  }

  function handleLogout(){
    localStorage.clear();
    history.push('/');
  }
  
  return (
    <div className="profile-container">
      <Lottie 
        style={{
          position: 'absolute',
          top:'45%',
          left: '45%',
          zIndex: 100,
          visibility: showLoader ?  'none' : 'hidden'
        }} 
        options={defaultOptions(loader)}
        height={100}
        width={100}
      />
      <motion.div 
        className="container"
        style={{visibility: showLoader ?  'hidden' : ''}}
          variants={containerMotion}
          initial="hidden"
          animate="visible"  
      >
      <motion.header className="item" variants={itemMotion}>
        <img src={logo} alt="logo-bth"/>
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button type="button" onClick={() => handleLogout()}>
          <FiPower size={18} color="#E02041" />
        </button>
      </motion.header>

      <h1>Casos cadastrados</h1>
      <motion.ul
        className="container"
        variants={containerMotion(2)}
        initial="hidden"
        animate="visible"
      >
        {incidents.map(incident => (
          <motion.li className="item" variants={itemMotion} key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>
            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </motion.li>
        ))}
      </motion.ul>
      </motion.div>
    </div>
  )
}