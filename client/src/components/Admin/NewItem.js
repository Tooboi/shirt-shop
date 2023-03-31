import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations';
import Axios from 'axios';

const NewItem = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [postImageSelected, setPostImageSelected] = useState('');
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productCat, setProductCat] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const [addProduct, { error: errorAddProduct }] = useMutation(ADD_PRODUCT);
  // Submit form to add a new post for a trip
  const handleAddProduct = async (event) => {
    event.preventDefault();

    let response;
    // If user selected image file from computer, post to cloudinary, retrieve URL
    if (postImageSelected) {
      const formData = new FormData();
      formData.append('file', postImageSelected);
      formData.append('upload_preset', 'shirt-shop');

      response = await Axios.post('https://api.cloudinary.com/v1_1/dlvmcylti/image/upload', formData);
    }

    try {
      const { data } = await addProduct({
        variables: {
          productInfo: {
            name: productName,
            size: productSize,
            description: productDesc,
            image: response.data.url,
            quantity: productQuantity,
            category: productCat,
            price: productPrice,
          },
        },
      });
      
      console.log('Product added:', data.addProduct);
      // Clear the form fields and image URL
      event.target.reset();
      setProductName('');
      setProductDesc('');
      setProductCat('');
      setProductSize('');
      setProductQuantity('');
      setProductPrice('');
      setImageUrl('');
      setPostImageSelected('');
    } catch (err) {
      console.log('Error adding product:', err.message);
    }
  };
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const name = event.target.elements.name.value;
  //     const description = event.target.elements.description.value;
  //     const price = parseFloat(event.target.elements.price.value);
  //     const category = event.target.elements.category.value;

  //     // Call the addProduct mutation with the form data and the image URL
  //     addProduct({
  //       variables: {
  //         name,
  //         description,
  //         price,
  //         category,
  //         imageUrl,
  //       },
  //     })
  //       .then((result) => {
  //         console.log('Product added:', result.data.addProduct);
  //         // Clear the form fields and image URL
  //         event.target.reset();
  //         setImageUrl('');
  //       })
  //       .catch((error) => {
  //         console.error('Error adding product:', error);
  //       });
  //   };

  return (
    <form onSubmit={handleAddProduct}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required onChange={(e) => setProductName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" required onChange={(e) => setProductDesc(e.target.value)} />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" min="0" step="0.01" required onChange={(e) => setProductPrice(e.target.value)} />
      </div>
      <div>
        <label htmlFor="name">Size:</label>
        <input type="text" id="size" name="size" onChange={(e) => setProductSize(e.target.value)} />
      </div>
      <div>
        <label htmlFor="name">Quantity:</label>
        <input type="number" id="quantity" name="quantity" min="1" step="1" required onChange={(e) => setProductQuantity(e.target.value)} />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" required onChange={(e) => setProductCat(e.target.value)} />
      </div>
      <div>
        <label htmlFor="postImg">Image:</label>
        <input
          required
          type="file"
          name="postImg"
          onChange={(event) => {
            setPostImageSelected(event.target.files[0]);
          }}
        />
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
