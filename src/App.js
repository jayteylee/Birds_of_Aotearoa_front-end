import logo from './logo.svg';

function App() {
  async function fetchData() {
    const response = await fetch('/data/nzbird.json');
    if (!response.ok) {
      console.error(response.status); // error handling
    }
    const data = response.json()
    console.log(data); // use the data
  }

  fetchData();

  return (
    <div>
      <header>
      <div>
        <p>hello world!</p>
      </div>
      </header>

      <main>
        <div>
          <button>This is in the main</button>
        </div>
      </main>

      <footer>
        <div>
          <p>Hello I am the footer hehe</p>
        </div>
      </footer>
    </div>
  );

}

export default App;
