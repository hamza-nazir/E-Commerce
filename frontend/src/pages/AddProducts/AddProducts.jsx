import React, { useEffect, useState } from 'react';
import './AddProducts.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddProducts = () => {
    const [loading,setLoading]=useState(false)
  const navigate = useNavigate();
  const owner = import.meta.env.VITE_OWNER_ID;
  const [size,setSize]=useState({
    XS:false,
    S:false,
    M:false,
    L:false,
    XL:false,
    XXL:false,
  })
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    stock: '',
    category: '',
    gender: '',
    colors: '',
    material: '',
    tags: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3000/auth', { withCredentials: true })
      .then((res) => {
        if (res.data.currentUser._id !== owner) {
          navigate('/');
        }
      })
      .catch(() => {
        navigate('/');
      });
  }, []);



function handleChange(e){
 setFormData((curr)=>{
  return {
    ...curr,
    [e.target.name]:e.target.value
  }
 })
}

function sizeFun(e){

setSize((curr)=>{
  return {
    ...curr,
    [e.target.name]:e.target.checked
  }
})
}




const [image,setImage]=useState('')
function imageFun(e){
    setImage(e.target.files[0]);

}


async function submitFun(e) {
  e.preventDefault();
  setLoading(true)

  const form = new FormData();

  for (let key in formData) {
    form.append(key, formData[key]);
  }

  form.append('size', JSON.stringify(size)); 
form.append('image', image);
  let response=  await axios.post('http://localhost:3000/add', form, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
if(response.data.success==true){
    setLoading(false)
  toast.success('Item Added Successfully');
navigate('/products');
}else{
  toast.success('Error Occur');
navigate('/products');
    setLoading(false)

}


}


  return (
    <div className='ap-parent'>
      <div className="ap-form-container">
        <h2 className="ap-form-heading">Add New Product</h2>
        <form encType='multipart/form-data' onSubmit={submitFun}  className="ap-form ">
          <div className="ap-form-group">
            <label>Product Name</label>
            <input required type="text" name="name"  onChange={handleChange} placeholder="Enter product name" />
          </div>

          <div className="ap-form-group">
            <label>Description</label>
            <textarea required name="description"  onChange={handleChange} rows="4" placeholder="Enter product description"></textarea>
          </div>

          <div className="ap-form-row">
            <div className="ap-form-group">
              <label>Price</label>
              <input type="number" required min={0} name="price" onChange={handleChange} placeholder="Enter price" />
            </div>
            <div className="ap-form-group">
              <label>Discount (In Rs)</label>
              <input required type="number" name="discount" min={0}  onChange={handleChange} placeholder="Enter discount" />
            </div>
            <div className="ap-form-group">
              <label>Stock Quantity</label>
              <input required type="number" name="stock"  onChange={handleChange} placeholder="Available stock" />
            </div>
          </div>

          <div className="ap-form-row">
            <div className="ap-form-group">
              <label>Category</label>
              <input required type="text" name="category"  onChange={handleChange} placeholder="E.g. Shirts, Pants" />
            </div>
            <div className="ap-form-group">
              <label htmlFor='gender'>Gender</label>
           <select  required onChange={handleChange}  name="gender" className='form-control' id="gender" style={{height:'45px'}}>
            <option >Choose one</option>
            <option value="Male">Male</option>
              <option value="Female">Female</option>
                <option value="Kids">Kids</option>
           </select>
           
            </div>
        
          </div>




              <div className="ap-form-group mt-5">
            <label>Available Sizes</label>
            <div className="ap-sizes-checkboxes" style={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
             <div>
              <label  className="ap-size-option" htmlFor="xs">XS</label>
                <input checked={size.XS} name='XS' onChange={sizeFun} id='xs' type="checkbox"  /> 
             </div>
                
                 <div>
              <label  className="ap-size-option" htmlFor="s">S</label>
                <input checked={size.S} name='S' onChange={sizeFun} id='s' type="checkbox"  /> 
             </div>
              <div>
              <label  className="ap-size-option" htmlFor="m">M</label>
                <input checked={size.M} name='M' onChange={sizeFun} id='m'  type="checkbox"  /> 
             </div>
              <div>
              <label  className="ap-size-option" htmlFor="l">L</label>
                <input checked={size.L} name='L' onChange={sizeFun} id='l' type="checkbox"  /> 
             </div>
              <div>
              <label  className="ap-size-option" htmlFor="xl">XL</label>
                <input checked={size.XL} name='XL' onChange={sizeFun} id='xl' type="checkbox"  /> 
             </div>
             <div>
              <label  className="ap-size-option" htmlFor="xxl">XLL</label>
                <input checked={size.XXL} name="XXL" onChange={sizeFun} id='xxl' type="checkbox"  /> 
             </div>
            
            </div>
          </div>

          <div className="ap-form-row">
            <div className="ap-form-group">
              <label>Colors</label>
              <input required type="text" name="colors"  onChange={handleChange} placeholder="E.g. Black, White" />
            </div>
            <div className="ap-form-group">
              <label>Material</label>
              <input required type="text" name="material" onChange={handleChange} placeholder="E.g. Cotton, Silk" />
            </div>
            <div className="ap-form-group">
              <label>Tags</label>
              <input required type="text" name="tags"onChange={handleChange} placeholder="E.g. Trending, Summer" />
            </div>
          </div>

          <div className="ap-form-group">
            <label>Product Image</label>
            <input required name='image' onChange={imageFun} type="file" />
          </div>

          <button type="submit" className="ap-submit-btn">{loading==true?"Submitting Data....":"Submit Form"}</button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
