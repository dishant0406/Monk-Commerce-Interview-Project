import axios from 'axios'
import React, { useState } from 'react'
import cross from '../../assets/cross.svg'
import searchicon from '../../assets/search.svg'
import ProductList from './ProductList/ProductList'

const ProductListDialog = ({setOpen,handleAddProduct,checked, setChecked, setAddedProducts, products, setProducts}) => {
  
  
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [search, setSearch] = useState('');
  const cancelHandler = ()=>{
    setOpen(false)
  }

  //search a string in products and return the products that contain the string
  const searchHandler = (e)=>{
    setSearch(e.target.value)
    const searchedProducts = products.filter(product=>product.title.toLowerCase().includes(e.target.value.toLowerCase()))
    setSearchedProducts(searchedProducts)
  }

  React.useEffect(()=>{
    console.log(products)
    setSearchedProducts(products)
  },[products])
  

  
  return (
    <div className=' w-full absolute flex items-center justify-center'>
        <div className='h-[35rem] w-[35rem] rounded-md bg-white z-[100]' style={styles.box}>
          <div className='h-[3rem] flex items-center justify-between border-b border-[##D1D1D1]'>
              <p className='ml-[1rem] font-medium text-black text-[18px]'>Select Products</p>
              <img onClick={()=>setOpen(false)} className='mr-[1rem] h-[1rem] w-[1rem]' src={cross}/>
          </div>
          <div className='h-[3rem] flex relative items-center justify-center border-b border-[##D1D1D1]'>
              <img src={searchicon} className='absolute left-[3rem]'/>
              <input value={search} onChange={searchHandler} placeholder='Search Products' className='w-[90%] pl-[3rem] border border-[#cccccc]'/>
          </div>
          <ProductList checked={checked} setChecked={setChecked} products={searchedProducts} setProducts={setProducts}/>
          <div className='h-[3rem] flex items-center justify-between border-t border-[##D1D1D1]'>
              <p className='ml-[1rem] font-medium text-black text-[16px]'>{
                checked.length>0?checked.length+' products Selected':'No Product Selected'
              }</p>
              <div>
                <button onClick={cancelHandler} className='w-[8rem] rounded-sm border border-[#008060] h-[2rem]'>Cancel</button>
                <button onClick={handleAddProduct}  className='w-[6rem] rounded-sm bg-[#008060] text-white mx-[1rem] h-[2rem]'>Add</button>
              </div>
          </div>
        </div>
    </div>
  )
}

const styles={
  box:{
    boxShadow: "0 0 0 999em rgba(0,0,0,0.2)"
  }
}

export default ProductListDialog