import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

const AppointmentMessage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjI5YWFiNTE4NDc0ZTMxMWNiNzQyZSIsImlhdCI6MTY3OTk5MTE5MCwiZXhwIjoxNjgyNTgzMTkwfQ.ehi0d3EDjDTbxeORbMY9B-Wj00R_q9zmOPlJHyAEXgw`,
      },
    };
    axios
      .get(
        "https://health-savvy.onrender.com/api/pharmacy/dashboard/medicine",
        config
      )
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDecline = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjI5YWFiNTE4NDc0ZTMxMWNiNzQyZSIsImlhdCI6MTY3OTk5MTE5MCwiZXhwIjoxNjgyNTgzMTkwfQ.ehi0d3EDjDTbxeORbMY9B-Wj00R_q9zmOPlJHyAEXgw`,
      },
    };
    axios
      .delete(
        `https://health-savvy.onrender.com/api/pharmacy/dashboard/medicine/${id}`,
        config
      )
      .then((response) => {
        setMessages(messages.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [buttonStyles, setButtonStyles] = useState({
    backgroundColor: "blue",
    color: "white",
  });
  const handleClick = (id, name, email) => {
    const confirmed = window.confirm(
      `Are you sure you want to confirm ${name}?`
    );

    if (confirmed) {
      setButtonStyles({
        ...buttonStyles,
        [id]: {
          backgroundColor: "green",
          color: "white",
          borderRadius: "5px",
          height: "36px",
        },
      });
    }
  };

  return (
    <>
      <div>
        <Card style={{ width: "1420px", marginLeft: "-80px" }}>
          <CardBody>
            <CardTitle tag="h5">List of Medecines</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              In your Store
            </CardSubtitle>

            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>Medecines</th>

                  <th>description</th>
                  <th>ID</th>
                  <th>categories</th>
                  <th>Number in store</th>
                  <th>Disease</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((item) => (
                  <tr className="border-top">
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <img
                          src={item.medicineImage}
                          className="rounded-circle"
                          alt="avatar"
                          width="45"
                          height="45"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">{item.medicineName} </h6>
                        </div>
                      </div>
                    </td>
                    <td>{item.description}</td>
                    <td>{item.medicineId}</td>
                    <td>{item.categories}</td>
                    <td>{item.quantity}</td>
                    <td>{item.disease[0] + item.disease[1]} </td>
                    <td>
                      <button
                        // onClick={() =>
                        //   handleClick(item._id, item.hospitalName, item.email)
                        // }
                        style={
                          buttonStyles[item._id] || {
                            backgroundColor: "dodgerblue",
                            borderRadius: "5px",
                            color: "white",
                            height: "36px",
                          }
                        }
                      >
                        {/* {buttonStyles[item._id] ? "Confirmed" : "Confirm"} */}
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        class="btn btn-danger"
                        onClick={() => handleDecline(item._id)}
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default AppointmentMessage;
