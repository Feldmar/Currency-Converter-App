
import { useRoutes } from 'react-router-dom';
import { Paths } from './path';
import Converter from '../converter/converter';
import Exchange from '../exchange/exchange'

export const ConverterRoutes = [
  { path: Paths.converter, element: <Converter /> }
];

export const ExchangeRoutes = [
  { path: Paths.exchange, element: <Exchange/> }
];


export const Routes = [
{ path: Paths.main, element: null },
  { path: Paths.converter, children: ConverterRoutes },
  { path: Paths.exchange, children: ExchangeRoutes },
  
];

function AppRouting() {
  const routesValidate = () => {
    return Routes;
  };
  const routes = useRoutes(routesValidate());
    return(
      <>
        {routes}
      </>
    )
}
export default AppRouting;