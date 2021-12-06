import { Button } from 'reactstrap'

const Text = ({ value, name, onChange, required, label, form }) => {
  return (
    <div className='mx-5'>
      <label className='text-primary' style={{ fontSize: '1.2rem' }}><strong>{label}</strong></label>
      <br />
      <div>
      <input
        type='text'
        style={{
          background: 'none',
          height: '35px',
          border: '1px solid grey',
          borderRadius: '10px',
          width: '100%'
        }}
        value={value}
        name={name}
        required={required}
      />
      </div>
    </div>
  )
}

export default Text
