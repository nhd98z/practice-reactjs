import React, { memo, useEffect } from 'react'
import axios from 'axios'

export default memo(function AxiosErrorHandling() {
  useEffect(() => {
    const func = async () => {
      try {
        const data = await axios.get('https://api.github.com/userss/nguyenhuudungz/repos')
        console.log(`data`, data)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(`err.response`, err.response)
        }
      }
    }

    func()
  }, [])
  return <div>See console.log</div>
})
