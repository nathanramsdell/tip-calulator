import splitterLogo from './splitterLogo.svg'
import iconDollar from './icon-dollar.svg'
import iconPerson from './icon-person.svg'
import './App.css';
import { useRef, useState } from 'react';

function App() {
  // Variables
  const tipOptions = [5, 10, 15, 25, 50]
  const [bill, setBill] = useState(0)
  const [tip, setTip] = useState(15)
  const [peopleError, setPeopleError] = useState(false)
  const [people, setPeople] = useState(1)
  const tipRef = useRef(null)
  const tipTotal = (+bill * (tip / 100))
  const tipTotalPerPerson = (tipTotal / people).toFixed(2)
  const billTotalPerPerson = ((+bill + tipTotal) / people).toFixed(2)

  // Handling state changes
  const handleBillChange = event => {
    const value = event.target.value
    setBill(value)
  }
  const handleSetTip = value => {
    setTip(value)
    tipRef.current = value
  }
  const handlePeopleChange = event => {
    if (!event.target.value) {
      setPeopleError(true)
      setPeople(event.target.value)
      return
    }
    setPeopleError(false)
    setPeople(event.target.value)
  }

  // Check if there is an invaild people count
  const checkPeopleError = value => {
    if (peopleError) {
      return "Can't be zero people!"
    }
    return value
  }

  // Reset Form
  const resetForm = () => {
    setBill(0)
    setTip(15)
    setPeople(1)
    setPeopleError(false)
  }


  return (
    <div className="App">
      <div className='container'>
        {/* Logo */}
        <img src={splitterLogo} alt="tip logo" width='100' />
        {/* Tip container */}
        <div className='tip'>
          <div className='tip__left'>
            <form>
              <div className='section first'>
                <h5>Bill</h5>
                <div className='input'>
                  <div className='input__icon'>
                    <img src={iconDollar} alt="input icon" className='input__icon__img' />
                  </div>
                  <input onChange={(event) => handleBillChange(event)} type="number" value={bill} className='full input--bill' />
                </div>

              </div>
              <div>
                <div >
                  <div className='section'>
                    <h5>Select Tip %</h5>
                    <div className='tip__left__selection'>
                      {tipOptions.map((option, index) => {
                        return (
                          <button type='button' onClick={() => setTip(+option)} className={`tip__left__selection__button ${option === tip ? 'active' : ''}`} key={`tip-button-${index}`}>{option}%</button>
                        )
                      })}
                      <input type='number' onClick={(event) => setTip(+event.target.value)} onChange={(event) => handleSetTip(+event.target.value)} className={`tip__left__selection__button input ${tipRef.current === tip ? 'active' : ''}`} ref={tipRef} placeholder="Custom" />
                    </div>
                  </div>
                  <div className='tip__left__people seciton'>
                    <div className='flex'>
                      <h5>
                        Number of People
                      </h5>
                      {peopleError && <h5 className='error'>Can't be zero</h5>}
                    </div>

                    <div className='input'>
                      <div className='input__icon'>
                        <img src={iconPerson} alt="input icon" className='input__icon__img' />
                      </div>
                      <input type='number' onChange={(event) => handlePeopleChange(event)} min="1" value={people} className={`${peopleError ? 'error' : ''} full`} />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className='tip__right'>
            <div className='tip__right__amount flex'>
              <div className='section'>
                <h5>Tip Amount</h5>
                <p>/ person</p>
              </div>
              <p  className={`number--large ${peopleError ? 'error' : ''}`}>
                {checkPeopleError(tipTotalPerPerson)}
              </p>
            </div>
            <div className='tip__right__total flex'>
              <div className='section'>
                <h5>Total</h5>
                <p>/ person</p>
              </div>
              <p className={`number--large ${peopleError ? 'error' : ''}`}>
              <img src={iconDollar} alt="input icon" width={20} height={30}  />
                 {checkPeopleError(billTotalPerPerson)}
              </p>
            </div>
            <div className='tip__right__reset'>
              <button onClick={() => { resetForm() }}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
