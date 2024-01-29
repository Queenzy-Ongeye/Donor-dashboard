import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

export const genderPropotionOptions = {
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Gender Propotion by SubCounty",
    },
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          var label = context.dataset.label || "";
          if (context.parsed.y !== null) {
            label += " " + context.parsed.y + "%";
          }
          return label;
        },
      },
    },
    datalabels: {
      display: false,
    },
  },
};

export const utilizationOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    datalabels: {
      align: "center",
      color: "white",
      formatter: (value: any, context: any) => {
        if (context?.dataset) {
          const label = context.dataset.label || "";
          const dataSum: any = context.dataset.data.reduce(
            (a: any, b: any) => a + b,
            0
          );
          if (dataSum !== 0) {
            const percentage = Math.round((value / dataSum) * 100);
            return `${label} ${percentage}%`;
          }
        }
        return "";
      },
    },
    title: {
      display: true,
      text: "Utilization Trends",
      color: "black",
    },
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          var label = context.dataset.label || "";
          if (context.parsed !== null) {
            label += " " + context.parsed + "";
          }
          return label;
        },
      },
    },
  },
};
export const paymentOptions = {
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Parents Payments Trend (Dummy data)",
    },
    legend: {
      position: "top",
    },
    datalabels: {
      align: "center",
      color: "white",
      formatter: (value: any, context: any) => {
        if (context?.dataset) {
          const label = context.dataset.label || "";
          const dataSum: any = context.dataset.data.reduce(
            (a: any, b: any) => a + b,
            0
          );
          if (dataSum !== 0) {
            const percentage = Math.round((value / dataSum) * 100);
            return `${label} ${percentage}%`;
          }
        }
        return "";
      },
    },
  },
};

export const genderRatioOptions = {
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Propotion of boys vs girls",
    },
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          var label = context.dataset.label || "";
          if (context.parsed !== null) {
            label += " " + context.parsed;
          }
          return label;
        },
      },
    },
    datalabels: {
      align: "center",
      color: "white",
      formatter: (value: any, context: any) => {
        if (context?.dataset) {
          const label = context.dataset.label || "";
          const dataSum: any = context.dataset.data.reduce(
            (a: any, b: any) => a + b,
            0
          );
          if (dataSum !== 0) {
            const percentage = Math.round((value / dataSum) * 100);
            return `${label} ${percentage}%`;
          }
        }
        return "";
      },
      labels: {
        title: {
          font: {
            weight: "bold",
            size: "15",
          },
        },
      },
    },
  },
};

export const monthTrendOptions = {
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Monthly Utilization Trends",
    },
    legend: {
      position: "top",
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          var label = context.dataset.label || "";
          if (context.parsed.y !== null) {
            label += " " + context.parsed.y + "%";
          }
          return label;
        },
      },
    },
    datalabels: {
      align: function (context: any) {
        var index = context.dataIndex;
        var curr = context.dataset.data[index];
        var prev = context.dataset.data[index - 1];
        var next = context.dataset.data[index + 1];
        return prev < curr && next < curr
          ? "end"
          : prev > curr && next > curr
          ? "start"
          : "center";
      },
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderColor: "rgba(128, 128, 128, 0.7)",
      borderRadius: 4,
      borderWidth: 1,
      color: function (context: any) {
        const i = context.dataIndex;
        const value = context.dataset.data[i];
        const prev = context.dataset.data[i - 1];
        const diff = prev !== undefined ? value - prev : 0;
        return diff < 0 ? "#84cc16" : diff > 0 ? "#eab308" : "gray";
      },
      font: {
        size: 11,
        weight: "bold",
      },
      offset: 8,
      formatter: function (value: any, context: any) {
        const i = context.dataIndex;
        const prev = context.dataset.data[i - 1];
        const diff = prev !== undefined ? prev - value : 0;
        const glyph = diff < 0 ? "▲" : diff > 0 ? "▼" : "◆";
        const label = context.dataset.label || "";
        if (value !== 0) {
          const percentage = Math.round(value);
          return glyph + " " + `${label} ${percentage}%`;
        }
      },
      padding: 6,
    },
  },
};

