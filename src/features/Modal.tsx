import { useState } from "react"

import ButtonComponent from "./BtnComponent"

import Input from "../../assets/insertBtn_img.png"
import Reload from "../../assets/regenBtn_img.png"
import Generate from "../../assets/generateBtn_img.png"

const reply =
  "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."

const Modal = ({ modalVisible, handleCloseModal, setModalVisible }) => {
  const [inputValue, setInputValue] = useState("")
  const [generated, setGenerated] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [promptModalVisible, setPromptModalVisible] = useState(false)

  const handleGenerateClick = () => {
    if (inputValue.length != 0) {
      setGenerated(true)
      setPromptModalVisible(true)
      setPrompt(inputValue)
      setInputValue("")
    }
  }

  const handleInsertClick = () => {
    setModalVisible(false)
    const replyText: string = reply

    const messageElement: HTMLElement | null = document.querySelector(
      ".msg-form__contenteditable"
    )

    if (messageElement) {
      const paragraph: HTMLParagraphElement = document.createElement("p")
      paragraph.textContent = replyText
      messageElement.textContent = ""
      messageElement.appendChild(paragraph)

      const label: HTMLElement | null = document.querySelector(
        ".msg-form__placeholder"
      )
      if (label) {
        label.removeAttribute("data-placeholder")
      }
      const sendButton: HTMLElement | null = document.querySelector(
        ".msg-form__send-button"
      )
      sendButton?.removeAttribute("disabled")
    }
  }

  return (
    <>
      <div
        className="top-1/2 left-[48%] z-50 fixed flex flex-col bg-white shadow-2xl p-4 rounded-lg font-custom1 transform -translate-x-1/2 -translate-y-1/2 modal"
        style={{ display: modalVisible ? "flex" : "none" }}>
        {promptModalVisible ? (
          <div className="flex flex-col gap-y-4 py-4 w-[450px] chat-area">
            <div className="bg-[#DFE1E7] p-2 rounded-lg message self-end">
              <p className="text-[#666D80] text-[15px]">{prompt}</p>
            </div>
            <div className="flex bg-[#DBEAFE] p-2 rounded-lg w-[300px] reply">
              <p className="text-[#666D80] text-[15px] reply-msg">
                {reply}
              </p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="mb-4 first-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border-[#C1C7D0] p-2 border rounded-lg w-[450px] text-[#666D80] text-[15px]"
            placeholder="Your prompt"
          />
        </div>

        <div className="flex justify-end items-center second-button">
          {!generated ? (
            <ButtonComponent
              label="Generate"
              action={handleGenerateClick}
              image={Generate}
              buttonClass="px-4 py-2 text-[15px] bg-[#3B82F6] flex flex-row text-white rounded-lg gap-2"
              ImgClass="h-[18px] w-[14px] pt-1"
            />
          ) : (
            <div className="flex flex-row gap-x-2">
              <ButtonComponent
                label="Insert"
                action={handleInsertClick}
                image={Input}
                buttonClass="px-4 py-2 text-[15px] bg-white flex flex-row text-[#666D80] border border-[#666D80] rounded-lg gap-2"
                ImgClass="w-[11px] pt-2"
              />

              <ButtonComponent
                label="Regenerate"
                action={()=>{}}
                image={Reload}
                buttonClass="px-4 py-2 text-[15px] bg-[#3B82F6] flex flex-row text-white rounded-lg gap-2"
                ImgClass="h-[19px] w-[13px] pt-1"
              />
            </div>
          )}
        </div>
      </div>
      {modalVisible ? (
        <div
          onClick={handleCloseModal}
          className="top-0 left-0 z-10 fixed bg-black bg-opacity-20 w-screen h-screen"></div>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default Modal