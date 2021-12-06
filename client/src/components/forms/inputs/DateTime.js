import { Button } from 'reactstrap'

const DateTime = ({ value, name, onChange, required, label }) => {
  return (
    <div className='mx-5'>
      <label className='text-primary' style={{ fontSize: '1.2rem' }}><strong>{label}</strong></label>
      <br />
      <div className='d-flex'>
      <input
        type='datetime-local'
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
      <Button className='mx-2' color="danger" outline>X</Button>
      <Button className='mx-2' color="primary" outline>U</Button>
      </div>
    </div>
  )
}

export default DateTime
