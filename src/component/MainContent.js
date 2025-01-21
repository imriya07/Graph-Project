import React, { useState, useEffect } from "react";
import BarChart from "./Barchart.js";
import DatePicker from "react-datepicker"; // Install: npm install react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import data from "../data.json"; // Import the JSON file

const MainContent = () => {
  const [startDate, setStartDate] = useState(null); // Start date
  const [endDate, setEndDate] = useState(null); // End date
  const [ageFilter, setAgeFilter] = useState("15-25");
  const [genderFilter, setGenderFilter] = useState("male");
  const [barData, setBarData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // To track submission

  const [isFormValid, setIsFormValid] = useState(false); // To enable the submit button

  // Check if all fields are filled to enable the submit button
  useEffect(() => {
    const isValid =
      startDate !== null &&
      endDate !== null &&
      ageFilter !== "" &&
      genderFilter !== "";
    setIsFormValid(isValid);
  }, [startDate, endDate, ageFilter, genderFilter]);

  const handleSubmit = () => {
    filterData();
    setIsSubmitted(true); // Mark the form as submitted
  };

  // Function to filter the data based on the selected filters
  const filterData = () => {
    // Parse the ageFilter to make it comparable
    let ageRange = ageFilter === "15-25" ? [15, 25] : [26, 100];

    // Filter data based on the selected date range, age, and gender
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.date);
      const isInDateRange =
        itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      const isMatchingAgeGroup =
        item.age >= ageRange[0] && item.age <= ageRange[1];
      const isMatchingGender = item.gender === genderFilter;

      return isInDateRange && isMatchingAgeGroup && isMatchingGender;
    });

    // Process filtered data for the bar chart
    const processedBarData = processBarData(filteredData);
    setBarData(processedBarData);
  };

  // Function to process the filtered data for the bar chart
  const processBarData = (filteredData) => {
    const labels = [...new Set(filteredData.map((item) => item.feature))];
    const timeSpentData = labels.map((feature) =>
      filteredData
        .filter((item) => item.feature === feature)
        .reduce((total, item) => total + item.timeSpent, 0)
    );

    return {
      labels,
      datasets: [
        {
          label: "Total Time Spent",
          data: timeSpentData,
          backgroundColor: [
            "#6495ED",
            "#FF7F50",
            "#6495ED",
            "#6495ED",
            "#FF7F50",
          ],
        },
      ],
    };
  };

  return (
    <div className="container">
      <div className="mb-4 text-center">
        <h2>Welcome to the Dashboard</h2>
      </div>

      {/* Filters */}
      <div className="mb-4">
        <div className="row g-3">
          {/* Age Group */}
          <div className="col-12 col-md-3">
            <label htmlFor="ageFilter">Age Group</label>
            <select
              id="ageFilter"
              className="form-control"
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
            >
              <option value="15-25">15-25</option>
              <option value=">25">25+</option>
            </select>
          </div>

          {/* Gender */}
          <div className="col-12 col-md-3">
            <label htmlFor="genderFilter">Gender</label>
            <select
              id="genderFilter"
              className="form-control"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="col-12 col-md-4">
            <label>Date Range</label>
            <div className="d-flex">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="form-control me-2"
                placeholderText="Start Date"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="form-control"
                placeholderText="End Date"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-12 col-md-2 d-flex align-items-end">
            <button
              className="btn btn-primary w-100"
              onClick={handleSubmit}
              disabled={!isFormValid} // Disable if the form is not valid
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Show the Bar Chart only after submit */}
      {isSubmitted && barData && (
        <div className="mt-4">
          <BarChart barData={barData} />
        </div>
      )}
    </div>
  );
};

export default MainContent;
