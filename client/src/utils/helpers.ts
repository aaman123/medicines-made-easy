import { message } from 'antd'

const addMedicineMessage = () => {
  message.success('Medicine added to Cabinet.')
}

const removeMedicineMessage = () => {
  message.error('Medicine removed from Cabinet.')
}

const addNoteMessage = () => {
  message.info('Note added')
}

export {
  addMedicineMessage,
  removeMedicineMessage,
  addNoteMessage
}
