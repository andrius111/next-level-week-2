import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

import api from '../../services/api'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textearea'
import Select from '../../components/Select'

import WarningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'

const TeacherForm = () => {
  const history = useHistory()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')
  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ])

  const addNewScheduleItem = () => {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ])
  }

  const setScheduleItemValue = (position: number, field: string, value: string) => {
    const newArray = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem
    })

    setScheduleItems(newArray)
  }

  const handleCreateClass = (event: FormEvent) => {
    event.preventDefault()

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      Swal.fire({
        title: 'Pronto',
        text: 'Cadastro realizado com sucesso.',
        icon: 'success',
      }).then(() => history.push('/'))
    }).catch(() => {
      Swal.fire({
        title: 'Ops...',
        text: 'Ocorreu um erro no cadastro.',
        icon: 'error',
      })
    })
  }

  return (
    <div 
      id="page-teacher-form" 
      className="container"
    >
      <PageHeader 
        title="Que incrível que você quer dar aulas." 
        description="O primeiro passo é preencher esse formulário de inscrição"  
      />

      <main>
        <form onSubmit={ handleCreateClass }>
          <fieldset>
            <legend>Seus dados</legend>

            <Input 
              name="name" 
              label="Nome completo"
              value={ name }
              onChange={ (event) => { setName(event.target.value) } }
              required={ true }
            />

            <Input 
              name="avatar" 
              label="Avatar"
              value={ avatar }
              onChange={ (event) => { setAvatar(event.target.value) } }
              required={ true }
            />

            <Input 
              name="whatsapp" 
              label="WhatsApp"
              value={ whatsapp }
              onChange={ (event) => { setWhatsapp(event.target.value) } }
              required={ true }
            />

            <Textarea 
              name="bio"
              label="Biografia"
              value={ bio }
              onChange={ (event) => { setBio(event.target.value) } }
              required={ true }
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select 
              name="subject" 
              label="Matéria"
              value={ subject }
              onChange={ event => setSubject(event.target.value) }
              required={ true }
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Química', label: 'Química' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Física', label: 'Física' },
              ]}
            />

            <Input 
              name="cost" 
              label="Custo da sua hora por aula"
              value={ cost }
              onChange={ (event) => { setCost(event.target.value) } }
              required={ true }
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários Disponíveis

              <button 
                type="button"
                onClick={ addNewScheduleItem }
              >
                + Novo Horário
              </button>
            </legend>
            
            { 
              scheduleItems.map((scheduleItem, index) => {
                return (
                  <div 
                    className="schedule-item"
                    key={ index }
                  >
                    <Select 
                      name="week_day"
                      label="Dia da Semana"
                      value={ scheduleItem.week_day }
                      onChange={ e => setScheduleItemValue(index, 'week_day', e.target.value) }
                      required={ true }
                      options={[
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-Feira' },
                        { value: '2', label: 'Terça-Feira' },
                        { value: '3', label: 'Quarta-Feira' },
                        { value: '4', label: 'Quinta-Feira' },
                        { value: '5', label: 'Sexta-Feira' },
                        { value: '6', label: 'Sábado' },
                      ]}
                    />

                    <Input 
                      name="from"
                      label="Das"
                      type="time"
                      value={ scheduleItem.from }
                      onChange={ e => setScheduleItemValue(index, 'from', e.target.value) }
                      required={ true }
                    />

                    <Input 
                      name="to"
                      label="Até"
                      type="time"
                      value={ scheduleItem.to }
                      onChange={ e => setScheduleItemValue(index, 'to', e.target.value) }
                      required={ true }
                    />
                  </div>
                )
              })
            }
          </fieldset>

          <footer>
            <p>
              <img src={ WarningIcon } alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>

            <button type="submit">
              Salvar
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm