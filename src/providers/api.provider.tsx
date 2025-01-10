"use client";

import React, { useReducer } from "react";
import { INITIAL_STATE, reducer } from "@/reducers/api.reducer";
import { APIContext } from "@/contexts/api.context";
import { KestrelAPIService } from "@/services/kestrel.service";

export interface APIProviderProps {
  children: React.ReactNode;
}

export default function APIContextProvider({ children }: APIProviderProps) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const fetchHealth = async () => {
    dispatch({ type: "LOADING" });
    const { data, error } = await KestrelAPIService.instance.getHealth();
    if (error) {
      dispatch({ type: "ERROR", error: error });
      return;
    }
    dispatch({ type: "SUCCESS", data: data });
  };

  return (
    <APIContext.Provider value={{ state, dispatch, fetchHealth }}>
      {children}
    </APIContext.Provider>
  );
}
