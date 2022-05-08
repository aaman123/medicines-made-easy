import React, { useCallback, useEffect, useState } from 'react'
import { Button } from 'antd'

import Search from '../Search'
import MedicineCard from '../Card'
import { Medicines } from '../../constants/medicines'
import { Medicine } from '../../interfaces/Medicine'
import { addMedicineMessage, removeMedicineMessage } from '../../utils/helpers'

import styles from './Dashboard.module.css'

const Dashboard = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [medicineFilter, setMedicineFilter] = useState<string>('')
  const [showCabinet, setShowCabinet] = useState<Boolean>(false)

  useEffect(() => {
    setMedicines(Medicines)
  })

  /* Handler for searching medicines based on name */
  const onNameFilter = () => {
    return medicines.filter((medicine: Medicine) => {
      return (
        medicine.name.toLowerCase().includes(medicineFilter.toLowerCase())
      )
    })
  }

  /* Handler for sorting medicines based on side-effects and effectiveness */
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
                <MedicineCard
                  key={medicine.id}
                  medicine={medicine}
                  setShowCabinet={setShowCabinet}
                  showToaster={() => { removeMedicineMessage() }}
                  message={'Remove from Cabinet'}
                  showCabinet={false}
                />
              }
              ))
            /* eslint-disable operator-linebreak */
            :
              (onNameFilter().map((medicine: Medicine) => {
                return (
                  <MedicineCard
                    key={medicine.id}
                    medicine={medicine}
                    setShowCabinet={setShowCabinet}
                    showToaster={() => { addMedicineMessage() }}
                    message={'Add to Cabinet'}
                    showCabinet={true}
                  />
                )
              })
              )
          }
      </div>
    </div>
  )
}

export default Dashboard
