import Card from "./card";

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
    <div className="h-screen w-screen relative overflow-hidden">
      <header className='sticky top-0 z-10'>
        <h1 className='text-center p-4 font-serif text-3xl font-bold text-boa-teal bg-boa-blue'>
          Birds of Aotearoa
        </h1>
      </header>

      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="basis-full max-h-[150px] md:basis-1/5 md:h-full bg-boa-white">
          <form>
            <h3 className="font-semibold text-xl pl-4 pt-4">Filter Birds</h3>
            <div className="px-4">
              <label>Search</label>
              <div className="mb-2">
                <input type="text" className="w-full h-9 px-4 py-2 border border-black-300 rounded-lg shadow-sm"/>
              </div>

              <label>Conservation Status</label>
              <div className="mb-2">
                <button type="button" className="w-full h-9 px-4 py-2 border border-black-300 rounded-lg shadow-sm text-left">
                  All
                </button>
              </div>



              <label>Sort by:</label>
              <div className="mb-2">
                <button type="button" className="w-full h-9 px-4 py-2 border border-black-300 rounded-lg shadow-sm text-left">
                  Lightest to Heaviest
                </button>
              </div>
              <button type="button" className="w-full h-7 px-4 border border-black-300 rounded-lg shadow-sm text-center bg-boa-blue">
                  FILTER RESULTS
                </button>
            </div>
          </form>
        </div>

        <main className="h-full basis-4/5 bg-boa-teal overflow-y-auto">
          <div className="flex flex-row flex-wrap justify-center">
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
          </div>
        </main>

      </div>

      <footer className='sticky bottom-0'>
        <h1 className="text-center p-2 font-serif text-boa-teal bg-boa-blue">
          Data licensed from Birds New Zealand for educational use within the University of Otago.
        </h1>
      </footer>
    </div>


  );

}

export default App;
