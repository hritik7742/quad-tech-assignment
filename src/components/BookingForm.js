import { useState } from "react";
import "./BookingForm.css"

function BookingForm(props) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const saveFormData = () => {
    const bookingData = { ...formData, movie: props.match.params.showName };
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveFormData();
    props.history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
     
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="movie">Movie:</label>
        <input type="text" id="movie" name="movie" value={props.match.params.showName} readOnly />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default BookingForm;
