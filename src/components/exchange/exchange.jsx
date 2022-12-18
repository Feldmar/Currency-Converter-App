import { useContext, useState, useEffect } from "react";
import ButtonToggle from "./button";
import { Context } from "../../App";

function Exchange() {
  const { currencies } = useContext(Context);
  const [activeNumber, setActiveNumber] = useState(new Set());
  const [entriesToShow, setEntriesToShow] = useState([]);

  console.log('activeNumber', activeNumber);

  const addActiveNumber = (key) => {
    setActiveNumber(activeNumber => {
      if (activeNumber.has(key)) {
        activeNumber.delete(key);
      } else {
        activeNumber.add(key);
      }
      return new Set(activeNumber);
    });
  }


  useEffect(() => {
    const allEntries = Object.entries(currencies);
    const entriesThatSelected = allEntries.filter(item => activeNumber.has(item[0]));
    const entriesThatNotSelected = allEntries.filter(item => !activeNumber.has(item[0]));
    const newEntriesToShow = entriesThatSelected.concat(entriesThatNotSelected);
    setEntriesToShow(newEntriesToShow);
  }, [activeNumber, currencies]);



  useEffect(() => {
    if (activeNumber.size) {
      localStorage.setItem('activeNumber', JSON.stringify(Array.from(activeNumber.keys())));
    } else {
      const newValue = localStorage.getItem('activeNumber');
      if (newValue) {
        const newValue2 = JSON.parse(newValue);
        setActiveNumber(new Set(newValue2));
      }

    }

    // return new Set(activeNumber);
  }, [activeNumber]);


  console.log('activeNumber', activeNumber);



  return (
    <div className="main__exchange">
      <h2 className="main__exchange-title">Актуальные курсы валют</h2>
      <table className="main__exchange-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Валюта</th>
            <th scope="col">Актуальный курс</th>
            <th scope="col">Избранное</th>
          </tr>
        </thead>
        <tbody>

          {entriesToShow.map(([key, subject], i) => (
            <tr key={key}>
              <td>{i + 1}</td>
              <td>{key}</td>
              <td>{subject}</td>
              <td>
                <ButtonToggle onClick={() => {
                  addActiveNumber(key)
                }} defaultValue={activeNumber.has(key)} />

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Exchange;