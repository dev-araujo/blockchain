import api from "./api"

const getAvatar = (address: string, avatarUrl: any) => {
  api
    .get(`big-smile/${address}.svg`)
    .then((response) => {
      const blob = new Blob([response.data], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      avatarUrl(url)
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err)
    })
}

export default getAvatar
