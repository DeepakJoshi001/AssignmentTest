import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  @Input() title: string = 'Add Product';
  @Input() product: any;
  name = '';
  description = '';
  price: number = 0;
  products: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService
  ) {}

  ngOnInit() {
    console.log(this.product, 'product');
    if (this.product) {
      this.name = this.product.name;
      this.description = this.product.description;
      this.price = this.product.price;
    }
  }

  getallproduct() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(products, 'products');
    });
  }

  save() {
    const product = {
      name: this.name,
      description: this.description,
      price: this.price,
    };

    if (this.title === 'Update Product') {
      // Call update service
      this.productService.updateProduct(this.product._id, product).subscribe({
        next: (response) => {
          console.log('Product updated successfully:', response);
          this.activeModal.close(response);
        },
        error: (error) => {
          console.error('Error updating product:', error);
        },
      });
    } else {
      // Call save service
      this.productService.SaveProduct(product).subscribe({
        next: (response) => {
          console.log('Product added successfully:', response);
          this.activeModal.close(response);
        },
        error: (error) => {
          console.error('Error adding product:', error);
        },
      });
    }
  }
}
