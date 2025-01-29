import { useState, useEffect } from "preact/hooks";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export default (props: { timeInSeconds: number, callBack?: Function }) => {
	const [timeLeft, setTimeLeft] = useState(props.timeInSeconds * 1000); // Convert to milliseconds

	useEffect(() => {
	  if (timeLeft <= 1) return props?.callBack?.();
	  
	  const timer = setInterval(() => {
		setTimeLeft((prev) => prev - 1); // Decrease by 1ms
	  }, 0);
  
	  return () => clearInterval(timer);
	}, [timeLeft, props?.callBack]);
    
	return <div>{timeLeft}ms remaining</div>;
  };