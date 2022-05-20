import React, { useState, useEffect } from 'react'
import './App.css'    

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'es-ES'

function App() {


  const [isListening, setIsListening] = useState(true)
  const [note, setNote] = useState(null)   
  const [selectAccount, setSelectAccount] = useState(true) 
  const [valueTransfer, setValueTransfer] = useState(false) 
  const [accountFrom, setAccountFrom] = useState(false)
  const [confirmTransfer, setConfirmTransfer] = useState(false)
  const [finish, setFinish] = useState(false)
  const [receiver, setReceiver] = useState('')
  const [receiverValue, setReceiverValue] = useState('')
  const [receiverFrom, setReceiverFrom] = useState('')
  const [box, setbox] = useState(true)

  useEffect(() => {
    handleListen() 
    // eslint-disable-next-line
  }, [isListening])
  
  const handleListen = () => { 
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')  
    }

    let words = {
      receiver: ['mamá',  'hermano', 'amigo', 'tía', 'tío', 'alguien nuevo', 'contacto nuevo'],
      value: ['100,000','100.000', '50.000', '50,000', '120.000', '120,000', '150,000', '5000', '20000', '$5000','10000','10.000','10,000'],
      from: ['nómina', 'ahorros'],
      finish: ['transferir','transfierelos','transferirlos'],
      repeat: ['sí','no']
    }

    mic.onresult = event => {
      let transcript = Array.from(event.results)   
        .map(result => result[0].transcript 
          /*result.isFinal && (words.receiver.some(function(v) { return result[0].transcript.indexOf(v) >= 0; })) ? result[0].transcript : ''*/)
        .join('')
        console.log(transcript)
        setNote(transcript)
      
      words.receiver.some(function(v) { 
        if(transcript.indexOf(v) >= 0 && selectAccount) { 
          setReceiver(v)
          transcript = ''
          document.getElementById(v).checked = true
          setIsListening(false)
          setNote('')
            setTimeout(()=>{
              setValueTransfer(true)
              setSelectAccount(false)
              setIsListening(true)
            },1500)
        }
        return true;
      })

      words.value.some(function(v) { 
        if(transcript.indexOf(v) >= 0 && valueTransfer) { 
          setReceiverValue(v) 
          transcript = ''
          setIsListening(false)
          setNote('')
            setTimeout(()=>{
              setAccountFrom(true)
              setValueTransfer(false)
              setIsListening(true)
            },1500)
        }
        return true;
      })

      words.from.some(function(v) { 
        if(transcript.indexOf(v) >= 0 && accountFrom) { 
          let account = v === 'ahorros' ? 'Cuenta de Ahorros' : 'Cuenta Nómina';
          setReceiverFrom(account)
          transcript = ''
          document.getElementById(v).checked = true
          setIsListening(false)
          setNote('')
            setTimeout(()=>{
              setConfirmTransfer(true)
              setAccountFrom(false)
              setIsListening(true)
            },1500)
        }
        return true;
      })

      words.finish.some(function(v) { 
        if(transcript.indexOf(v) >= 0 && confirmTransfer) {  
          transcript = '' 
          setIsListening(false)
          setNote('')
            setTimeout(()=>{
              setFinish(true)
              setConfirmTransfer(false) 
              setIsListening(true)
            },1500)
        }
        return true;
      })

      words.repeat.some(function(v) { 
        if(transcript.indexOf(v) >= 0 && finish) {  
          transcript = '' 
          setIsListening(false)
          setNote('')
            setTimeout((val)=>{
              if(val === 'sí'){
                setFinish(false)
                setSelectAccount(true) 
                setIsListening(true)
                //reset both forms
                window.document.getElementById('recipient').reset();
                window.document.getElementById('moneyfrom').reset();
              }else{
                setbox(false)
              }
            },1500, v)
        }
        return true;
      })

      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }
   
  
  return (
    <>  
      <div onLoad={() => setIsListening(true)} className="container"> 
        <div className="box" style={{ display: box ? "block" : "none" }}> 
          <div className='close'><a href="/#" onClick={() => setbox(box => !box)}>X</a></div>
          <div className="vivi_text" style={{ display: selectAccount ? "block" : "none" }} >
                <p>Buenos dias Cristian,</p>
                <p>¿Desea transferir a uno de sus contactos recurrentes, o desea transferir a un nuevo número?</p>
                <p className="vivi_listened"><b>{note}</b></p> 
                <div className='options'>
                  <form id='recipient'>
                    <div className='elemento'>
                      <label>
                        <input type="radio" id="mamá" value="mamá" name="mama" />
                        <b>Mamá</b> 
                      </label>
                      <div className='number'>320 859 5477</div>
                    </div>
                    <div className='elemento'>
                      <label>
                        <input type="radio" id="hermano" value="hermano" name="hermano" />
                        <b>Hermano</b>
                      </label>
                      <div className='number'>320 859 5477</div>
                    </div>
                    <div className='elemento'>
                      <label>
                      <input type="radio" id="amigo" value="amigo" name="amigo" />
                        <b>Amigo</b>  
                      </label>
                      <div className='number'>320 859 5477</div>
                    </div>
                    <div className='elemento'>
                      <label>
                      <input type="radio" id="tía" value="tía" name="tía" />
                        <b>Tia</b>  
                        </label>
                      <div className='number'>320 859 5477</div>
                    </div>
                  </form>
                </div>
          </div> 
          <div className="vivi_text" style={{ display: valueTransfer ? "block" : "none" }} > 
                <p>Por lo general usted transfiere a su {receiver} $50.000 COP</p>
                <p>¿Desea enviar ese valor o digame otro valor?</p>
                <p className="vivi_listened"><b>{note}</b></p> 
          </div> 
          <div className="vivi_text" style={{ display: accountFrom ? "block" : "none" }}>
                <p>¿Quiere realizar la transferencia por {receiverValue} pesos desde su Cuenta de Nómina o desde otra Cuenta?</p> 
                <p className="vivi_listened"><b>{note}</b></p> 
                <div className='options'>
                  <form id='moneyfrom'>
                    <div className='elemento'>
                      <label>
                        <input type="radio" id="nómina" name="nomina" />
                        <b>Cuenta de Nómina</b> 
                      </label>
                      <div className='number'>5678 8592 5477 8457</div>
                    </div>
                    <div className='elemento'>
                      <label>
                        <input type="radio" id="ahorros" name="ahorros" />
                        <b>Cuenta de Ahorros</b>
                      </label>
                      <div className='number'>3220 8549 5477 3197</div>
                    </div>  
                  </form>
                </div>
          </div> 
          <div className="vivi_text" style={{ display: confirmTransfer ? "block" : "none" }}>
                <p>Confirme los datos de su transferencia, si todo es correcto diga "Transferir", de lo contrario indique que campo desea modificar</p> 
                <p className="vivi_listened"><b>{note}</b></p> 
                <table className='resumen'>
                  <thead>
                    <tr>
                      <th className='origen'>Origen</th>
                      <th className='destino'>Destino</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='accountType'>
                        <p><b>{receiverFrom}</b></p>
                      </td>
                      <td className='receiverAccount'>
                        <p><b>{receiver}</b></p>
                      </td>
                    </tr>
                    <tr>
                      <td className='accountType'>
                        <p>5678 8592 5477 8457</p>
                      </td>
                      <td className='receiverAccount'>
                        <p>320 544 9845</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className='resumenTotal'>
                  <p>Valor</p>
                  <h2>{receiverValue}</h2>
                  <div className='transactionCost'>
                    <div>Costo de la transacción</div>
                    <div>$0</div>
                  </div>
                </div> 
          </div> 
          <div className="vivi_text" style={{ display: finish ? "block" : "none" }}>
                <p>Cristian, se ha enviado el dinero al Daviplata de tu {receiver}, ha recibido el dinero,</p> 
                <p>¿Desea enviar a alguien más?</p> 
                <p className="vivi_listened"><b>{note}</b></p> 
          </div> 
        </div> 
      </div>
    </>
  )
} 

export default App