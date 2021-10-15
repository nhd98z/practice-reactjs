import React, { memo, useEffect } from 'react'
import axios, { Cancel } from 'axios'

export default memo(function CancelAxiosRequest() {
  useEffect(() => {
    const source = axios.CancelToken.source()
    const func = async () => {
      try {
        const data = await axios.get('https://api.github.com/users/nguyenhuudungz/repos', { cancelToken: source.token })
        console.log(`data`, data)
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log('Message:', (e as Cancel).message)
        }
      }
    }

    func()

    return () => {
      if (source) {
        source.cancel('This is the cancel message.')
      }
    }
  }, [])
  return <div>Vào page này nhanh rồi chuyển sang page khác luôn, rồi vào network xem request.</div>
})
