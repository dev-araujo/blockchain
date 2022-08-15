import "./styles.css";

const LeftSide = ({ isAccount, callFunction }) => {
  return (
    <main className="leftSide">
      <h1 className="title">Chat web3.0</h1>
      <button className="waveButton" onClick={callFunction}>
        {isAccount ? "CONECTADO" : "CONECTAR CARTEIRA"}
      </button>
    </main>
  );
};
export default LeftSide;
