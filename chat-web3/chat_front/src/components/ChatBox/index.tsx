import TextField from "@mui/material/TextField";
import { Props } from "./model";
import "./styles.scss";

export function ChatBox(props: Props) {
  return (
    <section className="box d-flex flex-column justify-content-between">
      <header>
        <i className="bi bi-chat-dots text-white"></i>
      </header>

      <div className="box__content">
        {props.messages.map((wave: any, index: any) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: "OldLace",
                marginTop: "16px",
                padding: "8px",
              }}
            >
              <p>Endereço: {wave.address}</p>
              <p>Data/Horário: {wave.timestamp.toString()}</p>
              <p>Mensagem: {wave.message}</p>
            </div>
          );
        })}
      </div>

      <footer>
        <TextField
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          className="message"
          placeholder="Conecte-se para poder enviar suas mensagens"
          multiline
          rows={2}
          maxRows={4}
          value={props.text}
          onChange={props.setText}
        />
      </footer>
      <button
        disabled={props.enableButton}
        className="btn btn-primary"
        onClick={props.sendMessage}
      >
        enviar
      </button>
    </section>
  );
}
