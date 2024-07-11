

const ButtonComponent = ({label,action,image,buttonClass,ImgClass}) => {
  return (
    <button
    onClick={action}
    className={buttonClass}>
    <img src={image} className={ImgClass} />
    <p>{label}</p>
  </button>
  )
}

export default ButtonComponent;