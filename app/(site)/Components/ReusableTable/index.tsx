import { useMemo, useRef, useState } from "react";
import {
  Column,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
  useTable,
} from "react-table";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { HiOutlineSearch } from "react-icons/hi";
import "regenerator-runtime";
import { useRouter } from "next/navigation";
import LoaderSpinner from "@/app/LoadingSpinner";
import moment from "moment";
import { FaFileExport } from "react-icons/fa";
import { CSVLink } from "react-csv";

interface Props<T extends object> {
  tableColumns: Column<T>[];
  tableData: any;
  path: string;
  headers: any;
  title: string;
  onRowClick?: any;
  routerAccess?: any;
}

const ReusableTable = <T extends Record<string, any>>({
  tableColumns,
  tableData,
  headers,
  title,
  routerAccess,
  path,
  onRowClick,
}: Props<T>) => {
  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo(() => tableColumns, [tableColumns]);
  const tableRef = useRef(null);

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    globalFilter,
    setGlobalFilter,
    page,
    nextPage,
    rows: tableRows,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    setPageSize,
    state: { pageIndex, pageSize },
  }: any = tableInstance;

  const onPrevious = () => {
    previousPage();
  };
  const onNext = () => {
    nextPage();
  };

  const router = useRouter();
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  const [loading, setLoading] = useState(false);
  const [clickedRowId, setClickedRowId] = useState(null);

  const handleRowClick = (rowId: any) => {
    setClickedRowId(rowId);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`${path}/${rowId}`);
    }, 5000);
  };

  //=============== Start Export CSV File Either all data or selected ward =======
  const todayDate = moment(new Date()).format("YYYY-MM-DD");
  const getCurrentData = (headers: any[], tableRows: any) => {
    const currentData = tableRows.map((tableRow: any) => {
      const dataRow: any = {};

      headers.forEach((header) => {
        dataRow[header.key] = tableRow.original[header.key];
      });
      return { ...dataRow, index: tableRow.index + 1 };
    });
    return currentData;
  };

  const filename = `${title}${todayDate}`;

  return (
    <section className="w-full">
      <div className="border border-gray-200  md:rounded-lg my-1 bg-gray-100">
        <div className="flex items-center justify-between  p-4">
          <h3 className=" ml-4 text-xl font-bold">{title}</h3>
          <div className="flex  items-center">
            <div className="relative ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <HiOutlineSearch />
              </div>
              <input
                type="text"
                value={value || ""}
                onChange={(e) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-40 sm:w-80 md:w-120 pl-10 p-2.5"
                placeholder="Search for items..."
              />
            </div>
            {/* <div className="hidden md:flex items-center gap-2 mx-4 bg-orange-200  px-2 py-1.5  transition-colors duration-200 border rounded-md text-orange-600 border-orange-500 hover:text-green-700 hover:bg-green-100  hover:border-green-300">
              <CSVLink
                data={getCurrentData(headers, tableRows)}
                headers={headers}
                filename={filename}
              >
                Export
              </CSVLink>
              <FaFileExport className="font-lg" />
            </div> */}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto bg-white border border-gray-200  md:rounded-lg">
        <table
          {...getTableProps()}
          className={`min-w-full divide-y divide-gray-200`}
          ref={tableRef}
        >
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup: any, index: number) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column: any) => (
                  <th
                    {...column.getHeaderProps(column)}
                    key={`${column.id}-${index}`}
                    className="py-3 px-2 text-sm sm:text-sm md:text-sm font-bold text-left rtl:text-right text-gray-700"
                  >
                    {column.render("Header")}
                    <span className="ml-2 text-sm font-normal">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <span className="opacity-100">↓</span>
                        ) : (
                          <span className="opacity-100">↑</span>
                        )
                      ) : (
                        <span className="opacity-10 hover:opacity-100 ">
                          ↓↑
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
            {page?.map((row: any, index: any) => {
              prepareRow(row);
              return (
                <tr
                  key={index}
                  {...row.getRowProps()}
                  className={`hover:bg-gray-200 cursor-pointer ${
                    clickedRowId === row.original[routerAccess ?? "id"]
                      ? "bg-gray-200"
                      : ""
                  }`}
                  onClick={() =>
                    handleRowClick(row.original[routerAccess ?? "id"])
                  }
                >
                  {row.cells.map((cell: any, cellindex: number) => {
                    return (
                      <td
                        key={cellindex}
                        {...cell.getCellProps()}
                        className="py-4 px-4 text-sm font-medium text-gray-700  whitespace-nowrap "
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {loading && (
        <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-opacity-75 bg-gray-300 z-50">
          <LoaderSpinner />
        </div>
      )}
      <div className="flex justify-between border border-gray-200  md:rounded-lg my-1 p-2 bg-white">
        <div className="flex items-center gap-8">
          <button
            className={`flex items-center px-5 py-2 text-sm capitalize transition-colors duration-200 border rounded-md gap-x-2
            text-gray-700  bg-gray-100 border-gray-200  hover:border-orange-300
          `}
            onClick={onPrevious}
            disabled={!canPreviousPage}
          >
            <BsArrowLeft />

            <span>previous</span>
          </button>
          <div className="text-sm">
            <span className="text-sm mr-2">Page</span>
            <strong>{pageIndex + 1}</strong>
            <span className="text-sm mx-2">of</span>
            <strong>{pageOptions?.length}</strong>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="hidden md:block text-sm">
            <span className="text-sm mr-2">Show</span>
            <select
              className="bg-gray-50 border border-f4e-orange text-gray-900 text-sm rounded-md py-1.5 focus:outline-none focus:ring-f4e-green focus:border-f4e-green selection:bg-f4e-green "
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 50, 100, 500, 1000].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm ml-2">rows</span>
          </div>

          <button
            disabled={!canNextPage}
            onClick={onNext}
            className={`flex items-center px-5 py-2 text-sm capitalize transition-colors duration-200 rounded-md gap-x-2
            text-gray-700  bg-gray-100 border border-gray-200  hover:border-orange-300`}
          >
            <span>Next</span>

            <BsArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};
export default ReusableTable;
