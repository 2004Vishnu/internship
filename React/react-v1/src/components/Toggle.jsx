import { useState } from "react";

function Toggle() {
  let [show, setshow] = useState(false);
  return (
    <>
      {/* <button onClick={() => setshow(false)}>Hide</button>
      <button onClick={() => setshow(true)}>Show</button> */}
      <button onClick={() => setshow(!show)}>{show?"Hide":"view"}</button>
      <div>{show && <p>This is a paragraph</p>}</div>
    </>
  );
}

export default Toggle;
