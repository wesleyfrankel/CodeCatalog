import axios from "axios";
import { PackageData, FavoritePackageData } from "../interfaces/packageData";

const BASE_URL = "http://localhost:5000";

export const GetFavorites = async (): Promise<FavoritePackageData[]> => {
  try {
    const response = await axios.get(BASE_URL + "/favorites");
    const data = response.data;
    return data;
  } catch (error) {
    console.log("Not Found");
    throw error;
  }
};

export const AddFavorite = async (
  packageData: PackageData
): Promise<FavoritePackageData> => {
  try {
    const response = await axios.post(BASE_URL + "/favorites", packageData);
    return response.data;
  } catch (error) {
    console.log("Unable to add");
    throw error;
  }
};

export const DeleteFavorite = async (_id: string): Promise<void> => {
  try {
    await axios.delete(BASE_URL + "/favorites/" + _id);
  } catch (error) {
    console.log("Unable to Delete");
    throw error;
  }
};
