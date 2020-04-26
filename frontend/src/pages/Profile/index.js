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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Profile(){
  const [incidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const history = useHistory();
  const [showLoader, setShowLoader] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

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
    } finally {
      setOpenDialog(false);
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
        variants={containerMotion}
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
            <button type="button" onClick={() => setOpenDialog(true)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Excluir incidente"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Tem certeza que deseja excluir o incidente?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button className="dialog-btn yes" onClick={() => handleDeleteIncident(incident.id)} color="primary">
                  Sim
                </button>
                <button className="dialog-btn no" onClick={() => setOpenDialog(false)} color="primary" autoFocus>
                  Não
                </button>
              </DialogActions>
            </Dialog>
          </motion.li>
        ))}
      </motion.ul>
      </motion.div>
    </div>
  )
}