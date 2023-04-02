import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Button,
} from "reactstrap";

const AppointmentMessage = () => {
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [currentMedicine, setCurrentMedicine] = useState({
    medicineName: "",
    description: "",
    categories: "",
    quantity: "",
    disease: [],
  });
  const [updatedMedicine, setUpdatedMedicine] = useState({
    medicineName: "",
    description: "",
    categories: "",
    quantity: "",
    disease: [],
  });
  const [selectedMedicine, setSelectedMedicine] = useState(null);

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
        alert("This action cannot be undone,are you sure you want to delete this medecine?")
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
  const handleClick = (id, name, email, item) => {
    const confirmed = window.confirm(
      `Are you sure you want to update this medecine?`
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
  const handleEdit = (id, updatedData) => {
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjI5YWFiNTE4NDc0ZTMxMWNiNzQyZSIsImlhdCI6MTY3OTk5MTE5MCwiZXhwIjoxNjgyNTgzMTkwfQ.ehi0d3EDjDTbxeORbMY9B-Wj00R_q9zmOPlJHyAEXgw`,
      },
    };
    axios
      .put(
        `https://health-savvy.onrender.com/api/pharmacy/dashboard/medicine/${id}`,
        updatedMedicine,
        config
      )
      .then((response) => {
        setMessages(
          messages.map((item) =>
            item._id === id ? { ...item, ...updatedData } : item
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
    const medicine = messages.find((item) => item._id === id);
    setCurrentMedicine(medicine);
    setShowModal(true);
  };
  const handleFormSubmit = (id, updatedData) => {
    handleEdit(id, updatedData);
    // hide the form after submission
    setEditItemId(null);
  };
  const [editItemId, setEditItemId] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  const handleEditClick = (id, item) => {
    setEditItemId(id);
    setEditFormData(item);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  return (
    <>
      <Modal isOpen={showModal} t>
        <ModalHeader>Edit Medicine</ModalHeader>
        <ModalBody>
          <Form >
            <FormGroup>
              <Label for="medicineName">Medicine Name</Label>
              <Input
                type="text"
                name="medicineName"
                id="medicineName"
                value={currentMedicine.medicineName}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={currentMedicine.description}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="medicineId">ID</Label>
              <Input
                type="text"
                name="medicineId"
                id="medicineId"
                value={currentMedicine.medicineId}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="categories">Categories</Label>
              <Input
                type="text"
                name="categories"
                id="categories"
                value={currentMedicine.categories}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Number in Store</Label>
              <Input
                type="number"
                name="quantity"
                id="quantity"
                value={currentMedicine.quantity}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="disease">Disease</Label>
              <Input
                type="text"
                name="disease"
                id="disease"
                value={currentMedicine.disease}
                onChange={handleInputChange}
              />
            </FormGroup>
            <Button color="primary" type="submit" onClick={handleClick}>
              Save Changes
            </Button>
          </Form>
        </ModalBody>
      </Modal>

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
                    <td>{item.disease[0]} </td>
                    <td>
                      <button
                        onClick={() => handleEdit(item._id)}
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
                        Delete
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
