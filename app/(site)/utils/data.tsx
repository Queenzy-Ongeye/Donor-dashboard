import { LuSchool } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { BiSolidHelpCircle } from "react-icons/bi";
import { ImStatsBars2 } from "react-icons/im";
import { ColumnType } from "./types";
import { TbBrandMiniprogram } from "react-icons/tb";

export type MenuTag = {
  name: string;
  route: string;
  icon: React.ComponentType<any>;
  margin?: boolean;
  accessLevel: string[];
};

export const menuTags: MenuTag[] = [
  {
    name: "Dashboard",
    route: "/",
    icon: MdDashboard,
    margin: true,
    accessLevel: ["fim", "ncc"],
  },
  {
    name: "Sub Counties",
    route: "/SubCounties",
    icon: GrMapLocation,
    accessLevel: ["fim", "ncc"],
  },
  {
    name: "Wards",
    route: "/wards",
    icon: GrMapLocation,
    accessLevel: ["fim", "ncc"],
  },
  {
    name: "Schools",
    route: "/schools",
    icon: LuSchool,
    accessLevel: ["fim", "ncc"],
  },
  {
    name: "Meals",
    route: "/meals-served",
    icon: ImStatsBars2,
    accessLevel: ["fim", "ncc"],
  },
  {
    name: "Program KPIs",
    route: "/programKPIs",
    icon: TbBrandMiniprogram,
    accessLevel: ["fim"],
  },
  {
    name: "Help",
    route: "https://food4education.org/#faq",
    icon: BiSolidHelpCircle,
    margin: true,
    accessLevel: ["fim"],
  },
];

