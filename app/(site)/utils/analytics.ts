import ReactGA from 'react-ga';
declare global {
  interface Window {
    GA_INITIALIZED: boolean;
  }
}
export const initGA = () => {
  ReactGA.initialize(`${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`); 
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
