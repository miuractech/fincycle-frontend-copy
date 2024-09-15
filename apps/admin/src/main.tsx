import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { BrowserRouter } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <MantineProvider
     withGlobalClasses
     withCssVariables
     withStaticClasses
     theme={{
       colors: {
         blue: [
           '#D9E1FA',
           '#BFCEF6',
           '#A0B4F2',
           '#809BEE',
           '#6082E9',
           '#4069E5',
           '#3558BF',
           '#2B4699',
           '#203573',
           '#15234C',
           '0D152E',
         ],
       },
       autoContrast:true,
       black: '#1e1e1e',
       white: '#f2f8ff',
       defaultGradient: {
         from: '#4069E5',
         to: '#0072F8',
         deg: 45,
       },
       primaryShade: 5,
       fontFamily: "'Plus Jakarta Sans',sans-serif",
       defaultRadius: 4,
       components: {
         Button: {
           defaultProps: {
             fw: 400,
           },
         },
         Modal: {
           defaultProps: {
             transitionProps: { transition: 'slide-down' },
           },
         },
       },
     }}
    //  defaultColorScheme="dark"
   >
      <Notifications />
      <App />
    </MantineProvider>
  </BrowserRouter>
);
