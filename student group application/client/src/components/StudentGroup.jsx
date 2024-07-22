import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function StudentGroup() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchData();
  }, []);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <section>
      <div className="container">
        <h1 className="my-5 text-center">Student Grouping Management System</h1>
        <div className="d-flex gap-4 justify-content-end pb-4 align-items-center">
          <div
            style={{ width: "48px", background: "white" }}
            className="shadow-sm border rounded cursor-pointer user-select-all p-2"
            onClick={toggleModal} // Toggle modal on click
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
          </div>
          {/* Bootstrap Modal */}
          <div
            className={`modal fade ${showModal ? "show" : ""}`}
            tabIndex="-1"
            style={{ display: showModal ? "block" : "none" }}
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Student</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={toggleModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="userId">STD ID:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="userId1"
                        placeholder="Enter Student ID"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Name">Student Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="userId2"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="userId3">Mark:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="userId3"
                        placeholder="Mark"
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={toggleModal}
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal Backdrop Overlay */}
          {showModal && <div className="modal-backdrop fade show"></div>}
          <div
            style={{ width: "48px", background: "white" }}
            className="shadow-sm border rounded cursor-pointer user-select-all p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
          </div>
          <div
            style={{ width: "48px", background: "white" }}
            className="shadow-sm border rounded cursor-pointer user-select-all p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {students.map((student, index) => (
            <div className="col" key={index}>
              <div className="card h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title mb-3">Name: {student.name}</h5>
                  <p className="card-text">User ID: {student.userID}</p>
                  <p className="card-text">Score: {student.mark}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