export const gradeOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: true,
      text: "Population per Grade",
      color: "black",
    },
    datalabels: {
      align: function (context: any) {
        var index = context.dataIndex;
        var curr = context.dataset.data[index];
        var prev = context.dataset.data[index - 1];
        var next = context.dataset.data[index + 1];
        return prev < curr && next < curr
          ? "end"
          : prev > curr && next > curr
          ? "start"
          : "center";
      },
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderColor: "rgba(128, 128, 128, 0.7)",
      borderRadius: 4,
      borderWidth: 1,
      color: function (context: any) {
        const i = context.dataIndex;
        const value = context.dataset.data[i];
        const prev = context.dataset.data[i - 1];
        const diff = prev !== undefined ? value - prev : 0;
        return diff < 0 ? "#84cc16" : diff > 0 ? "#eab308" : "gray";
      },
      font: {
        size: 11,
        weight: "bold",
      },
      offset: 8,
      formatter: function (value: any, context: any) {
        const i = context.dataIndex;
        const prev = context.dataset.data[i - 1];
        const diff = prev !== undefined ? prev - value : 0;
        const glyph = diff < 0 ? "▲" : diff > 0 ? "▼" : "◆";
        return glyph + " " + Math.round(value);
      },
      padding: 6,
    },
  },
};

export const regOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: true,
      text: "New Registrations",
      color: "black",
    },
    datalabels: {
      align: function (context: any) {
        var index = context.dataIndex;
        var curr = context.dataset.data[index];
        var prev = context.dataset.data[index - 1];
        var next = context.dataset.data[index + 1];
        return prev < curr && next < curr
          ? "end"
          : prev > curr && next > curr
          ? "start"
          : "center";
      },
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderColor: "rgba(128, 128, 128, 0.7)",
      borderRadius: 4,
      borderWidth: 1,
      color: function (context: any) {
        const i = context.dataIndex;
        const value = context.dataset.data[i];
        const prev = context.dataset.data[i - 1];
        const diff = prev !== undefined ? value - prev : 0;
        return diff < 0 ? "#84cc16" : diff > 0 ? "#eab308" : "gray";
      },
      font: {
        size: 11,
        weight: "bold",
      },
      offset: 8,
      formatter: function (value: any, context: any) {
        const i = context.dataIndex;
        const prev = context.dataset.data[i - 1];
        const diff = prev !== undefined ? prev - value : 0;
        const glyph = diff < 0 ? "▲" : diff > 0 ? "▼" : "◆";
        return glyph + " " + Math.round(value);
      },
      padding: 6,
    },
  },
};

export const kitchenTrendOptions = {
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: true,
      text: "Cumulative Meals Per Kitchen",
      color: "black",
    },
    datalabels: {
      align: function (context: any) {
        var index = context.dataIndex;
        var curr = context.dataset.data[index];
        var prev = context.dataset.data[index - 1];
        var next = context.dataset.data[index + 1];
        return prev < curr && next < curr
          ? "end"
          : prev > curr && next > curr
          ? "start"
          : "center";
      },
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderColor: "rgba(128, 128, 128, 0.7)",
      borderRadius: 4,
      borderWidth: 1,
      color: function (context: any) {
        const i = context.dataIndex;
        const value = context.dataset.data[i];
        const prev = context.dataset.data[i - 1];
        const diff = prev !== undefined ? value - prev : 0;
        return diff < 0 ? "#1E6D3B" : diff > 0 ? "#F47D38" : "gray";
      },
      font: {
        size: 11,
        weight: "bold",
      },
      offset: 8,
      formatter: function (value: any, context: any) {
        const i = context.dataIndex;
        const prev = context.dataset.data[i - 1];
        const diff = prev !== undefined ? prev - value : 0;
        const glyph = diff < 0 ? "▲" : diff > 0 ? "▼" : "◆";
        return glyph + " " + Math.round(value).toLocaleString();
      },
      padding: 6,
    },
  },
};

