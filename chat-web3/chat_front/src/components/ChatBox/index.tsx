import TextField from "@mui/material/TextField"
import { Messages } from "./components/Messages"
import { Props } from "./model"
import wallpaper from "../../assets/pose_45.png"
import "./styles.scss"

export function ChatBox(props: Props) {
  let listMessages = props.messages.filter((msg: any) => {
    return msg.message.length > 0
  })

  return (
    <section className='box d-flex flex-column justify-content-between'>
      <header className='pb-4 bg-primary d-flex justify-content-end '>
        <i className='bi bi-chat-dots text-white me-2 h5'></i>
      </header>

      <div className='box__content'>
        {listMessages.length > 0 ? (
          listMessages
            .map((post: any, index: any) => {
              return (
                <div key={index}>
                  <Messages
                    address={post.address}
                    text={post.message}
                    date={`${post.timestamp
                      .toLocaleString()
                      .substring(0, 9)} às ${post.timestamp
                      .toLocaleString()
                      .substring(10)} `}
                  />
                </div>
              )
            })
            .reverse()
        ) : (
          <div className='text-center box__no-messages'>
            Para acessar as mensagens conecte sua metamask com a{" "}
            <a
              href='https://blog.cryptostars.is/goerli-g%C3%B6rli-testnet-network-to-metamask-and-receiving-test-ethereum-in-less-than-2-min-de13e6fe5677'
              target='_blank'
            >
              <u>rede Goerli Testnet</u>
            </a>
          </div>
        )}
      </div>

      <footer>
        <TextField
          variant='standard'
          InputProps={{
            disableUnderline: true,
          }}
          className='message'
          placeholder='Conecte-se para poder enviar suas mensagens'
          multiline
          rows={2}
          maxRows={4}
          value={props.text}
          onChange={props.setText}
        />
      </footer>
      <button
        disabled={props.enableButton}
        className='btn btn-primary'
        onClick={props.sendMessage}
      >
        ENVIAR
      </button>
    </section>
  )
}
