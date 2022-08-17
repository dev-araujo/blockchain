import "./styles.css";

const LeftSide = ({ isAccount, callFunction }) => {
  return (
    <main className="leftside">
      <section className="leftside__content">
        <h1 className="leftside__title">Chat web3.0</h1>
        <button className="leftside__waveButton" onClick={callFunction}>
          {isAccount ? "CONECTADO" : "CONECTAR CARTEIRA"}
        </button>
      </section>
    </main>
  );
};
export default LeftSide;