export const avgUtilOptions = {
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: true,
      text: "Utilization VS Penetration",
      color: "black",
    },
    datalabels: {
      align: function (context: any) {
        var index = context.dataIndex;
        var curr = context.dataset.data[index];
        var prev = context.dataset.data[index - 1];
        var next = context.dataset.data[index + 1];
        return prev < curr && next < curr
          ? "end"
          : prev > curr && next > curr
          ? "start"
          : "center";
      },
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderColor: "rgba(128, 128, 128, 0.7)",
      borderRadius: 4,
      borderWidth: 1,
      color: function (context: any) {
        const i = context.dataIndex;
        const value = context.dataset.data[i];
        const prev = context.dataset.data[i - 1];
        const diff = prev !== undefined ? value - prev : 0;
        return diff < 0 ? "#84cc16" : diff > 0 ? "#eab308" : "gray";
      },
      font: {
        size: 11,
        weight: "bold",
      },
      offset: 8,
      formatter: function (value: any, context: any) {
        const i = context.dataIndex;
        const prev = context.dataset.data[i - 1];
        const diff = prev !== undefined ? prev - value : 0;
        const glyph = diff < 0 ? "▲" : diff > 0 ? "▼" : "◆";
        return glyph + " " + Math.round(value);
      },
      padding: 6,
    },
  },
};

export const mealsTrend = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: true,
      text: "Total meals production from all kitchens",
      color: "black",
    },
    datalabels: {
      align: "center",
      color: "white",
      display: false,
    },
  },
};

export const gigaTrendOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: true,
      text: "Giga Kitchen Meal Trends",
      color: "black",
    },
    datalabels: {
      align: function (context: any) {
        const index = context.dataIndex;
        const curr = context.dataset.data[index];
        const prev = context.dataset.data[index - 1];
        const next = context.dataset.data[index + 1];

        if (curr === 0) {
          return "top";
        }

        return prev < curr && next < curr
          ? "end"
          : prev > curr && next > curr
          ? "start"
          : "center";
      },
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderColor: "rgba(128, 128, 128, 0.7)",
      borderRadius: 4,
      borderWidth: 1,
      color: function (context: any) {
        const i = context.dataIndex;
        const value = context.dataset.data[i];
        const prev = context.dataset.data[i - 1];
        const diff = prev !== undefined ? value - prev : 0;

        if (value === 0) {
          return "red";
        }
        return diff < 0 ? "#1E6D3B" : diff > 0 ? "#F47D38" : "gray";
      },
      font: {
        size: 11,
        weight: "bold",
      },
      offset: 8,
      formatter: function (value: any, context: any) {
        const i = context.dataIndex;
        const prev = context.dataset.data[i - 1];
        const diff = prev !== undefined ? prev - value : 0;

        // Check if the value is zero and set a different glyph
        const glyph = value === 0 ? "◆" : diff < 0 ? "▲" : diff > 0 ? "▼" : "◆";

        return glyph + " " + Math.round(value).toLocaleString();
      },
      padding: 6,
    },
  },
};

export const allKitchens = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: true,
      text: "Cumulative Meals in all Kitchens",
      color: "black",
    },
    datalabels: {
      align: function (context: any) {
        const index = context.dataIndex;
        const curr = context.dataset.data[index];
        const prev = context.dataset.data[index - 1];
        const next = context.dataset.data[index + 1];

        // Check if the value is zero and set alignment to "top"
        if (curr === 0) {
          return "top";
        }

        return prev < curr && next < curr
          ? "end"
          : prev > curr && next > curr
          ? "start"
          : "center";
      },
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderColor: "rgba(128, 128, 128, 0.7)",
      borderRadius: 4,
      borderWidth: 1,
      color: function (context: any) {
        const i = context.dataIndex;
        const value = context.dataset.data[i];
        const prev = context.dataset.data[i - 1];
        const diff = prev !== undefined ? value - prev : 0;

        if (value === 0) {
          return "red";
        }
        return diff < 0 ? "#1E6D3B" : diff > 0 ? "#F47D38" : "gray";
      },
      font: {
        size: 11,
        weight: "bold",
      },
      offset: 8,
      formatter: function (value: any, context: any) {
        const i = context.dataIndex;
        const prev = context.dataset.data[i - 1];
        const diff = prev !== undefined ? prev - value : 0;

        // Check if the value is zero and set a different glyph
        const glyph = value === 0 ? "◆" : diff < 0 ? "▲" : diff > 0 ? "▼" : "◆";

        return glyph + " " + Math.round(value).toLocaleString();
      },
      padding: 6,
    },
  },
};

