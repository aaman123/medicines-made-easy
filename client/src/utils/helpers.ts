import { message } from 'antd'

const addMedicineMessage = () => {
  message.success('Medicine added to Cabinet.')
}

const removeMedicineMessage = () => {
  message.error('Medicine removed from Cabinet.')
}

export {
  addMedicineMessage,
  removeMedicineMessage
}
