import { Rate } from 'antd'
import { useState } from 'react'
import { Medicine } from '../../interfaces/Medicine'

interface RaterProps {
  medicine: Medicine
}

/* Component for managing rating for medicines */

const EffectsRater = ({ medicine }: RaterProps) => {
  const [value, setValue] = useState<number | undefined>(medicine.effects)

  const handleChange = (value: number) => {
    setValue(value)
    medicine.effects = value
  }

  return (
    <span>
      <Rate onChange={handleChange} value={value} />
    </span>
  )
}

const EffectivenessRater = ({ medicine }: RaterProps) => {
  const [value, setValue] = useState<number | undefined>(medicine.effectiveness)

  const handleChange = (value: number) => {
    setValue(value)
    medicine.effectiveness = value
  }

  return (
    <span>
      <Rate onChange={handleChange} value={value} />
    </span>
  )
}

export {
  EffectsRater,
  EffectivenessRater
}
