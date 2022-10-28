import ReactTooltip from "react-tooltip";
import { Props } from "./model";

export function TopNavBar(props: Props) {
  return (
    <header className="pt-3 d-flex justify-content-between w-100">
      <div className="d-flex">
        <h2 className="ps-3 "> Projeto Web3</h2>
        <h3 className="ps-1 mt-1"> | Chat</h3>
      </div>
      <button
        onClick={props.connect}
        type="button"
        className="btn btn-primary me-3 ps-4 pe-4"
        data-tip={props.address}
      >
        <ReactTooltip />
        {!props.address
          ? "conecte-se"
          : `${props.address?.substring(0, 14)}...`}
      </button>
    </header>
  );
}
