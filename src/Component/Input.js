import React from 'react'
import '../globals.css'

const Input = ({value, type, label, placeholder, onChange}) => {
  return (
    <div>
      <div className="text-base font-semibold text-left py-2">
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </div>
      <input type={type} value={value} name={label} onChange={onChange} className='w-full px-2 py-1 border rounded border-slate-200' placeholder={placeholder}  />
    </div>
  )
}

export default Input;
