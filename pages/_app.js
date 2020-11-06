import { ThemeProvider } from 'emotion-theming'
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query-devtools";
import '../styles/globals.css';
import '../styles/globals.scss';

const theme = {
  colors: {
    "Medium": "#0053b3",
    "Light": "#006be6",
    "Dark": "#003b80",
    "Darker": "#00234d",
    "White": "#ffffff",
    "Lighter grey": "#ebeff3",
    "Light grey": "#c9d3df",
    "Grey": "#adb9c9",
    "Dark grey": "#8393a7",
    "Darker grey": "#53657d",
    "Almost black": "#26353f",
    "Black": "#1c1c1c",
    "Green": "#03bd5b",
    "Light green": "#daf5e7",
    "Orange": "#ff9947",
    "Light orange": "#fff0e4",
    "Red": "#d63626",
    "Light red": "#efaca6",
    "Blue": "#0053b3",
    "Lighter blue": "#b4e1fa",
  }
}

const queryCache = new QueryCache()

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Component {...pageProps} />
      </ReactQueryCacheProvider>
      <ReactQueryDevtools />
    </ThemeProvider>
  );
}

export default MyApp;
