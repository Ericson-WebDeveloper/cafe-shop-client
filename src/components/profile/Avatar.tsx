import React from 'react'

type Props = {
    avatar: string
}

const Avatar = React.memo(({avatar}: Props) => {
  return (
    <div className="flex w-full h-[250px] justify-center items-center">
    <img
      src={avatar}
      className="h-[100px] md:h-full w-[100px] md:w-[250px] rounded-full"
      alt=""
    />
  </div>
  )
})

export default Avatar