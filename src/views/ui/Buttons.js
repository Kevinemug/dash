import React, { useState } from "react";
import axios from "axios";
import Success from "../../components/success.jsx";

// import "../styles/member.css";
function HospitalForm() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [data, setData] = useState({
    medicineName: "",
    medicineId: "",
    quantity: "",
    description: "",
    categories: "",
    medicineImage: null,

    disease: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSpecializationChange = (event) => {
    const { value } = event.target;
    setData((prevData) => ({
      ...prevData,
      disease: [value], // store value as an array
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submiting..");
    const formData = new FormData();
    formData.append("medicineName", data.medicineName);
    formData.append("medicineId", data.medicineId);
    formData.append("quantity", data.quantity);
    formData.append("description", data.description);
    formData.append("categories", data.categories);
    formData.append("medicineImage", data.medicineImage);
    // Use forEach to add each specialization value as an array
    data.disease.forEach((value) => {
      formData.append("disease[]", value);
    });
    try {
      const response = await axios.post(
        "https://health-savvy.onrender.com/api/pharmacy/dashboard/medicine",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjI5YWFiNTE4NDc0ZTMxMWNiNzQyZSIsImlhdCI6MTY3OTk5MTE5MCwiZXhwIjoxNjgyNTgzMTkwfQ.ehi0d3EDjDTbxeORbMY9B-Wj00R_q9zmOPlJHyAEXgw `,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setShowSuccessPopup(true);
  };

  return (
    <div className="formi">
      <p className="apply">Add Medecine</p>

      <form onSubmit={handleSubmit}>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Medicine Name :{" "}
            <input
              type="text"
              name="medicineName"
              value={data.medicineName}
              onChange={handleChange}
              id="inputEmail3"
              className="form-control"
              style={{ width: "500px" }}
            />
          </label>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">
            Medicine Id :{" "}
            <input
              type="text"
              name="medicineId"
              value={data.medicineId}
              onChange={handleChange}
              class="form-control"
              style={{ width: "500px" }}
            />
          </label>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">
            Quantity{" "}
            <input
              type="text"
              name="quantity"
              value={data.quantity}
              onChange={handleChange}
              className="form-control"
              style={{ width: "500px" }}
            />
          </label>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">
            description{" "}
            <input
              type="text"
              name="description"
              value={data.description}
              onChange={handleChange}
              className="form-control"
              style={{ width: "500px" }}
            />
          </label>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">
            Category:{" "}
            <input
              type="text"
              name="categories"
              value={data.categories}
              onChange={handleChange}
              className="form-control"
              style={{ width: "500px" }}
            />
          </label>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">
            Medicine Image:{" "}
            <input
              type="file"
              name="medicineImage"
              onChange={handleFileChange}
              className="form-control"
              style={{ width: "500px" }}
            />
          </label>
        </div>

        <div class="form-group row">
          <label class="col-sm-2 col-form-label">
            Disease:
            <input
              type="text"
              name="disease"
              value={data.disease}
              onChange={handleSpecializationChange}
              className="form-control"
              style={{ width: "500px" }}
            />
          </label>{" "}
        </div>
        {showSuccessPopup && (
          <Success
            description=" Medecine added successfully,you can edit or delete it in medecines menu"
            link="/dashboard/alerts"
          />
        )}

        <button type="submit" className="btn btn-primary">
          submit
        </button>
      </form>
    </div>
  );
}
export default HospitalForm;
