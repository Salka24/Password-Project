import { useState,useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(10)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!#$%&()*+,-./:;<=>?@[]^_`{|}"
    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
      setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])


  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-pink-300 text-white'>
      <h1 className='text-pink-700 text-center my-3 font-bold'> Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3 text-purple-700'
          placeholder='Password'
          readOnly
          ref={passwordRef}


        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-pink-700 text-white px-3 py-0.5 shrink-0'>
          Copy
        </button>

      </div>
      <div
        className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1 '>
          <input
            type="range"
            min={6}
            max={15}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            name=""
            id=""
          />
          <label htmlFor="length">Length: {length}</label>

        </div>
        <div className='flex items-center gap-x-1 '>
          <input
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prevvalue) => !prevvalue )
            }}
            type="checkbox"
            name=""
            id="" />
            <label htmlFor='number'>Numbers</label>


        </div>
        <div className='flex items-center gap-x-1 '>
          <input
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prevvalue) => !prevvalue )
            }}
            type="checkbox"
            name=""
            id="" />
            <label htmlFor='charInput'>Character</label>


        </div>


      </div>
    </div>
  )
}

export default App
