"use client";

import React, { createContext, useContext } from "react";
import { StateType, ActionType, INITIAL_STATE } from "@/reducers/api.reducer";

export interface APIContextProps {
  children: React.ReactNode;
}

export interface APIContextValue {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
  fetchHealth: () => void;
}

export const APIContext = createContext<APIContextValue>({
  state: INITIAL_STATE,
  dispatch: () => {},
  fetchHealth: () => {},
});
