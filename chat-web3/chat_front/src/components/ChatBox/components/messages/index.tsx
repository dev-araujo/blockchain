import { Msg } from "./model"
import api from "../../service/service"
import { useEffect, useState } from "react"
import "./styles.scss"

export function Messages(props: Msg) {
  const [data, setData] = useState<any>()

  const getData = () => {
    api
      .get(`bottts/${props.address}.svg`)
      .then((response) => {
        const blob = new Blob([response.data], { type: "image/svg+xml" })
        const url = URL.createObjectURL(blob)
        setData(url)
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {props.text.length > 0 && (
        <article className='message-box mt-2  ms-1 me-1 rounded p-1'>
          <div className='d-flex'>
            <img
              src={data}
              style={{ width: "34px", height: "34px" }}
              className='rounded-circle bg-primary  ms-2'
            />
            <div className='ms-2 d-flex flex-column'>
              <p className='fs-1'>
                {props.address}
                <p className=' fs-1'>{props.date}</p>
              </p>
            </div>
          </div>

          <p className='ms-5 '>{props.text}</p>
        </article>
      )}
    </>
  )
}