//============================ SCHOOL DATA =========================================
export const schoolDataFim = [
  {
    name: "Karura Primary School",
    childrenPopulation: 1280,
    totalKidsRegistered: 960,
    totalMealsServed: 249038,
    totalmeals_produced: 500000,
    genderRatio: "7:3",
    utilizationPerSchool: 56,
  },
  {
    name: "Muthiga Special School",
    childrenPopulation: 580,
    totalKidsRegistered: 580,
    totalMealsServed: 102900,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 98,
  },
  {
    name: "Muthigia Primary School",
    childrenPopulation: 1580,
    totalKidsRegistered: 1380,
    totalMealsServed: 392900,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 66,
  },
  {
    name: "St. Martins School",
    childrenPopulation: 3080,
    totalKidsRegistered: 2790,
    totalMealsServed: 520761,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 45,
  },
  {
    name: "Moi Road primary School",
    childrenPopulation: 1290,
    totalKidsRegistered: 1100,
    totalMealsServed: 4893900,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 69,
  },
  {
    name: "Kamitha Special School",
    childrenPopulation: 680,
    totalKidsRegistered: 680,
    totalMealsServed: 202900,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 98,
  },
  {
    name: "Milendi Special Primary School",
    childrenPopulation: 480,
    totalKidsRegistered: 480,
    totalMealsServed: 102900,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 76,
  },
  {
    name: "Kimathi Primary School",
    childrenPopulation: 2680,
    totalKidsRegistered: 2680,
    totalMealsServed: 602310,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 80,
  },
  {
    name: "Milendi Primary School",
    childrenPopulation: 1480,
    totalKidsRegistered: 1480,
    totalMealsServed: 402900,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 70,
  },
  {
    name: "Kamitha Special School",
    childrenPopulation: 680,
    totalKidsRegistered: 680,
    totalMealsServed: 202900,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 98,
  },
  {
    name: "Milendi Special Primary School",
    childrenPopulation: 480,
    totalKidsRegistered: 480,
    totalMealsServed: 102900,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 98,
  },
  {
    name: "St. Marie Special School",
    childrenPopulation: 680,
    totalKidsRegistered: 680,
    totalMealsServed: 202900,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 98,
  },
  {
    name: "St. Michael Primary School",
    childrenPopulation: 480,
    totalKidsRegistered: 480,
    totalMealsServed: 102900,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 98,
  },
];
export const schoolDataNcc = [
  {
    name: "Karura Primary School",
    childrenPopulation: 1280,
    totalKidsRegistered: 960,
    totalmeals_produced: 500000,
    genderRatio: "7:3",
    utilizationPerSchool: 56,
  },
  {
    name: "Muthiga Special School",
    childrenPopulation: 580,
    totalKidsRegistered: 580,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 98,
  },
  {
    name: "Muthigia Primary School",
    childrenPopulation: 1580,
    totalKidsRegistered: 1380,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 66,
  },
  {
    name: "St. Martins School",
    childrenPopulation: 3080,
    totalKidsRegistered: 2790,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 45,
  },
  {
    name: "Moi Road primary School",
    childrenPopulation: 1290,
    totalKidsRegistered: 1100,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 69,
  },
  {
    name: "Kamitha Special School",
    childrenPopulation: 680,
    totalKidsRegistered: 680,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 98,
  },
  {
    name: "Milendi Special Primary School",
    childrenPopulation: 480,
    totalKidsRegistered: 480,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 76,
  },
  {
    name: "Kimathi Primary School",
    childrenPopulation: 2680,
    totalKidsRegistered: 2680,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 80,
  },
  {
    name: "Milendi Primary School",
    childrenPopulation: 1480,
    totalKidsRegistered: 1480,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 70,
  },
  {
    name: "Kamitha Special School",
    childrenPopulation: 680,
    totalKidsRegistered: 680,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 98,
  },
  {
    name: "Milendi Special Primary School",
    childrenPopulation: 480,
    totalKidsRegistered: 480,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 98,
  },
  {
    name: "St. Marie Special School",
    childrenPopulation: 680,
    totalKidsRegistered: 680,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 98,
  },
  {
    name: "St. Michael Primary School",
    childrenPopulation: 480,
    totalKidsRegistered: 480,
    totalmeals_produced: 500000,
    genderRatio: "6:4",
    utilizationPerSchool: 98,
  },
];
//============================ END SCHOOL DATA =====================================
//============================ SCHOOL WARD =========================================
export const SchoolWard: ColumnType[] = [
  {
    Header: "No",
    accessor: "",
    Cell: ({ row }: any) => (
      <span className="py-3.5 px-4 text-sm font-medium text-gray-700">
        {row.index + 1}
      </span>
    ),
    sortType: "basic",
  },
  {
    Header: "School Name",
    accessor: "name",
    sortType: "basic",
  },
  {
    Header: "Total Student Population",
    accessor: "childrenPopulation",
    sortType: "basic",
    Cell: ({ value }: any) => {
      const formattedValue = value.toLocaleString();
      return formattedValue;
    },
  },
  {
    Header: "Total Students Enrolled",
    accessor: "totalKidsRegistered",
    sortType: "basic",
    Cell: ({ value }: any) => {
      const formattedValue = value.toLocaleString();
      return formattedValue;
    },
  },
  {
    Header: "Meals Served",
    accessor: "totalMealsServed",
    sortType: "basic",
    Cell: ({ value }: any) => {
      const formattedValue = value.toLocaleString();
      return formattedValue;
    },
  },
  {
    Header: "Meals Produced",
    accessor: "totalmeals_produced",
    sortType: "basic",
    Cell: ({ value }: any) => {
      const formattedValue = value.toLocaleString();
      return formattedValue;
    },
  },
  {
    Header: "Meals Produced",
    accessor: "totalmeals_produced",
    sortType: "basic",
    Cell: ({ value }: any) => {
      const formattedValue = value.toLocaleString();
      return formattedValue;
    },
  },
  {
    Header: "Gender Distribution",
    accessor: "genderRatio",
    sortType: "basic",
  },
  {
    Header: "Utilization",
    accessor: "utilizationPerSchool",
    sortType: "basic",
    Cell: ({ value }: any) => {
      const formattedValue = value.toFixed() + "%";
      return formattedValue;
    },
  },
];
//============================ END SCHOOL WARD =====================================
//============================ WARD HEADER =====================================

