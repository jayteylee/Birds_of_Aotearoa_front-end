import { useEffect, useState } from "react";
import Card from "./card";

//My problem is that the page initially loads with the filteredList but that is based off the birdData which has an initial state of null
//Hence nothing is showing up on the page but after I play with the filters, everything shows up properly

function App() {
  const [birdData, setBirdData] = useState(null);
  const [filteredList, setFilteredList] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchField, setSearchField] = useState("");

  const getData = () => {
    fetch('./data/nzbird.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    )
      .then(response => {
        console.log(response)
        if (!response.ok) {
          console.error(response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setBirdData(data);
        setFilteredList(data);
      });
  };

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    var filteredData = filterByStatus(birdData);
    filteredData = filterBySearch(filteredData);
    setFilteredList(filteredData);
  }, [selectedStatus, searchField])

  //filtering the birdData based on the conservation status
  const filterByStatus = (filteredData) => {
    if (!selectedStatus) {
      return filteredData;
    }
    const filteredBirds = filteredData.filter(
      (bird) => bird.status === selectedStatus
    );
    return filteredBirds;
  };

  const filterBySearch = (filteredData) => {
    if (!searchField) {
      return filteredData;
    }
    const filteredBirds = filteredData.filter(
      (bird) => {
        return (
          bird
            .english_name
            .toLowerCase()
            .includes(searchField.toLowerCase().normalize("NFC")) ||
          bird
            .primary_name
            .toLowerCase()
            .includes(searchField.toLowerCase().normalize("NFC"))
        );
      }
    );
    return filteredBirds;
  }

  //called when a conservation status is selected 
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  


  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <header className='sticky top-0 z-10'>
        <h1 className='text-center p-4 font-serif text-3xl font-bold text-boa-white bg-boa-teal'>
          Birds of Aotearoa
        </h1>
      </header>

      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="h-[150px] w-full md:basis-1/5 md:h-full bg-neutral-400 bg-opacity-25">
          <form>
            <h3 className="font-semibold text-xl pl-4 pt-4">Filter Birds</h3>
            <div className="flex flex-row md:flex-col md:flex-wrap px-4">
              <label>Search</label>
              <div className="mb-2">
                <input type="text" value={searchField.normalize("NFC")} onChange={handleSearchChange} className="basis-1/3 md:w-full h-8 px-2 py-1 border border-black-300 rounded-lg shadow-sm text-xs" />
              </div>

              <label>Conservation Status</label>
              <div className="mb-2">
                <select value={selectedStatus} onChange={handleStatusChange} className="w-full h-8 px-2 py-1 border border-black-300 rounded-lg text-xs shadow-sm text-left bg-white">
                  <option value="">All</option>
                  <option value="Not Threatened">Not Threatened</option>
                  <option value="Naturally Uncommon">Naturally Uncommon</option>
                  <option value="Relict">Relict</option>
                  <option value="Recovering">Recovering</option>
                  <option value="Declining">Declining</option>
                  <option value="Nationally Increasing">Nationally Increasing</option>
                  <option value="Nationally Vulnerable">Nationally Vulnerable</option>
                  <option value="Nationally Endangered">Nationally Endangered</option>
                  <option value="Nationally Critical">Nationally Critical</option>
                  <option value="Data Deficient">Data Deficient</option>
                </select>
              </div>
              <label>Sort by:</label>
              <div className="mb-2">
                <select className="w-full h-8 px-2 py-1 border border-black-300 rounded-lg text-xs shadow-sm text-left bg-white">
                  <option value="weight">Lightest to heaviest</option>
                  <option value="length">Shortest to longest</option>
                  <option value="alphabetical">A-Z</option>
                  <option value="reverse-alphabetical">Z-A</option>
                </select>
              </div>
              <input type="submit" value="FILTER RESULTS" className="truncate w-full h-7 px-4 border border-black-300 rounded-lg shadow-sm text-center text-s bg-sky-300 bg-opacity-25" />
            </div>
          </form>
        </div>
        {filteredList && <main className="h-full basis-4/5  bg-white overflow-y-auto pb-[140px]">
          <div className="flex flex-row flex-wrap justify-center">
            {
              filteredList.map(bird => {
                return (
                  <Card
                    bird={bird}
                    // name={bird.english_name}
                    // img={bird.photo.source}
                    // sciName={bird.scientific_name}
                    // family={bird.family}
                    // order={bird.order}
                    // status={bird.status}
                    // length={bird.size.length.value}
                    // lengthUnit={bird.size.length.units}
                    // weight={bird.size.weight.value}
                    // weightUnit={bird.size.weight.units}
                    // primName={bird.primary_name}
                    // credit={bird.photo.credit}
                    >
                  </Card>
                )
              })
            }
          </div>
        </main>
        }
      </div>

      <footer className='sticky bottom-0'>
        <h1 className="text-center p-2 font-serif text-boa-white bg-boa-teal">
          Data licensed from <a className="underline" href="https://www.birdsnz.org.nz/">Birds New Zealand</a> for educational use within the University of Otago.
        </h1>
      </footer>
    </div>


  );

}

export default App;
