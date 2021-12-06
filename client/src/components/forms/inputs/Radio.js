import { Button } from 'reactstrap'

const Radio = ({ value, name, onChange, required, label, checked }) => {
  return (
    <div className='mx-5 my-3 d-flex justify-content-between'>
      <div className='d-flex align-items-center'>
        <input
          type='radio'
          style={{
            background: 'none',
            height: '20px',
            border: '1px solid grey',
            borderRadius: '10px',
            width: '20px'
          }}
          value={value}
          name={name}
          required={required}
          checked={checked}
        />
        <label className='text-primary mx-2' style={{ fontSize: '1.2rem' }}>
          <strong>{label}</strong>
        </label>
        </div>
        <div>
        <Button className='mx-2' color='danger' outline>
          X
        </Button>
        <Button className='mx-2' color='primary' outline>
          U
        </Button>
        </div>
    </div>
  )
}

export default Radio