export const WardHeaderFimNcc: ColumnType[] = [
  {
    Header: "No",
    accessor: "",
    Cell: ({ row }: any) => (
      <span className="py-3.5 px-4 text-sm font-medium text-gray-700">
        {row.index + 1}
      </span>
    ),
    sortType: "basic",
  },
  {
    Header: "Ward Name",
    accessor: "ward",
    sortType: "basic",
    Cell: ({ value }: any) => {
      const formattedValue = value?.toUpperCase();
      return formattedValue;
    },
  },
  {
    Header: "Total Schools",
    accessor: "total_schools",
    sortType: "basic",
  },
  {
    Header: "Total Students Enrolled",
    accessor: "total_population",
    sortType: "basic",
    Cell: ({ value }: any) => {
      const formattedValue = value.toLocaleString();
      return formattedValue;
    },
  },

  {
    Header: "Meals Produced",
    accessor: "meals_producedPerWard",
    sortType: "basic",
    Cell: ({ row }: any) => {
      const mealCount = row.original.meals_produced;

      const formattedMealCount = mealCount?.toLocaleString();

      return <span>{formattedMealCount}</span>;
    },
  },
];
export const WardHeaderFim: ColumnType[] = [
  {
    Header: "Meals Served",
    accessor: "totalMealsServedPerWard",
    sortType: "basic",
    Cell: ({ row }: any) => {
      const mealCount =
        row.original.served_meal_count_female_nonsponsored +
        row.original.served_meal_count_male_nonsponsored +
        row.original.served_meal_count_male_sponsored +
        row.original.served_meal_count_female_sponsored;

      const formattedMealCount = mealCount.toLocaleString();

      return <span>{formattedMealCount}</span>;
    },
  },
];
//============================ END WARD HEADER =====================================
//============================= SCHOOL HEADERS =====================================

export const SchoolHeadersFimNcc: ColumnType[] = [
  {
    Header: "No",
    accessor: "",
    Cell: ({ row }: any) => (
      <span className="py-3.5 px-4 text-sm font-medium text-gray-700">
        {row.index + 1}
      </span>
    ),
    sortType: "basic",
  },
  {
    Header: "School Name",
    accessor: "name",
    sortType: "basic",
    Cell: ({ value }: any) => {
      const formattedValue = value?.toUpperCase();
      return formattedValue;
    },
  },
  {
    Header: "Total Students",
    accessor: "total_population",
    sortType: "basic",
    Cell: ({ value }: any) => {
      const formattedValue = value.toLocaleString();
      return formattedValue;
    },
  },

  {
    Header: "Total Meals Produced",
    accessor: "",
    sortType: "basic",
    Cell: ({ row }: any) => {
      const mealCount = row.original?.meals_produced;

      const formattedMealCount = mealCount?.toLocaleString();

      return <span>{formattedMealCount}</span>;
    },
  },
];
export const SchoolHeadersFim: ColumnType[] = [
  {
    Header: "Total Meals Served",
    accessor: "meals_produced",
    sortType: "basic",
    Cell: ({ row }: any) => {
      const mealCount =
        row.original.served_meal_count_female_nonsponsored +
        row.original.served_meal_count_male_nonsponsored +
        row.original.served_meal_count_male_sponsored +
        row.original.served_meal_count_female_sponsored;

      const formattedMealCount = mealCount.toLocaleString();

      return <span>{formattedMealCount}</span>;
    },
  },
];
//============================ END SCHOOL HEADERS =====================================
//============================ COUNTY HEADER =====================================

