import React, { useState, useEffect } from 'react'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import './styles.css'
import api from '../../services/api'

const TeacherList = () => {
  const [subject, setSubject] = useState('')
  const [weekDay, setWeekDay] = useState('')
  const [time, setTime] = useState('')
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    (async () => {
      if (!subject || !weekDay || !time) {
        return
      }
  
      const response = await api.get('classes', {
        params: {
          subject, 
          week_day: weekDay, 
          time,
        }
      })

      setTeachers(response.data)
    })()
  }, [subject, weekDay, time])

  return (
    <div 
      id="page-teacher-list" 
      className="container"
    >
      <PageHeader title="Estes são os Proffys disponíveis.">
        <form id="search-teachers">
          <Select 
            name="subject"
            label="Matéria"
            value={ subject }
            onChange={ event => setSubject(event.target.value) }
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

          <Select 
            name="week_day"
            label="Dia da Semana"
            value={ weekDay }
            onChange={ event => setWeekDay(event.target.value) }
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
            name="time"
            label="Hora"
            type="time"
            value={ time }
            onChange={ event => setTime(event.target.value) }
          />
        </form>
      </PageHeader>

      <main>
        {
          teachers.map((teacher: Teacher) => {
            return (
              <TeacherItem key={ teacher.id } teacher={ teacher } />
            )
          })
        }
      </main>
    </div>
  )
}

export default TeacherList