export const AgeUtilization = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Utilization by Age",
    },
    datalabels: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          var label = context.dataset.label || "";
          if (context.parsed.y !== null) {
            label += " " + context.parsed.y + "%";
          }
          return label;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Age",
      },
    },
    y: {
      title: {
        display: true,
        text: "Percentage '%'",
      },
    },
  },
};
export const GradeUtilization = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Utilization by grade",
    },
    datalabels: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          var label = context.dataset.label || "";
          if (context.parsed.y !== null) {
            label += " " + context.parsed.y + "%";
          }
          return label;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Grades",
      },
    },
    y: {
      title: {
        display: true,
        text: "Percentage '%'",
      },
    },
  },
};

export const AgeCoverage = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Coverage by Age",
    },
    datalabels: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          var label = context.dataset.label || "";
          if (context.parsed.y !== null) {
            label += " " + context.parsed.y + "%";
          }
          return label;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Age",
      },
    },
    y: {
      title: {
        display: true,
        text: "Percentage '%'",
      },
    },
  },
};
export const GradeCoverage = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Coverage by grade",
    },
    datalabels: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          var label = context.dataset.label || "";
          if (context.parsed.y !== null) {
            label += " " + context.parsed.y + "%";
          }
          return label;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Grades",
      },
    },
    y: {
      title: {
        display: true,
        text: "Percentage '%'",
      },
    },
  },
};

export const GradeEnrollment = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Enrollement by Grade",
    },
    datalabels: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          var label = context.dataset.label || "";
          if (context.parsed.y !== null) {
            label += " " + context.parsed.y + "%";
          }
          return label;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Grade",
      },
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: "Enrollment",
      },
    },
  },
};
export const AgeEnrollment = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Enrollement by Age",
    },
    datalabels: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          var label = context.dataset.label || "";
          if (context.parsed.y !== null) {
            label += " " + context.parsed.y + "%";
          }
          return label;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Age",
      },
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: "Enrollment",
      },
    },
  },
};
export const failedTaps = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Failed taps analysis by grade",
    },
    datalabels: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          var label = context.dataset.label || "";
          if (context.parsed.y !== null) {
            label += " " + context.parsed.y + "%";
          }
          return label;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Grades",
      },
    },
    y: {
      title: {
        display: true,
        text: "Percentage '%'",
      },
    },
  },
};
export const failedTapsAge = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Failed taps analysis by age",
    },
    datalabels: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          var label = context.dataset.label || "";
          if (context.parsed.y !== null) {
            label += " " + context.parsed.y + "%";
          }
          return label;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Age",
      },
    },
    y: {
      title: {
        display: true,
        text: "Percentage '%'",
      },
    },
  },
};
export const coverageSubCounty = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Coverage by Sub-County",
    },
    datalabels: {
      display: false,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Sub-Counties",
      },
    },
    y: {
      title: {
        display: true,
        text: "No. of Schools",
      },
    },
  },
};
export const kitchenProductionOptions = {
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: true,
      text: "Kitchen Meals Productions",
      color: "black",
    },
    datalabels: {
      align: function (context: any) {
        var index = context.dataIndex;
        var curr = context.dataset.data[index];
        var prev = context.dataset.data[index - 1];
        var next = context.dataset.data[index + 1];
        return prev < curr && next < curr
          ? "end"
          : prev > curr && next > curr
          ? "start"
          : "center";
      },
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderColor: "rgba(128, 128, 128, 0.7)",
      borderRadius: 4,
      borderWidth: 1,
      color: function (context: any) {
        const i = context.dataIndex;
        const value = context.dataset.data[i];
        const prev = context.dataset.data[i - 1];
        const diff = prev !== undefined ? value - prev : 0;

        if (value === 0) {
          return "red";
        }
        return diff < 0 ? "#1E6D3B" : diff > 0 ? "#F47D38" : "gray";
      },
      font: {
        size: 11,
        weight: "bold",
      },
      offset: 8,
      formatter: function (value: any, context: any) {
        const i = context.dataIndex;
        const prev = context.dataset.data[i - 1];
        const diff = prev !== undefined ? prev - value : 0;
        const glyph = diff < 0 ? "▲" : diff > 0 ? "▼" : "◆";
        return glyph + " " + Math.round(value);
      },
      padding: 6,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Kitchen",
      },
    },
    y: {
      title: {
        display: true,
        text: "Production Capacity",
      },
    },
  },
};
