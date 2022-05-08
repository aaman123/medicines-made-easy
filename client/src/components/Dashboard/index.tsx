import React, { useEffect, useState } from 'react'
import { Medicines } from '../../constants/medicines'
import { Medicine } from '../../interfaces/Medicine'
import Search from '../Search'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [medicineFilter, setMedicineFilter] = useState<string>('')

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

  return (
    <div className={styles.container}>
      <h1>Medicines made easy</h1>
      <Search onNameChange={setMedicineFilter}/>
      <div className={styles.cardContainer}>
        {
          onNameFilter().map((medicine: Medicine) => {
            return <div key={medicine.id} className={styles.card}>
                <p>{medicine.name}</p>
              </div>
          })
        }
      </div>
    </div>
  )
}

export default Dashboard
