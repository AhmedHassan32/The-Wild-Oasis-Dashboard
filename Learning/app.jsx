import Counter from "./Counter";
import "./styles.css";

export default function App() {
  return (
    <div>
      <h1>Compound Component Pattern</h1>
      {/* <Counter
        iconIncrease="+"
        iconDecrease="-"
        label="My NOT so flexible counter"
        hideLabel={false}
        hideIncrease={false}
        hideDecrease={false}
        positionCount="top"
      /> */}

      {/* <Counter>
        <span>Hola </span>
        <Count />
        <Increase icon={"+"} />
        <Label> Fuck YOU </Label>
        <Decrease icon={"-"} />
      </Counter> */}

      {/* <div>
        <Counter>
          <span>Hola</span>
          <Increase icon={"+"} />
          <Decrease icon={"-"} />
          <Label>Hola again</Label>
          <Count />
          <Counter.Label>My super flexible counter</Counter.Label>
          <Counter.Decrease icon="-" />
          <Counter.Increase icon="+" />
          <Counter.Count />
        </Counter>
      </div> */}

      <Counter>
        <Counter.Label>My super flexible counter</Counter.Label>
        <Counter.Decrease icon="-" />
        <Counter.Increase icon="+" />
        <Counter.Count />
      </Counter>

      <div>
        <Counter>
          <Counter.Decrease icon="◀️" />
          <div>
            <Counter.Count />
          </div>
          <Counter.Increase icon="▶️" />
        </Counter>
      </div>
    </div>
  );
}
