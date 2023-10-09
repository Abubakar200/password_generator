import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null)
  const generator = useCallback(() => {
    let word = "";
    let strr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) strr += "0123456789";
    if (character) strr += "!@#$%^&*()_+~{}[]";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * strr.length + 1);
      word += strr.charAt(char);
    }
    setPassword(word);
  }, [length, number, character, setPassword]);

  const copyPassword = useCallback (()=> {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() =>{
    generator()
  }, [length, number, character, generator])


  return (
    <div className="text-center text-gray-600 text-4xl uppercase my-4">
      Password Generator
      <div className="w-1/2 mx-auto mt-8 bg-gray-200 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={password}
            readOnly
            className="w-3/4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Password"
            ref={passwordRef}
          />

          <button onClick={copyPassword} className="w-1/4 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
            Copy
          </button>
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-red-700">
            Length: {length}
          </label>

          <input
            type="range"
            className="w-full cursor-pointer"
            min={8}
            max={20}
            step="1"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
        </div>

        <div className="mb-4">
          <input
            type="checkbox"
            defaultChecked={number}
            id="inputNumber"
            onChange={() => {
              setNumber((prev) => !prev);
            }}
            className="form-checkbox h-5 w-5 text-blue-500"
          />
          <label htmlFor="inputNumber" className="inline-flex items-center ml-2">
            Number
          </label>

          <input
          id="inputCharacter"
          defaultChecked={character}
          onChange={() => {
            setCharacter((prev) => !prev)
          }}
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-500 ml-6"
          />
          <label htmlFor="inputCharacter" className="inline-flex items-center ml-2">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
