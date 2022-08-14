import { useEffect, useState } from "react";
import Card from "./card";

//My problem is that the page initially loads with the filteredList but that is based off the birdData which has an initial state of null
//Hence nothing is showing up on the page but after I play with the filters, everything shows up properly

function App() {
  const [birdData, setBirdData] = useState(null);
  const [filteredList, setFilteredList] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchField, setSearchField] = useState("");
  const [resetButton, setResetButton] = useState("");
  const [selectedSort, setSelectedSort] = useState("eng-alphabetical");

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
        if (!response.ok) {
          console.error(response.status);
        }
        return response.json();
      })
      .then(data => {
        setBirdData(data);
        setFilteredList(sortBirds(selectedSort, data));
      });
  };
  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    let filteredBirds = filterByStatus(selectedStatus, birdData);
    filteredBirds = filterBySearch(searchField, filteredBirds);
    filteredBirds = sortBirds(selectedSort, filteredBirds);
    setFilteredList(filteredBirds);
  }, [selectedStatus, searchField, selectedSort, birdData])

  useEffect(() => {
    setFilteredList("");
    setSelectedSort("eng-alphabetical")
  }, [resetButton])

  const filterByStatus = (status, birds) => {
    if (status) {
      return birds.filter(
        (bird) => bird.status === selectedStatus
      );
    }
    return birds;
  }


  const sortBirds = (sort, birds) => {
    if (sort === "eng-alphabetical" && birds) {
      return birds.sort((a, b) => {
        if (a.english_name > b.english_name) { return 1; }
        if (a.english_name < b.english_name) { return -1; }
        return 0;
      });
    }if (sort === "eng-reverse" && birds) {
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
    }if (sort === "increasing-weight" && birds) {
      return birds.sort((a, b) => {
        if (a.size.weight.value > b.size.weight.value) { return 1; }
        if (a.size.weight.value < b.size.weight.value) { return -1; }
        return 0;
      });
    }if (sort === "decreasing-weight" && birds) {
      return birds.sort((a, b) => {
        if (a.size.weight.value > b.size.weight.value) { return -1; }
        if (a.size.weight.value < b.size.weight.value) { return 1; }
        return 0;
      });
    }if (sort === "increasing-length" && birds) {
      return birds.sort((a, b) => {
        if (a.size.length.value > b.size.length.value) { return 1; }
        if (a.size.length.value < b.size.length.value) { return -1; }
        return 0;
      });
    }if (sort === "decreasing-length" && birds) {
      return birds.sort((a, b) => {
        if (a.size.length.value > b.size.length.value) { return -1; }
        if (a.size.length.value < b.size.length.value) { return 1; }
        return 0;
      });
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
              .primary_name
              .toLowerCase()
              .includes(searchField.toLowerCase().normalize("NFC")) ||
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
              .includes(searchField.toLowerCase())
          );
        }
      )
    }
    return birds;
  }


  //called when a conservation status is selected 
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




  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <header className='sticky top-0 z-10 shadow-md'>
        <h1 className='text-center p-4 font-serif text-3xl font-bold text-boa-white bg-boa-teal'>
          Birds of Aotearoa
        </h1>
      </header>

      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="h-[150px] w-full md:basis-1/5 md:h-full bg-neutral-400 bg-opacity-25 z-10 shadow-lg">
          <form>
            <h3 className="text-center mb-4 text-m pt-2 font-semibold md:text-left pl-4 md:pt-4 md:mb-0 pb-3">Filter Birds</h3>
            <div className="flex flex-row md:flex-col px-4">
              <div className="text-sm md:text-m">
                <label>Search:</label>
              </div>
              <div className="mb-2 ml-2 mr-2 md:mx-0">
                <input type="text" value={searchField} onChange={handleSearchChange} className="w-full basis-1/3 h-8 px-2 py-1 border border-black-300 rounded-lg shadow-sm text-xs" />
              </div>
              <div className="text-sm md:text-m">
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
              <div className="text-sm md:text-m">
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
            <div className="text-center pt-4 pb-3">
              <input type="submit" value="RESET FILTERS" onChange={handleResetChange} className="truncate w-1/2 md:w-11/12 h-7 px-4 border border-black-300 rounded-lg shadow-sm text-center text-s bg-sky-300 bg-opacity-25" />
            </div>
          </form>
          <h3 className="text-center mb-4 text-m pt-2 font-semibold md:text-left md:text-m pl-4 md:pt-16 md:mb-3">Conservation Status</h3>
          <div className="flex flex-row">
            <div className="relative flex flex-col gap-2 pl-4 pr-1">
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
            <div className="relative flex flex-col gap-1">
            <p className="text-xs pb-1 font-medium">Not Threatened </p>
            <p className="text-xs pb-1 font-medium">Naturally Uncommon </p>
            <p className="text-xs pb-1 font-medium">Relict </p>
            <p className="text-xs pb-1 font-medium">Recovering </p>
            <p className="text-xs pb-1 font-medium">Declining </p>
            <p className="text-xs pb-1 font-medium">Nationally Increasing</p>
            <p className="text-xs pb-1 font-medium">Nationally Vulnerable </p>
            <p className="text-xs pb-1 font-medium">Nationally Endangered </p>
            <p className="text-xs pb-1 font-medium">Nationally Critical </p>
            <p className="text-xs pb-1 font-medium">Data Deficient </p>
            </div>
            </div>
            <h1 className="text-xs text-center pt-5 font-serif">
          Conservation status from <a className="underline" href="https://www.doc.govt.nz/nature/conservation-status/">DOC website.</a>
        </h1>
        </div>
        {filteredList && <main className="h-full basis-4/5  bg-white overflow-y-auto pb-[140px]">
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

      <footer className='sticky bottom-0 shadow-md'>
        <h1 className="text-center p-2 font-serif text-boa-white bg-boa-teal">
          Data licensed from <a className="underline" href="https://www.birdsnz.org.nz/">Birds New Zealand</a> for educational use within the University of Otago.
        </h1>
      </footer>
    </div>
  );

}

export default App;
