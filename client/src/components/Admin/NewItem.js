import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations';
import { QUERY_CATEGORIES } from '../../utils/queries';
import Axios from 'axios';

const NewItem = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [postImageSelected, setPostImageSelected] = useState('');
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productCat, setProductCat] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productQuantity, setProductQuantity] = useState(1);
  const [productPrice, setProductPrice] = useState(0.0);
  const [formState, setFormState] = useState({ name: '', description: '', category: '' });

  const [addProduct, { error: errorAddProduct }] = useMutation(ADD_PRODUCT);
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);

  // Submit form to add a new post for a trip
  const handleAddProduct = async (event) => {
    event.preventDefault();

    let imageUrl = '';
    // If user selected image file from computer, post to cloudinary, retrieve URL
    if (postImageSelected) {
      const formData = new FormData();
      formData.append('file', postImageSelected);
      formData.append('upload_preset', 'shirt-shop');

      try {
        // const response = await Axios.post('https://api.cloudinary.com/v1_1/dlvmcylti/image/upload', formData);
        // imageUrl = response.data.url;
        imageUrl = 'http://res.cloudinary.com/dlvmcylti/image/upload/v1680292099/qjkacf8vzgyxsoq2wane.webp';
      } catch (err) {
        console.log('Error uploading image:', err.message);
        return;
      }
    }

    try {
      console.log({
        variables: {
          input: {
            name: productName,
            size: productSize,
            description: productDesc,
            image: imageUrl,
            price: parseFloat(productPrice),
            quantity: parseInt(productQuantity),
            category: {
              _id: productCat,
            },
          },
        },
      });
      const { data } = await addProduct({
        name: productName,
        size: productSize,
        description: productDesc,
        image: imageUrl,
        price: parseFloat(productPrice),
        quantity: parseInt(productQuantity),
        category: productCat,
      });
    } catch (err) {
      console.log('Error adding product:', err.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleAddProduct}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" value={productName} onChange={(event) => setProductName(event.target.value)} />
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={productDesc} required onChange={(e) => setProductDesc(e.target.value)} />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" min="0" step="0.01" value={productPrice} required onChange={(e) => setProductPrice(e.target.value)} />
      </div>
      <div>
        <label htmlFor="name">Size:</label>
        <input type="text" id="size" name="size" value={productSize} onChange={(e) => setProductSize(e.target.value)} />
      </div>
      <div>
        <label htmlFor="name">Quantity:</label>
        <input type="number" id="quantity" name="quantity" min="1" step="1" value={productQuantity} required onChange={(e) => setProductQuantity(e.target.value)} />
      </div>
      <div>
        <label>Category:</label>
        <select name="category" defaultValue="DEFAULT" onChange={(event) => setProductCat(event.target.value)}>
          <option value="DEFAULT" disabled>
            Select a category
          </option>
          {categoryData.categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" accept="image/*" onChange={(event) => setPostImageSelected(event.target.files[0])} />
      </div>
      {/* <div>{imageUrl && <img src={imageUrl} alt="Product" style={{ maxWidth: '100%' }} />}</div> */}
      <div>
        <button type="submit" className="bg-primary-200/30 rounded-md p-2">
          Add Product
        </button>
      </div>
    </form>
  );
};

export default NewItem;
