import { useState } from "react";

const Pass = () => {
  // 長さの変更
  const [length, setLength] = useState(8);
  const changeLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(Number(e.target.value));
  };

  // true or false (数字, 記号)
  const [numbersCheckbox, setNumbersCheckbox] = useState(false);
  const [symbolsCheckbox, setsymbolsCheckbox] = useState(false);

  // パスワード生成
  const showPassword = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "1234567890";
    const symbols = "!#$%&@?";
    let seed = letters + letters.toUpperCase();
    let password = "";

    if (numbersCheckbox) {
      seed += numbers;
    }

    if (symbolsCheckbox) {
      seed += symbols;
    }

    for (let i = 0; i < length; i++) {
      password += seed[Math.floor(Math.random() * seed.length)];
    }

    return password;
  };

  const [result, setResult] = useState(showPassword());

  const generatePass = () => {
    setResult(showPassword());
  };

  return (
    <main className="w-[400px] p-4 mx-auto mt-6 rounded-lg shadow-[0_0_8px_#999]">
      <p className="border border-gray-400 rounded py-3 text-center font-['Courier_New'] text-2xl">
        {result}
      </p>
      <button
        className="bg-blue-500 text-white w-full rounded-lg py-3 my-4 hover:opacity-60 active:opacity-40"
        onClick={generatePass}
      >
        パスワード生成
      </button>
      <fieldset className="border border-dashed border-gray-400 rounded-lg flex justify-between p-4">
        <legend className="px-2">オプション</legend>
        <label>
          長さ(<span className="w-6 inline-block text-center">{length}</span>)
          <input
            className="ml-1"
            type="range"
            onChange={changeLength}
            min="8"
            max="24"
            value={length}
          />
        </label>
        <label>
          数字
          <input
            className="ml-1"
            type="checkbox"
            checked={numbersCheckbox}
            onChange={() => {
              setNumbersCheckbox((prev) => {
                return !prev;
              });
            }}
          />
        </label>
        <label>
          記号
          <input
            className="ml-1"
            type="checkbox"
            checked={symbolsCheckbox}
            onChange={() => {
              setsymbolsCheckbox((prev) => {
                return !prev;
              });
            }}
          />
        </label>
      </fieldset>
    </main>
  );
};
export default Pass;
