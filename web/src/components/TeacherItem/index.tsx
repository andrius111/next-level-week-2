import React from 'react'

import WhatsAppIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img 
          src="https://avatars0.githubusercontent.com/u/15034472?s=400&u=82daed5ec089838a9d433e3c3dbf2f552f732420&v=4" 
          alt="Andrius" 
        />

        <div>
          <strong>Andrius</strong>
          <span>Matemática</span>
        </div>
      </header>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non ipsum lobortis, scelerisque neque efficitur, porttitor nunc. 
        <br /><br />
        Fusce sed metus efficitur, tempor nisi at, maximus ex. Morbi accumsan odio nisl, a laoreet lacus ornare dapibus. Vivamus ac dignissim nisi. 
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 10,00</strong>
        </p>

        <button type="button">
          <img 
            src={ WhatsAppIcon } 
            alt="Ícone WhatsApp" 
          />
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem