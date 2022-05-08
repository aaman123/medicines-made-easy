import React from 'react'
import { Input } from 'antd'

interface SearchProps {
  onNameChange: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ onNameChange }: SearchProps) => {
  return (
    <div>
      { /* eslint-disable no-unused-expressions */ }
      <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onNameChange(e.target.value) }} placeholder='Search medicines' />
    </div>
  )
}

export default Search
