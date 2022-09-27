import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductListDialog from '../ProductListDialog/ProductListDialog'
import Select from 'react-select';
import { MdDragIndicator, MdOutlineClose } from 'react-icons/md';
import { HiPencil } from 'react-icons/hi';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const options = [
  { value: 'Percentage', label: '% off' },
  { value: 'flat', label: 'flat off' },
];

const ParentProduct = ({p,clickedId,
  setClickedId, i,dialogStatus, provided:parentProvided,onDelete,dialogShow, hasMoreProducts})=>{
  
  const [open, setOpen] = React.useState(false)
  const [discount, setDiscount] = React.useState(p?.discount ? p.discount:20)
  const [selectedOption, setSelectedOption] = useState(p?.discountType? p.discountType:{ value: 'Percentage', label: '% off' });
  const [varaiants, setVariants] = useState(p.variants)

  const onDragEnd = (result) => {
    const newItems = Array.from(varaiants);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setVariants(newItems);
  };

  const deleteProduct = (id)=>{
    const newProducts = varaiants.filter(p=>p.id!==id)
    setVariants(newProducts)
  }

  React.useEffect(()=>{
    if(varaiants.length<2){
      setOpen(false)
    }
  },[varaiants])
  
  return (
   <div>
     <div className='flex gap-[1rem] mt-[1rem] items-center ml-[-4rem]'>
            <div {...parentProvided.dragHandleProps}>
            <MdDragIndicator/>
            </div>
              <p className='text-black text-[18px]'>{i+1}.</p>
              {/* <input style={styles.input} value={p.title.replace('[Sample] ', '')} type="text" placeholder='Select Product' className='px-[10px] h-[2.5rem] w-[13rem]' /> */}
              <div className='relative'>

                <input style={styles.input} type="text" value={p.title.replace('[Sample] ', '')} placeholder='Select Product' className='pl-[10px] pr-[2.5rem] h-[2.5rem] w-[13rem]' />
                <div onClick={()=>{dialogShow(!dialogStatus);setClickedId(p.id)}} className='absolute top-[8px] right-[10px]'>
                  <HiPencil size="25px" color='#e6e6e6'/>
                </div>
                </div>
              <div className='flex gap-[1rem]'>

              <input value={discount} onChange={(e)=>setDiscount(e.target.value)} style={styles.input}  type="text" className='px-[10px] h-[2.5rem] w-[5rem]' />
              {/* <input style={styles.input} type="select" className='px-[10px] h-[2.5rem] w-[7rem]' /> */}
              <div style={styles.input}>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                placeholder=''
                options={options}
              />
              </div>
              </div>
              {hasMoreProducts && <MdOutlineClose color='#808080' onClick={()=>onDelete(p.id)}/>}
        </div>
        {varaiants.length>1 && <div className='flex justify-end w-[26rem]'>
          <p onClick={()=>setOpen(!open)} className=' mt-[0.5rem] cursor-pointer text-[12px] text-[#006EFF] text-end'>{open?'Hide Variants':'Show Variants'}</p>
        </div>}
        <DragDropContext
              onDragEnd={onDragEnd}
            > 
            <Droppable droppableId="droppable" type="ANSWERS">  
            {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
            >

          {open && varaiants.map((v, index)=>{
                    return (
                      <Draggable
                      key={v.id}
                      draggableId={`${v.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        
                      >
    
                        <VariantProduct v={v} provided={provided} deleteProduct={deleteProduct}/>
                      </div>
                      )}
                    
                    </Draggable>
                      
                    )


                  })}
            
            </div>  
            )}
            </Droppable> 
            </DragDropContext> 
   </div>
  )
}

const VariantProduct = ({v, provided, deleteProduct})=>{
 
  const [discount, setDiscount] = React.useState(20)
  const [selectedOption, setSelectedOption] = useState({ value: 'Percentage', label: '% off' });
  return (
    <div className='flex gap-[1rem] mt-[1rem] items-center ml-[1rem]'>
              <div {...provided.dragHandleProps}>

              <MdDragIndicator/>
              </div>
              <input value={v.title} style={styles.input} type="text" placeholder='Select Product' className='px-[10px] rounded-[20px] text-center h-[2.5rem] w-[13rem]' />
              <div className='flex gap-[1rem]'>

              <input value={discount} onChange={(e)=>setDiscount(e.target.value)} style={styles.input} type="number" className='px-[10px] h-[2.5rem] w-[5rem] rounded-[20px] text-center' />
              
               <div style={styles.input} className='rounded-[20px] selectcont'>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                placeholder=''
                options={options}
              />
              </div>
              </div>
              <MdOutlineClose color='#808080' onClick={()=>deleteProduct(v.id)}/>
            </div>
  )
}


const EmptyInputField = ({addedProcessedArray,additionalInputField,setAdditionalInputField, open, setOpen, i, addDiscount,
  setAddDiscount,
  discount,
  setDiscount,
  selectedOption,
  setSelectedOption })=>{
  
  
  return (
    <div className='flex gap-[1rem] mt-[1rem] items-center ml-[-4rem]'>
      <MdDragIndicator/>
      <p className='text-black text-[18px]'>{addedProcessedArray.length>0?addedProcessedArray.length +i+1:i+1}.</p>
      <div className='relative'>

      <input style={styles.input} value={additionalInputField} onChange={(e)=>setAdditionalInputField(e.target.value)} type="text" placeholder='Select Product' className='pl-[10px] pr-[2.5rem] h-[2.5rem] w-[13rem]' />
      <div onClick={()=>setOpen(!open)} className='absolute top-[8px] right-[10px]'>
        <HiPencil size="25px" color='#e6e6e6'/>
      </div>
      </div>
      {!addDiscount && <button onClick={()=>setAddDiscount(true)} className='bg-[#008060] rounded-md text-white w-[9rem] h-[2.5rem]' >Add Discount</button>}
      {addDiscount && <div className='flex gap-[1rem]'>

          <input value={discount} onChange={(e)=>setDiscount(e.target.value)} style={styles.input} type="number" className='px-[10px] h-[2.5rem] w-[5rem] rounded-[20px] text-center' />

          <div style={styles.input} className='rounded-[20px] selectcont'>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            placeholder=''
            options={options}
          />
          </div>
          </div>}
    </div>
  )
}

const ProductPicker = () => {
  const [open, setOpen] = React.useState(false)
  const [products, setProducts] = React.useState([])
  const [addedProducts, setAddedProducts] = React.useState([])
  const [productIdArray , setProductIdArray] = React.useState([])
  const [variantIdArray , setVariantIdArray] = React.useState([])
  const [addedProcessedArray , setAddedProcessedArray] = React.useState([])
  const [additionalProducts , setAdditionalProducts] = React.useState([1])
  const [additionalInputField , setAdditionalInputField] = React.useState('')
  const [addDiscount, setAddDiscount] = React.useState(false)
  const [discount, setDiscount] = React.useState(20)
  const [selectedOption, setSelectedOption] = useState({ value: 'Percentage', label: '% off' });
  const [checked, setChecked] = useState([]);
  const [clickedId, setClickedId] = useState(null)
  const [clickedIndex, setClickedIndex] = useState(null)

  const onDragEnd = (result) => {
    const newItems = Array.from(addedProcessedArray);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setAddedProcessedArray(newItems);
  };

  const addTheProducts = ()=>{
    if(addedProducts.length==0){
      setAddedProducts(checked);
      setOpen(false)
      setChecked([])
    }else{
      // remove all elements from addedProducts that same string as the clickedId

      if(checked.length>0){
        const filtered = addedProducts.filter(function(value, index, arr){ 
          if(value.includes(`${clickedId}`)){
            setClickedIndex(index)
          }
          return !value.includes(`${clickedId}`);
        });
        const arr = []
        productIdArray.forEach((prod, i)=>{
          if(prod==clickedId){
            setClickedIndex(i)
          }
        })
        for(let i=0;i<=filtered.length;i++){
          for(let i=0;i<filtered.length;i++){
            if(i==clickedIndex){
              for(let i =0;i<checked.length;i++){
                arr.push(checked[i])
              }
            }
            arr.push(filtered[i])
          }
          arr.push(filtered[i])
        }
        setAddedProducts([...filtered, ...checked]);
        setChecked([])
      }
      setOpen(false)
    }
  }

  //delete a product from the array
  const deleteProduct = (id)=>{
    const newProducts = addedProcessedArray.filter(p=>p.id!==id)
    setAddedProcessedArray(newProducts)
  }

  useEffect(()=>{
    let arr = []
    let varr = []
    addedProducts.map((pro)=>{
      const [productId, Vairant] = pro.split(' ')
      arr = [...arr, productId]
      varr = [...varr, Vairant]
      const newSet = new Set(arr)
      const newSet2 = new Set(varr)
      arr = [...newSet]
      varr = [...newSet2]
      setProductIdArray(arr)
      setVariantIdArray(varr)
    })
  }, [addedProducts])

  useEffect(() => {
    let processedProucts = []
    productIdArray.map((productId)=>{
      products.map((p)=>{
        if(p.id == productId){
          const variantArray = []
          variantIdArray.map((variantId)=>{
            p.variants.map((v)=>{
              if(v.id == variantId){
                variantArray.push(v)
              }
            })
          })
          processedProucts = [...processedProucts, {title:p.title, id: productId, variants: variantArray}]
        }
      })
      console.log({processedProucts})
      setAddedProcessedArray(processedProucts)
    })
  }, [productIdArray])

  React.useEffect(() => {

    (async function() {
      const {data} = await axios.get('https://stageapibc.monkcommerce.app/admin/shop/product')
      setProducts(data)
  
    })();
    
  }, [])

  const addEmptyProduct =()=>{
    const newArr = [...addedProcessedArray, {title:additionalInputField, id: `${Date.now()}`, variants: [],discount: discount, discountType: selectedOption}]
    setAddedProcessedArray(newArr)
    setAdditionalInputField('')
    setAddDiscount(false)
    setDiscount(20)
    setSelectedOption({ value: 'Percentage', label: '% off' })
    setAdditionalProducts([1])

  }

  return (
    <div className='w-full'>
      {open && <div>
      <ProductListDialog checked={checked} setChecked={setChecked} handleAddProduct={addTheProducts} products={products} setProducts={setProducts} setOpen={setOpen} setAddedProducts={setAddedProducts}/>
      </div>}
        <div  className='justify-center font-medium mt-[4rem] flex w-full'>
          <div>
          <p className='text-black text-[20px]'>Add Products</p>
          <div>
            <div className='flex gap-[1rem] mt-[2rem]'>
              <p className='text-black text-[18px] w-[13rem]'>Product</p>
              <p className='text-black text-[18px] w-[13rem]'>Discount</p>
            </div>
              <div className='flex flex-col gap-[1rem]'>
            <DragDropContext
              onDragEnd={onDragEnd}
            > 
            <Droppable droppableId="droppable" type="QUESTIONS">  
            {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
            >
              
            {addedProcessedArray.length>0 && addedProcessedArray.map((p, index)=>{
              return (
                <Draggable
                  key={p.id}
                  draggableId={p.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    
                  >

                    <ParentProduct clickedId={clickedId} setClickedId={setClickedId} p={p} dialogStatus={open} dialogShow={setOpen} i={index} provided={provided} onDelete={deleteProduct} hasMoreProducts={addedProcessedArray.length>1}/>
                  </div>
                  )}
                
                </Draggable>
              )
            })}
            
            </div>  
            )}
            </Droppable> 
            </DragDropContext> 
              </div>
            {additionalProducts.map((pro, i)=>{
              return <EmptyInputField i={i} additionalInputField={additionalInputField} setAdditionalInputField={setAdditionalInputField} addEmptyProduct={addEmptyProduct} addedProcessedArray={addedProcessedArray} open={open} setOpen={setOpen} 
              addDiscount={addDiscount}
              setAddDiscount={setAddDiscount}
              discount={discount}
              setDiscount={setDiscount}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              />
            })}
            <div  className='flex mt-[1rem] justify-end w-[23rem] items-center'>
            <button onClick={additionalInputField!==''&& addEmptyProduct} className='border-[3px] border-[#008060] rounded-md text-[18px] text-[#008060] w-[13rem] h-[4rem]' >Add Product</button>
            </div>
          </div>
          </div>
        </div>
    </div>
  )
}

const styles = {
  input:{
    border: "1px solid rgba(0, 0, 0, 0.07)",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
  }
}

export default ProductPicker