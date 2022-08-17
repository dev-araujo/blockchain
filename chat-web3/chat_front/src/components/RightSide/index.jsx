import "./styles.css";

const RightSide = ({ callFunction, initialValue, controlValue, data }) => {
  return (
    <main className="rightside">
      <section className="rightside__posts">
        {data.map((wave, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: "OldLace",
                marginTop: "16px",
                padding: "8px",
              }}
            >
              <div>Endereço: {wave.address}</div>
              <div>Data/Horário: {wave.timestamp.toString()}</div>
              <div>Mensagem: {wave.message}</div>
            </div>
          );
        })}
      </section>
      <footer className="rightside__sendPost">
        <textarea
          value={initialValue}
          onChange={controlValue}
          rows="4"
          cols="50"
          type="text"
        ></textarea>
        <div className="rightside__sendButton" onClick={callFunction}>
          <i class="bi bi-send"></i>
        </div>
      </footer>
    </main>
  );
};
export default RightSide;
