import React, { useCallback, useEffect, useState } from 'react'
import { Medicines } from '../../constants/medicines'
import { Medicine } from '../../interfaces/Medicine'
import Search from '../Search'
import styles from './Dashboard.module.css'
import { Card, Button } from 'antd'
import { EffectivenessRater, EffectsRater } from '../Rater'
import { addMedicineMessage, removeMedicineMessage } from '../../utils/helpers'

const Dashboard = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [medicineFilter, setMedicineFilter] = useState<string>('')
  const [showCabinet, setShowCabinet] = useState<Boolean>(false)

  useEffect(() => {
    setMedicines(Medicines)
  })

  const onNameFilter = () => {
    return medicines.filter((medicine: Medicine) => {
      return (
        medicine.name.toLowerCase().includes(medicineFilter.toLowerCase())
      )
    })
  }

  const sortBy = useCallback((sortParam: string) => {
    let sortedMedicines = []
    if (sortParam === 'effectiveness') {
      sortedMedicines = medicines.sort((a, b) => {
        return b.effectiveness! - a.effectiveness!
      })
    } else {
      sortedMedicines = medicines.sort((a, b) => {
        return b.effects! - a.effects!
      })
    }

    setMedicines([...sortedMedicines])
  }, [medicines])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MEDICINES MADE EASY</h1>
      <div className={styles.searchPanel}>
        <Search onNameChange={setMedicineFilter}/>
        <Button type='primary' onClick={() => { setShowCabinet(!showCabinet) }}>
          {
            showCabinet ? <h4>View medicines</h4> : <h4>View your cabinet</h4>
          }
        </Button>
        <Button onClick={() => { sortBy('effectiveness') }}>Sort By effectiveness</Button>
        <Button onClick={() => { sortBy('effects') }}>Sort By side effects</Button>
      </div>
      <div className={styles.cardContainer}>
        {
          showCabinet
            ? (medicines.map((medicine: Medicine) => {
                return medicine.addToCabinet === true &&
                  <Card key={medicine.id} className={styles.card} style={{ height: 350 }}>
                    <h2>{medicine.name}</h2>
                    <textarea onChange={(e) => {
                      medicine.note = e.target.value
                    }} />
                    <div className={styles.ratingContainer}>
                      <p>Side Effects: </p>
                      <EffectsRater medicine={medicine}/>
                    </div>
                    <div className={styles.ratingContainer}>
                      <p>Effectiveness: </p>
                      <EffectivenessRater medicine={medicine}/>
                    </div>
                    <h3><i className={styles.medicineNote}>{medicine.note}</i></h3>
                    <Button type='primary' onClick={() => {
                      medicine.addToCabinet = false
                      removeMedicineMessage()
                      setShowCabinet(false)
                    }}>Remove from Cabinet</Button>
                  </Card>
              }
              ))
            /* eslint-disable operator-linebreak */
            :
              (onNameFilter().map((medicine: Medicine) => {
                return (
                  <Card key={medicine.id} className={styles.card}>
                    <h2>{medicine.name}</h2>
                    <div className={styles.ratingContainer}>
                      <p>Side Effects: </p>
                      <EffectsRater medicine={medicine}/>
                    </div>
                    <div className={styles.ratingContainer}>
                      <p>Effectiveness: </p>
                      <EffectivenessRater medicine={medicine}/>
                    </div>
                    <Button type='primary' onClick={() => {
                      medicine.addToCabinet = true
                      addMedicineMessage()
                    }}>Add to Cabinet</Button>
                  </Card>
                )
              })
              )
          }
      </div>
    </div>
  )
}

export default Dashboard
