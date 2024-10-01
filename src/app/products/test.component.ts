// onCreateProduct(formValue: any) {
//   // Create the product object, adhering to the IProduct interface
//   const product: IProduct = {
//     name: formValue.name,
//     description: formValue.description,
//     sku: formValue.sku,
//     price: formValue.price,
//     quantity: formValue.quantity,
//     category_id: formValue.category_id,
//     supplier_id: formValue.supplier_id,
//     image: this.selectedFile!, // Assign the file separately
//   };
//   // Create FormData to send the product object
//   const formData = new FormData();
//   formData.append('name', product.name);
//   formData.append('description', product.description);
//   formData.append('sku', product.sku);
//   formData.append('price', product.price);
//   formData.append('quantity', product.quantity);
//   formData.append('category_id', product.category_id);
//   formData.append('supplier_id', product.supplier_id);
//   formData.append('image', this.selectedFile!);  // Append the file

//   console.log(formValue);
//   console.log(product);
//   console.log(formData);
//   this.isLoading = true;
//   // console.log(productData.image);
//   // console.log(typeof productData.image);
//   this.productServ.createNewProduct(formData).subscribe({
//     next: (data) => {
//       this.isLoading = false;
//       this.productsArray.push(data);
//       console.log(data);
//     },
//     error: (error) => {
//       console.log('alert1');
//       console.log(error);
//       this.errorTypes = error.error.errors;
//       console.log('alert2');
//       console.log(this.errorTypes);
//     },
//   });
// }
