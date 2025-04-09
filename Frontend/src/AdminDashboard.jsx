import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [forms, setForms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: "", password: "" });
  const [dateRange, setDateRange] = useState("weekly");
  const [isPaul, setIsPaul] = useState(false);

  useEffect(() => {
    fetchForms();
    fetchTeachers();
    checkIfPaul();
  }, []);

  const checkIfPaul = () => {
    const storedToken = localStorage.getItem("adminToken");
    if (storedToken) {
      const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
      setIsPaul(decodedToken.username === "Paul");
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch("http://localhost:5000/teachers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
        },
      });

      if (!response.ok) throw new Error("Failed to fetch teachers");

      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchForms = async () => {
    try {
      const response = await fetch("http://localhost:5000/forms", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
      });
      if (!response.ok) throw new Error("Failed to fetch forms");
      const data = await response.json();
      // console.log("Fetched Forms:", data);  // 👈 ADD THIS LINE
      setForms(data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-teacher/${teacherId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
        }
      });
  
      if (!response.ok) throw new Error("Failed to delete teacher");
  
      // ✅ Update the state without the deleted teacher
      setTeachers((prevTeachers) => prevTeachers.filter(t => t.id !== teacherId));
      
      alert("Teacher deleted successfully");
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };
  
  





  const handleAddTeacher = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("http://localhost:5000/add-teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(newTeacher),
      });

      if (!response.ok) throw new Error("Failed to add teacher");

      alert("Teacher added successfully!");
      setNewTeacher({ name: "", password: "" }); // Reset form
      fetchTeachers(); // Refresh teacher list
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  const handleDownload = () => {
    window.open(`http://localhost:5000/download/${dateRange}`, "_blank");
  };

  const handleDeleteForm = async (formId) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-form/${formId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to delete form");

      alert("Form deleted successfully!");
      fetchForms(); // Refresh form list
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <section className="forms-section">
        <h3>Submitted Forms</h3>
        <table>
          <thead>
            <tr>
              <th>Teacher Name</th>
              <th>Hostel Name</th>
              <th>Date & Time</th>
              <th>Comments</th>
              <th>Maintenance</th>
              <th>Complaints</th>
              {isPaul && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id}>
                <td>{form.teacher_name}</td>
                <td>{form.hostel_name}</td>
                <td>{form.created_at}</td>
                <td>{form.general_comments}</td>
                <td>{form.maintenance_required}</td>
                <td>{form.complaints}</td>
                {isPaul && (
                  <td>
                    <button onClick={() => handleDeleteForm(form.id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="add-teacher-section">
        <h3>Add New Teacher</h3>
        <form onSubmit={handleAddTeacher}>
          <input
            type="text"
            placeholder="Teacher Name"
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newTeacher.password}
            onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
            required
          />
          <button type="submit">Add Teacher</button>
        </form>
      </section>

      <section className="teachers-section">
        <h3>Teachers List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>
                  <button onClick={() => handleDeleteTeacher(teacher.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="download-section">
        <h3>Download Reports</h3>
        <select onChange={(e) => setDateRange(e.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          {/* <option value="custom">Custom</option> */}
        </select>
        <button onClick={handleDownload}>Download</button>
      </section>
    </div>
  );
};

export default AdminDashboard;
