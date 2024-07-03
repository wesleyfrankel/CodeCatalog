export interface PackageData {
  name: string;
  version: string;
  description: string;
  homepage: string;
}

export interface FavoritePackageData extends PackageData {
  _id: string;
}
