import React from 'react'
import monk from '../../../public/monk.svg'

const NavBar = () => {
  return (
    <div className='w-full flex items-center gap-[1rem] h-[60px] border-b border-[##D1D1D1]'>
      <img src={monk} alt='monk' className='w-10 ml-[10px] h-10' />
      <p className='text-[20px] text-[#7E8185] font-medium'>Monk Upsell & Cross-sell</p>
    </div>
  )
}

export default NavBar