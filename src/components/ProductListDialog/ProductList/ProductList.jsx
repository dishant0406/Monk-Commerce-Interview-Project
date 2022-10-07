import React, { useRef, useState } from 'react'
import axios from 'axios'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {MdCheckBox, MdCheckBoxOutlineBlank, MdExpandLess, MdExpandMore, MdIndeterminateCheckBox} from 'react-icons/md'

function uniqueID() {
  return Math.floor(Math.random() * Date.now())
  }

const ProductList = ({checked, setChecked, products,page, setPage, setProducts}) => {
  
  const [productTree, setProductTree] = React.useState([])
  const [checkedKeys, setCheckedKeys] = useState([]);
  
  const [expanded, setExpanded] = useState([]);
  const productRef = useRef(null)

  React.useEffect(()=>{
    const proTree=[]
    products.map((product)=>{
      const productObj = {}
      const str = product.title;
      const restr = str.replace('[Sample] ', "");
      productObj.value = uniqueID();
      productObj.label = restr;
      productObj.icon = <img src={product.image.src} className=' w-[3rem]'/>
      
      productObj.children=[]
      product.variants && product.variants.map(variant=>{
        const variantObj = {}
        variantObj.value= `${variant.product_id} ${variant.id}`;
        variantObj.label= variant.title;
        productObj.children.push(variantObj)
      })
      
      proTree.push(productObj)
    })

    setProductTree(proTree);
  },[products])

  React.useEffect(()=>{
    console.log({checked})
  },[checked])

  const onScroll = async () => {
    if (productRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = productRef.current;
      if (Math.floor(scrollTop + clientHeight) === scrollHeight) {
        // This will be triggered after hitting the last element.
        // API call should be made here while implementing pagination.
        const {data} = await axios.get(`https://stageapibc.monkcommerce.app/admin/shop/product?page=${page+1}`)
        setProducts([...products, ...data])
        setPage(page+1)
      }
    }
  };

  React.useEffect(()=>{
    console.log({productTree})
  },[productTree])
  
  return (
    <div className='overflow-y-scroll mt-[1rem] h-[25rem]'onScroll={onScroll} ref={productRef} >
      <div className='ml-[2rem] h-[25rem]' >

<CheckboxTree
                nodes={productTree}
                checked={checked}
                expanded={expanded}
                onCheck={checked => setChecked(checked)}
                onExpand={expanded => setExpanded(expanded)}

                icons={{
                  check: <MdCheckBox color='#008060' size="40px" style={{fontSize:'40px'}}/>,
                  uncheck: <MdCheckBoxOutlineBlank color='#008060' size="40px" style={{fontSize:'40px'}}/>,
                  halfCheck: <MdIndeterminateCheckBox color='#008060' size="40px" style={{fontSize:'40px'}}/>,
                  expandClose: <MdExpandLess color='#008060' size="40px" style={{fontSize:'40px'}}/>,
                  expandOpen: <MdExpandMore color='#008060' size="40px" style={{fontSize:'40px'}}/>,
                  expandAll: <MdExpandMore color='#008060' size="40px" style={{fontSize:'40px'}}/>,
                  collapseAll: <MdExpandMore color='#008060' size="40px" style={{fontSize:'40px'}}/>,
                  parentClose: <div/>,
                  parentOpen: <div/>,
                  leaf: <div/>,
              }}
            />
    </div>
    </div>
  )
}

export default ProductList