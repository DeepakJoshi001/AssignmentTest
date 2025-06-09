import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  private modalService = inject(NgbModal);
  products: any[] = [];
  title = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(products, 'products');
    });
  }

  deleteProduct(id: string) {
    console.log(id, 'id');
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        this.getAllProducts();
        console.log('Data Deleted successfully:', response);
      },
      error: (error) => {
        console.error('Error Deleting data:', error);
      },
    });
  }

  open() {
    this.title = 'Add Product';
    const modalRef = this.modalService.open(ProductFormComponent);

    modalRef.result
      .then((product) => {
        if (product) {
          this.getAllProducts();

          console.log('New product:', product);
          // TODO: add product to your product list here
        }
      })
      .catch(() => {
        console.log('Modal dismissed');
      });
  }

  onUpdate(product: any) {
    const modalRef = this.modalService.open(ProductFormComponent);
    modalRef.componentInstance.title = 'Update Product'; // Pass title for Update
    modalRef.componentInstance.product = product; // Pass the product to update

    modalRef.result
      .then((updatedProduct) => {
        if (updatedProduct) {
          this.getAllProducts();
          console.log('Updated product:', updatedProduct);
        }
      })
      .catch(() => {
        console.log('Modal dismissed');
      });
  }
}
