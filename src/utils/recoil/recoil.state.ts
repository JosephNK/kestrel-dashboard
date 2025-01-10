import { atom, selector } from "recoil";
import { APIPath, HttpService } from "../http/http";

export const todoListState = atom({
  key: "Todos",
  default: [],
});

export const fetchHealthState = selector({
  key: "fetchHealthState",
  get: async () => {
    const response = await HttpService.instance.get(APIPath.health);
    const data = response.data;
    console.log("fetchListState", data);
    return data;
  },
});
