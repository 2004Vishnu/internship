import { useState, useEffect } from "react";
import StudentForm from "../components/StudentForm";

function Students() {
  const url = "http://localhost:8080/all";

  const [sdata, setsdata] = useState([]);
  const [deleted, setdeleted] = useState();
  const [show, setShow] = useState(null);

  const [Name, setName] = useState("");
  const [Age, setAge] = useState(0);
  const [id, setId] = useState(0);

  function setEdit(student) {
    setName(student.name);
    setAge(student.age);
    setId(student.id);
    setShow(student.id);
  }

  function getData() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setsdata(data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getData();
  }, [deleted]);

  function handleDelete(id) {
    const url1 = `http://localhost:8080/delete/${id}`;

    fetch(url1, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setdeleted(id);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleUpdate(e, id) {
    e.preventDefault();

    let url2 = `http://localhost:8080/update/${id}`;

    const payload = {
      name: Name,
      age: Age,
    };

    fetch(url2, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          alert("Failed to update");
          return;
        }
        getData();
        setShow(null);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-center mb-8">
        Student Table
      </h1>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Age</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sdata.map((student) => (
              <tr key={student.id} className="text-center hover:bg-gray-100">
                <td className="p-3 border">{student.name}</td>
                <td className="p-3 border">{student.age}</td>

                <td className="p-3 border flex justify-center gap-3">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                    onClick={() => setEdit(student)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <form
            className="bg-white p-8 rounded-lg shadow-xl w-100 flex flex-col gap-4"
            onSubmit={(e) => handleUpdate(e, show)}
          >
            <h2 className="text-xl font-semibold text-center">
              Update Student
            </h2>

            <label>Name</label>
            <input
              type="text"
              value={Name}
              className="border p-2 rounded"
              onChange={(e) => setName(e.target.value)}
            />

            <label>Age</label>
            <input
              type="number"
              value={Age}
              className="border p-2 rounded"
              onChange={(e) => setAge(e.target.value)}
            />

            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>

              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                onClick={() => setShow(null)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}

      <StudentForm getData={getData} />

    </div>
  );
}

export default Students;