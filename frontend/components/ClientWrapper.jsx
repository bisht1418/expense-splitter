'use client';

import { Provider } from "react-redux";
import { store } from "../redux/store";
import Navbar from "./Navbar";

export default function ClientWrapper({ children }) {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>{children}</main>
      </div>
    </Provider>
  );
}
