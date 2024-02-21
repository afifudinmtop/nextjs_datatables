"use client";

import { useState, useEffect } from "react";

import $ from "jquery";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5.js"; // Ekspor ke HTML5 (Excel, PDF)
import "datatables.net-buttons/js/buttons.print.js"; // Print

// Pastikan juga mengimpor jszip dan pdfmake jika belum
import "jszip";
import "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
import DataTable from "datatables.net-dt";
import JSZip from "jszip"; // For Excel export
import PDFMake from "pdfmake"; // For PDF export
import apiData from "./apiData";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

DataTable.Buttons.jszip(JSZip);
DataTable.Buttons.pdfMake(PDFMake);

import "../node_modules/datatables.net-dt/css/dataTables.dataTables.min.css";
import "../node_modules/datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "./style.css";

function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const fillTable = (tableData) => {
    setData(tableData); // Update state dengan data baru

    // Pastikan DataTable tidak diinisialisasi lebih dari sekali
    if (!$.fn.dataTable.isDataTable("#tabel1")) {
      $("#tabel1").DataTable({
        dom: "Bfrtip",
        buttons: ["copy", "csv", "excel", "pdf", "print"],
        data: tableData,
        columns: [
          { title: "Name", data: "name" },
          { title: "Position", data: "position" },
          { title: "Office", data: "office" },
          { title: "Age", data: "age" },
          { title: "Start date", data: "startDate" },
          { title: "Salary", data: "salary" },
        ],
      });

      $(".dt-button").addClass("text-white px-[14px] py-[7px] rounded");
      $(".dt-button").removeClass("dt-button");

      $(".buttons-excel").addClass("bg-lime-800");
      $(".buttons-copy").addClass("bg-violet-800");
      $(".buttons-csv").addClass("bg-green-800");
      $(".buttons-pdf").addClass("bg-red-800");
      $(".buttons-print").addClass("bg-blue-800");
    } else {
      // Jika sudah diinisialisasi, update data tabel
      var table = $("#tabel1").DataTable();
      table.clear();
      table.rows.add(tableData); // Add new data
      table.draw(); // Redraw the DataTable
    }
  };

  const loadData = async () => {
    fillTable(apiData);
  };

  return (
    <div className="bg-gray-100 w-screen h-screen overflow-auto">
      <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white max-w-[90%] mx-auto p-[10px] mt-[20px]">
        <table
          id="tabel1"
          className="display min-w-full divide-y divide-gray-200"
        ></table>
      </div>
    </div>
  );
}

export default Page;
