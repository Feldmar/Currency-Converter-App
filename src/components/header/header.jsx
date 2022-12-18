import { NavLink } from "react-router-dom";
import { Paths } from "../routing/path";
import { useState } from 'react';

const Header = (props) => {
  const { baseCurency, setBaseCurency, currencies, setCurrencies } = props;
  const [outcomingRate, setOutcomingRate] = useState();

  return (
    <header className="header">
      <menu className={`header_navigation`}>
        <div className="header_navigation_converter"><NavLink to={Paths.converter}>Конвертер валют</NavLink></div>
        <div className="header_navigation_exchange"><NavLink to={Paths.exchange}>Список валют</NavLink> </div>
        <div className="header_navigation_base-valute">

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
      </menu>
    </header>
  )
}
export default Header;
