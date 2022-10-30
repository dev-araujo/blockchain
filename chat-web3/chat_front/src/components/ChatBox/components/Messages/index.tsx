import { useEffect, useState } from "react"
import { Msg } from "./model"
import getAvatar from "../../service/getAvatar"
import "./styles.scss"

export function Messages(props: Msg) {
  const [avatar, setAvatar] = useState<any>()

  useEffect(() => {
    getAvatar(props.address, setAvatar)
  }, [])

  return (
    <article className='message-box mt-3  ms-1 me-1 rounded pt-2 p-1'>
      <div className='d-flex'>
        <img src={avatar} className='rounded bg-info  ms-2' />
        <div className='ms-2 d-flex flex-column'>
          <div className='message-box__info'>
            {props.address}
            <p className='mt-1 message-box__date'>{props.date}</p>
          </div>

          <p className='mb-5'>{props.text}</p>
        </div>
      </div>
    </article>
  )
}
