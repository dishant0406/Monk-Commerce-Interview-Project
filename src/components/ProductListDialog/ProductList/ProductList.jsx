import React, { useState } from 'react'
import axios from 'axios'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {MdCheckBox, MdCheckBoxOutlineBlank, MdExpandLess, MdExpandMore, MdIndeterminateCheckBox} from 'react-icons/md'

const ProductList = ({checked, setChecked, products, setProducts}) => {
  
  const [productTree, setProductTree] = React.useState([])
  const [checkedKeys, setCheckedKeys] = useState([]);
  
  const [expanded, setExpanded] = useState([]);
 

  React.useEffect(()=>{
    const proTree=[]
    products.map((product)=>{
      const productObj = {}
      const str = product.title;
      const restr = str.replace('[Sample] ', "");
      productObj.value = product.id;
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

  React.useEffect(()=>{
    console.log({productTree})
  },[productTree])
  return (
    <div className='overflow-y-scroll mt-[1rem] h-[25rem]'>
      <div className='ml-[2rem] h-[25rem]'>
        {/* <CheckboxTree
  checkboxSize="20px"
  checkedKeys={checkedKeys}
  childrenOffset="20px"
  colors={{
    anyChecked: {
      background: 'transparent',
      border: '#CCCCCC',
      hover: {
        border: '#580B9E'
      },
      icon: '#580B9E'
    },
    disabled: {
      background: '#F5F5F5',
      border: '#D9D9D9',
      icon: '#D9D9D9'
    },
    off: {
      background: 'transparent',
      border: '#CCCCCC',
      hover: '[Circular]',
      icon: 'transparent'
    },
    on: {
      background: '#580B9E',
      border: '#580B9E',
      icon: '#FFFFFF'
    }
  }}
  highlightClassName="highlight"
  idKey="id"
  nodes={productTree}
  onChange={setCheckedKeys}
  searchBy="label"
/> */}
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