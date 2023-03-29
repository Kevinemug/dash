import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

const AppointmentMessage = () => {
  const [messages, setMessages] = useState([]);
  const [admitBtnStatus, setAdmitBtnStatus] = useState({});
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTJlNTc2MDVkNGVhN2Q3ODQ3MWQ4OCIsImlhdCI6MTY3OTQ3NDIwMSwiZXhwIjoxNjgyMDY2MjAxfQ.sLq2XMI30Ea33cU8x3BIoDXYkWyzD92Rjqcwsi3_N-Q`,
      },
    };
    axios
      .get(
        "https://health-savvy.onrender.com/api/admin/dashboard/doctor",
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTJlNTc2MDVkNGVhN2Q3ODQ3MWQ4OCIsImlhdCI6MTY3OTQ3NDIwMSwiZXhwIjoxNjgyMDY2MjAxfQ.sLq2XMI30Ea33cU8x3BIoDXYkWyzD92Rjqcwsi3_N-Q`,
      },
    };
    axios
      .delete(
        `https://health-savvy.onrender.com/api/admin/dashboard/doctor/${id}`,
        config
      )
      .then((response) => {
        setMessages(messages.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAdmit = (id) => {
    // make an API call to update the hospital status here
    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        if (message.id === id) {
          message.status = "Admitted";
        }
        return message;
      })
    );
  };
  const [buttonStyles, setButtonStyles] = useState({
    backgroundColor: "blue",
    color: "white",
  });
  const handleClick = (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to confirm Doctor ${name}?`
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
        <Card style={{ width: "1390px", marginLeft: "-80px" }}>
          <CardBody>
            <CardTitle tag="h5">List of Doctors</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Waiting for your feedback
            </CardSubtitle>

            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>Doctors</th>
                  <th>Specialization</th>

                  <th>Licence</th>
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
                          src={item.ProfileImage}
                          className="rounded-circle"
                          alt="avatar"
                          width="45"
                          height="45"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">
                            {item.firstName + " " + item.lastName}{" "}
                          </h6>
                          <span className="text-muted">{item.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{item.specialization[0]}</td>
                    <td>{item.license}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleClick(
                            item._id,
                            item.firstName + " " + item.lastName
                          )
                        }
                        style={
                          buttonStyles[item._id] || {
                            backgroundColor: "dodgerblue",
                            borderRadius: "5px",
                            color: "white",
                            height: "30px",
                          }
                        }
                      >
                        {" "}
                        {buttonStyles[item._id] ? "Confirmed" : "Confirm"}
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
