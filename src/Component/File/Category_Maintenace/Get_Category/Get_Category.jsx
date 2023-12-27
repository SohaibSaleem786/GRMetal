import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";
import { useTheme } from "../../../../ThemeContext";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import Edit from "../../../../image/edit.png";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
} from "react-bootstrap";
import "../../../Table.css"

const Get_Category = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();
  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Category");
  };

  useEffect(() => {
    fetch(`${apiLinks}/GetCategory.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          tctgid: item.tctgid,
          tctgdsc: item.tctgdsc,
          techid: item.techid,
          tctgsts: item.tctgsts,
        }));

        const columns = [
          { label: "ID", field: "id", sort: "asc" },
          { label: "Desription ", field: "tctgdsc", sort: "asc" },
          { label: "Techid ", field: "tctgdsc", sort: "asc" },

          { label: "Status ", field: "tctgsts", sort: "asc" },
        ];

        setData({ columns, rows: transformedData });
        setLength(apiData.length);

        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredRows = data.rows.filter(
    (row) =>
      (row.tctgdsc &&
        row.tctgdsc.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tctgsts &&
        row.tctgsts.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    if (selectedRow === row.tctgid) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Category/${row.tctgid}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.tctgid);
    }
  };

  return (
    <>
      <Header />
      <PathHead
        pageName="File > Category Maintenance"
        screen="Get_Item"
        pageLink="/MainPage"
      />

      <div className="col-12" style={{ color: secondaryColor }}>
        <br />
        <div
          className="Category"
          style={{
            // marginLeft: "30%",
            // marginRight: "30%",
            // maxWidth: "40%",
            padding: "20px",
            border: "1px solid gray",
          }}
        >
          <Row>
            <Col xs={12} sm={4} md={4} lg={4} xl={2}>
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: "11px",
                  color: secondaryColor,
                  width: "100%",
                  marginBottom: "10px",
                }}
                onClick={handleMenuItemClick}
              >
                ADD
              </Button>
            </Col>

            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 7 }}>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
          <div
            style={{
              fontSize: "12px",
              fontFamily: "Verdana",
              width: "100%",
              overflowX: "auto",
            }}
          >
            <MDBTable
              scrollY
              maxHeight="60vh"
              striped
              bordered
              small
              responsive
            >
              <MDBTableHead>
                <tr>
                  {data.columns.map((column, columnIndex) => (
                    <th
                      key={columnIndex}
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,
                        fontWeight: "bold",
                        position: "sticky",
                        top: -1,
                        textAlign: "center",
                        zIndex: 1,
                      }}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </MDBTableHead>

              <MDBTableBody>
                {filteredRows.map((row, index) => (
                  <tr key={index} onClick={() => handleRowClick(row)}>
                    {Object.keys(row).map((key, columnIndex) => {
                      return (
                        <td
                          key={key}
                          style={{
                            textAlign: columnIndex === 1 ? "left" : "center",

                            width:
                              columnIndex === 0
                                ? "1%"
                                : columnIndex === 1
                                ? "25%"
                                : columnIndex === 2
                                ? "1%"
                                : columnIndex === 3
                                ? "1%"
                                : columnIndex === 4
                                ? "12%"
                                : columnIndex === 5
                                ? "12%"
                                : columnIndex === 6
                                ? "12%"
                                : "auto",
                          }}
                        >
                          {key === "tusrpwd" ? "*****" : row[key]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                    {/* Blank rows to fill remaining space */}
      {Array.from({ length: Math.max(0, 11 - filteredRows.length) }).map((_, index) => (
        <tr key={`blank-${index}`}>
          {Array.from({ length: 4 }).map((_, colIndex) => (
            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
          ))}
        </tr>
      ))}
              </MDBTableBody>
              <MDBTableFoot
                style={{ position: "sticky", bottom: 0, zIndex: 2 }}
              >
                <tr>
                  <th
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                    }}
                  ></th>
                  <th
                    colSpan={6}
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,

                      textAlign: "left",
                    }}
                  >
                    {Length}
                  </th>
                </tr>
              </MDBTableFoot>
            </MDBTable>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Get_Category;