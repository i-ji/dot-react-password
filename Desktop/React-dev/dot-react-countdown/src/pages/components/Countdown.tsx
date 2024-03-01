import { useState } from "react";

let intervalId: number;
let countdown: number;
let endTime: number;

const Countdown = () => {
  // 表示タイム
  const [time, setTime] = useState("00:00");
  // 入力タイム (秒)
  const [remainingTime, setRemainingTime] = useState(0);
  // ボタンのdisabled
  const [disabled, setDisabled] = useState(false);

  //   console.log(remainingTime + " remainingTime");
  //   console.log(countdown + " countdown");

  // 時間設定
  const addTime = (time: number) => {
    const newTime = remainingTime + time;
    const minutes = Math.floor(newTime / 60);
    const seconds = newTime % 60;

    if (minutes > 60) return;

    const minutesFormatted = String(minutes).padStart(2, "0");
    const secondsFormatted = String(seconds).padStart(2, "0");
    const displayedTime = `${minutesFormatted}:${secondsFormatted}`;

    setTime(displayedTime);
    setRemainingTime(newTime);
    setDisabled(false);
  };

  // 残り時間を求める
  const check = () => {
    countdown = endTime - new Date().getTime();
    setTime(String(countdown));

    // タイマーを止める
    if (countdown < 0) {
      clearInterval(intervalId!);
      //   countdown = remainingTime * 1000;
      countdown = 0;
      setTime(String(countdown));
      setDisabled(false);
      setRemainingTime(countdown);
    }

    const totalSeconds = Math.floor(countdown / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const minutesFormatted = String(minutes).padStart(2, "0");
    const secondsFormatted = String(seconds).padStart(2, "0");
    const time = `${minutesFormatted}:${secondsFormatted}`;
    setTime(time);
  };

  // タイマーを起動する
  const startTimer = () => {
    endTime = new Date().getTime() + remainingTime * 1000;
    setDisabled(true);
    intervalId = window.setInterval(check, 100);
  };

  // タイマーを止める
  const stopTimer = () => {
    clearInterval(intervalId);
    setRemainingTime(Math.floor(countdown / 1000));
    setDisabled(false);
  };

  return (
    <main className="w-80 bg-white mx-auto mt-4 p-4 text-center">
      <p className="bg-[#ddd] py-8 text-[40px] font-['Courier_new']">{time}</p>
      {disabled ? (
        <div className="flex justify-between">
          <button
            className="bg-[#ddd] text-[#444] mt-4 w-[84px] py-2 "
            disabled={disabled}
            onClick={() => addTime(600)}
          >
            10分
          </button>
          <button
            className="bg-[#ddd] text-[#444] mt-4 w-[84px] py-2 "
            disabled={disabled}
            onClick={() => addTime(60)}
          >
            1分
          </button>
          <button
            className="bg-[#ddd] text-[#444] mt-4 w-[84px] py-2 "
            disabled={disabled}
            onClick={() => addTime(10)}
          >
            10秒
          </button>
        </div>
      ) : (
        <div className="flex justify-between">
          <button
            className="bg-[#08c] text-white mt-4 w-[84px] py-2 hover:opacity-80 active:opacity-60"
            disabled={disabled}
            onClick={() => addTime(600)}
          >
            10分
          </button>
          <button
            className="bg-[#08c] text-white mt-4 w-[84px] py-2 hover:opacity-80 active:opacity-60"
            disabled={disabled}
            onClick={() => addTime(60)}
          >
            1分
          </button>
          <button
            className="bg-[#08c] text-white mt-4 w-[84px] py-2 hover:opacity-80 active:opacity-60"
            disabled={disabled}
            onClick={() => addTime(10)}
          >
            10秒
          </button>
        </div>
      )}

      {disabled ? (
        <button
          className="bg-red-500 font-bold text-white w-full py-4 mt-4 text-2xl"
          onClick={stopTimer}
        >
          Stop
        </button>
      ) : (
        // <button
        //   disabled={disabled}
        //   className="bg-[#ddd] text-[#444] font-bold w-full py-4 mt-4 text-2xl"
        // >
        //   Stop
        // </button>
        <button
          onClick={startTimer}
          disabled={disabled}
          className="bg-[#08c] font-bold text-white w-full py-4 mt-4 text-2xl hover:opacity-80 active:opacity-60"
        >
          Start
        </button>
      )}
    </main>
  );
};

export default Countdown;
