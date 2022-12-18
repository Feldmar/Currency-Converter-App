import { useState, useContext } from "react";
import getData from '../api/api-axos-response'
import { Context } from "../../App";

function Converter() {
  const [outcomingValute, setOutcomingValute] = useState(1);
  const [incomingValute, setIncomingValute] = useState(1);
  const [outcomingRate, setOutcomingRate] = useState();
  const [incomingRate, setIncomingRate] = useState();
  const [secondCurrency, setSecondCurrency] = useState();
  const { baseCurency, setBaseCurency, currencies, setCurrencies } = useContext(Context);

  async function convert(e) {
    e.preventDefault();
    const result = await getData(currencies)
    setCurrencies(result.rates);
    let num = parseFloat(outcomingValute) * result.rates[secondCurrency];
    setIncomingValute(num);
  }

  return (
    <div className="main__converter">
      <h2 className="main__converter-title">Конвертер валют</h2>
      <div className="converter-option">
        <form onSubmit={convert}>
          <div className="converter-item-one">
            <label className="converter-label-input">
              <span>Отдаю:</span>
              <input className="converter-input"
                type="number"
                value={outcomingValute || ""}
                onChange={(e) =>
                  setOutcomingValute(e.target.value)
                } />
            </label>

            <label className="converter-label-valute"
              onChange={(e) => {
                setBaseCurency(e.target.value)
                setOutcomingRate(currencies[e.target.value])
              }}>

              <select className="converter-select-valute">
                {Object.keys(currencies).map((value, index) =>
                  <option
                    key={index}
                    value={value}
                    selected={value === baseCurency}>{value}</option>)}
              </select>

            </label>
          </div>

          <div className="converter-item-two">
            <label className="converter-label-input">
              <span>Получаю:</span>
              <input className="converter-input"
                type="text"
                readOnly
                value={incomingValute || ""}
                onChange={(e) => {
                  setIncomingRate(outcomingRate[e.target.value])
                }} />
            </label>
            <label className="converter-label-valute"
              onChange={(e) => {
                setIncomingRate(currencies[e.target.value])
                setSecondCurrency(e.target.value);
              }}>
              <select className="converter-select-valute">
                {Object.keys(currencies).map((value, index) =>
                  <option
                    key={index}
                    value={value}>
                    {value}
                  </option>)}
              </select>
            </label>
            <input className="converter-submit"
              type="submit"
              value="Конвертировать"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
export default Converter;