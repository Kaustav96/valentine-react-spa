import "./App.css";

const valentineWeek = {
  "02-07": {
    title: "🌹 Rose Day",
    message: "Just like a rose, my life feels more beautiful because of you ❤️"
  },
  "02-08": {
    title: "💍 Propose Day",
    message: "I’d choose you today, tomorrow, and in every lifetime 💖"
  },
  "02-09": {
    title: "🍫 Chocolate Day",
    message: "Life is sweeter with you in it 😘"
  },
  "02-10": {
    title: "🧸 Teddy Day",
    message: "Sending you the warmest hug through this screen 🤗"
  },
  "02-11": {
    title: "🤝 Promise Day",
    message: "I promise to love you, support you, and annoy you forever ❤️"
  },
  "02-12": {
    title: "🤗 Hug Day",
    message: "If I were there, I’d never let you go 💞"
  },
  "02-13": {
    title: "💋 Kiss Day",
    message: "Saving all my kisses for you 😘"
  },
  "02-14": {
    title: "❤️ Valentine’s Day",
    message: "You’re my today, my tomorrow, and my forever 💍"
  }
};

function App() {
  const today = new Date();
  const dateKey = today.toISOString().slice(5, 10);

  const data = valentineWeek[dateKey] || {
    title: "💖 Just Because",
    message: "Thinking of you today and always ❤️"
  };

  return (
    <div className="container">
      <div className="card">
        <h1>{data.title}</h1>
        <p>{data.message}</p>
        <span>{today.toDateString()}</span>
      </div>
    </div>
  );
}

export default App;