import Posts from "./Posts";
import Tutorial from "./Tutorial";
import "./styles.css";

const RightSide = ({ callFunction, initialValue, controlValue, data }) => {
  return (
    <main>
      {data.length !== 0 ? (
        <section className="rightside">
          <section className="rightside__posts">
            <Posts data={data} />
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
              <i className="bi bi-send"></i>
            </div>
          </footer>
        </section>
      ) : (
        <Tutorial />
      )}
    </main>
  );
};
export default RightSide;
