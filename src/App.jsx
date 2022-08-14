import { useEffect, useState } from "react";
import Card from "./card";


function App() {
  const [birdData, setBirdData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchField, setSearchField] = useState("");
  const [resetButton, setResetButton] = useState("");
  const [selectedSort, setSelectedSort] = useState("eng-alphabetical");
  const [menuOpen, setMenuOpen] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch('./data/nzbird.json', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
      )
      const json = await data.json();
      setBirdData(json);
    };
    getData();
  }, [])

  useEffect(() => {
    const sortBirds = (sort, birds) => {
      if (sort === "eng-alphabetical" && birds) {
        return birds.sort((a, b) => {
          if (a.english_name > b.english_name) { return 1; }
          if (a.english_name < b.english_name) { return -1; }
          return 0;
        });
      } if (sort === "eng-reverse" && birds) {
        return birds.sort((a, b) => {
          if (a.english_name > b.english_name) { return -1; }
          if (a.english_name < b.english_name) { return 1; }
          return 0;
        });
      } if (sort === "mao-alphabetical" && birds) {
        return birds.sort((a, b) => {
          if (a.primary_name > b.primary_name) { return 1; }
          if (a.primary_name < b.primary_name) { return -1; }
          return 0;
        });
      } if (sort === "mao-reverse" && birds) {
        return birds.sort((a, b) => {
          if (a.primary_name > b.primary_name) { return -1; }
          if (a.primary_name < b.primary_name) { return 1; }
          return 0;
        });
      } if (sort === "increasing-weight" && birds) {
        return birds.sort((a, b) => {
          if (a.size.weight.value > b.size.weight.value) { return 1; }
          if (a.size.weight.value < b.size.weight.value) { return -1; }
          return 0;
        });
      } if (sort === "decreasing-weight" && birds) {
        return birds.sort((a, b) => {
          if (a.size.weight.value > b.size.weight.value) { return -1; }
          if (a.size.weight.value < b.size.weight.value) { return 1; }
          return 0;
        });
      } if (sort === "increasing-length" && birds) {
        return birds.sort((a, b) => {
          if (a.size.length.value > b.size.length.value) { return 1; }
          if (a.size.length.value < b.size.length.value) { return -1; }
          return 0;
        });
      } if (sort === "decreasing-length" && birds) {
        return birds.sort((a, b) => {
          if (a.size.length.value > b.size.length.value) { return -1; }
          if (a.size.length.value < b.size.length.value) { return 1; }
          return 0;
        });
      }
      return birds;
    }
  
    const filterByStatus = (status, birds) => {
      if (status) {
        return birds.filter(
          (bird) => bird.status === selectedStatus
        );
      }
      return birds;
    }

    const filterBySearch = (search, birds) => {
      if (search) {
        return birds.filter(
          (bird) => {
            return (
              bird
                .english_name
                .toLowerCase()
                .includes(searchField.toLowerCase()) ||
              bird
                .primary_name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .includes(searchField.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) ||
              bird
                .scientific_name
                .toLowerCase()
                .includes(searchField.toLowerCase()) ||
              bird
                .family
                .toLowerCase()
                .includes(searchField.toLowerCase()) ||
              bird
                .order
                .toLowerCase()
                .includes(searchField.toLowerCase()) ||
              bird
                .other_names
                .toString()
                .toLowerCase()
                .includes(searchField.toLowerCase())
            );
          }
        )
      }
      return birds;
    }

    let filteredBirds = filterByStatus(selectedStatus, birdData);
    filteredBirds = filterBySearch(searchField, filteredBirds);
    filteredBirds = sortBirds(selectedSort, filteredBirds);
    setFilteredList([...filteredBirds]);
  }, [selectedStatus, searchField, selectedSort, birdData])

  useEffect(() => {
    setFilteredList("");
    setSelectedSort("eng-alphabetical")
  }, [resetButton])

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleResetChange = (event) => {
    setResetButton(event.target.value);
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  }

  const handleButtonClick = (event) => {
    setMenuOpen(!menuOpen);
  }



  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <header className='sticky top-0 z-10 shadow-md bg-boa-teal flex flex-row justify-between items-center'>
        <div className="basis-1/4">
          <button onClick={handleButtonClick} className="text-sm font-medium transition-all hover:bg-slate-200 px-4 py-1 border-1 bg-white rounded-lg mx-4">{menuOpen ? "Close Menu" : "Expand Menu"}</button>
        </div>
        <h1 className='basis-1/2 text-center p-4 font-roboto text-3xl font-bold text-boa-white '>
          Birds of Aotearoa
        </h1>
        <div className="basis-1/4"></div>
      </header>

      <div className="w-full h-full flex flex-col md:flex-row">
        <div className={`${menuOpen ? "h-[575px] md:basis-1/5" : "h-0 md:basis-0 overflow-hidden"} transition-all w-full md:h-full bg-neutral-400 bg-opacity-25 z-10 shadow-lg`}>
          <form>
            <h3 className="text-center text-m pt-2 font-roboto font-semibold md:text-left pl-4 md:pt-4 md:mb-0 pb-3">Filter Birds</h3>
            <div className="flex flex-col px-4">
              <div className="font-roboto pl-2 md:pl-0 text-sm md:text-m">
                <label>Search:</label>
              </div>
              <div className="mb-2 ml-2 mr-2 md:mx-0">
                <input type="text" value={searchField} onChange={handleSearchChange} className="w-full basis-1/3 h-8 px-2 py-1 border border-black-300 rounded-lg shadow-sm text-xs" />
              </div>
              <div className="pl-2 md:pl-0 text-sm md:text-m">
                <label>Conservation Status:</label>
              </div>
              <div className="mb-2 ml-2 mr-2 md:mx-0">
                <select value={selectedStatus} onChange={handleStatusChange} className="w-full h-8 px-2 py-1 border border-black-300  rounded-lg text-xs shadow-sm text-left bg-white">
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
              <div className="pl-2 md:pl-0 text-sm md:text-m">
                <label>Sort by:</label>
              </div>
              <div className="mb-2 ml-2 mr-2 md:mx-0">
                <select value={selectedSort} onChange={handleSortChange} className="w-full h-8 px-2 py-1 border border-black-300 rounded-lg text-xs shadow-sm text-left bg-white">
                  <option value="eng-alphabetical">English A-Z</option>
                  <option value="eng-reverse">English Z-A</option>
                  <option value="mao-alphabetical">Maori A-Z</option>
                  <option value="mao-reverse">Maori Z-A</option>
                  <option value="increasing-weight">Lightest to heaviest</option>
                  <option value="decreasing-weight">Heaviest to lightest</option>
                  <option value="increasing-length">Shortest to longest</option>
                  <option value="decreasing-length">Longest to shortest</option>
                </select>
              </div>
            </div>
            <div className="text-center font-roboto font-medium pt-4 pb-3">
              <input type="submit" value="RESET FILTERS" onChange={handleResetChange} className="truncate w-1/2 md:w-11/12 h-7 px-4 border border-black-300 rounded-lg shadow-sm text-center text-s bg-sky-300 bg-opacity-25" />
            </div>
            <h3 className="text-center mb-3 text-m font-semibold md:text-left md:text-m px-4 md:pt-8">Conservation Status</h3>
            <div className="flex flex-row justify-center md:justify-start">
              <div className="gap-1 relative flex flex-col md:gap-2 pl-4 pr-1">
                <div className="rounded-full border-2 bg-not-threatened shadow-md w-4 h-4"></div>
                <div className="rounded-full border-2 bg-naturally-uncommon shadow-md w-4 h-4"></div>
                <div className="rounded-full border-2 bg-relict shadow-md w-4 h-4"></div>
                <div className="rounded-full border-2 bg-recovering shadow-md w-4 h-4"></div>
                <div className="rounded-full border-2 bg-declining shadow-md w-4 h-4"></div>
                <div className="rounded-full border-2 bg-nationally-increasing shadow-md w-4 h-4"></div>
                <div className="rounded-full border-2 bg-nationally-vulnerable shadow-md w-4 h-4"></div>
                <div className="rounded-full border-2 bg-nationally-endangered shadow-md w-4 h-4"></div>
                <div className="rounded-full border-2 bg-nationally-critical shadow-md w-4 h-4"></div>
                <div className="rounded-full border-2 bg-black shadow-md w-4 h-4"></div>
              </div>
              <div className="relative flex flex-col gap-1 pr-4">
                <p className="text-xs md:pb-1 font-medium truncate">Not Threatened </p>
                <p className="text-xs md:pb-1 font-medium truncate">Naturally Uncommon </p>
                <p className="text-xs md:pb-1 font-medium truncate">Relict </p>
                <p className="text-xs md:pb-1 font-medium truncate">Recovering </p>
                <p className="text-xs md:pb-1 font-medium truncate">Declining </p>
                <p className="text-xs md:pb-1 font-medium truncate">Nationally Increasing</p>
                <p className="text-xs md:pb-1 font-medium truncate">Nationally Vulnerable </p>
                <p className="text-xs md:pb-1 font-medium truncate">Nationally Endangered </p>
                <p className="text-xs md:pb-1 font-medium truncate">Nationally Critical </p>
                <p className="text-xs md:pb-1 font-medium truncate">Data Deficient </p>
              </div>
            </div>
            <h1 className="text-xs text-center pt-4 md:pt-5 font-serif pb-10 truncate px-5">
              Conservation status from <a className="underline" href="https://www.doc.govt.nz/nature/conservation-status/">DOC website.</a>
            </h1>
          </form>

        </div>
        {filteredList && <main className={`${menuOpen ? "md:basis-4/5" : "md:basis-full"} transition-all h-full  bg-white overflow-y-auto pb-[140px]`}>
          <div className="flex flex-row flex-wrap justify-center">
            {
              filteredList.map((bird, index) => {
                return (
                  <Card key={index} bird={bird}></Card>
                )
              })
            }
          </div>
        </main>
        }
      </div>

      <footer className='sticky bottom-0 shadow-md z-10 bg-opacity-100'>
        <h1 className="text-center p-2 font-roboto text-sm text-boa-white bg-boa-teal">
          Data licensed from <a className="underline" href="https://www.birdsnz.org.nz/">Birds New Zealand</a> for educational use within the University of Otago.
        </h1>
      </footer>
    </div>
  );

}

export default App;
