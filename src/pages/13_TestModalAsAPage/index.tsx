import React, { useEffect, useState } from 'react'
import { css } from '@emotion/css'
import TestModalAsAPage_PageThatCanOpenAsAModal from '../14_TestModalAsAPage_PageThatCanOpenAsAModal'
import { useLocation } from 'react-use'

function Modal({ show, closeModal }: { show: boolean; closeModal: () => void }) {
  if (!show) return null
  return (
    <div
      className={css`
        position: absolute;
        top: 0;
        left: 0;
        min-width: 100vw;
        min-height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <TestModalAsAPage_PageThatCanOpenAsAModal />
      <div
        className={css`
          position: absolute;
          bottom: 5rem;
          left: 50%;
          font-size: 5rem;
          transform: translateX(-50%);
        `}
        onClick={() => closeModal()}
      >
        ❌
      </div>
    </div>
  )
}

export default function TestModalAsAPage() {
  const [show, setShow] = useState<boolean>(false)
  const location = useLocation()

  const openModal = () => {
    setShow(true)
    window.history.pushState('', 'ReactApp', '/14_TestModalAsAPage_PageThatCanOpenAsAModal')
  }

  const closeModal = () => {
    setShow(false)
    window.history.back()
  }

  useEffect(() => {
    if (location.pathname === '/13_TestModalAsAPage') {
      setShow(false)
    }
  }, [location])

  return (
    <div>
      <Modal show={show} closeModal={closeModal} />
      <h1>TestModalAsAPage</h1>
      <div>
        Khi open modal URL sẽ push đến <code>TestModalAsAPage_PageThatCanOpenAsAPopup</code> nhưng view của page không
        đổi, thay vào đó sẽ hiển thị page <code>TestModalAsAPage_PageThatCanOpenAsAPopup</code> như là một modal. Khi
        close modal lại trở về url cũ.
      </div>
      <button onClick={openModal}>Open modal</button>
    </div>
  )
}
