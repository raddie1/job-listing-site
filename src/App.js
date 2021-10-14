import { useState, useEffect } from 'react';
import './css/style.css';
import dataSet from './assets/data.json';
import JobCard from './components/JobCard';

function App() {
  const [data, setData] = useState(dataSet);
  
  const [filters, setFilters] = useState([]);

  function addFilter (filter) {
    setFilters([...filters, filter]);
  }

  function removeFilter (filter) {
    let newFiltersList = filters.filter(item => item !== filter);
    newFiltersList.forEach(filter => {
      sortByRole(filter, dataSet);
      sortByLevel(filter, dataSet);
      sortByLanguages(filter, dataSet);
      sortByTools(filter, dataSet);
    })

    if (newFiltersList.length === 0) {
      setData(dataSet)
    }

    setFilters(newFiltersList);

  }

  function clearFilter () {
    setFilters([]);
    setData(dataSet);
  }

function sortByRole (role, dataSet) {
  let newList =(dataSet ?? data).filter(job => job.role === role);
  setData(newList);
}

function sortByLevel (level, dataSet) {
  let newList = (dataSet ?? data).filter(job => job.level === level);
  setData(newList);
}

function sortByLanguages (language, dataSet) {
  let newList = (dataSet ?? data).filter(job => job.languages.includes(language));
  setData(newList)
}

function sortByTools (tool, dataSet) {
  let newList = (dataSet ?? data).filter(job => job.tools.includes(tool));
  setData(newList);
}
  useEffect(() => {
    console.log(dataSet);
  }, [])
  return (
    <div className="App">
      <header>
        {filters.length !==0 &&
          <div className="filter-block" hidden={filters.length <= 0}>
          {
            filters.map((item, index) => {
              return (
                <div className="filter" key={index}>
                  <span>{item}</span>
                  <button onClick={() => removeFilter(item)}>X</button>

                </div>
              )
            })
             
          }
          <button onClick={clearFilter}>clear</button>
        </div>}
      </header>
      <main>
        {
          data.map((job, index) => {
            return (
              <JobCard
               data={job}
               actions={{
                 sortByRole,
                 sortByLevel,
                 sortByLanguages,
                 sortByTools,
                 addFilter,
               }}
               key={index}
               />
            )
          })
        }
      </main>
    </div>
  );
}

export default App;
