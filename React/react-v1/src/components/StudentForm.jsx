import { useState } from "react";

function StudentForm({ getData }) {

  const [Name, setName] = useState("");
  const [Age, setAge] = useState(0);

  const url = "http://localhost:8080/save";

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: Name,
      age: Age,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          alert("Try again");
          return;
        }

        setName("");
        setAge("");

        getData();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">

      <h2 className="text-xl font-bold mb-4 text-center">
        Student Registration
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

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

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mt-2"
        >
          Add Student
        </button>

      </form>

    </div>
  );
}

export default StudentForm;