export const CountyHeaderFimNcc: ColumnType[] = [
  {
    Header: "No",
    accessor: "",
    Cell: ({ row }: any) => (
      <span className="py-3.5 px-4 text-sm font-medium text-gray-700">
        {row.index + 1}
      </span>
    ),
    sortType: "basic",
  },
  {
    Header: "Sub County",
    accessor: "sub_county",
    sortType: "basic",
  },
  {
    Header: "Number of Schools",
    accessor: "total_schools",
    sortType: "basic",
  },
  {
    Header: "Number of Wards",
    accessor: "total_wards",
    sortType: "basic",
  },
  {
    Header: "Student Population",
    accessor: "population",
    sortType: "basic",
    Cell: ({ value }: any) => {
      const formattedValue = value?.toLocaleString();
      return formattedValue;
    },
  },
  {
    Header: "Number of Meals produced",
    accessor: "",
    sortType: "basic",
    Cell: ({ row, data }: any) => {
      const mealCount = data[row.index].sub_county;
      const totalMeals = data.reduce((total: number, item: any) => {
        if (item.sub_county === mealCount) {
          total = item.meals_produced;
        }
        return total;
      }, 0);
      return <span>{totalMeals?.toLocaleString()}</span>;
    },
  },
];
export const CountyHeaderFim: ColumnType[] = [
  {
    Header: "Utilization",
    accessor: "utilization",
    sortType: "basic",
    Cell: ({ row, data }: any) => {
      const mealCount = data[row.index].sub_county;
      const totalMeals = data.reduce((total: number, item: any) => {
        if (item.sub_county === mealCount) {
          total =
            item.served_meal_count_male_nonsponsored +
            item.served_meal_count_female_nonsponsored +
            item.served_meal_count_male_sponsored +
            item.served_meal_count_female_sponsored;
        }
        return total;
      }, 0);
      return (
        <span>
          {Math.round((totalMeals / row.original.sum_students) * 100)}%
        </span>
      );
    },
  },
  {
    Header: "Number of Meals served",
    accessor: "",
    sortType: "basic",
    Cell: ({ row, data }: any) => {
      const mealCount = data[row.index].sub_county;
      const totalMeals = data.reduce((total: number, item: any) => {
        if (item.sub_county === mealCount) {
          total =
            item.served_meal_count_male_nonsponsored +
            item.served_meal_count_female_nonsponsored +
            item.served_meal_count_male_sponsored +
            item.served_meal_count_female_sponsored;
        }
        return total;
      }, 0);
      return <span>{totalMeals?.toLocaleString()}</span>;
    },
  },
];
//============================ END COUNTY HEADER =====================================

//============================== CSV Headers =========================
export const subcountyHeaders = [
  { label: "No", key: "index" },
  { label: "SubCounty Name", key: "name" },
  { label: "Number of Schools", key: "totalSchools" },
  { label: "Total Students Enrolled", key: "childrenPopulation" },
  { label: "Number of Meals served", key: "totalMealsServed" },
  { label: "Number of Meals Produced", key: "meals_produced" },
  { label: "Utilization", key: "utilization" },
];
export const wardsHeaders = [
  { label: "No", key: "index" },
  { label: "SubCounty Name", key: "name" },
  { label: "Number of Schools", key: "totalSchoolsPerWard" },
  { label: "Student Population", key: "totalKidsEnrolled" },
  // { label: "Number of Meals served", key: "totalMealsServedPerWard" },
  { label: "Number of Meals produced", key: "meals_producedPerWard" },
  { label: "Number of Kitchens", key: "kitchensPerWard" },
];
export const schoolsCSVHeaders = [
  { label: "No", key: "index" },
  { label: "School Name", key: "name" },
  { label: "Total Student Population", key: "childrenPopulation" },
  { label: "Total Students Enrolled", key: "totalKidsRegistered" },
  { label: "Number of Meals served", key: "totalMealsServed" },
  { label: "Number of Meals produced", key: "totalmeals_produced" },
  { label: "Gender Distribution", key: "genderRatio" },
  { label: "Utilization", key: "utilization" },
];
export const schoolsHeaders = [
  { label: "No", key: "index" },
  { label: "School Name", key: "schoolName" },
  { label: "Total Students Enrolled", key: "totalStudentsRegistered" },
  { label: "Ward Name", key: "wardName" },
  { label: "Total Meals Served", key: "totalMealsServed" },
  { label: "Total Meals Produced", key: "meals_produced" },
  { label: "Total Parents", key: "totalParents" },
  { label: "Utilization", key: "utilization" },
];
