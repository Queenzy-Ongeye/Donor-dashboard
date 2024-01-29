import { IconType } from "react-icons";

export interface IMenu {
  route: string;
  name: string;
  icon: IconType;
  margin: boolean;
}
export interface IGraph {
  data: number[] | any;
  options: string | any;
}
export interface IChart {
  totalChildrenEnrolled: number;
  proportionBoys: number;
  proportionGirls: number;
  name: string;
  childrenPopulation?: number;
  totalNumberSchools?: number;
  subCounties: {
    name: string;
    childrenPopulation: number;
    totalNumberSchools: number;
  }[];
}
export interface Ward {
  id: any;
  name: string;
  childrenPopulation: number;
  totalKidsRegistered: number;
  totalSchoolsPerWard: number;
  totalMealsServed: number;
}

export interface ColumnType {
  Header: string;
  accessor: string;
  sortType: string;
  Cell?: any;
}
export interface IMeals {
  mealsProductionTrend: {
    labels: string[];
    data: number[];
  };
  gigaMealsTrend: {
    labels: string[];
    data: number[];
  };
  kitchenMealTrend: {
    labels: string[];
    data: number[];
  };
  utilizationVSpenetration: {
    labels: string[];
    data: number[];
  };
}
export interface ISchool {
  wardName: any;
  schoolName: string;
  totalSchools: number;
  totalStudentsRegistered: number;
  totalParents: number;
  totalMealsServed: number;
  penetration: number;
  registrationGraph: { labels: string[]; data: number[] };
  gradePopulation: { labels: string[]; data: number[] };
  dateCreated: string;
  girlsRatio: number;
  boysRatio: number;
  utilization: number;
  populationUnutilized: number;
  totalTeachers: number;
  id: any;
}
export interface ISubCounty {
  id: any;
  subCountiesSupported: number;
  totalSchools: number;
  childrenPopulation: number;
  totalMealsServed: number;
  kitchensPerSubCounty: number;
  totalWards: number;
  name: string;
  wards: {
    id: any;
    name: string;
    totalSchoolsPerWard: number;
    totalMealServedPerWard: number;
    childrenPopulation: number;
  }[];
}
export interface Ward {
  id: any;
  name: string;
  childrenPopulation: number;
  totalKidsEnrolled: number;
  totalSchoolsPerWard: number;
  totalMealsServedPerWard: number;
  kitchensPerWard: number;
}
