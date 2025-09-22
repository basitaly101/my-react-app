import React, { useState } from "react";
import "./App.css";

// Dice images ko top par import karo
import dice1 from "./assets/assets/dice1.png";
import dice2 from "./assets/assets/dice2.png";
import dice3 from "./assets/assets/dice3.png";
import dice4 from "./assets/assets/dice4.png";
import dice5 from "./assets/assets/dice5.png";
import dice6 from "./assets/assets/dice6.png";
import diceRollGif from "./assets/assets/diceroll.gif"; // 🎬 dice roll gif

// Array me store kar lo taake easily index se access ho
const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

function App() {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player1, setPlayer1] = useState(1);
  const [player2, setPlayer2] = useState(1);
  const [winner, setWinner] = useState("");
  const [error, setError] = useState("");
  const [rolling, setRolling] = useState(false); // 🔄 new state

  const rollDice = () => {
    if (player1Name.trim() === "" || player2Name.trim() === "") {
      setError("⚠️ Enter both player names to start the game!");
      return;
    }

    setError(""); 
    setWinner(""); 
    setRolling(true); // 🎬 start rolling animation

    // 1.5 second ke baad dice result show hoga
    setTimeout(() => {
      const roll1 = Math.floor(Math.random() * 6) + 1;
      const roll2 = Math.floor(Math.random() * 6) + 1;

      setPlayer1(roll1);
      setPlayer2(roll2);

      if (roll1 > roll2) {
        setWinner(`🎉 ${player1Name} Wins!`);
      } else if (roll2 > roll1) {
        setWinner(`🎉 ${player2Name} Wins!`);
      } else {
        setWinner("🤝 It's a Draw!");
      }

      setRolling(false); // ⏹ stop rolling animation
    }, 1500);
  };

  return (
    <div className="app">
      <h1>🎲 Dice Game</h1>

      <div className="name-inputs">
        <input
          type="text"
          placeholder="Enter Player 1 Name"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Player 2 Name"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <div className="dice-container">
        <div>
          <h2>{player1Name || "Player 1"}</h2>
          <img
            src={rolling ? diceRollGif : diceImages[player1 - 1]}
            alt="dice"
          />
        </div>
        <div>
          <h2>{player2Name || "Player 2"}</h2>
          <img
            src={rolling ? diceRollGif : diceImages[player2 - 1]}
            alt="dice"
          />
        </div>
      </div>

      <button onClick={rollDice} disabled={rolling}>
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>

      <h2 className="winner">{winner}</h2>
    </div>
  );
}

export default App;
