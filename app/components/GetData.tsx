import axios from "axios";

interface PackageData {
  name: string;
  version: string;
  description: string;
  homepage: string;
}

const GetData = async (packageName: string): Promise<PackageData | null> => {
  try {
    const response = await axios.get(
      "https://registry.npmjs.org/" + packageName + "/latest"
    );
    const data = response.data;
    return {
      name: data.name,
      version: data.version,
      description: data.description,
      homepage: data.homepage,
    };
  } catch (error) {
    console.log("Not Found");
    return null;
  }
};

export default GetData;
