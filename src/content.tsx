import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useState } from "react"

import Modal from "./features/Modal"

import wandIcon from "../assets/magicwandBtn_img.png"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleCloseModal = () => {
    setModalVisible(false)
  }
  const handleIconClick = () => {
    setModalVisible(true)
  }

  // Function to simulate pressing the Enter key
  const simulateEnterKeyPress = () => {
    const event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'Enter',
      keyCode: 13
    });
    document.querySelector('.msg-form__contenteditable')?.dispatchEvent(event);
  }

  function displayWandIcon() {
    var img = document.createElement("img")
    img.addEventListener("click", handleIconClick)
    img.src = wandIcon 

    img.style.width = "40px"
    img.style.cursor = "pointer"
    img.className = "AI-wandIcon bg-white p-8 rounded-lg shadow-2xl "
    img.style.position = "absolute"
    img.style.bottom = "0"
    img.style.right = "7px"

    var messageTextArea = document.querySelector(".msg-form__contenteditable")

    if (messageTextArea) {
      messageTextArea.appendChild(img)
    }
  }

  document.addEventListener("focusin", function (event) {
    var focusedElement = event.target as Element
    if (focusedElement.matches(".msg-form__contenteditable")) {
      displayWandIcon()
    }
  })

  function removeImageFromMessageTextArea() {
    var img = document.querySelector(".AI-wandIcon")
    if (img) {
      img.remove()
    }
  }

  document.addEventListener("focusout", function (event) {
    var focusedElement = event.relatedTarget as Element
    if (!focusedElement || !focusedElement.matches(".AI-wandIcon")) {
      removeImageFromMessageTextArea()
    }
  })

  // Add a custom event listener for when AI-generated content is inserted
  document.addEventListener("aiContentInserted", function () {
    simulateEnterKeyPress();
  });

  return (
    <>
      <Modal
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        setModalVisible={setModalVisible}
      />
    </>
  )
}

export default PlasmoOverlay