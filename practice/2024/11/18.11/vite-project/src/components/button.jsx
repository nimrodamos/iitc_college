const Button = ({ count, setCount }, children) => {
  console.log(children);

  return (
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  );
};

export default Button;
