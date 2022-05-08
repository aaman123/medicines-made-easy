import React, { useState } from 'react'

import { Button, Card } from 'antd'

import { Medicine } from '../../interfaces/Medicine'
import { addNoteMessage } from '../../utils/helpers'
import { EffectivenessRater, EffectsRater } from '../Rater'

import styles from './Card.module.css'

interface CardProps {
  medicine: Medicine
  setShowCabinet: React.Dispatch<React.SetStateAction<Boolean>>
  showToaster: () => void
  message: string
  showCabinet: React.ComponentState
}

const MedicineCard = ({ medicine, setShowCabinet, showToaster, message, showCabinet }: CardProps) => {
  const [addNote, setAddNote] = useState<boolean>(false)

  /* Handler for adding notes to medicines */
  const handleNote = (e: React.KeyboardEvent<HTMLTextAreaElement>, medicine: Medicine) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLTextAreaElement
      medicine.note = target.value
      target.value = ''
      addNoteMessage()
      setAddNote(!addNote)
    }
  }

  return (
    <Card key={medicine.id} className={styles.card} style={{ height: 350 }}>
    <h2>{medicine.name}</h2>
    {
      !showCabinet &&
      <textarea onKeyDown={(e) => {
        handleNote(e, medicine)
      }} />
    }
    <div className={styles.ratingContainer}>
      <p>Side Effects: </p>
      <EffectsRater medicine={medicine}/>
    </div>
    <div className={styles.ratingContainer}>
      <p>Effectiveness: </p>
      <EffectivenessRater medicine={medicine}/>
    </div>
    {
       !showCabinet && <h3><i className={styles.medicineNote}>{medicine.note}</i></h3>
    }
    <Button type='primary' onClick={() => {
      medicine.addToCabinet = showCabinet
      showToaster()
      setShowCabinet(showCabinet)
    }}>{message}</Button>
  </Card>
  )
}

export default MedicineCard
