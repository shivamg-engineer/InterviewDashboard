const ParentComponent=({name})=>{
    return <ChildComponent name={name}/>
}

const ChildComponent = ({ name }) => {
  return <h1>Welcome, {name}!</h1>;
};

export default ParentComponent;