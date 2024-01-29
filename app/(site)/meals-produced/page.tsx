"use client";
import { Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { IMeals } from "../utils/types";
import LoaderSpinner from "@/app/LoadingSpinner";
import * as Sentry from "@sentry/nextjs";
import {
  allKitchens,
  gigaTrendOptions,
  kitchenTrendOptions,
} from "../Components/ReusableCharts/GraphOptions";
import BarGraph from "../Components/ReusableCharts/BarGraph";
import Image from "next/image";
import { apiGet } from "@/app/helpers/http-api";
import { initGA, logPageView } from "../utils/analytics";
Chart.register(...registerables);

const MealProducedRecords = () => {
  const [mealsData, setMealsData] = useState<IMeals | undefined>();
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [mealsTrendChart, setMealsTrendChart] = useState<any>();
  const [monthlyTrendChart, setMonthlyTrendChart] = useState<any>();
  const [groupMonthlyTrendChart, setGroupMonthlyTrendChart] = useState<any>();
  const [activeMenu, setActiveMenu] = useState("");

  const handleItemClick = (itemId: any) => {
    setSelectedItem((prevSelectedItem: any) =>
      prevSelectedItem === itemId ? null : itemId
    );
    setActiveMenu((prevActiveMenu) =>
      prevActiveMenu === itemId ? null : itemId
    );
  };

  const menuList = [
    {
      id: 1,
      item: "Rice and Beans (Coriander)",
      menu: [
        "Onions",
        "Tomatoes",
        "Carrots",
        "Cooking oil",
        "Corriander Powder",
        "Cabbage",
        "Salt",
      ],
      image: "/assets/image.png",
    },
    {
      id: 2,
      item: "Turmeric Rice and Greengrams",
      menu: [
        "Onions",
        "Tomatoes",
        "Carrots",
        "Cooking oil",
        "Turmeric Powder",
        "Cabbage",
        "Salt",
      ],
      image: "/assets/F-22.jpg",
    },
  ];

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const responseData = await response.json();
        setMealsData(responseData.meals);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        Sentry.captureException(error);
      }
      let mealsTrendChart: any = [];
      mealsTrendChart["labels"] = [];
      mealsTrendChart["data"] = [];
      let monthlyData: any = [];
      monthlyData["labels"] = [];
      monthlyData["data"] = [];
      let groupMonthlyData: any = [];
      groupMonthlyData["labels"] = [];
      groupMonthlyData["data"] = [];
      const kitchenMeals = await apiGet("");
      // const kitchenMeals = await apiGet("/ciff/web/kitchen/trends");
      kitchenMeals.forEach((kitchen: any) => {
        mealsTrendChart["labels"].push(kitchen.name);
        mealsTrendChart["data"].push(kitchen.total_meals);
      });
      setMealsTrendChart(mealsTrendChart);
      const monthlyTrendData = await apiGet("");
      // const monthlyTrendData = await apiGet("/ciff/web/kitchen/trends/545eb00e-a19b-4123-82ed-54ee686fc34f");
      monthlyTrendData.forEach((monthly: any) => {
        monthlyData["labels"].push(
          new Date(Date.parse(monthly.month)).toLocaleString("default", {
            month: "short",
            year: "2-digit",
          })
        );
        monthlyData["data"].push(monthly.total_meals);
      });
      setMonthlyTrendChart(monthlyData);
      const groupMonthlyTrendData = await apiGet("");
      // const groupMonthlyTrendData = await apiGet("/ciff/web/kitchen/trends/monthly");
      groupMonthlyTrendData.forEach((monthly: any) => {
        groupMonthlyData["labels"].push(
          new Date(Date.parse(monthly.month)).toLocaleString("default", {
            month: "short",
            year: "2-digit",
          })
        );
        groupMonthlyData["data"].push(monthly.total_meals);
      });
      setGroupMonthlyTrendChart(groupMonthlyData);
    };
    fetchData();
  }, []);

  const kitchenData = {
    labels: mealsTrendChart?.labels,
    datasets: [
      {
        backgroundColor: ["#7EA829", "#eab308"],
        data: mealsTrendChart?.data,
      },
    ],
  };
  return (
    <div className="mx-4">
      {loading ? (
        <LoaderSpinner />
      ) : (
        <div>
          <h1 className="text-black text-4xl font-bold md:text-center">
            Meals Summary
          </h1>
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 mt-4 mb-4">
            <div className="bg-white border border-bg-gray-200 rounded-md p-4">
              <h1 className="font-semibold text-black text-2xl mb-2">
                Current Meal Options
              </h1>
              <small style={{ color: "grey" }}>Click to view</small>
              {menuList.map((item) => (
                <ul
                  className="list-disc p-3 text-lg cursor-pointer"
                  key={item.id}
                >
                  <li
                    onClick={() => handleItemClick(item.id)}
                    className={`${
                      String(activeMenu) === String(item.id)
                        ? "bg-slate-100 border border-gray-400 rounded-md"
                        : ""
                    } hover:bg-slate-100 hover:border-gray-400 p-2 hover:rounded-md max-w-xs transition duration-300 ease-in-out hover:scale-105`}
                  >
                    {item.item}
                  </li>

                  {selectedItem === item.id && (
                    <>
                      <h6 className="font-bold text-base underline">
                        Ingredient List
                      </h6>
                      <Image
                        src={item.image}
                        alt="food"
                        width={400}
                        height={400}
                      />
                      <ul>
                        {item.menu?.sort().map((ingredient, index) => (
                          <li
                            key={index}
                            className="list-decimal text-sm items-center"
                          >
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </ul>
              ))}
            </div>

            <BarGraph
              stateData={{
                labels: monthlyTrendChart?.labels,
                datasets: [
                  {
                    backgroundColor: ["#7EA829", "#eab308"],
                    data: monthlyTrendChart?.data,
                  },
                ],
              }}
              options={gigaTrendOptions}
            />
            <BarGraph
              stateData={{
                labels: groupMonthlyTrendChart?.labels,
                datasets: [
                  {
                    backgroundColor: ["#7EA829", "#eab308"],
                    data: groupMonthlyTrendChart?.data,
                  },
                ],
              }}
              options={allKitchens}
            />
            <BarGraph stateData={kitchenData} options={kitchenTrendOptions} />
          </div>
        </div>
      )}
    </div>
  );
};
export default MealProducedRecords;
