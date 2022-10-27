import React, { useState, useContext } from "react";

const ViewportContext = React.createContext();
const SetViewportContext = React.createContext();

/**
 * Wrapper component for the viewport context.
 *
 * @category Contexts
 * @example
 *     function MyApp() {
 *         return (
 *             <ViewportProvider>
 *                 <MyChildComponent />
 *             </ViewportProvider>
 *         )
 *     }
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @param {Viewport} props.defaultViewport - Initial viewport
 * @returns {React.Component} - ViewportContext.Provider
 */
export const ViewportProvider = ({ defaultViewport = {}, children }) => {
  const [viewport, setViewport] = useState(defaultViewport);
  const handleViewport = (view) => {
    setViewport((prev) => ({
      ...prev,
      ...view,
    }));
  };

  return (
    <ViewportContext.Provider value={viewport}>
      <SetViewportContext.Provider value={handleViewport}>
        {children}
      </SetViewportContext.Provider>
    </ViewportContext.Provider>
  );
};

/**
 * A hook that returns the current viewport. Separated from `useSetViewport` to
 * avoid unnecessary re-renders.
 *
 * @category Hooks
 */
export const useViewport = () => {
  const ctx = useContext(ViewportContext);
  if (!ctx) throw Error("Not wrapped in <ViewportProvider />.");
  return ctx;
};

/**
 * A hook that returns the current viewport. Separated from `useViewport` to
 * avoid unnecessary re-renders.
 *
 * @category Contexts
 */
export const useSetViewport = () => {
  const ctx = useContext(SetViewportContext);
  if (!ctx) throw Error("Not wrapped in <ViewportProvider />.");
  return ctx;
};

/**
 * @typedef {Object} Viewport A standard Mapbox/Deck/GoogleMaps viewport object.
 * @property {number} latitude - In WGS84
 * @property {number} longitude - In WGS84
 * @property {number} zoom - 0-22 (0 is the whole world)
 * @property {number} bearing - In degrees, 0 is north
 * @property {number} pitch - In degrees, 0 is straight down, 45 is max with
 *   Mapbox tiles
 */
