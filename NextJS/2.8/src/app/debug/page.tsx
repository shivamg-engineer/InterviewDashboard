'use client'

export default function DebugPage() {

  function handleClick() {
    // intentional runtime error
    throw new Error("Button crashed!");
  }

//   function handleClick() {
//   console.log("Button clicked")
// }

  return (
    <div>
      <h1>Debug Example</h1>

      <button onClick={handleClick}>
        Click to trigger error
      </button>
    </div>
  )
}