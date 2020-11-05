export const MOBILE_WIDTH = 1310;

const isBrowserWidth = (): boolean => window ? window.innerWidth > MOBILE_WIDTH : true;
